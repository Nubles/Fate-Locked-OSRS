/**
 * types.ts
 *
 * This file contains all the TypeScript type definitions, interfaces, and enums used across the application.
 * It defines the shape of the data, the state of the game, and the categories for content.
 *
 * HOW TO CHANGE:
 * - If you add a new category of content (e.g., "Pets"), add it to the `TableType` enum and `UnlockState` interface.
 * - If you add a new way to earn keys (e.g., "Raids"), add it to the `DropSource` enum.
 * - If you need to store more information in the game state, update the `GameState` interface.
 */

// DropSource: Defines the different activities that can trigger a key roll.
// These string values are used for logging and tracking where rolls came from.
export enum DropSource {
  QUEST_NOVICE = 'Quest (Novice)',
  QUEST_INTERMEDIATE = 'Quest (Intermediate)',
  QUEST_EXPERIENCED = 'Quest (Experienced)',
  QUEST_MASTER = 'Quest (Master)',
  QUEST_GRANDMASTER = 'Quest (Grandmaster)',
  CA_EASY = 'Combat Achievement (Easy)',
  CA_MEDIUM = 'Combat Achievement (Medium)',
  CA_HARD = 'Combat Achievement (Hard)',
  CA_ELITE = 'Combat Achievement (Elite)',
  CA_MASTER = 'Combat Achievement (Master)',
  CA_GRANDMASTER = 'Combat Achievement (Grandmaster)',
  LEVEL_UP = 'Level Up',
  COLLECTION_LOG = 'Collection Log',
  DIARY_EASY = 'Diary (Easy)',
  DIARY_MEDIUM = 'Diary (Medium)',
  DIARY_HARD = 'Diary (Hard)',
  DIARY_ELITE = 'Diary (Elite)',
  SLAYER_TASK = 'Slayer Task',
  CLUE_BEGINNER = 'Clue Scroll (Beginner)',
  CLUE_EASY = 'Clue Scroll (Easy)',
  CLUE_MEDIUM = 'Clue Scroll (Medium)',
  CLUE_HARD = 'Clue Scroll (Hard)',
  CLUE_ELITE = 'Clue Scroll (Elite)',
  CLUE_MASTER = 'Clue Scroll (Master)',
}

// TableType: Defines the main categories of unlockable content.
// These correspond to the "Gacha" tables in the UI.
export enum TableType {
  EQUIPMENT = 'Equipment', // Gear slots
  SKILLS = 'Skills',       // Skills (Attack, Defence, etc.)
  REGIONS = 'Regions',     // Map areas
  MOBILITY = 'Mobility',   // Teleports and travel methods
  POWER = 'Power',         // Spellbooks and Prayers
  MINIGAMES = 'Minigames', // Activities
  BOSSES = 'Bosses',       // Boss encounters
}

// LogEntry: Represents a single event in the history log (rolls, unlocks, etc.).
export interface LogEntry {
  id: string;             // Unique ID for the log entry
  timestamp: number;      // When the event happened
  type: 'ROLL' | 'UNLOCK' | 'PITY'; // The type of event
  source?: string;        // Where the event originated (e.g., "Quest (Novice)")
  result?: 'SUCCESS' | 'FAIL'; // Outcome of a roll
  rollValue?: number;     // The actual number rolled (1-100)
  threshold?: number;     // The target number needed for success
  message: string;        // Main log message
  details?: string;       // Extra details
}

// UnlockState: The core data structure tracking what the player has unlocked.
export interface UnlockState {
  equipment: Record<string, number>; // Maps Equipment Slot Name -> Tier Level (0-9)
  skills: Record<string, number>;    // Maps Skill Name -> Tier Level (1-10)
  levels: Record<string, number>;    // Maps Skill Name -> Current In-Game Level (1-99)
  regions: string[];                 // List of unlocked region names
  mobility: string[];                // List of unlocked mobility methods
  power: string[];                   // List of unlocked powers
  minigames: string[];               // List of unlocked minigames
  bosses: string[];                  // List of unlocked bosses
}

// GameState: The entire persisted state of the application.
// This is what gets saved to localStorage and exported to JSON.
export interface GameState {
  keys: number;           // Current number of standard keys
  fatePoints: number;     // Current "bad luck protection" points (0-50)
  unlocks: UnlockState;   // All player progress
  history: LogEntry[];    // Log of past events
}
