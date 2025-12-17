/**
 * App.tsx
 *
 * This is the main component of the application. It acts as the "controller" for the game logic.
 *
 * RESPONSIBILITIES:
 * 1. State Management: Holds the master state (Keys, Fate Points, Unlocks, History).
 * 2. Persistence: Saves/Loads data to localStorage and handles import/export.
 * 3. Game Logic: Contains the rules for Rolling (farming keys) and Gacha (spending keys).
 * 4. Layout: Composes the main UI sections (Header, Action, Gacha, Dashboard).
 *
 * HOW TO CHANGE:
 * - To change the initial state (new game), modify `getInitialUnlocks`.
 * - To change the Pity System (Fate Points), modify `processRoll`.
 * - To change the Gacha logic (dupe protection, etc.), modify `performGachaPull`.
 * - To change how "Omni-Keys" work, modify `handleSpecialUnlock`.
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GameState, LogEntry, TableType, UnlockState } from './types';
import { EQUIPMENT_SLOTS, REGIONS_LIST, SKILLS_LIST, REGION_GROUPS, MOBILITY_LIST, POWER_LIST, MINIGAMES_LIST, BOSSES_LIST, EQUIPMENT_TIER_MAX, REGION_ICONS, SLOT_CONFIG, SPECIAL_ICONS, WIKI_OVERRIDES } from './constants';
import { ActionSection } from './components/ActionSection';
import { GachaSection } from './components/GachaSection';
import { Dashboard } from './components/Dashboard';
import { LogViewer } from './components/LogViewer';
import { FateMechanics } from './components/FateMechanics';
import { VoidReveal } from './components/VoidReveal';
import { Key, BookOpen, Dices, Shield, Skull, Sparkles, Download, Upload, Save, RotateCcw } from 'lucide-react';

// --- Utils ---
// Simple random ID generator for log entries
const uuid = () => Math.random().toString(36).substr(2, 9);
// Simple dice roller (1 to max)
const rollDice = (max: number = 100) => Math.floor(Math.random() * max) + 1;

// The key used for localStorage
const STORAGE_KEY = 'FATE_UIM_SAVE_V1';

// getInitialUnlocks: Generates a fresh, empty unlock state.
// Used when starting a new game or resetting.
const getInitialUnlocks = (): UnlockState => ({
  equipment: EQUIPMENT_SLOTS.reduce((acc, slot) => ({ ...acc, [slot]: 0 }), {} as Record<string, number>),
  skills: { 'Hitpoints': 1 }, // Hitpoints starts unlocked at Tier 1
  levels: SKILLS_LIST.reduce((acc, skill) => ({
    ...acc,
    [skill]: skill === 'Hitpoints' ? 10 : 1 // Hitpoints starts at level 10, others at 1
  }), {} as Record<string, number>),
  regions: [],
  mobility: [],
  power: [],
  minigames: [],
  bosses: []
});

// PendingUnlock: State for the "Unlocking..." animation modal.
interface PendingUnlock {
  table: string; // The category (Skill, Equipment, Region, etc.)
  item: string; // The specific item name
  costType: 'key' | 'specialKey';
  displayType: string; // For the animation title
  itemImage?: string; // Image to display
}

// fetchWikiImage: Async helper to get high-res images from OSRS Wiki API.
// Used for Regions and Bosses where we don't have static local icons.
const fetchWikiImage = async (pageName: string): Promise<string | null> => {
    try {
        const title = WIKI_OVERRIDES[pageName] || pageName;
        const endpoint = `https://oldschool.runescape.wiki/api.php`;
        const params = new URLSearchParams({
            action: 'query',
            titles: title,
            prop: 'pageimages',
            format: 'json',
            pithumbsize: '600',
            origin: '*'
        });

        const res = await fetch(`${endpoint}?${params.toString()}`);
        const data = await res.json();
        const pages = data.query?.pages;
        if (!pages) return null;

        const pageId = Object.keys(pages)[0];
        if (pageId === '-1') return null;

        return pages[pageId].thumbnail?.source || null;
    } catch (e) {
        console.error("Wiki Image Fetch Error:", e);
        return null;
    }
};

// getUnlockImage: Synchronous helper to get local static icons.
// Used for Skills, Equipment, and some icons before the API fetch completes.
const getUnlockImage = (table: string, item: string) => {
    const baseUrl = 'https://oldschool.runescape.wiki/images/';

    if (table === 'skill') {
        return `${baseUrl}${item}_icon.png`;
    }
    if (table === 'equipment') {
        const config = SLOT_CONFIG[item];
        return config ? `${baseUrl}${config.file}` : undefined;
    }
    if (table === 'region') {
        // Fallback or Initial Placeholder (Globe or Icon)
        // We will fetch the real image asynchronously, but having a placeholder is good
        return REGION_ICONS[item] ? `${baseUrl}${REGION_ICONS[item]}` : `${baseUrl}Globe_icon.png`;
    }
    // Check special maps (mobility, power, boss, minigame)
    const specialIcon = SPECIAL_ICONS[item];
    if (specialIcon) {
        return `${baseUrl}${specialIcon}`;
    }

    return undefined;
}

function App() {
  // --- Initialization Logic ---

  // loadSaveData: Reads from localStorage on startup.
  const loadSaveData = (): Partial<GameState> & { specialKeys?: number } => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load save data", e);
    }
    return {};
  };

  const savedData = loadSaveData();

  // --- Main State ---
  // Keys: The main currency for unlocking content.
  const [keys, setKeys] = useState<number>(savedData.keys ?? 3); // Start with 3 keys
  // SpecialKeys (Omni-Keys): Rare currency that bypasses RNG.
  const [specialKeys, setSpecialKeys] = useState<number>(savedData.specialKeys ?? 0);
  // FatePoints: Accumulates on failed rolls. Reaching 50 grants a free key (Pity).
  const [fatePoints, setFatePoints] = useState<number>(savedData.fatePoints ?? 0);
  
  // Unlocks: The massive object tracking everything the player has.
  // We merge saved data with initial defaults to handle schema updates/migrations safely.
  const [unlocks, setUnlocks] = useState<UnlockState>(() => {
    const defaults = getInitialUnlocks();
    let initialUnlocks = {
        ...defaults,
        ...savedData.unlocks,
        equipment: { ...defaults.equipment, ...savedData.unlocks?.equipment },
        skills: { ...defaults.skills, ...savedData.unlocks?.skills },
        levels: { ...defaults.levels, ...savedData.unlocks?.levels }
    };

    // MIGRATION: Old save data had 'content' array.
    // We split this into 'minigames' and 'bosses' arrays in newer versions.
    if (savedData.unlocks && (savedData.unlocks as any).content) {
       const legacyContent = (savedData.unlocks as any).content as string[];
       const newMinigames = new Set([...initialUnlocks.minigames]);
       const newBosses = new Set([...initialUnlocks.bosses]);

       legacyContent.forEach(item => {
           if (BOSSES_LIST.includes(item)) {
               newBosses.add(item);
           } else if (MINIGAMES_LIST.includes(item)) {
               newMinigames.add(item);
           }
       });
       initialUnlocks.minigames = Array.from(newMinigames);
       initialUnlocks.bosses = Array.from(newBosses);
    }

    return initialUnlocks;
  });
  
  // History: Logs for the scrolling text box.
  const [history, setHistory] = useState<LogEntry[]>(savedData.history ?? []);
  
  // Animation State: Controls the "VoidReveal" modal.
  const [pendingUnlock, setPendingUnlock] = useState<PendingUnlock | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Persistence Hook ---
  // Automatically saves to localStorage whenever state changes.
  useEffect(() => {
    try {
      const stateToSave = {
        keys,
        specialKeys,
        fatePoints,
        unlocks,
        history
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Failed to save state to localStorage", e);
    }
  }, [keys, specialKeys, fatePoints, unlocks, history]);

  // --- Import/Export Handlers ---

  // handleExport: Downloads the current state as a JSON file.
  const handleExport = () => {
    const stateToSave = { keys, specialKeys, fatePoints, unlocks, history };
    const blob = new Blob([JSON.stringify(stateToSave, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fate-locked-uim-save-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  // handleFileChange: Reads an uploaded JSON file and replaces current state.
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        
        // Basic validation
        if (json && typeof json === 'object') {
           if (window.confirm("This will overwrite your current progress. Are you sure?")) {
              setKeys(json.keys ?? 0);
              setSpecialKeys(json.specialKeys ?? 0);
              setFatePoints(json.fatePoints ?? 0);

              // Handle migration on import too
              const defaults = getInitialUnlocks();
              let newUnlocks = {
                  ...defaults,
                  ...json.unlocks,
                  equipment: { ...defaults.equipment, ...json.unlocks?.equipment },
                  skills: { ...defaults.skills, ...json.unlocks?.skills },
                  levels: { ...defaults.levels, ...json.unlocks?.levels }
              };

              if (json.unlocks && json.unlocks.content) {
                   const legacyContent = json.unlocks.content as string[];
                   const newMinigames = new Set([...newUnlocks.minigames]);
                   const newBosses = new Set([...newUnlocks.bosses]);

                   legacyContent.forEach(item => {
                       if (BOSSES_LIST.includes(item)) {
                           newBosses.add(item);
                       } else if (MINIGAMES_LIST.includes(item)) {
                           newMinigames.add(item);
                       }
                   });
                   newUnlocks.minigames = Array.from(newMinigames);
                   newUnlocks.bosses = Array.from(newBosses);
              }

              setUnlocks(newUnlocks);
              setHistory(json.history ?? []);
           }
        } else {
            alert("Invalid save file format.");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to parse save file.");
      }
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  // handleNewGame: Wipes everything and starts fresh.
  const handleNewGame = () => {
    if (window.confirm("Are you sure you want to start a new game?\n\nThis will ERASE current progress and reset to 3 Keys.\n(Export your save first if you want to keep it!)")) {
      // 1. Clear storage
      localStorage.removeItem(STORAGE_KEY);

      // 2. Reset all state to defaults directly
      // Note: We avoid window.location.reload() to provide a smoother experience and avoid potential race conditions with storage
      setKeys(3);
      setSpecialKeys(0);
      setFatePoints(0);
      setUnlocks(getInitialUnlocks());
      setHistory([]);

      // 3. Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Sound effects (placeholder for future implementation)
  const playSound = (type: 'success' | 'fail' | 'unlock' | 'rare') => {
    // In a real app, we'd play audio here.
  };

  // addLog: Helper to append to the history log.
  const addLog = useCallback((entry: Omit<LogEntry, 'id' | 'timestamp'>) => {
    setHistory(prev => [...prev, { ...entry, id: uuid(), timestamp: Date.now() }]);
  }, []);

  // --- Core Game Logic ---

  /**
   * processRoll: Determines if a user finds a key.
   * @param source - Text description of where the roll came from (e.g., "Slayer Task")
   * @param threshold - The % chance to succeed (0-100)
   * @param isLevelUp - Boolean flag if this is a level-up roll
   */
  const processRoll = useCallback((source: string, threshold: number, isLevelUp: boolean = false) => {
    const roll = rollDice(100);
    const success = roll <= threshold;

    if (success) {
      // 1% Chance for an Omni-Key (Rare Drop) on successful rolls
      const isRare = rollDice(100) === 100; // 1 in 100 chance

      if (isRare) {
        setSpecialKeys(prev => prev + 1);
        addLog({
          type: 'ROLL',
          source,
          result: 'SUCCESS',
          message: `LEGENDARY DROP! You found an Omni-Key!`,
          details: 'Can be used to unlock ANY specific item directly.',
          rollValue: roll,
          threshold
        });
        playSound('rare');
      } else {
        setKeys(prev => prev + 1);
        addLog({
          type: 'ROLL',
          source,
          result: 'SUCCESS',
          message: `Key Found! Rolled ${roll} (needed ≤ ${threshold})`,
          details: 'Fate points reset to 0.',
          rollValue: roll,
          threshold
        });
        playSound('success');
      }
      setFatePoints(0); // Reset pity on success
    } else {
      setFatePoints(prev => {
        const newFate = prev + 1;
        const isPity = newFate >= 50; // Hard cap at 50 points
        
        // Pity Trigger
        if (isPity) {
          setKeys(k => k + 1);
          // Log failure then pity message
          addLog({
             type: 'ROLL',
             source,
             result: 'FAIL',
             message: `No Key. Rolled ${roll} (needed ≤ ${threshold})`,
             details: 'MAX FATE REACHED! Pity Key granted.'
          });
          addLog({
             type: 'PITY',
             message: 'The Fates take pity on you.',
             details: '+1 Key Added'
          });
          playSound('success');
          return 0; // Reset fate after pity trigger
        }

        // Standard Failure
        addLog({
          type: 'ROLL',
          source,
          result: 'FAIL',
          message: `No Key. Rolled ${roll} (needed ≤ ${threshold})`,
          details: `Fate Points: ${newFate}/50`
        });
        playSound('fail');
        return newFate;
      });
    }
  }, [addLog]);

  const handleRoll = (source: string, chance: number) => processRoll(source, chance);

  /**
   * handleSkillLevelUp: Logic for leveling up a skill.
   * Validates if the level up is allowed (cap check) and triggers a roll.
   */
  const handleSkillLevelUp = (skill: string) => {
    setUnlocks(prev => {
      const tier = prev.skills[skill] || 0;
      const currentLevel = prev.levels[skill] || 1;
      const cap = tier === 0 ? 1 : (tier === 10 ? 99 : tier * 10);

      // Validation: Cannot level up past cap
      if (tier === 0 && skill !== 'Hitpoints') return prev;
      if (currentLevel >= cap) return prev;

      const newLevel = currentLevel + 1;

      // Trigger the roll for the NEW level
      // Adjusted formula: Level / 4 (Max ~25% at 99)
      const rollChance = Math.ceil(newLevel / 4);
      processRoll(`${skill} Level ${newLevel}`, rollChance, true);

      return {
        ...prev,
        levels: {
          ...prev.levels,
          [skill]: newLevel
        }
      };
    });
  };

  /**
   * handleSpecialUnlock: Logic for using an Omni-Key.
   * Directly unlocks a specific item, bypassing RNG.
   */
  const handleSpecialUnlock = async (type: string, name: string) => {
    if (specialKeys <= 0) return;

    // Trigger Animation instead of immediate unlock
    setPendingUnlock({
      table: type,
      item: name,
      costType: 'specialKey',
      displayType: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize
      itemImage: getUnlockImage(type, name)
    });

    // Try fetching better image for regions, bosses, minigames
    if (type === 'region' || type === 'boss' || type === 'bosses' || type === 'minigame' || type === 'minigames') {
         const imageUrl = await fetchWikiImage(name);
         if (imageUrl) {
             setPendingUnlock(prev => (prev && prev.item === name ? { ...prev, itemImage: imageUrl } : prev));
         }
    }
  };

  /**
   * performGachaPull: The core RNG logic for spending keys.
   * Picks a random item from the pool. If it's a duplicate, tries one more time (soft duplicate protection).
   */
  const performGachaPull = <T extends string>(
    pool: T[], 
    validator: (item: T) => boolean // Function to check if item is valid (not already maxed/unlocked)
  ): { success: boolean; item: T; msg: string } => {
    
    // Roll 1
    let item = pool[Math.floor(Math.random() * pool.length)];
    
    if (validator(item)) {
      return { success: true, item, msg: '' };
    }

    // Duplicate - Re-roll logic
    const firstItem = item;
    addLog({
       type: 'ROLL',
       result: 'FAIL',
       message: `Rolled ${firstItem} (Duplicate/Maxed). Re-rolling...`,
       details: 'Fate allows one re-roll.'
    });

    // Roll 2 (One retry)
    item = pool[Math.floor(Math.random() * pool.length)];
    if (validator(item)) {
      return { success: true, item, msg: '' };
    }

    // Failed twice
    return { success: false, item, msg: `Re-roll: ${item} (Duplicate).` };
  };

  /**
   * handleUnlock: Orchestrates spending a key on a specific table (Skills, Regions, etc.)
   */
  const handleUnlock = async (table: TableType) => {
    if (keys <= 0) return;

    // --- SKILLS LOGIC ---
    // Skills unlock tiers (0 -> 1 -> ... -> 10)
    if (table === TableType.SKILLS) {
        const currentSkills = unlocks.skills;
        const totalTiers = (Object.values(currentSkills) as number[]).reduce((a, b) => a + b, 0);
        
        if (totalTiers >= (SKILLS_LIST.length * 10)) return;

        // Perform RNG
        const result = performGachaPull(SKILLS_LIST, (skill) => {
            const tier = currentSkills[skill] || 0;
            return tier < 10;
        });

        if (!result.success) {
            setKeys(prev => prev - 1); // Fail still costs a key
            addLog({ type: 'ROLL', result: 'FAIL', message: result.msg, details: 'The key crumbles to dust.' });
            playSound('fail');
            return;
        }

        const skill = result.item;
        
        // Defer actual state update until Animation is done
        setPendingUnlock({
            table: 'skill',
            item: skill,
            costType: 'key',
            displayType: 'Skill',
            itemImage: getUnlockImage('skill', skill)
        });
        return;
    }

    // --- EQUIPMENT LOGIC ---
    // Equipment unlocks tiers (0 -> 1 -> ... -> 9)
    if (table === TableType.EQUIPMENT) {
       const currentEquip = unlocks.equipment;
       const totalEquipTiers = (Object.values(currentEquip) as number[]).reduce((a, b) => a + b, 0);
       
       if (totalEquipTiers >= (EQUIPMENT_SLOTS.length * EQUIPMENT_TIER_MAX)) return;

       const result = performGachaPull(EQUIPMENT_SLOTS, (slot) => {
           const tier = currentEquip[slot] || 0;
           return tier < EQUIPMENT_TIER_MAX;
       });

       if (!result.success) {
           setKeys(prev => prev - 1);
           addLog({ type: 'ROLL', result: 'FAIL', message: result.msg, details: 'The key crumbles to dust.' });
           playSound('fail');
           return;
       }

       const slot = result.item;

       setPendingUnlock({
           table: 'equipment',
           item: slot,
           costType: 'key',
           displayType: 'Equipment',
           itemImage: getUnlockImage('equipment', slot)
       });
       return;
    }

    // --- GENERIC LIST LOGIC (Regions, Bosses, etc.) ---
    // These are simple boolean unlocks (Have it or don't)
    let pool: string[] = [];
    let currentUnlocks: string[] = [];
    let stateKey: string = ''; // Just to identify mapping

    switch (table) {
        case TableType.REGIONS:
            pool = REGIONS_LIST;
            currentUnlocks = unlocks.regions;
            stateKey = 'region';
            break;
        case TableType.MOBILITY:
            pool = MOBILITY_LIST;
            currentUnlocks = unlocks.mobility;
            stateKey = 'mobility';
            break;
        case TableType.POWER:
            pool = POWER_LIST;
            currentUnlocks = unlocks.power;
            stateKey = 'power';
            break;
        case TableType.MINIGAMES:
            pool = MINIGAMES_LIST;
            currentUnlocks = unlocks.minigames;
            stateKey = 'minigame';
            break;
        case TableType.BOSSES:
            pool = BOSSES_LIST;
            currentUnlocks = unlocks.bosses;
            stateKey = 'boss';
            break;
        default:
            return;
    }

    if (currentUnlocks.length >= pool.length) return;

    // Only valid if NOT already unlocked
    const result = performGachaPull(pool, (item) => !currentUnlocks.includes(item));

    if (!result.success) {
       setKeys(prev => prev - 1);
       addLog({ type: 'ROLL', result: 'FAIL', message: result.msg, details: 'The key crumbles to dust. No unlock.' });
       playSound('fail');
       return;
    }

    const item = result.item;
    
    // Initial Reveal with default icon
    setPendingUnlock({
        table: stateKey,
        item: item,
        costType: 'key',
        displayType: table, // Use the Table enum string for display (e.g. "Regions")
        itemImage: getUnlockImage(stateKey, item)
    });

    // Attempt to fetch high-quality image from Wiki for Regions, Bosses, Minigames
    if (table === TableType.REGIONS || table === TableType.BOSSES || table === TableType.MINIGAMES) {
         const imageUrl = await fetchWikiImage(item);
         if (imageUrl) {
             // Only update if the user hasn't closed it yet (check item name match)
             setPendingUnlock(prev => (prev && prev.item === item ? { ...prev, itemImage: imageUrl } : prev));
         }
    }
  };

  /**
   * finalizeUnlock: The callback that runs AFTER the "VoidReveal" animation finishes.
   * This actually applies the state changes.
   */
  const finalizeUnlock = () => {
    if (!pendingUnlock) return;

    const { table, item, costType } = pendingUnlock;

    // Consume Cost
    if (costType === 'key') setKeys(prev => prev - 1);
    else setSpecialKeys(prev => prev - 1);

    // Apply State Update
    if (table === 'skill') {
         setUnlocks(prev => ({
            ...prev,
            skills: { ...prev.skills, [item]: (prev.skills[item] || 0) + 1 }
        }));
        const tier = (unlocks.skills[item] || 0) + 1;
        const levelCap = tier === 10 ? 99 : tier * 10;
        addLog({
            type: 'UNLOCK',
            message: `Upgraded: ${item}`,
            details: `Tier ${tier} Unlocked (Levels 1-${levelCap})`
        });
    } else if (table === 'equipment') {
         setUnlocks(prev => ({
            ...prev,
            equipment: { ...prev.equipment, [item]: (prev.equipment[item] || 0) + 1 }
        }));
        const tier = (unlocks.equipment[item] || 0) + 1;
        addLog({
           type: 'UNLOCK',
           message: `Upgraded: ${item}`,
           details: `Tier ${tier} Unlocked`
       });
    } else if (table === 'region') {
         setUnlocks(prev => ({ ...prev, regions: [...prev.regions, item] }));
         const parentRegion = Object.keys(REGION_GROUPS).find(key => REGION_GROUPS[key].includes(item));
         addLog({ type: 'UNLOCK', message: `Unlocked Area: ${item}`, details: parentRegion ? `(${parentRegion})` : 'New Territory' });
    } else if (table === 'mobility') {
         setUnlocks(prev => ({ ...prev, mobility: [...prev.mobility, item] }));
         addLog({ type: 'UNLOCK', message: `Unlocked Mobility: ${item}`, details: 'Travel Network Expanded' });
    } else if (table === 'power') {
         setUnlocks(prev => ({ ...prev, power: [...prev.power, item] }));
         addLog({ type: 'UNLOCK', message: `Unlocked Power: ${item}`, details: 'Ancient secrets revealed...' });
    } else if (table === 'minigame' || table === 'minigames') {
         setUnlocks(prev => ({ ...prev, minigames: [...prev.minigames, item] }));
         addLog({ type: 'UNLOCK', message: `Unlocked Minigame: ${item}`, details: 'New activity available' });
    } else if (table === 'boss' || table === 'bosses') {
         setUnlocks(prev => ({ ...prev, bosses: [...prev.bosses, item] }));
         addLog({ type: 'UNLOCK', message: `Unlocked Boss: ${item}`, details: 'A major threat appears...' });
    }

    playSound('unlock');
    setPendingUnlock(null);
  };

  // --- Render Helpers ---
  const totalSkillTiers = (Object.values(unlocks.skills) as number[]).reduce((a, b) => a + b, 0);
  const totalEquipTiers = (Object.values(unlocks.equipment) as number[]).reduce((a, b) => a + b, 0);
  const maxSkillTiers = SKILLS_LIST.length * 10;
  const maxEquipTiers = EQUIPMENT_SLOTS.length * EQUIPMENT_TIER_MAX;
  
  // Checks if there is anything left to unlock in each category
  const canUnlock = {
    equipment: totalEquipTiers < maxEquipTiers,
    skills: totalSkillTiers < maxSkillTiers,
    regions: unlocks.regions.length < REGIONS_LIST.length,
    mobility: unlocks.mobility.length < MOBILITY_LIST.length,
    power: unlocks.power.length < POWER_LIST.length,
    minigames: unlocks.minigames.length < MINIGAMES_LIST.length,
    bosses: unlocks.bosses.length < BOSSES_LIST.length,
  };

  return (
    <div className="min-h-screen bg-osrs-bg text-osrs-text pb-12 font-sans selection:bg-osrs-gold selection:text-black relative">

      {/* Animation Overlay (Conditional Render) */}
      {pendingUnlock && (
        <VoidReveal
            itemName={pendingUnlock.item}
            itemType={pendingUnlock.displayType}
            itemImage={pendingUnlock.itemImage}
            onComplete={finalizeUnlock}
        />
      )}

      {/* Header: Title, Save Controls, Currencies */}
      <header className="bg-osrs-panel border-b border-osrs-border sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg flex items-center justify-center border border-yellow-500 shadow-inner">
                <span className="text-2xl">🗝️</span>
             </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Fate-Locked UIM</h1>
              <p className="text-xs text-gray-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Auto-Save Enabled
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-end gap-4 w-full md:w-auto">
            {/* Import/Export/Reset Controls */}
            <div className="flex items-center gap-2 mr-2">
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".json" 
                onChange={handleFileChange} 
              />
              <button 
                onClick={handleImportClick}
                className="p-2 text-gray-400 hover:text-white bg-black/30 hover:bg-white/10 rounded border border-transparent hover:border-white/20 transition-all"
                title="Import Save"
              >
                <Upload size={16} />
              </button>
              <button 
                onClick={handleExport}
                className="p-2 text-gray-400 hover:text-white bg-black/30 hover:bg-white/10 rounded border border-transparent hover:border-white/20 transition-all"
                title="Export Save"
              >
                <Download size={16} />
              </button>
              <button 
                onClick={handleNewGame}
                className="p-2 text-red-400 hover:text-red-200 bg-red-900/10 hover:bg-red-900/30 rounded border border-transparent hover:border-red-500/30 transition-all"
                title="New Game / Reset"
              >
                <RotateCcw size={16} />
              </button>
            </div>

            {/* Keys Display */}
            <div className="flex gap-4">
              {/* Normal Keys */}
              <div className="flex items-center gap-3 bg-black/30 px-4 py-2 rounded-lg border border-osrs-border">
                <Key className="text-osrs-gold w-6 h-6" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase font-bold">Keys</span>
                  <span className="text-2xl font-bold text-white leading-none">{keys}</span>
                </div>
              </div>

              {/* Omni Keys */}
              <div className={`flex items-center gap-3 px-4 py-2 rounded-lg border transition-all ${specialKeys > 0 ? 'bg-purple-900/30 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'bg-black/30 border-osrs-border opacity-50'}`}>
                <Sparkles className={`w-6 h-6 ${specialKeys > 0 ? 'text-purple-400 animate-pulse' : 'text-gray-600'}`} />
                <div className="flex flex-col">
                  <span className={`text-xs uppercase font-bold ${specialKeys > 0 ? 'text-purple-300' : 'text-gray-500'}`}>Omni-Keys</span>
                  <span className={`text-2xl font-bold leading-none ${specialKeys > 0 ? 'text-purple-100' : 'text-gray-500'}`}>{specialKeys}</span>
                </div>
              </div>
            </div>

            {/* Fate Meter */}
            <div className="flex-1 min-w-[140px] md:w-64">
              <div className="flex justify-between text-xs mb-1 font-bold">
                <span className={fatePoints >= 40 ? "text-red-400 animate-pulse" : "text-gray-400"}>Fate Meter</span>
                <span className="text-gray-500">{fatePoints}/50</span>
              </div>
              <div className="h-4 bg-black/50 rounded-full overflow-hidden border border-gray-700 relative">
                 <div 
                    className={`h-full transition-all duration-300 ${fatePoints >= 40 ? 'bg-red-600' : 'bg-osrs-pity'}`}
                    style={{ width: `${(fatePoints / 50) * 100}%` }}
                 />
                 <div className="absolute top-0 left-1/2 w-px h-full bg-black/20"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {/* Guide Section */}
        <FateMechanics />

        {/* Top Section: Action & Spend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left: Actions (Farm Keys) */}
          <div className="space-y-6">
            <ActionSection onRoll={handleRoll} />
          </div>

          {/* Right: Spend (Gacha) & Log */}
          <div className="space-y-6">
             <GachaSection keys={keys} onUnlock={handleUnlock} canUnlock={canUnlock} />
             <LogViewer history={history} />
          </div>
        </div>

        {/* Bottom Section: Visual Dashboard (Progress & Interactive Unlocks) */}
        <Dashboard 
          unlocks={unlocks} 
          onSkillLevelUp={handleSkillLevelUp} 
          specialKeys={specialKeys} 
          onSpecialUnlock={handleSpecialUnlock}
        />

      </main>
    </div>
  );
}

export default App;
