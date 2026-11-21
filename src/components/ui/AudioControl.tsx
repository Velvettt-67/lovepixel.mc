import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { McExperienceOrb } from './MinecraftIcons';
import { useAudio } from '../../context/useAudio';

export const AudioControl: React.FC = () => {
  const { isMuted, toggleMute, volume, setVolume, playXpOrb } = useAudio();
  const [showSlider, setShowSlider] = useState(false);

  const handleToggle = () => {
    toggleMute();
  };

  const handleTestChime = (e: React.MouseEvent) => {
    e.stopPropagation();
    playXpOrb(1.0);
  };

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      <button
        onClick={handleToggle}
        aria-label={isMuted ? 'Enable Minecraft XP Orb ambience' : 'Mute Minecraft XP Orb ambience'}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs transition-all duration-200 cursor-pointer ${
          !isMuted
            ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300 shadow-[0_0_12px_rgba(85,255,85,0.25)]'
            : 'bg-slate-900/80 border-slate-700/60 text-slate-400 hover:border-slate-500 hover:text-slate-200'
        }`}
      >
        {!isMuted ? (
          <>
            <Volume2 className="w-4 h-4 text-[#80ff20] animate-pulse" />
            <div className="flex items-center gap-1.5">
              <span className="font-pixel text-[10px] text-[#80ff20] mc-shadow">
                XP
              </span>
              <span className="text-[11px] font-bold text-white">ON</span>
            </div>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-slate-400" />
            <div className="flex items-center gap-1.5">
              <span className="font-pixel text-[10px] text-slate-500">
                XP
              </span>
              <span className="text-[11px] text-slate-400">OFF</span>
            </div>
          </>
        )}
      </button>

      {/* Flyout volume slider and test button */}
      {showSlider && (
        <div className="absolute right-0 top-full mt-2 z-50 p-3 rounded-xl mc-panel w-56 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-minecraft text-[#55ff55] font-bold uppercase tracking-wide flex items-center gap-1.5 mc-shadow">
              <McExperienceOrb size={14} />
              XP Ambience
            </span>
            <button
              onClick={handleTestChime}
              disabled={isMuted}
              className="text-[10px] font-minecraft px-2 py-0.5 rounded mc-button text-slate-200 hover:text-white disabled:opacity-40 cursor-pointer"
              title="Preview XP Orb Pickup Sound"
            >
              Test
            </button>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Volume</span>
              <span className="text-[#55ff55] font-bold">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.02"
              max="0.40"
              step="0.01"
              value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              disabled={isMuted}
              className="w-full accent-[#55ff55] cursor-pointer disabled:opacity-40"
            />
          </div>

          <p className="text-[9px] font-minecraft text-slate-400 mt-2 leading-tight">
            Continuous Minecraft experience orb pickup soundscape (entity.experience_orb.pickup).
          </p>
        </div>
      )}
    </div>
  );
};
