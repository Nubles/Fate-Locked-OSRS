/**
 * constants.ts
 *
 * This file contains all the static lists, configurations, and magic numbers used in the game.
 * It serves as the "database" for the application content.
 *
 * HOW TO CHANGE:
 * - To add a new skill, add it to `SKILLS_LIST`.
 * - To add a new boss, add it to `BOSSES_LIST`.
 * - To change the drop rate of keys from tasks, edit `DROP_RATES`.
 * - To change the images used for items, update `SPECIAL_ICONS` or `REGION_ICONS`.
 */

import { DropSource } from '../types';

// SKILLS_LIST: The complete list of OSRS skills.
// Used for the Skills unlock table.
// Reordered to match the 3-column OSRS stats panel layout (roughly).
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

// EQUIPMENT_SLOTS: The equipment slots available to upgrade.
// Used for the Equipment unlock table.
export const EQUIPMENT_SLOTS = [
  'Head', 'Cape', 'Neck', 'Ammo', 'Weapon', 'Body', 'Shield', 'Legs', 'Gloves', 'Boots', 'Ring'
];

// EQUIPMENT_TIER_MAX: The maximum tier level for equipment slots (0 to 9).
export const EQUIPMENT_TIER_MAX = 9;

// MOBILITY_LIST: Special travel methods unlockable in the Mobility table.
export const MOBILITY_LIST = [
  'Spirit Trees', 'Fairy Rings', 'Gnome Gliders', 'Charter Ships', 'Teleport Tablets',
  'Jewelry Teleports', 'Canoes', 'Balloon Transport', 'Mine Carts', 'Magic Carpets',
  'Wilderness Obelisks', 'Minigame Teleports', 'Quetzal Network',
  'Mycelium Transport', 'Eagle Transport', 'Slayer Ring', 'Xeric\'s Talisman',
  'Drakan\'s Medallion', 'Pharaoh\'s Sceptre', 'Crystal Teleport Seed', 'Royal Seed Pod'
];

// POWER_LIST: Special powers (spellbooks, prayers) unlockable in the Power table.
export const POWER_LIST = [
  'Ancient Magicks',
  'Lunar Spellbook',
  'Arceuus Spellbook',
  'Protection Prayers',
  'High Alchemy'
];

export const ARCANA_LIST = [
  'Ancient Magicks', 'Lunar Spellbook', 'Arceuus Spellbook',
  'Piety', 'Rigour', 'Augury', 'Preserve', 'Bones to Peaches',
  'Dwarf Cannon', 'Chivalry'
];

export const POH_LIST = [
  'Costume Room', 'Chapel Altar', 'Portal Chamber', 'Portal Nexus', 'Restoration Pools',
  'Jewellery Box', 'Lectern', 'Workshop Tools', 'Kitchen', 'Menagerie', 'Mounted Glory',
  'Combat Dummy', 'Fairy Ring (POH)', 'Spirit Tree (POH)', 'Wilderness Obelisk',
  'Mounted Mythical Cape', 'Mounted Xeric\'s Talisman', 'Mounted Digsite Pendant',
  'Spellbook Altars', 'Armour Case', 'Magic Wardrobe', 'Cape Rack', 'Treasure Chest (Clues)',
  'Toy Box', 'Armour Repair Stand', 'Telescope', 'Dungeon', 'Aquarium',
  'Bedroom (Servant)', 'Servant\'s Moneybag', 'Achievement Cape Hanger',
  'Dining Table', 'Boss Lair', 'Throne Room', 'Garden Theme'
];

export const MERCHANTS_LIST = [
  'General Stores', 'Magic Shops', 'Archery Shops', 'Sword Shops', 'Food Shops',
  'Fishing Shops', 'Clothes Shops', 'Farming Shops', 'Crafting Shops', 'Mining Shops',
  'Gem Shops', 'Herblore Shops', 'Dye Shops', 'Axe Shops', 'Platebody Shops',
  'Bars & Inns', 'Cooking Shops', 'Shield Shops', 'Scimitar Shops', 'Helmet Shops',
  'Platelegs Shops', 'Plateskirt Shops', 'Chainbody Shops', 'Mace Shops',
  'Staff Shops', 'Crossbow Shops', 'Hunter Shops', 'Candle Shops', 'Fur Traders',
  'Jewellery Shops', 'Kebab Sellers', 'Silk Shops', 'Silver Shops', 'Spice Shops',
  'Vegetable Shops', 'Wine Traders', 'Amulet Shops',
  'Slayer Equipment', 'Stonemasons', 'Sawmill Operators', 'Ore Merchants',
  'Real Estate Agents', 'Tanners', 'Taxidermists', 'Decanters', 'Lost Property',
  'Warhammer Shops', 'Claw Shops', 'Halberd Shops', 'Pet Shops'
];

