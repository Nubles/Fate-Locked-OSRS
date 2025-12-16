
import React, { useState } from 'react';
import { DropSource } from '../types';
import { DROP_RATES } from '../constants';
import { Swords, Scroll, Map, Trophy, HelpCircle } from 'lucide-react';

interface ActionSectionProps {
  onRoll: (source: string, chance: number) => void;
}

// OSRS Wiki Icon URLs - Fixed with encoded characters
const OSRS_ICONS = {
  QUEST: 'https://oldschool.runescape.wiki/images/Quest_point_icon.png',
  DIARY: 'https://oldschool.runescape.wiki/images/Achievement_Diaries_icon.png',
  CA: 'https://oldschool.runescape.wiki/images/Combat_Achievements_icon.png',
  SLAYER: 'https://oldschool.runescape.wiki/images/Slayer_icon.png',
  STATS: 'https://oldschool.runescape.wiki/images/Stats_icon.png',
  COLL_LOG: 'https://oldschool.runescape.wiki/images/Collection_log_icon.png',
  KEY: 'https://oldschool.runescape.wiki/images/Steel_key_ring_icon.png',
  CLUE: 'https://oldschool.runescape.wiki/images/Clue_scroll_%28master%29.png'
};

const CLUE_ICONS = {
  BEGINNER: 'https://oldschool.runescape.wiki/images/Clue_scroll_%28beginner%29.png',
  EASY: 'https://oldschool.runescape.wiki/images/Clue_scroll_%28easy%29.png',
  MEDIUM: 'https://oldschool.runescape.wiki/images/Clue_scroll_%28medium%29.png',
  HARD: 'https://oldschool.runescape.wiki/images/Clue_scroll_%28hard%29.png',
  ELITE: 'https://oldschool.runescape.wiki/images/Clue_scroll_%28elite%29.png',
  MASTER: 'https://oldschool.runescape.wiki/images/Clue_scroll_%28master%29.png'
};

// Reusable Component for Standard Roll Buttons (Centered Layout)
const RollButton = ({ 
  label, 
  chance, 
  onClick,
  className = "",
  textColor,
  icon: Icon,
  iconSrc
}: { 
  label: string; 
  chance: string; 
  onClick: () => void;
  className?: string;
  textColor?: string;
  icon?: any;
  iconSrc?: string;
}) => (
  <button 
    onClick={onClick}
    className={`
      w-full flex flex-col items-center justify-center px-3 py-3 rounded text-sm transition-all border shadow-sm group relative overflow-hidden
      ${className}
    `}
  >
    <div className="flex items-center gap-2 mb-1 relative z-10">
      {iconSrc ? (
        <img src={iconSrc} alt="" className="w-4 h-4 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
      ) : Icon ? (
        <Icon className={`w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity ${textColor || 'currentColor'}`} />
      ) : null}
      
      <span className={`font-bold whitespace-nowrap ${textColor || ''}`}>{label}</span>
    </div>

    <div className={`
      text-xs font-mono bg-black/30 px-3 py-0.5 rounded-full border border-white/5 relative z-10
      ${textColor ? textColor : 'opacity-90'}
    `}>
        {chance}
    </div>
  </button>
);

