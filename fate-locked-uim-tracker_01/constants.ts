
import { DropSource } from './types';

// Reordered to match the 3-column OSRS stats panel layout
// Col 1 (Combat), Col 2 (Support), Col 3 (Gathering/Artisan) roughly
export const SKILLS_LIST = [
  'Attack', 'Hitpoints', 'Mining', 
  'Strength', 'Agility', 'Smithing', 
  'Defence', 'Herblore', 'Fishing', 
  'Ranged', 'Thieving', 'Cooking', 
  'Prayer', 'Crafting', 'Firemaking', 
  'Magic', 'Fletching', 'Woodcutting', 
  'Runecraft', 'Slayer', 'Farming', 
  'Construction', 'Hunter', 'Sailing'
];

export const EQUIPMENT_SLOTS = [
  'Head', 'Cape', 'Neck', 'Ammo', 'Weapon', 'Body', 'Shield', 'Legs', 'Gloves', 'Boots', 'Ring'
];

export const EQUIPMENT_TIER_MAX = 9;

export const MOBILITY_LIST = [
  'Spirit Trees', 
  'Fairy Rings', 
  'Gnome Gliders', 
  'Charter Ships', 
  'Teleport Tablets', 
  'Jewelry Teleports'
];

export const POWER_LIST = [
  'Ancient Magicks', 
  'Lunar Spellbook', 
  'Arceuus Spellbook', 
  'Protection Prayers', 
  'High Alchemy'
];

export const CONTENT_LIST = [
  // Boss/Minigames (Legacy)
  'Wintertodt', 
  'Tempoross', 
  'Shooting Stars',
  
  // Combat Minigames
  'Barbarian Assault', 
  'Bounty Hunter', 
  'Castle Wars', 
  'Clan Wars', 
  'Emir\'s Arena', 
  'Fortis Colosseum', 
  'Inferno', 
  'Intelligence Gathering', 
  'Last Man Standing', 
  'Mage Arena', 
  'Nightmare Zone', 
  'Pest Control', 
  'Soul Wars', 
  'Temple Trekking', 
  'TzHaar Fight Cave', 
  'TzHaar Fight Pit', 
  'TzHaar-Ket-Rak\'s Challenges',

  // Skilling Minigames
  'Archery Competition', 
  'Blast Furnace', 
  'Brimhaven Agility Arena', 
  'Fishing Trawler', 
  'Giants\' Foundry', 
  'Gnome Ball', 
  'Gnome Restaurant', 
  'Guardians of the Rift', 
  'Hallowed Sepulchre', 
  'Impetuous Impulses', 
  'Mage Training Arena', 
  'Mahogany Homes', 
  'Mastering Mixology', 
  'Mess', 
  'Pyramid Plunder', 
  'Rogues\' Den', 
  'Sorceress\'s Garden', 
  'Stealing Artefacts', 
  'Tithe Farm', 
  'Trouble Brewing', 
  'Vale Totems', 
  'Volcanic Mine', 

  // Hybrid
  'Shades of Mort\'ton', 
  'Tai Bwo Wannai Cleanup', 
  'The Gauntlet', 
  'Warriors\' Guild',

  // Misc
  'Burthorpe Games Room', 
  'Forestry', 
  'Rat Pits', 
  'Tears of Guthix'
];

export const MISTHALIN_AREAS = [
  'Varrock', 'Lumbridge', 'Draynor Village', 'Wizards\' Tower', 'Edgeville', 
  'Barbarian Village', 'Digsite', 'Silvarea', 'Paterdomus'
];