export const STORAGE_LIST = [
  'Looting Bag', 'Rune Pouch', 'Seed Box', 'Herb Sack', 'Gem Bag', 'Coal Bag', 'Fish Barrel',
  'Tackle Box', 'Bolt Pouch', 'Plank Sack', 'Huntsman\'s Kit', 'Log Basket', 'Beginner STASH',
  'Easy STASH', 'Medium STASH', 'Hard STASH', 'Elite STASH', 'Master STASH', 'Tool Leprechauns',
  'Meat Pouch', 'Essence Pouches', 'Master Scroll Book', 'Steel Key Ring', 'Bottomless Bucket',
  'Spice Pouch', 'Flamtaer Bag', 'Seed Vault', 'Fossil Storage'
];

export const GUILDS_LIST = [
  'Champions\' Guild', 'Cooks\' Guild', 'Crafting Guild', 'Mining Guild', 'Prayer Guild',
  'Farming Guild', 'Fishing Guild', 'Heroes\' Guild', 'Hunters\' Guild', 'Legends\' Guild',
  'Myths\' Guild', 'Ranging Guild', 'Rogues\' Den', 'Servants\' Guild', 'Warriors\' Guild',
  'Wizards\' Guild', 'Woodcutting Guild'
];

export const FARMING_PATCH_LIST = [
  'Allotment', 'Herb', 'Flower', 'Hops', 'Bush', 'Wood Tree',
  'Fruit Tree', 'Hardwood Tree', 'Cactus', 'Mushroom', 'Belladonna',
  'Seaweed', 'Calquat', 'Spirit Tree', 'Celastrus', 'Redwood',
  'Crystal Tree', 'Hespori Patch'
];

export const FARMING_UNLOCK_DETAILS: Record<string, string> = {
  'Allotment': "Potatoes, Watermelons, Snape Grass",
  'Herb': "Guam, Ranarr, Snapdragon, Torstol",
  'Flower': "Marigold, Limpwurt, White Lily",
  'Hops': "Barley, Jute, Yanillian",
  'Bush': "Redberry, Whiteberry, Poison Ivy",
  'Wood Tree': "Oak, Yew, Magic",
  'Fruit Tree': "Apple, Palm, Dragonfruit",
  'Hardwood Tree': "Teak, Mahogany",
  'Cactus': "Cactus Spine, Potato Cactus",
  'Mushroom': "Bittercap",
  'Belladonna': "Nightshade",
  'Seaweed': "Giant Seaweed",
  'Calquat': "Calquat Fruit",
  'Spirit Tree': "Teleport Network",
  'Celastrus': "Celastrus Bark",
  'Redwood': "Redwood Logs",
  'Crystal Tree': "Crystal Shards",
  'Hespori Patch': "Bottomless Bucket, Anima Seeds"
};

export const BOSSES_LIST = [
  'Chambers of Xeric', 'Theatre of Blood', 'Tombs of Amascut', 'The Gauntlet', 'The Nightmare',
  'Phosani\'s Nightmare', 'Nex', 'Corporeal Beast', 'General Graardor', 'Commander Zilyana',
  'Kree\'arra', 'K\'ril Tsutsaroth', 'Abyssal Sire', 'Alchemical Hydra', 'Cerberus',
  'Grotesque Guardians', 'Kraken', 'Skotizo', 'Thermonuclear Smoke Devil', 'Araxxor',
  'Artio', 'Callisto', 'Calvar\'ion', 'Chaos Elemental', 'Chaos Fanatic', 'Crazy Archaeologist',
  'Scorpia', 'Spindel', 'Venenatis', 'Vet\'ion', 'Vorkath', 'Galvek', 'The Hueycoatl',
  'Moons of Peril', 'Fortis Colosseum', 'Duke Sucellus', 'The Leviathan', 'The Whisperer',
  'Vardorvis', 'Barrows Brothers', 'Bryophyta', 'Dagannoth Kings', 'Deranged Archaeologist',
  'Giant Mole', 'Hespori', 'Kalphite Queen', 'King Black Dragon', 'Mimic', 'Obor',
  'Phantom Muspah', 'Sarachnis', 'Scurrius', 'Zulrah', 'Wintertodt', 'Tempoross',
  'Zalcano', 'TzHaar Fight Cave', 'Inferno', 'TzHaar-Ket-Rak\'s Challenges', 'Tormented Demons'
];

