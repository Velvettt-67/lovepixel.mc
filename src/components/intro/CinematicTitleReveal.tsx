import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { McDiamond, McEmerald } from '../ui/MinecraftIcons';

interface CinematicTitleRevealProps {
  isVisible: boolean;
  onEnter: () => void;
  isTransitioningOut?: boolean;
}

/**
 * 3D Minecraft-inspired Block Lettering for "LOVE PIXEL"
 * with stone/diamond bevels, deep 3D extrusion, and a diagonal specular lens glint
 * inspired directly by Reference Pin 3 (https://in.pinterest.com/pin/929711916829829551/).
 */
export const CinematicTitleReveal: React.FC<CinematicTitleRevealProps> = ({
  isVisible,
  onEnter,
  isTransitioningOut = false,
}) => {
  const [glintKey, setGlintKey] = useState(0);

  // Repeat specular light sweep every 3.5 seconds
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setGlintKey(k => k + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{
        opacity: isTransitioningOut ? 0 : 1,
        scale: isTransitioningOut ? 1.25 : 1,
        y: isTransitioningOut ? -40 : 0,
      }}
      transition={{
        duration: isTransitioningOut ? 0.65 : 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 select-none pointer-events-auto"
    >
      {/* 1. Dimensional 3D Minecraft Title Container */}
      <div className="relative group cursor-pointer" onClick={onEnter}>
        {/* Subtle Ambient Glow behind Title */}
        <div className="absolute -inset-8 bg-emerald-500/15 blur-3xl rounded-full pointer-events-none" />

        {/* 3D Extruded "LOVE PIXEL" Title */}
        <div className="relative font-pixel text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider uppercase whitespace-nowrap">
          {/* Layer 1: Bottom 3D Extrusion Shadow (Dark Stone) */}
          <span
            className="absolute inset-0 select-none pointer-events-none text-[#121318]"
            style={{
              transform: 'translate(4px, 8px)',
              textShadow: `
                1px 1px 0 #09090b,
                2px 2px 0 #09090b,
                3px 3px 0 #09090b,
                4px 4px 0 #09090b
              `,
            }}
            aria-hidden="true"
          >LOVE PIXEL</span>

          {/* Layer 2: Mid Bevel Extrusion (Slate / Obsidian Gray) */}
          <span
            className="absolute inset-0 select-none pointer-events-none text-[#333742]"
            style={{
              transform: 'translate(2px, 4px)',
              textShadow: `
                1px 1px 0 #1e2129,
                2px 2px 0 #1e2129
              `,
            }}
            aria-hidden="true"
          >LOVE PIXEL</span>

          {/* Layer 3: Top Beveled Face with Stone / Diamond Gradient */}
          <span
            className="relative block text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#e2e8f0] to-[#94a3b8]"
            style={{
              filter: 'drop-shadow(0 2px 0 #1e293b)',
              WebkitTextStroke: '1.5px #0f172a',
            }}
          >LOVE PIXEL</span>

          {/* Layer 4: Specular Lens Glint / Sheen Sweep (Reference Pin 3) */}
          <div
            key={glintKey}
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{
              maskImage: 'linear-gradient(to bottom, black, black)',
              WebkitMaskImage: 'linear-gradient(to bottom, black, black)',
            }}
          >
            <motion.div
              initial={{ x: '-120%', opacity: 0 }}
              animate={{ x: '180%', opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
              className="absolute top-0 bottom-0 w-28 sm:w-36 -skew-x-[35deg] bg-gradient-to-r from-transparent via-white/80 to-transparent mix-blend-overlay pointer-events-none"
            />
          </div>
        </div>

        {/* 2. Subtitle: "A MINECRAFT SERVER" with Emerald & Diamond Accents */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="mt-2.5 sm:mt-4 flex items-center justify-center gap-2 sm:gap-3"
        >
          <McEmerald size={16} className="animate-bounce" />
          <span className="font-pixel text-[11px] sm:text-sm md:text-base tracking-[0.22em] sm:tracking-[0.28em] text-[#80ff20] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            A MINECRAFT SERVER
          </span>
          <McDiamond size={16} className="animate-bounce" />
        </motion.div>
      </div>

      {/* 3. Interactive "TAP TO ENTER" Prompt */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mt-5 sm:mt-8 flex flex-col items-center gap-2"
      >
        <button
          onClick={onEnter}
          role="button"
          tabIndex={0}
          aria-label="Tap to enter Love Pixel website"
          className="group relative px-6 py-2.5 sm:px-10 sm:py-3.5 bg-[#141822]/90 hover:bg-[#1a202e] border-2 border-[#80ff20] text-white font-pixel text-xs sm:text-base tracking-widest uppercase transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-[0_0_24px_rgba(128,255,32,0.35)] focus:outline-none focus:ring-4 focus:ring-[#80ff20]/50"
        >
          {/* Button Corner Pixel Studs */}
          <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-[#80ff20]" />
          <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#80ff20]" />
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-[#80ff20]" />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-[#80ff20]" />

          {/* Button Text with Blinking Pixel Caret */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#80ff20] animate-pulse" />
            <span className="text-[#80ff20] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              TAP TO ENTER
            </span>
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#80ff20] animate-pulse" />
          </div>
        </button>

        {/* Keyboard / Touch Auxiliary Hint */}
        <span className="font-minecraft text-[11px] sm:text-sm text-slate-400/80 tracking-wide">
          Click, Tap, or Press <span className="text-emerald-400 font-pixel text-[9px] sm:text-[10px]">SPACE</span> / <span className="text-emerald-400 font-pixel text-[9px] sm:text-[10px]">ENTER</span>
        </span>
      </motion.div>
    </motion.div>
  );
};
