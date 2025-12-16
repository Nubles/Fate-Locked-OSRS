
import React from 'react';
import { TableType } from '../types';
import { Shield, Map, Hammer, Lock, Dices, Sparkles, Footprints, Zap, Gamepad2, HelpCircle } from 'lucide-react';
import { CONTENT_LIST } from '../constants';

interface GachaSectionProps {
  keys: number;
  onUnlock: (table: TableType) => void;
  canUnlock: {
    equipment: boolean;
    skills: boolean;
    regions: boolean;
    mobility: boolean;
    power: boolean;
    content: boolean;
  };
}

interface SpendCardProps {
  type: TableType;
  label: string;
  subLabel: string;
  description: string;
  disabled: boolean;
  keysAvailable: boolean;
  complete: boolean;
  colorTheme: 'red' | 'blue' | 'green' | 'amber' | 'violet' | 'cyan';
  icon: any;
  onClick: () => void;
}

const SpendCard: React.FC<SpendCardProps> = ({
  label,
  subLabel,
  description,
  disabled,
  keysAvailable,
  complete,
  colorTheme,
  icon: Icon,
  onClick
}) => {
  
  const theme = {
    red: {
      bg: 'bg-[#2a1a1a]',
      border: 'border-[#4a2a2a]',
      hoverBorder: 'hover:border-[#ff4444]',
      text: 'text-[#ffcccc]',
      iconBg: 'text-[#ff5555]',
      glow: 'shadow-[inset_0_0_10px_rgba(255,0,0,0.1)]'
    },
    blue: {
      bg: 'bg-[#1a1f2a]',
      border: 'border-[#2a3a4a]',
      hoverBorder: 'hover:border-[#4488ff]',
      text: 'text-[#cceeff]',
      iconBg: 'text-[#55aaff]',
      glow: 'shadow-[inset_0_0_10px_rgba(0,100,255,0.1)]'
    },
    green: {
      bg: 'bg-[#1a2a1f]',
      border: 'border-[#2a4a3a]',
      hoverBorder: 'hover:border-[#44ff88]',
      text: 'text-[#ccffdd]',
      iconBg: 'text-[#55ff99]',
      glow: 'shadow-[inset_0_0_10px_rgba(0,255,100,0.1)]'
    },
    amber: {
      bg: 'bg-[#2a241a]',
      border: 'border-[#4a3f2a]',
      hoverBorder: 'hover:border-[#ffaa44]',
      text: 'text-[#ffeedd]',
      iconBg: 'text-[#ffaa55]',
      glow: 'shadow-[inset_0_0_10px_rgba(255,150,0,0.1)]'
    },
    violet: {
      bg: 'bg-[#241a2a]',
      border: 'border-[#3f2a4a]',
      hoverBorder: 'hover:border-[#aa44ff]',
      text: 'text-[#eeccee]',
      iconBg: 'text-[#aa55ff]',
      glow: 'shadow-[inset_0_0_10px_rgba(150,0,255,0.1)]'
    },
    cyan: {
      bg: 'bg-[#1a282a]',
      border: 'border-[#2a454a]',
      hoverBorder: 'hover:border-[#44eeff]',
      text: 'text-[#ccffff]',
      iconBg: 'text-[#55eeff]',
      glow: 'shadow-[inset_0_0_10px_rgba(0,255,255,0.1)]'
    }
  }[colorTheme];

  const isClickable = !disabled && keysAvailable && !complete;
  const isLocked = !keysAvailable && !complete;

  return (
    <button
      onClick={onClick}
      disabled={!isClickable}
      className={`
        relative overflow-hidden rounded-md border-2 transition-all duration-150 w-full text-left group flex flex-col h-full min-h-[11rem] p-4 shadow-lg
        ${isClickable 
          ? `${theme.bg} ${theme.border} ${theme.hoverBorder} ${theme.glow} hover:-translate-y-1 hover:shadow-xl` 
          : 'bg-[#111111] border-[#222222] cursor-not-allowed'}
      `}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

      {/* Header: Icon + Price */}
      <div className={`flex justify-between items-start w-full relative z-10 mb-2 transition-opacity duration-300 ${isLocked ? 'opacity-20' : 'opacity-100'}`}>
        <div className={`p-2 rounded bg-[#0a0a0a] border border-[#333] shadow-inner ${theme.iconBg}`}>
           <Icon size={24} strokeWidth={1.5} />
        </div>
        
        {complete ? (
          <span className="px-2 py-1 bg-green-900/40 text-green-400 text-[10px] font-bold uppercase rounded border border-green-800 tracking-wider">
            Done
          </span>
        ) : (
           <div className={`flex flex-col items-end`}>
              <span className="text-[10px] uppercase tracking-widest text-[#666] font-bold mb-0.5 font-mono">Price</span>
              <span className="text-osrs-gold font-bold text-xl leading-none text-shadow-osrs">1</span>
           </div>
        )}
      </div>

      {/* Middle: Text */}
      <div className={`relative z-10 mt-1 transition-opacity duration-300 ${isLocked ? 'opacity-20' : 'opacity-100'}`}>
          <h3 className={`text-lg font-bold ${theme.text} text-shadow-osrs group-hover:text-white transition-colors leading-tight`}>
            {label}
          </h3>
          <p className="text-[11px] text-[#888] font-mono mt-1 text-shadow-osrs uppercase">{subLabel}</p>
      </div>

      {/* Footer: Details + Action */}
      <div className={`mt-auto flex items-end justify-between w-full relative z-10 pt-3 border-t border-white/5 transition-opacity duration-300 ${isLocked ? 'opacity-20' : 'opacity-100'}`}>
         <span className="text-[10px] text-[#666] uppercase tracking-widest font-bold">{description}</span>
         {isClickable && (
           <div className="flex items-center gap-1.5 text-xs text-[#aaa] group-hover:text-white transition-colors px-2 py-1 rounded bg-black/40 border border-[#333] shadow-sm">
             <span className="font-medium">Roll</span>
             <Dices size={14} className="group-hover:rotate-12 transition-transform duration-300" />
           </div>
         )}
      </div>

      {/* Locked Overlay */}
      {isLocked && (
           <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
               <Lock className="w-8 h-8 mb-2 text-[#555] drop-shadow-md" />
               <span className="text-[12px] font-bold uppercase tracking-widest text-[#555] font-mono text-shadow-osrs">Need Key</span>
           </div>
      )}
    </button>
  );
};