export const MINIGAMES_LIST = [
  'Shooting Stars', 'Barbarian Assault', 'Bounty Hunter', 'Castle Wars', 'Clan Wars',
  'Emir\'s Arena', 'Intelligence Gathering', 'Last Man Standing', 'Mage Arena',
  'Nightmare Zone', 'Pest Control', 'Soul Wars', 'Temple Trekking', 'TzHaar Fight Pit',
  'Archery Competition', 'Blast Furnace', 'Fishing Trawler', 'Giants\' Foundry', 'Gnome Ball',
  'Gnome Restaurant', 'Guardians of the Rift', 'Impetuous Impulses', 'Mage Training Arena',
  'Mahogany Homes', 'Mastering Mixology', 'Mess', 'Pyramid Plunder', 'Rogues\' Den',
  'Sorceress\'s Garden', 'Stealing Artefacts', 'Tithe Farm', 'Trouble Brewing',
  'Vale Totems', 'Volcanic Mine', 'Shades of Mort\'ton', 'Tai Bwo Wannai Cleanup',
  'Warriors\' Guild', 'Burthorpe Games Room', 'Forestry', 'Rat Pits', 'Tears of Guthix'
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

// Flattened list for the RNG pool (this is what the Gacha picks from)
export const REGIONS_LIST = Object.values(REGION_GROUPS).flat();

// DROP_RATES: The percentage chance (0-100) to find a Key from each activity.
// Adjust these numbers to balance the game difficulty.
export const DROP_RATES: Record<string, number> = {
  [DropSource.QUEST_NOVICE]: 20,
  [DropSource.QUEST_INTERMEDIATE]: 40,
  [DropSource.QUEST_EXPERIENCED]: 60,
  [DropSource.QUEST_MASTER]: 80,
  [DropSource.QUEST_GRANDMASTER]: 100,
  [DropSource.CA_EASY]: 5,
  [DropSource.CA_MEDIUM]: 10,
  [DropSource.CA_HARD]: 20,
  [DropSource.CA_ELITE]: 40,
  [DropSource.CA_MASTER]: 60,
  [DropSource.CA_GRANDMASTER]: 80,
  [DropSource.COLLECTION_LOG]: 5,
  [DropSource.DIARY_EASY]: 25,
  [DropSource.DIARY_MEDIUM]: 50,
  [DropSource.DIARY_HARD]: 75,
  [DropSource.DIARY_ELITE]: 100,
  [DropSource.SLAYER_TASK]: 10,
  [DropSource.CLUE_BEGINNER]: 15,
  [DropSource.CLUE_EASY]: 30,
  [DropSource.CLUE_MEDIUM]: 45,
  [DropSource.CLUE_HARD]: 60,
  [DropSource.CLUE_ELITE]: 75,
  [DropSource.CLUE_MASTER]: 90,
};

// --- ICON & WIKI MAPPINGS ---
// These control the visual assets used for each item.

// REGION_ICONS: Maps Region Group Names to Wiki filenames.
export const REGION_ICONS: Record<string, string> = {
  'Misthalin': 'Varrock_teleport.png',        // Varrock Teleport
  'Asgarnia': 'Falador_teleport.png',         // Falador Teleport
  'Kandarin': 'Camelot_teleport.png',         // Camelot Teleport
  'Karamja': 'Karamja_gloves_1.png',          // Karamja Gloves
  'Kharidian Desert': 'Desert_amulet_1.png',  // Desert Amulet
  'Morytania': 'Ectophial.png',               // Ectophial
  'Fremennik': 'Fremennik_sea_boots_1.png',   // Sea Boots
  'Tirannwn': 'Crystal_teleport_seed.png',    // Crystal Teleport Seed
  'Wilderness': 'Wilderness_sword_1.png',     // Wilderness Sword
  'Kourend & Kebos': 'Xeric\'s_talisman.png', // Xeric's Talisman
  'Varlamore': 'Civitas_illa_Fortis_teleport.png',
  'Islands & Others': 'Fossil_Island_Teleport.png',
  'The Open Seas': 'Sailing_icon.png'
};

// SLOT_CONFIG: Maps Equipment Slots to their background images and Grid Positions.
export const SLOT_CONFIG: Record<string, { file: string, gridArea: string }> = {
  'Head':   { file: 'Head_slot.png', gridArea: 'col-start-2 row-start-1' },
  'Cape':   { file: 'Cape_slot.png', gridArea: 'col-start-1 row-start-2' },
  'Neck':   { file: 'Neck_slot.png', gridArea: 'col-start-2 row-start-2' },
  'Ammo':   { file: 'Ammo_slot.png', gridArea: 'col-start-3 row-start-2' },
  'Weapon': { file: 'Weapon_slot.png', gridArea: 'col-start-1 row-start-3' },
  'Body':   { file: 'Body_slot.png', gridArea: 'col-start-2 row-start-3' },
  'Shield': { file: 'Shield_slot.png', gridArea: 'col-start-3 row-start-3' },
  'Legs':   { file: 'Legs_slot.png', gridArea: 'col-start-2 row-start-4' },
  'Gloves': { file: 'Hands_slot.png', gridArea: 'col-start-1 row-start-5' },
  'Boots':  { file: 'Feet_slot.png', gridArea: 'col-start-2 row-start-5' },
  'Ring':   { file: 'Ring_slot.png', gridArea: 'col-start-3 row-start-5' },
};

// SPECIAL_ICONS: Maps specific item names (Bosses, Minigames, etc.) to Wiki filenames.
// Add entries here if an item doesn't have an automatic icon or needs a specific one.
export const SPECIAL_ICONS: Record<string, string> = {
  // Mobility
  'Spirit Trees': 'Spirit_tree_map_icon.png',
  'Fairy Rings': 'Fairy_ring_map_icon.png',
  'Gnome Gliders': 'Gnome_glider_map_icon.png',
  'Charter Ships': 'Charter_Crew_member_icon.png',
  'Teleport Tablets': 'Teleport_to_house.png',
  'Jewelry Teleports': 'Games_necklace(8).png',
  // Power
  'Ancient Magicks': 'Ancient_Magicks_icon.png',
  'Lunar Spellbook': 'Lunar_spells_icon.png',
  'Arceuus Spellbook': 'Arceuus_spells_icon.png',
  'Protection Prayers': 'Protect_from_Melee_icon.png',
  'High Alchemy': 'High_Level_Alchemy_icon.png',

  // BOSSES (Images from OSRS Wiki)
  'Abyssal Sire': 'Abyssal_Sire.png',
  'Alchemical Hydra': 'Alchemical_Hydra.png',
  'Araxxor': 'Araxxor.png',
  'Artio': 'Artio.png',
  'Barrows Brothers': 'Barrows_icon.png',
  'Bryophyta': 'Bryophyta.png',
  'Callisto': 'Callisto.png',
  'Calvar\'ion': 'Calvar\'ion.png',
  'Cerberus': 'Cerberus.png',
  'Chambers of Xeric': 'Great_Olm.png',
  'Chaos Elemental': 'Chaos_Elemental.png',
  'Chaos Fanatic': 'Chaos_Fanatic.png',
  'Commander Zilyana': 'Commander_Zilyana.png',
  'Corporeal Beast': 'Corporeal_Beast.png',
  'Crazy Archaeologist': 'Crazy_archaeologist.png',
  'Dagannoth Kings': 'Dagannoth_Supreme.png',
  'Deranged Archaeologist': 'Deranged_archaeologist.png',
  'Duke Sucellus': 'Duke_Sucellus.png',
  'Fortis Colosseum': 'Dizana\'s_quiver.png', // Or Sol_Heredit.png
  'Galvek': 'Galvek.png',
  'General Graardor': 'General_Graardor.png',
  'Giant Mole': 'Giant_Mole.png',
  'Grotesque Guardians': 'Dusk.png',
  'Hespori': 'Hespori.png',
  'The Hueycoatl': 'The_Hueycoatl.png',
  'Inferno': 'Infernal_cape.png',
  'Kalphite Queen': 'Kalphite_Queen.png',
  'King Black Dragon': 'King_Black_Dragon.png',
  'Kraken': 'Kraken.png',
  'Kree\'arra': 'Kree\'arra.png',
  'K\'ril Tsutsaroth': 'K\'ril_Tsutsaroth.png',
  'Mimic': 'The_Mimic.png',
  'Moons of Peril': 'Lunar_Chest.png',
  'Nex': 'Nex.png',
  'Obor': 'Obor.png',
  'Phantom Muspah': 'Phantom_Muspah_(ranged).png',
  'Phosani\'s Nightmare': 'Phosani\'s_Nightmare.png',
  'Sarachnis': 'Sarachnis.png',
  'Scorpia': 'Scorpia.png',
  'Scurrius': 'Scurrius.png',
  'Skotizo': 'Skotizo.png',
  'Spindel': 'Spindel.png',
  'Tempoross': 'Tempoross_icon.png',
  'The Gauntlet': 'Crystal_helm.png',
  'The Leviathan': 'The_Leviathan.png',
  'The Nightmare': 'The_Nightmare.png',
  'The Whisperer': 'The_Whisperer.png',
  'Theatre of Blood': 'Verzik_Vitur.png',
  'Thermonuclear Smoke Devil': 'Thermonuclear_smoke_devil.png',
  'Tombs of Amascut': 'Tombs_of_Amascut.png',
  'TzHaar Fight Cave': 'Fire_cape.png',
  'TzHaar-Ket-Rak\'s Challenges': 'Tokkul.png',
  'Vardorvis': 'Vardorvis.png',
  'Venenatis': 'Venenatis.png',
  'Vet\'ion': 'Vet\'ion.png',
  'Vorkath': 'Vorkath.png',
  'Wintertodt': 'Wintertodt_icon.png',
  'Zalcano': 'Zalcano.png',
  'Zulrah': 'Zulrah_(serpentine).png',

  // Minigames
  'Shooting Stars': 'Celestial_ring.png',
  'Barbarian Assault': 'Fighter_torso.png',
  'Bounty Hunter': 'Bounty_hunter_emblem_tier_1.png',
  'Castle Wars': 'Saradomin_standard.png',
  'Clan Wars': 'Clan_Wars_cape_(purple).png',
  'Emir\'s Arena': 'Duel_Arena_teleport.png',
  'Last Man Standing': 'Victor\'s_cape_(1000).png',
  'Mage Arena': 'God_cape.png',
  'Nightmare Zone': 'Black_mask_(i).png',
  'Pest Control': 'Void_knight_helm.png',
  'Soul Wars': 'Soul_wars_portal.png',
  'Temple Trekking': 'Gadderhammer.png',
  'TzHaar Fight Pit': 'Toktz-ket-xil.png',
  'Archery Competition': 'Bronze_arrow.png',
  'Blast Furnace': 'Blast_furnace_icon.png',
  'Brimhaven Agility Arena': 'Agility_arena_ticket.png',
  'Fishing Trawler': 'Angler_hat.png',
  'Giants\' Foundry': 'Kovac.png',
  'Gnome Ball': 'Gnomeball.png',
  'Gnome Restaurant': 'Mint_cocktail.png',
  'Guardians of the Rift': 'Abyssal_pearl.png',
  'Hallowed Sepulchre': 'Hallowed_ring.png',
  'Impetuous Impulses': 'Eclectic_impling_jar.png',
  'Mage Training Arena': 'Teacher_wand.png',
  'Mahogany Homes': 'Carpenter\'s_helmet.png',
  'Mastering Mixology': 'Mojo_icon.png',
  'Mess': 'Fried_mushrooms.png',
  'Pyramid Plunder': 'Pharaoh\'s_sceptre.png',
  'Rogues\' Den': 'Rogue_kit.png',
  'Sorceress\'s Garden': 'Summer_sq\'irkjuice.png',
  'Stealing Artefacts': 'Golden_goblet.png',
  'Tithe Farm': 'Farmer_Gricoller\'s_can.png',
  'Trouble Brewing': 'Rum_(blue).png',
  'Volcanic Mine': 'Volcanic_Mine_teleport.png',
  'Shades of Mort\'ton': 'Flamtaer_hammer.png',
  'Tai Bwo Wannai Cleanup': 'Trading_sticks.png',
  'Warriors\' Guild': 'Dragon_defender.png',
  'Burthorpe Games Room': 'RuneLink_table.png',
  'Forestry': 'Forestry_kit.png',
  'Rat Pits': 'Rat_pole.png',
  'Tears of Guthix': 'Tears_of_Guthix.png'
};

// WIKI_OVERRIDES: Maps internal names to the exact OSRS Wiki page/filename if different.
// Helps fix broken images or links.
export const WIKI_OVERRIDES: Record<string, string> = {
  'Duel Arena / PvP Arena': 'PvP_Arena',
  'Miscellania & Etceteria': 'Miscellania',
  'Isle of Souls (Expanded)': 'Isle_of_Souls',
  'Mort\'ton': 'Mort\'ton',
  'Shades of Mort\'ton': 'Shades_of_Mort\'ton',
  'Civitas illa Fortis': 'Civitas_illa_Fortis',
  'Hunter\'s Guild': 'Hunter_Guild',
  'Mor Ul Rek (TzHaar City)': 'Mor_Ul_Rek',
  'Barrows Brothers': 'Barrows',
};