// Reusable Component for Grid Buttons (Centered Layout)
const GridButton = ({ 
  tier, 
  chance, 
  onClick, 
  colorClass,
  dotColor = "bg-gray-500",
  iconSrc,
  icon: Icon,
  iconColor = "text-gray-200"
}: { 
  tier: string; 
  chance: string; 
  onClick: () => void;
  colorClass: string; 
  dotColor?: string;
  iconSrc?: string;
  icon?: any;
  iconColor?: string;
}) => (
  <button 
    onClick={onClick}
    className={`
      ${colorClass} w-full flex flex-col items-center justify-center px-2 py-3 rounded text-sm transition-colors border shadow-sm group h-full relative
    `}
  >
    <div className="flex items-center gap-2 mb-1.5 justify-center">
       {iconSrc ? (
           <img src={iconSrc} alt="" className="w-6 h-6 object-contain drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] opacity-90 group-hover:opacity-100 transition-opacity" />
       ) : Icon ? (
           <Icon className={`w-5 h-5 ${iconColor} drop-shadow-md opacity-80 group-hover:opacity-100 transition-opacity`} />
       ) : (
           <div className={`w-1.5 h-1.5 rounded-full ${dotColor} opacity-70 group-hover:opacity-100 shadow-[0_0_4px_currentColor]`} />
       )}
       <span className={`font-bold text-sm ${tier.includes('Elite') || tier.includes('Master') || tier.includes('Grandmaster') || tier.includes('G.Master') ? 'text-osrs-gold' : 'text-gray-200'}`}>{tier}</span>
    </div>
    
    <div className="text-xs font-mono text-gray-300 group-hover:text-white bg-black/30 px-3 py-0.5 rounded-full border border-white/5">
        {chance}
    </div>
  </button>
);

