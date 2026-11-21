import React, { useState, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../context/usePageTransition';
import type { BiomeType } from './introAudio';

interface CinematicWorldBackgroundProps {
  currentBiome?: BiomeType;
  isPrimed?: boolean;
  pulsePhase?: number;
  isExploding?: boolean;
  onBiomeChange?: (biome: BiomeType) => void;
}

interface BiomeScene {
  id: BiomeType;
  title: string;
  image: string;
  shaderInfo: string;
  gradingClass: string;
}

const BIOME_SCENES: BiomeScene[] = [
  {
    id: 'daylight',
    title: 'Overworld Daylight Vista',
    image: '/assets/images/lush-forest-river.jpeg',
    shaderInfo: 'BSL Shaders v8.2 — Daylight Sun & River Cavern',
    gradingClass: 'brightness-105 contrast-105 saturate-110',
  },
  {
    id: 'sunset',
    title: 'Citadel Haven at Sunset',
    image: '/assets/images/bsl-sunset-haven.jpeg',
    shaderInfo: 'BSL Shaders v8.2 — Golden Hour Volumetric Godrays',
    gradingClass: 'brightness-100 contrast-110 saturate-125 sepia-[0.15]',
  },
  {
    id: 'night',
    title: 'Celestial Aurora Midnight',
    image: '/assets/images/aurora-night.png',
    shaderInfo: 'Complementary Unbound — Nocturnal Aurora Borealis',
    gradingClass: 'brightness-95 contrast-115 hue-rotate-[5deg]',
  },
  {
    id: 'snowfall',
    title: 'Glacial Peaks & Snowy Taiga',
    image: '/assets/images/skyblock-peaks.png',
    shaderInfo: 'Complementary Unbound — Sub-Zero Glacial Atmospheric Fog',
    gradingClass: 'brightness-105 contrast-105 saturate-90',
  },
  {
    id: 'cherry',
    title: 'Cherry Blossom Grove',
    image: '/assets/images/cherry-grove.png',
    shaderInfo: 'Complementary Reimagined — Volumetric Sakura Bloom',
    gradingClass: 'brightness-105 contrast-105 saturate-115',
  },
];

export const CinematicWorldBackground: React.FC<CinematicWorldBackgroundProps> = ({
  currentBiome: propBiome,
  isPrimed = false,
  pulsePhase = 0,
  isExploding = false,
  onBiomeChange,
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [internalBiomeIndex, setInternalBiomeIndex] = useState(1); // Default to Sunset Haven
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeBiomeIndex = propBiome
    ? Math.max(0, BIOME_SCENES.findIndex(s => s.id === propBiome))
    : internalBiomeIndex;

  // World Tour Cycle: Gently transition through all 5 Minecraft biomes
  useEffect(() => {
    if (propBiome) return; // Controlled externally

    const cycleTimer = setInterval(() => {
      setInternalBiomeIndex(prev => {
        const next = (prev + 1) % BIOME_SCENES.length;
        if (onBiomeChange) {
          onBiomeChange(BIOME_SCENES[next].id);
        }
        return next;
      });
    }, 7000); // 7.0s per biome with 1.2s smooth crossfade

    return () => clearInterval(cycleTimer);
  }, [propBiome, onBiomeChange]);

  const activeScene = BIOME_SCENES[activeBiomeIndex];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#080a0f] pointer-events-none select-none">
      {/* ---------------- 1. HIGH-RES POSTER & FALLBACK SHADER CAPTURE ---------------- */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/intro-cinematic-poster.jpg"
          alt="Love Pixel Minecraft Cinematic Scenery"
          className="w-full h-full object-cover brightness-95 contrast-105"
        />
      </div>

      {/* ---------------- 2. PRIMARY 4-BIOME CINEMATIC VIDEO (1080p 30fps) ---------------- */}
      <div className="absolute inset-0 z-1 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/images/intro-cinematic-poster.jpg"
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover object-center transition-opacity duration-700 ${
            videoLoaded ? 'opacity-100 contrast-100 saturate-100' : 'opacity-0'
          }`}
          style={{
            transform: 'none',
          }}
        >
          <source src="/assets/videos/intro-cinematic.mp4" type="video/mp4" />
          <source src="/assets/videos/intro-cinematic.webm" type="video/webm" />
        </video>
      </div>

      {/* ---------------- 3. PROCEDURAL WEATHER & ATMOSPHERIC PARTICLE LAYERS ---------------- */}
      {/* Snowfall Biome Particle Layer */}
      {activeScene.id === 'snowfall' && !prefersReducedMotion && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {Array.from({ length: 36 }).map((_, i) => {
            const left = (i * 2.8) % 100;
            const delay = (i * 0.23) % 4;
            const duration = 3.5 + (i % 5) * 0.7;
            const size = 3 + (i % 3) * 2;
            return (
              <div
                key={`snow-${i}`}
                className="absolute bg-white/85 rounded-none shadow-[0_0_4px_white] animate-snow-fall"
                style={{
                  left: `${left}%`,
                  top: '-10px',
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`,
                  imageRendering: 'pixelated',
                }}
              />
            );
          })}
        </div>
      )}

      {/* Cherry Blossom Grove Sakura Petal Layer */}
      {activeScene.id === 'cherry' && !prefersReducedMotion && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {Array.from({ length: 32 }).map((_, i) => {
            const left = (i * 3.1) % 100;
            const delay = (i * 0.28) % 5;
            const duration = 4.2 + (i % 4) * 0.9;
            const size = 5 + (i % 3) * 2;
            return (
              <div
                key={`petal-${i}`}
                className="absolute bg-pink-300/80 rounded-sm shadow-[0_0_5px_rgba(244,114,182,0.6)] animate-cherry-fall"
                style={{
                  left: `${left}%`,
                  top: '-10px',
                  width: `${size}px`,
                  height: `${size * 0.75}px`,
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`,
                  imageRendering: 'pixelated',
                }}
              />
            );
          })}
        </div>
      )}

      {/* Night Sky Celestial Star Twinkles */}
      {activeScene.id === 'night' && !prefersReducedMotion && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {Array.from({ length: 24 }).map((_, i) => {
            const left = (i * 4.2 + 7) % 95;
            const top = (i * 3.3 + 5) % 50;
            const delay = (i * 0.35) % 3;
            return (
              <div
                key={`star-${i}`}
                className="absolute w-1.5 h-1.5 bg-[#fef08a] rounded-none shadow-[0_0_3px_rgba(254,240,138,0.8)] animate-pulse"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDuration: `${2.0 + (i % 3) * 0.8}s`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* ---------------- 4. TNT ENVIRONMENTAL LIGHTING REACTIONS ---------------- */}
      {/* Warm Fuse Priming Glow on Landscape */}
      {isPrimed && (
        <div
          className="absolute inset-0 z-15 pointer-events-none transition-opacity duration-100"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(251, 146, 60, ${
              0.15 + pulsePhase * 0.22
            }) 0%, rgba(239, 68, 68, ${0.08 + pulsePhase * 0.12}) 35%, transparent 65%)`,
          }}
        />
      )}

      {/* Explosion Blinding Flash on Surrounding Blocks */}
      {isExploding && (
        <div
          className="absolute inset-0 z-30 bg-white pointer-events-none animate-explosion-flash"
          style={{
            animationDuration: '400ms',
          }}
        />
      )}

      {/* ---------------- 5. ATMOSPHERIC VIGNETTE & DEPTH GRADIENT ---------------- */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#080a0f]/40 via-transparent to-[#080a0f]/25 pointer-events-none" />
      <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(8,10,15,0.40)_100%)] pointer-events-none" />

    </div>
  );
};
