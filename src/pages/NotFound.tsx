import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  McCompass,
  McChest,
} from '../components/ui/MinecraftIcons';
import {
  PixelSteveSprite,
  PixelAlexSprite,
} from '../components/entities/PixelEntitySprites';
import { SERVER_CONFIG } from '../config/serverConfig';
import { useAudio } from '../context/useAudio';
import { MessageSquare, ExternalLink, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  const { playXpOrb } = useAudio();
  const navigate = useNavigate();

  // Keyboard accessibility: Enter or Escape returns home
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        playXpOrb(1.0);
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, playXpOrb]);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-4xl w-full mx-auto flex items-center justify-center">
      <div className="w-full mc-panel rounded-3xl p-6 sm:p-12 text-center relative overflow-hidden shadow-2xl border border-slate-800">
        {/* Subtle grid background pattern evoking chunk boundaries */}
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px] opacity-35 pointer-events-none" />

        {/* Ambient void particle motes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`void-part-${i}`}
              className="absolute w-1.5 h-1.5 bg-[#55ffff]/30 rounded-none animate-pulse"
              style={{
                left: `${15 + i * 10}%`,
                top: `${40 + (i % 4) * 12}%`,
                animationDuration: `${2.2 + i * 0.4}s`,
                animationDelay: `${i * 0.25}s`,
              }}
            />
          ))}
        </div>

        {/* Coordinate HUD Readout Pill */}
        <div className="relative z-10 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 text-[11px] font-minecraft mb-6">
          <span className="text-slate-500">COORDS:</span>
          <span className="text-rose-400 font-bold">X: ~ / Y: VOID / Z: ~</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-500">CHUNK:</span>
          <span className="text-[#ffaa00] font-bold">[NOT LOADED]</span>
        </div>

        {/* Unloaded Chunk Visual Stage */}
        <div className="relative z-10 max-w-sm mx-auto mb-8 p-6 rounded-2xl bg-black/60 border border-slate-800/80 backdrop-blur-md">
          {/* Character duo surveying the void edge */}
          <div className="flex items-end justify-center gap-4 mb-4">
            <div className="flex flex-col items-center">
              <PixelSteveSprite size={32} animate />
              <span className="text-[9px] font-minecraft text-slate-400 mt-1">Steve</span>
            </div>
            
            {/* Themed Chunk Boundary Compass */}
            <div className="p-3 rounded-2xl mc-slot text-[#55ffff] shadow-lg animate-pulse">
              <McCompass size={32} />
            </div>

            <div className="flex flex-col items-center">
              <PixelAlexSprite size={32} animate />
              <span className="text-[9px] font-minecraft text-slate-400 mt-1">Alex</span>
            </div>
          </div>

          {/* Voxel Terrain Cross-Section: Overworld Crust Dropping into the Void */}
          <div className="space-y-1 max-w-xs mx-auto">
            {/* Layer 1: Grass Surface Blocks with missing chunk edge */}
            <div className="grid grid-cols-6 gap-1 h-4">
              <div className="bg-[#65a30d] border border-[#365314] rounded-xs" title="Grass Block" />
              <div className="bg-[#65a30d] border border-[#365314] rounded-xs" title="Grass Block" />
              <div className="bg-[#65a30d] border border-[#365314] rounded-xs" title="Grass Block" />
              <div className="bg-[#65a30d] border border-[#365314] rounded-xs" title="Grass Block" />
              <div className="border border-dashed border-cyan-500/40 bg-cyan-950/20 rounded-xs flex items-center justify-center text-[8px] font-minecraft text-[#55ffff]">?</div>
              <div className="border border-dashed border-slate-800 bg-transparent rounded-xs" />
            </div>

            {/* Layer 2: Rich Dirt Layer */}
            <div className="grid grid-cols-6 gap-1 h-4">
              <div className="bg-[#78350f] border border-[#451a03] rounded-xs" title="Dirt" />
              <div className="bg-[#78350f] border border-[#451a03] rounded-xs" title="Dirt" />
              <div className="bg-[#78350f] border border-[#451a03] rounded-xs" title="Dirt" />
              <div className="bg-[#78350f] border border-[#451a03] rounded-xs" title="Dirt" />
              <div className="border border-dashed border-cyan-500/40 bg-cyan-950/10 rounded-xs" />
              <div className="border border-dashed border-slate-800 bg-transparent rounded-xs" />
            </div>

            {/* Layer 3: Deep Stone Crust */}
            <div className="grid grid-cols-6 gap-1 h-4">
              <div className="bg-[#52525b] border border-[#27272a] rounded-xs" title="Stone" />
              <div className="bg-[#52525b] border border-[#27272a] rounded-xs" title="Stone" />
              <div className="bg-[#52525b] border border-[#27272a] rounded-xs" title="Stone" />
              <div className="border border-dashed border-slate-800 bg-transparent rounded-xs" />
              <div className="border border-dashed border-slate-800 bg-transparent rounded-xs" />
              <div className="border border-dashed border-slate-800 bg-transparent rounded-xs" />
            </div>

            {/* Layer 4: Indestructible Bedrock Foundation */}
            <div className="grid grid-cols-6 gap-1 h-4">
              <div className="bg-[#18181b] border border-[#09090b] rounded-xs" title="Bedrock" />
              <div className="bg-[#18181b] border border-[#09090b] rounded-xs" title="Bedrock" />
              <div className="border border-dashed border-slate-800 bg-transparent rounded-xs" />
              <div className="border border-dashed border-slate-800 bg-transparent rounded-xs" />
              <div className="border border-dashed border-slate-800 bg-transparent rounded-xs" />
              <div className="border border-dashed border-slate-800 bg-transparent rounded-xs" />
            </div>
          </div>
          <span className="text-[10px] font-minecraft text-slate-500 block mt-3">
            [CHUNK BORDER: UNLOADED VOID BOUNDARY]
          </span>
        </div>

        {/* Headline */}
        <h1 className="relative z-10 text-3xl sm:text-5xl font-minecraft font-bold text-white tracking-tight uppercase mc-shadow mb-3">
          404 — CHUNK NOT FOUND
        </h1>

        {/* Supporting Narrative Text */}
        <p className="relative z-10 text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed font-minecraft mb-8">
          You have wandered beyond the loaded chunks. Let&apos;s get you back to the world.
        </p>

        {/* Primary Clear Actions */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
          {/* Action 1: Return to World */}
          <Link
            to="/"
            onClick={() => playXpOrb(1.05)}
            className="w-full sm:w-auto flex-1 px-6 py-4 rounded-xl text-xs sm:text-sm font-minecraft font-bold uppercase tracking-wider mc-button-primary shadow-[0_0_25px_rgba(85,255,85,0.4)] flex items-center justify-center gap-2 cursor-pointer text-slate-950 transition-all transform hover:scale-105 active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>RETURN TO WORLD</span>
          </Link>

          {/* Action 2: Visit Store */}
          <Link
            to="/store"
            onClick={() => playXpOrb(1.1)}
            className="w-full sm:w-auto flex-1 px-6 py-4 rounded-xl text-xs sm:text-sm font-minecraft font-bold uppercase tracking-wider mc-button text-slate-200 hover:text-white flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <McChest size={18} />
            <span>VISIT STORE</span>
          </Link>
        </div>

        {/* Action 3: Discord Support Link */}
        <div className="relative z-10 mt-6 pt-6 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-minecraft text-slate-400">
          <span>Need assistance locating a lost world resource?</span>
          <a
            href={SERVER_CONFIG.discordInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playXpOrb(1.15)}
            className="inline-flex items-center gap-1.5 text-[#55ffff] hover:underline"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>JOIN DISCORD ({SERVER_CONFIG.discordInviteUrl.replace('https://', '')})</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