export const REGION_GROUPS: Record<string, string[]> = {
  'Asgarnia': [
    'Falador', 'Port Sarim', 'Rimmington', 'Taverley', 'Burthorpe', 'Warriors\' Guild', 
    'Heroes\' Guild', 'Crafting Guild', 'Dwarven Mine', 'Ice Mountain', 'Asgarnian Ice Dungeon', 
    'Motherlode Mine', 'Goblin Village', 'Mudskipper Point', 'Void Knights\' Outpost', 'Entrana'
  ],
  'Kandarin': [
    'East Ardougne', 'West Ardougne', 'Catherby', 'Seers\' Village', 'Camelot', 'Yanille', 
    'Port Khazard', 'Hemenster', 'Fishing Guild', 'Ranging Guild', 'Legends\' Guild', 
    'Tree Gnome Stronghold', 'Gnome Village', 'Witchaven', 'Piscatoris Fishing Colony', 
    'Feldip Hills', 'Baxtorian Falls', 'Otto\'s Grotto', 'Barbarian Outpost', 'Fight Arena'
  ],
  'Karamja': [
    'Musa Point', 'Brimhaven', 'Tai Bwo Wannai', 'Shilo Village', 'Kharazi Jungle', 
    'Mor Ul Rek (TzHaar City)', 'Crandor'
  ],
  'Kharidian Desert': [
    'Al Kharid', 'Duel Arena / PvP Arena', 'Shantay Pass', 'Pollnivneach', 'Nardah', 
    'Sophanem', 'Menaphos', 'Bandit Camp', 'Bedabin Camp', 'Ruins of Uzer', 
    'Mage Training Arena', 'Agility Pyramid', 'Giants\' Plateau', 'Kalphite Lair'
  ],
  'Morytania': [
    'Canifis', 'Port Phasmatys', 'Mort\'ton', 'Barrows', 'Burgh de Rott', 'Meiyerditch', 
    'Darkmeyer', 'Slepe', 'Ver Sinhaza', 'Fenkenstrain\'s Castle', 'Slayer Tower', 
    'Mort Myre Swamp', 'Haunted Mine', 'Haunted Woods', 'Harmony Island', 
    'Mos Le\'Harmless', 'Braindeath Island', 'Dragontooth Island'
  ],
  'Fremennik': [
    'Rellekka', 'Neitiznot', 'Jatizso', 'Miscellania & Etceteria', 'Waterbirth Island', 
    'Lunar Isle', 'Mountain Camp', 'Lighthouse', 'Keldagrim'
  ],
  'Tirannwn': [
    'Prifddinas', 'Lletya', 'Tyras Camp', 'Elf Camp', 'Isafdar', 'Zul-Andra', 
    'Arandar', 'Gwenith', 'Iorwerth Camp'
  ],
  'Wilderness': [
    'Ferox Enclave', 'Wilderness Volcano', 'Chaos Temple', 'Rogues\' Castle', 'Lava Maze', 
    'Bandit Camp', 'Dark Warriors\' Fortress', 'Graveyard of Shadows', 'Forgotten Cemetery', 
    'Resource Area', 'Mage Arena', 'Scorpia\'s Cave', 'Fountain of Rune', 'Wilderness God Wars Dungeon'
  ],
  'Kourend & Kebos': [
    'Kourend Castle', 'Hosidius', 'Piscarilius', 'Shayzien', 'Lovakengj', 'Arceuus', 
    'Kebos Lowlands', 'Molch', 'Farming Guild', 'Woodcutting Guild', 'Mount Quidamortem', 
    'Mount Karuulm', 'Catacombs of Kourend', 'Land\'s End', 'Wintertodt Camp'
  ],
  'Varlamore': [
    'Civitas illa Fortis', 'Avium Savannah', 'Cam Torum', 'Ralos\' Rise', 'Darkfrost', 
    'Hunter\'s Guild', 'Aldarin', 'The Stranglewood'
  ],
  'Islands & Others': [
    'Fossil Island', 'Ape Atoll', 'Zanaris', 'Tutorial Island'
  ],
  'The Open Seas': [
    'Pandemonium', 'The Great Conch', 'The Little Pearl', 'Drumstick Isle', 'Ledger Island', 
    'Brittle Island', 'Vatricos Island', 'Laguna Auror', 'Chin Champa Island', 'Doggos Island', 
    'Splinter Island', 'Chard Island', 'Grimstone', 'Isle of Bones', 'Minotaur\'s Rest', 
    'The Pincers', 'Barracuda Trials', 'Crabclaw Isle', 'Isle of Souls (Expanded)'
  ]
};

// Flattened list for the RNG pool
export const REGIONS_LIST = Object.values(REGION_GROUPS).flat();

export const DROP_RATES: Record<string, number> = {
  [DropSource.QUEST_NOVICE]: 20,
  [DropSource.QUEST_INTERMEDIATE]: 40,
  [DropSource.QUEST_EXPERIENCED]: 60,
  [DropSource.QUEST_MASTER]: 80,
  [DropSource.QUEST_GRANDMASTER]: 100,
  [DropSource.CA_EASY]: 5,
  [DropSource.CA_MEDIUM]: 10,
  [DropSource.CA_HARD]: 20,
  [DropSource.CA_ELITE]: 50,
  [DropSource.CA_MASTER]: 50,
  [DropSource.CA_GRANDMASTER]: 50,
  [DropSource.COLLECTION_LOG]: 5,
  [DropSource.DIARY_EASY]: 25,
  [DropSource.DIARY_MEDIUM]: 50,
  [DropSource.DIARY_HARD]: 75,
  [DropSource.DIARY_ELITE]: 100,
  [DropSource.SLAYER_TASK]: 10,
  // Clue Scroll Rates (Balanced Linear Progression: 15, 30, 45, 60, 75, 90)
  [DropSource.CLUE_BEGINNER]: 15,
  [DropSource.CLUE_EASY]: 30,
  [DropSource.CLUE_MEDIUM]: 45,
  [DropSource.CLUE_HARD]: 60,
  [DropSource.CLUE_ELITE]: 75,
  [DropSource.CLUE_MASTER]: 90,
};