export const GachaSection: React.FC<GachaSectionProps> = ({ keys, onUnlock, canUnlock }) => {
  return (
    <div className="bg-[#1b1b1b] border border-[#2d2d2d] rounded-lg h-full flex flex-col relative">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-[#2d2d2d]">
        <div className="flex items-center gap-2">
           <Sparkles className="w-5 h-5 text-osrs-gold drop-shadow-md" />
           <h2 className="text-xl font-bold text-osrs-gold uppercase tracking-wide text-shadow-osrs">Spend Keys</h2>
           <div className="group relative flex items-center ml-1 z-50">
              <HelpCircle className="w-4 h-4 text-gray-500 hover:text-osrs-gold cursor-help transition-colors" />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-[#1a1a1a] border border-osrs-border rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-xs text-gray-300 font-normal leading-relaxed normal-case tracking-normal text-shadow-none">
                  Use Keys to unlock rewards from these tables.
                  <br/><br/>
                  <span className="text-blue-400 font-bold">Re-Rolls:</span> If you roll a duplicate item, the system automatically attempts one re-roll.
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1a1a1a]"></div>
              </div>
          </div>
        </div>
        
        {keys > 0 ? (
          <span className="text-[10px] font-bold text-green-400 animate-pulse uppercase tracking-wider bg-green-900/30 px-2 py-1 rounded border border-green-500/30 shadow-[0_0_10px_rgba(0,255,0,0.2)]">
             Rewards Available
          </span>
        ) : (
          <span className="text-[10px] font-bold text-[#444] uppercase tracking-wider">
            No Keys
          </span>
        )}
      </div>
      
      {/* Cards Grid Container */}
      <div className={`p-6 flex-1 transition-all duration-500 ${keys > 0 ? 'bg-blue-500/5 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]' : ''}`}>
        
        {/* Blue Highlight Border for the Grid when keys exist */}
        <div className={`
           grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2 rounded-xl transition-all duration-300
           ${keys > 0 ? 'ring-2 ring-blue-500/40 bg-blue-500/5' : ''}
        `}>
          <SpendCard 
            type={TableType.EQUIPMENT}
            icon={Shield}
            label="Equipment"
            subLabel="Upgrade Gear"
            description="11 Slots, 9 Tiers"
            disabled={!canUnlock.equipment}
            keysAvailable={keys > 0}
            complete={!canUnlock.equipment}
            colorTheme="red"
            onClick={() => onUnlock(TableType.EQUIPMENT)}
          />
          <SpendCard 
            type={TableType.SKILLS}
            icon={Hammer}
            label="Skills"
            subLabel="+10 Level Cap"
            description="1 of 23 Skills"
            disabled={!canUnlock.skills}
            keysAvailable={keys > 0}
            complete={!canUnlock.skills}
            colorTheme="blue"
            onClick={() => onUnlock(TableType.SKILLS)}
          />
          <SpendCard 
            type={TableType.REGIONS}
            icon={Map}
            label="Areas"
            subLabel="New Territory"
            description="1 of 9 Regions"
            disabled={!canUnlock.regions}
            keysAvailable={keys > 0}
            complete={!canUnlock.regions}
            colorTheme="green"
            onClick={() => onUnlock(TableType.REGIONS)}
          />
          <SpendCard 
            type={TableType.MOBILITY}
            icon={Footprints}
            label="Mobility"
            subLabel="Travel Networks"
            description="1 of 6 Types"
            disabled={!canUnlock.mobility}
            keysAvailable={keys > 0}
            complete={!canUnlock.mobility}
            colorTheme="amber"
            onClick={() => onUnlock(TableType.MOBILITY)}
          />
          <SpendCard 
            type={TableType.POWER}
            icon={Zap}
            label="Power"
            subLabel="Magic & Prayer"
            description="1 of 5 Upgrades"
            disabled={!canUnlock.power}
            keysAvailable={keys > 0}
            complete={!canUnlock.power}
            colorTheme="violet"
            onClick={() => onUnlock(TableType.POWER)}
          />
          <SpendCard 
            type={TableType.CONTENT}
            icon={Gamepad2}
            label="Content"
            subLabel="Minigames & Bosses"
            description={`1 of ${CONTENT_LIST.length} Activities`}
            disabled={!canUnlock.content}
            keysAvailable={keys > 0}
            complete={!canUnlock.content}
            colorTheme="cyan"
            onClick={() => onUnlock(TableType.CONTENT)}
          />
        </div>
      </div>
    </div>
  );
};
