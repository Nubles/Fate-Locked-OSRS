
import React, { useEffect, useState } from 'react';
import { Sparkles, Map, Box } from 'lucide-react';

interface VoidRevealProps {
  itemName: string;
  itemType: string;
  itemImage?: string;
  onComplete: () => void;
}

type Phase = 'idle' | 'imploding' | 'singularity' | 'flash' | 'reveal';

export const VoidReveal: React.FC<VoidRevealProps> = ({ itemName, itemType, itemImage, onComplete }) => {
  const [phase, setPhase] = useState<Phase>('imploding');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Timeline of the animation
    const timer1 = setTimeout(() => setPhase('singularity'), 1500); // Start shrinking
    const timer2 = setTimeout(() => setPhase('flash'), 2200);       // White flash
    const timer3 = setTimeout(() => setPhase('reveal'), 2400);      // Show item

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Determine color theme based on item type
  const getTheme = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('equipment') || t.includes('weapon') || t.includes('gear')) {
      return {
        borderOuter: 'border-amber-500/30',
        borderInner: 'border-yellow-600/50',
        shadow: 'shadow-[0_0_50px_rgba(245,158,11,0.5)]',
        text: 'text-amber-500',
        icon: 'text-amber-400',
        bgGradient: 'from-amber-500/20',
        button: 'bg-amber-500 hover:bg-amber-400',
        particle: 'bg-amber-400',
        hex: '#fbbf24' // Amber-400
      };
    } else if (t.includes('region') || t.includes('area')) {
      return {
        borderOuter: 'border-emerald-500/30',
        borderInner: 'border-green-600/50',
        shadow: 'shadow-[0_0_50px_rgba(16,185,129,0.5)]',
        text: 'text-emerald-500',
        icon: 'text-emerald-400',
        bgGradient: 'from-emerald-500/20',
        button: 'bg-emerald-500 hover:bg-emerald-400',
        particle: 'bg-emerald-400',
        hex: '#34d399' // Emerald-400
      };
    } else if (t.includes('boss') || t.includes('slayer')) {
      return {
        borderOuter: 'border-red-500/30',
        borderInner: 'border-rose-600/50',
        shadow: 'shadow-[0_0_50px_rgba(239,68,68,0.5)]',
        text: 'text-red-500',
        icon: 'text-red-400',
        bgGradient: 'from-red-500/20',
        button: 'bg-red-500 hover:bg-red-400',
        particle: 'bg-red-400',
        hex: '#f87171' // Red-400
      };
    } else if (t.includes('skill')) {
        return {
          borderOuter: 'border-blue-500/30',
          borderInner: 'border-cyan-600/50',
          shadow: 'shadow-[0_0_50px_rgba(59,130,246,0.5)]',
          text: 'text-blue-500',
          icon: 'text-blue-400',
          bgGradient: 'from-blue-500/20',
          button: 'bg-blue-500 hover:bg-blue-400',
          particle: 'bg-blue-400',
          hex: '#60a5fa' // Blue-400
        };
    } else {
      // Default (Purple/Void)
      return {
        borderOuter: 'border-purple-500/30',
        borderInner: 'border-fuchsia-600/50',
        shadow: 'shadow-[0_0_50px_rgba(168,85,247,0.5)]',
        text: 'text-purple-500',
        icon: 'text-purple-400',
        bgGradient: 'from-purple-500/20',
        button: 'bg-purple-500 hover:bg-purple-400',
        particle: 'bg-purple-400',
        hex: '#c084fc' // Purple-400
      };
    }
  };

  const theme = getTheme(itemType);
  const isRegion = itemType.toLowerCase().includes('regions') || itemType.toLowerCase().includes('area');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md overflow-hidden">

      {/* PHASE 1 & 2: THE BLACK HOLE */}
      {(phase === 'imploding' || phase === 'singularity') && (
        <div className={`relative flex items-center justify-center transition-all duration-700 ease-in-out ${phase === 'singularity' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>

          {/* Ambient Glow */}
          <div className={`absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r ${theme.bgGradient} blur-[100px] opacity-20 animate-pulse`} />

          {/* Distant Orbit Rings */}
          <div className={`absolute w-[400px] h-[400px] rounded-full border border-dashed ${theme.borderOuter} opacity-10 animate-[spin_20s_linear_infinite]`} />
          <div className={`absolute w-[350px] h-[350px] rounded-full border border-dotted ${theme.borderOuter} opacity-20 animate-[spin_15s_linear_infinite_reverse]`} />

          {/* Main Accretion Disk (Blurry Outer Ring) */}
          <div className={`absolute w-72 h-72 rounded-full border-4 ${theme.borderOuter} blur-md animate-void-spin opacity-50`} />
          <div className={`absolute w-64 h-64 rounded-full border-2 ${theme.borderOuter} animate-[spin_4s_linear_infinite] opacity-40`} />

          {/* Inner Energy Stream (Sharp, Fast) */}
          <div className={`absolute w-52 h-52 rounded-full border-t-4 border-r-2 border-l-0 border-b-0 ${theme.borderInner} animate-[spin_1.5s_linear_infinite] opacity-80`} />
          <div className={`absolute w-48 h-48 rounded-full border-b-4 border-l-2 border-r-0 border-t-0 ${theme.borderInner} animate-[spin_2s_linear_infinite_reverse] opacity-70`} />

          {/* The Void / Event Horizon */}
          <div className={`relative w-40 h-40 bg-black rounded-full ${theme.shadow} flex items-center justify-center overflow-hidden z-10 ${phase === 'singularity' ? 'animate-shake' : ''}`}>

             {/* Swirling Interior (Conic Gradient) */}
             <div
               className="absolute inset-[-50%] opacity-30 animate-[spin_3s_linear_infinite]"
               style={{ background: `conic-gradient(from 0deg, transparent 0%, ${theme.hex} 100%)` }}
             />

             {/* The Singularity (Pure Black Center) */}
             <div className="absolute inset-2 bg-black rounded-full z-20 flex items-center justify-center">
                {/* Inner Pulse */}
                <div className={`w-full h-full rounded-full bg-gradient-to-tr ${theme.bgGradient} opacity-30 animate-pulse`} />
             </div>
          </div>

          {/* Infalling Particles */}
          <div className="absolute inset-0 pointer-events-none">
             {[...Array(6)].map((_, i) => (
                <div
                   key={i}
                   className={`absolute left-1/2 top-1/2 w-1 h-1 rounded-full ${theme.particle} animate-ping opacity-0`}
                   style={{
                       transform: `rotate(${i * 60}deg) translate(120px)`,
                       animationDuration: `${1 + Math.random()}s`,
                       animationDelay: `${Math.random() * 0.5}s`
                   }}
                />
             ))}
          </div>

          {/* Text */}
          <div className={`absolute top-60 ${theme.text} text-xs tracking-[0.5em] opacity-80 animate-pulse font-bold uppercase drop-shadow-md text-center`}>
            Altering Fate...
          </div>
        </div>
      )}

      {/* PHASE 3: THE FLASH (Toned Down) */}
      {phase === 'flash' && (
        <div className="absolute inset-0 bg-white/25 animate-flash z-[110]" />
      )}

      {/* PHASE 4: THE REVEAL */}
      {phase === 'reveal' && (
        <div className="relative z-[120] flex flex-col items-center animate-float-up">

          {/* God Rays Background */}
          <div className={`absolute -z-10 w-[600px] h-[600px] bg-gradient-to-t ${theme.bgGradient} to-transparent rounded-full blur-3xl animate-pulse`} />

          {/* The Card */}
          <div className="relative bg-gradient-to-b from-gray-800 to-black border-2 border-gray-700 p-8 rounded-xl shadow-2xl text-center min-w-[320px] max-w-md">
            {/* Rarity Star */}
            <div className={`absolute -top-6 left-1/2 -translate-x-1/2 bg-black border-2 ${theme.borderInner} p-3 rounded-full shadow-lg`}>
              <Sparkles className={`w-8 h-8 ${theme.icon} fill-current animate-pulse`} />
            </div>

            <div className="mt-6 space-y-2">
              <h3 className={`${theme.text} text-sm font-bold uppercase tracking-widest drop-shadow-sm`}>{itemType} UNLOCKED</h3>
              {itemImage && !imageError ? (
                 <div className="flex justify-center my-6 relative">
                    <div className={`absolute inset-0 bg-gradient-to-t ${theme.bgGradient} blur-xl opacity-50 animate-pulse`}></div>
                    <img
                        src={itemImage}
                        alt={itemName}
                        className={`${isRegion ? 'w-64 h-auto max-h-64 rounded-md border border-white/10' : 'w-24 h-24'} object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] relative z-10`}
                        onError={() => setImageError(true)}
                    />
                 </div>
              ) : (
                // Fallback Icon if Image Missing or Error
                <div className="flex justify-center my-6 relative">
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${theme.bgGradient} flex items-center justify-center border border-white/10 shadow-inner`}>
                       {isRegion ? <Map className={`w-12 h-12 ${theme.icon}`} /> : <Box className={`w-12 h-12 ${theme.icon}`} />}
                    </div>
                </div>
              )}
              <h2 className="text-3xl font-black text-white drop-shadow-md break-words leading-tight">{itemName}</h2>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700">
               <button
                 onClick={onComplete}
                 className={`px-8 py-3 ${theme.button} text-black font-black text-sm uppercase tracking-wider rounded shadow-lg transition-transform hover:scale-105 active:scale-95`}
               >
                 Accept Destiny
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