export const ActionSection: React.FC<ActionSectionProps> = ({ onRoll }) => {
  return (
    <div className="bg-osrs-panel border border-osrs-border rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-bold text-osrs-gold mb-6 flex items-center gap-2">
        <Swords className="w-5 h-5" />
        Farm Keys
        <div className="group relative flex items-center ml-1 z-50">
            <HelpCircle className="w-4 h-4 text-gray-500 hover:text-osrs-gold cursor-help transition-colors" />
            <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-[#1a1a1a] border border-osrs-border rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-xs text-gray-300 font-normal leading-relaxed">
                Complete tasks to roll for Keys. Higher difficulty means higher drop rates.
                <br/><br/>
                <span className="text-osrs-gold font-bold">Pity System:</span> Failed rolls grant Fate Points. 50 Points guarantees a key.
                <div className="absolute left-2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1a1a1a]"></div>
            </div>
        </div>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Column 1: Milestones (Quests & Diaries) */}
        <div className="space-y-6">
          {/* Quests */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
              <img src={OSRS_ICONS.QUEST} alt="Quest" className="w-4 h-4 object-contain" />
              Questing
            </h3>
            <div className="flex flex-col gap-2">
              <RollButton 
                label="Novice" 
                chance="20%" 
                className="bg-stone-800 hover:bg-stone-700 border-stone-700 text-stone-200"
                onClick={() => onRoll(DropSource.QUEST_NOVICE, DROP_RATES[DropSource.QUEST_NOVICE])}
              />
              <RollButton 
                label="Intermediate" 
                chance="40%" 
                className="bg-emerald-900/30 hover:bg-emerald-800/40 border-emerald-800/50 text-emerald-200"
                onClick={() => onRoll(DropSource.QUEST_INTERMEDIATE, DROP_RATES[DropSource.QUEST_INTERMEDIATE])}
              />
              <RollButton 
                label="Experienced" 
                chance="60%" 
                className="bg-blue-900/30 hover:bg-blue-800/40 border-blue-800/50 text-blue-200"
                onClick={() => onRoll(DropSource.QUEST_EXPERIENCED, DROP_RATES[DropSource.QUEST_EXPERIENCED])}
              />
               <RollButton 
                label="Master" 
                chance="80%" 
                className="bg-red-950/40 hover:bg-red-900/50 border-red-900/50 text-red-200"
                onClick={() => onRoll(DropSource.QUEST_MASTER, DROP_RATES[DropSource.QUEST_MASTER])}
              />
              <RollButton 
                label="Grandmaster" 
                chance="100%" 
                className="bg-yellow-950/40 hover:bg-yellow-900/50 border-yellow-700/50"
                textColor="text-osrs-gold"
                iconSrc={OSRS_ICONS.QUEST}
                onClick={() => onRoll(DropSource.QUEST_GRANDMASTER, DROP_RATES[DropSource.QUEST_GRANDMASTER])}
              />
            </div>
          </div>

          {/* Achievement Diaries */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
              <img src={OSRS_ICONS.DIARY} alt="Diary" className="w-4 h-4 object-contain" />
              Achievement Diaries
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <GridButton tier="Easy" chance="25%" colorClass="bg-green-900/20 hover:bg-green-800/30 border-green-800/30" dotColor="bg-green-500" onClick={() => onRoll(DropSource.DIARY_EASY, DROP_RATES[DropSource.DIARY_EASY])} />
              <GridButton tier="Medium" chance="50%" colorClass="bg-green-900/30 hover:bg-green-800/40 border-green-800/40" dotColor="bg-green-400" onClick={() => onRoll(DropSource.DIARY_MEDIUM, DROP_RATES[DropSource.DIARY_MEDIUM])} />
              <GridButton tier="Hard" chance="75%" colorClass="bg-green-900/40 hover:bg-green-800/50 border-green-800/50" dotColor="bg-green-300" onClick={() => onRoll(DropSource.DIARY_HARD, DROP_RATES[DropSource.DIARY_HARD])} />
              <GridButton tier="Elite" chance="100%" colorClass="bg-green-900/50 hover:bg-green-800/60 border-green-800/60 ring-1 ring-osrs-gold/30" dotColor="bg-osrs-gold" onClick={() => onRoll(DropSource.DIARY_ELITE, DROP_RATES[DropSource.DIARY_ELITE])} />
            </div>
          </div>
        </div>

        {/* Column 2: Combat, Clues, & Misc */}
        <div className="space-y-6">
          {/* Combat Achievements */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
              <img src={OSRS_ICONS.CA} alt="CA" className="w-4 h-4 object-contain" />
              Combat Achievements
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <GridButton tier="Easy" chance="5%" icon={Swords} iconColor="text-emerald-400" colorClass="bg-emerald-900/30 hover:bg-emerald-800/40 border-emerald-800/40" onClick={() => onRoll(DropSource.CA_EASY, DROP_RATES[DropSource.CA_EASY])} />
              <GridButton tier="Medium" chance="10%" icon={Swords} iconColor="text-blue-400" colorClass="bg-blue-900/30 hover:bg-blue-800/40 border-blue-800/40" onClick={() => onRoll(DropSource.CA_MEDIUM, DROP_RATES[DropSource.CA_MEDIUM])} />
              <GridButton tier="Hard" chance="20%" icon={Swords} iconColor="text-purple-400" colorClass="bg-purple-900/30 hover:bg-purple-800/40 border-purple-800/40" onClick={() => onRoll(DropSource.CA_HARD, DROP_RATES[DropSource.CA_HARD])} />
              <GridButton tier="Elite" chance="50%" icon={Swords} iconColor="text-amber-400" colorClass="bg-amber-900/30 hover:bg-amber-800/40 border-amber-800/40" onClick={() => onRoll(DropSource.CA_ELITE, DROP_RATES[DropSource.CA_ELITE])} />
              <GridButton tier="Master" chance="50%" icon={Swords} iconColor="text-red-400" colorClass="bg-red-950/40 hover:bg-red-900/50 border-red-900/50" onClick={() => onRoll(DropSource.CA_MASTER, DROP_RATES[DropSource.CA_MASTER])} />
              <GridButton tier="G.Master" chance="50%" icon={Swords} iconColor="text-yellow-400" colorClass="bg-stone-950/40 hover:bg-stone-900/50 border-stone-700/50 ring-1 ring-osrs-gold/20" onClick={() => onRoll(DropSource.CA_GRANDMASTER, DROP_RATES[DropSource.CA_GRANDMASTER])} />
            </div>
          </div>

          {/* Clue Scrolls - Adjusted Percentages */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
              <img src={OSRS_ICONS.CLUE} alt="Clue" className="w-4 h-4 object-contain" />
              Clue Scrolls
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <GridButton tier="Beginner" chance="15%" iconSrc={CLUE_ICONS.BEGINNER} colorClass="bg-stone-800 hover:bg-stone-700 border-stone-700" onClick={() => onRoll(DropSource.CLUE_BEGINNER, DROP_RATES[DropSource.CLUE_BEGINNER])} />
              <GridButton tier="Easy" chance="30%" iconSrc={CLUE_ICONS.EASY} colorClass="bg-green-900/20 hover:bg-green-800/30 border-green-800/30" onClick={() => onRoll(DropSource.CLUE_EASY, DROP_RATES[DropSource.CLUE_EASY])} />
              <GridButton tier="Medium" chance="45%" iconSrc={CLUE_ICONS.MEDIUM} colorClass="bg-green-900/30 hover:bg-green-800/40 border-green-800/40" onClick={() => onRoll(DropSource.CLUE_MEDIUM, DROP_RATES[DropSource.CLUE_MEDIUM])} />
              <GridButton tier="Hard" chance="60%" iconSrc={CLUE_ICONS.HARD} colorClass="bg-purple-900/30 hover:bg-purple-800/40 border-purple-800/40" onClick={() => onRoll(DropSource.CLUE_HARD, DROP_RATES[DropSource.CLUE_HARD])} />
              <GridButton tier="Elite" chance="75%" iconSrc={CLUE_ICONS.ELITE} colorClass="bg-yellow-900/30 hover:bg-yellow-800/40 border-yellow-800/40" onClick={() => onRoll(DropSource.CLUE_ELITE, DROP_RATES[DropSource.CLUE_ELITE])} />
              <GridButton tier="Master" chance="90%" iconSrc={CLUE_ICONS.MASTER} colorClass="bg-red-950/40 hover:bg-red-900/50 border-red-900/50" onClick={() => onRoll(DropSource.CLUE_MASTER, DROP_RATES[DropSource.CLUE_MASTER])} />
            </div>
          </div>

          {/* Slayer */}
          <div className="space-y-3">
             <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
              <img src={OSRS_ICONS.SLAYER} alt="Slayer" className="w-4 h-4 object-contain" />
              Slayer
            </h3>
             <RollButton 
                label="Task Complete"
                chance="10%"
                iconSrc={OSRS_ICONS.SLAYER}
                className="bg-red-950/30 hover:bg-red-900/40 border-red-900/40 text-red-200"
                textColor="text-red-200"
                onClick={() => onRoll(DropSource.SLAYER_TASK, DROP_RATES[DropSource.SLAYER_TASK])}
              />
          </div>

          {/* Collection Log */}
          <div className="space-y-3">
             <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
              <img src={OSRS_ICONS.COLL_LOG} alt="Collection Log" className="w-4 h-4 object-contain" />
              Collection Log
            </h3>
             <RollButton 
               label="Unique" 
               chance="5%" 
               iconSrc={OSRS_ICONS.COLL_LOG}
               className="bg-indigo-900/20 hover:bg-indigo-900/30 border-indigo-500/30 ring-1 ring-indigo-500/20" 
               textColor="text-indigo-200"
               onClick={() => onRoll(DropSource.COLLECTION_LOG, DROP_RATES[DropSource.COLLECTION_LOG])} 
               />
          </div>

           {/* Level Up (Info Only) */}
           <div className="space-y-3 opacity-60">
             <h3 className="text-sm font-semibold text-gray-400 flex items-center gap-2">
              <img src={OSRS_ICONS.STATS} alt="Stats" className="w-4 h-4 object-contain" />
              Level Up
            </h3>
             <div className="w-full bg-black/20 border border-white/5 px-4 py-3 rounded text-sm text-gray-500 italic flex items-center justify-center text-center">
               Click unlocked skills in the panel below to roll.
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
