import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { McCompass } from '../ui/MinecraftIcons';

const TARGET_AMBIENCE_VOLUME = 0.08; // Gentle 8% volume

export const ServerGameplayShowcase: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Smooth volume fader for ambient audio
  const fadeAudioTo = (targetVolume: number, durationMs = 600, onComplete?: () => void) => {
    const audio = ambientAudioRef.current;
    if (!audio) return;

    if (fadeTimerRef.current) {
      clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }

    const startVolume = audio.volume;
    const startTime = performance.now();

    fadeTimerRef.current = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const newVol = startVolume + (targetVolume - startVolume) * progress;
      audio.volume = Math.max(0, Math.min(1, newVol));

      if (progress >= 1) {
        if (fadeTimerRef.current) {
          clearInterval(fadeTimerRef.current);
          fadeTimerRef.current = null;
        }
        if (onComplete) onComplete();
      }
    }, 25);
  };

  // Initialize ambient audio layer once
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.preload = 'auto';

    // Support both OGG Vorbis and MP3
    const canPlayOgg = audio.canPlayType('audio/ogg; codecs="vorbis"');
    audio.src = canPlayOgg !== '' ? '/assets/audio/nature_ambience.ogg' : '/assets/audio/nature_ambience.mp3';
    audio.volume = 0;
    ambientAudioRef.current = audio;

    return () => {
      if (fadeTimerRef.current) {
        clearInterval(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause();
        ambientAudioRef.current.src = '';
        ambientAudioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    const audio = ambientAudioRef.current;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      // If audio was actively playing, fade it out while paused
      if (audio && !isMuted) {
        fadeAudioTo(0, 400, () => {
          audio.pause();
        });
      }
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      // Resume audio if unmuted
      if (audio && !isMuted) {
        audio.play().then(() => {
          fadeAudioTo(TARGET_AMBIENCE_VOLUME, 500);
        }).catch(() => {});
      }
    }
  };

  const toggleMute = () => {
    const audio = ambientAudioRef.current;
    if (!audio) return;

    if (isMuted) {
      // User gesture triggered unmuting: start audio and ramp up volume smoothly
      audio.volume = 0;
      audio.play().then(() => {
        fadeAudioTo(TARGET_AMBIENCE_VOLUME, 700);
        setIsMuted(false);
      }).catch((err) => {
        console.warn('Ambient audio play blocked:', err);
      });
    } else {
      // Smooth fade out down to 0, then pause
      fadeAudioTo(0, 450, () => {
        audio.pause();
      });
      setIsMuted(true);
    }
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-minecraft font-bold uppercase tracking-widest text-[#ffaa00] bg-amber-950/60 border border-amber-500/30 px-3.5 py-1 rounded-full inline-block mb-3">
          Cinematic Real-Time Universe
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-minecraft font-bold text-white tracking-tight uppercase mc-shadow">
          A LIVING, BREATHING UNIVERSE
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed font-minecraft">
          Experience Minecraft with shader-grade volumetric atmospheres, realistic water caustics, and vast uninhibited landscapes.
        </p>
      </div>

      {/* Framed Gameplay Video Showcase */}
      <div className="max-w-5xl mx-auto w-full">
        <div className="mc-panel rounded-2xl p-3.5 sm:p-5 flex flex-col shadow-2xl relative overflow-hidden group">
          {/* Top Frame Status Bar */}
          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-800 text-[11px] font-minecraft">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#55ff55] animate-pulse" />
              <span className="text-white font-bold mc-shadow">
                LOVE PIXEL HAVEN • REALM 01
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-[#55ff55] border border-emerald-500/30 text-[10px]">
                VOLUMETRIC SHADERS • 60 FPS
              </span>
              <span className="text-slate-400 hidden sm:inline text-[10px]">
                v1.20 - 1.21.x
              </span>
            </div>
          </div>

          {/* Video Player Display */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl overflow-hidden mc-slot bg-black">
            <video
              ref={videoRef}
              poster="/assets/images/gameplay-showcase-poster.jpg"
              autoPlay
              loop
              muted
              playsInline
              onError={() => setHasError(true)}
              className="w-full h-full object-cover"
            >
              <source src="/assets/videos/gameplay-showcase.webm" type="video/webm" />
              <source src="/assets/videos/gameplay-showcase.mp4" type="video/mp4" />
              <p className="text-slate-400 p-4 text-xs font-minecraft">
                Your browser does not support the video tag.
              </p>
            </video>

            {/* Error Fallback */}
            {hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 text-center p-4">
                <p className="text-amber-400 font-minecraft text-xs mb-1">Gameplay video stream unavailable</p>
                <p className="text-slate-400 text-[10px] font-minecraft">Hardware video decoder initialized</p>
              </div>
            )}

            {/* Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Top-Left Live Realm Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 border border-emerald-500/40 text-[10px] font-minecraft text-[#55ff55] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55ff55] animate-pulse" />
              <span>EXPEDITION LIVE FEED</span>
            </div>

            {/* Top-Right Ambience Status Indicator */}
            {!isMuted && (
              <div className="absolute top-3 right-3 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/90 border border-emerald-500/40 text-[10px] font-minecraft text-emerald-300 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>NATURE AMBIENCE ACTIVE</span>
              </div>
            )}

            {/* Bottom Video Telemetry & Player Controls */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
              {/* Coordinates & World Tag */}
              <div className="hidden sm:flex items-center gap-2 text-[10px] font-minecraft text-slate-200 bg-black/75 px-3 py-1.5 rounded-lg border border-slate-700/80 backdrop-blur-md">
                <McCompass size={14} className="text-[#55ffff]" />
                <span>X: 1420 Y: 72 Z: -310</span>
                <span className="text-slate-500">•</span>
                <span className="text-[#55ff55]">20.0 TPS</span>
              </div>

              {/* Interactive Player Controls */}
              <div className="flex items-center gap-1.5 ml-auto bg-black/80 p-1 rounded-lg border border-slate-700/80 backdrop-blur-md">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  title={isPlaying ? 'Pause video' : 'Play video'}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-200 hover:text-white transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Enable nature ambience audio' : 'Mute nature ambience audio'}
                  title={isMuted ? 'Enable peaceful forest ambience (8% vol)' : 'Mute nature ambience'}
                  className={`p-1.5 rounded transition-colors cursor-pointer ${
                    !isMuted 
                      ? 'bg-emerald-950/80 text-emerald-300 hover:bg-emerald-900 border border-emerald-500/40' 
                      : 'hover:bg-slate-800 text-slate-200 hover:text-white'
                  }`}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#55ff55]" />}
                </button>

                <button
                  onClick={handleFullscreen}
                  aria-label="Expand fullscreen"
                  title="Expand fullscreen"
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-200 hover:text-white transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Caption & Architecture Details */}
          <div className="pt-3.5 mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] font-minecraft text-slate-300">
            <span className="text-white font-bold mc-shadow">
              WILDERNESS EXPEDITION & SANCTUARY
            </span>
            <span className="text-slate-400 text-[10px]">
              Alpine cliffs, lush aquifers & cherry groves • Gentle woodland creek ambience
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

