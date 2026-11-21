import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAudio } from '../../context/useAudio';
import { usePrefersReducedMotion } from '../../context/usePageTransition';
import { TntVoxelBlock } from './TntVoxelBlock';
import { ItemScatterSystem } from './ItemScatterSystem';
import { CinematicTitleReveal } from './CinematicTitleReveal';
import { CinematicWorldBackground } from './CinematicWorldBackground';
import { introAudio, type BiomeType } from './introAudio';

interface CinematicIntroProps {
  forceShow?: boolean;
  onFinish?: () => void;
}

type IntroStage =
  | 'idle'
  | 'tnt_falling'
  | 'tnt_primed'
  | 'exploding'
  | 'title_reveal'
  | 'transitioning_out'
  | 'finished';

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  forceShow = false,
  onFinish,
}) => {
  const { isMuted, enableAudio, volume } = useAudio();
  const prefersReducedMotion = usePrefersReducedMotion();

  // In-memory state: Every full browser load or refresh starts fresh at frame 1!
  // Client-side SPA navigation preserves hasEnteredSite=true so it does not replay during browsing.
  const [hasEnteredSite, setHasEnteredSite] = useState<boolean>(false);

  const [stage, setStage] = useState<IntroStage>(() => {
    return prefersReducedMotion ? 'title_reveal' : 'tnt_falling';
  });

  const [currentBiome, setCurrentBiome] = useState<BiomeType>('sunset');
  const [tntY, setTntY] = useState(-420);
  const [tntBounceScale, setTntBounceScale] = useState({ x: 1, y: 1 });
  const [pulsePhase, setPulsePhase] = useState(0);
  const [fuseSparkCount, setFuseSparkCount] = useState(0);
  const [countdownProgress, setCountdownProgress] = useState(0);
  const [screenShake, setScreenShake] = useState(0);
  const [isExplosionActive, setIsExplosionActive] = useState(false);
  const [clearingCenter, setClearingCenter] = useState(false);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState<boolean>(false);

  const [replayKey, setReplayKey] = useState(0);

  const isMutedRef = useRef(isMuted);
  const volumeRef = useRef(volume);
  useEffect(() => {
    isMutedRef.current = isMuted;
    volumeRef.current = volume;
  }, [isMuted, volume]);

  const fuseStopperRef = useRef<{ stop: () => void } | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timersRef = useRef<number[]>([]);

  const addTimer = (cb: () => void, ms: number) => {
    const id = window.setTimeout(cb, ms);
    timersRef.current.push(id);
    return id;
  };

  const clearAllTimers = () => {
    timersRef.current.forEach(id => clearTimeout(id));
    timersRef.current = [];
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (fuseStopperRef.current) {
      fuseStopperRef.current.stop();
      fuseStopperRef.current = null;
    }
  };

  // Preload audio and verify browser autoplay permission on mount
  useEffect(() => {
    let isMounted = true;

    // Preload all assets upfront
    introAudio.preloadAll().catch(() => {});

    // Inspect browser autoplay permissions
    introAudio.checkAutoplayAllowed().then(allowed => {
      if (!isMounted) return;
      if (!allowed) {
        setIsAutoplayBlocked(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle user starting cinematic with sound if autoplay was restricted
  const handleStartWithSound = useCallback(async () => {
    setIsAutoplayBlocked(false);
    enableAudio();
    await introAudio.unlockOnUserGesture();

    clearAllTimers();
    introAudio.stopAll();

    setStage('tnt_falling');
    setTntY(-420);
    setIsExplosionActive(false);
    setClearingCenter(false);
    setCountdownProgress(0);
    setReplayKey(k => k + 1);
  }, [enableAudio]);

  // Listen for external replay request (from footer "Replay Intro" button)
  useEffect(() => {
    const handleReplay = () => {
      clearAllTimers();
      introAudio.stopAll();
      setHasEnteredSite(false);
      setIsExplosionActive(false);
      setClearingCenter(false);
      setCountdownProgress(0);
      setStage('tnt_falling');
      setTntY(-420);
      setReplayKey(k => k + 1);
    };
    window.addEventListener('pixel_mc_replay_intro', handleReplay);
    return () => {
      window.removeEventListener('pixel_mc_replay_intro', handleReplay);
    };
  }, []);

  // Main synchronized cinematic choreography (single authoritative timeline)
  useEffect(() => {
    if (hasEnteredSite || prefersReducedMotion) return;

    clearAllTimers();

    const canPlayAudio = !isMutedRef.current && !isAutoplayBlocked;

    // Stage A: Start Environmental Ambience for Sunset
    if (canPlayAudio) {
      introAudio.setBiomeAmbience('sunset', volumeRef.current * 0.25);
    }

    // 1. TNT Falling from Sky (0ms to 700ms)
    const startTime = performance.now();
    const dropDuration = 700;

    const animateDrop = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / dropDuration, 1);
      const easeY = progress * progress;
      setTntY(-420 + easeY * 420);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateDrop);
      } else {
        // Impact Bounce & Squash (700ms to 900ms)
        setTntY(0);
        setTntBounceScale({ x: 1.15, y: 0.85 });
        addTimer(() => setTntBounceScale({ x: 0.95, y: 1.05 }), 100);
        addTimer(() => setTntBounceScale({ x: 1, y: 1 }), 200);

        // 2. STAGE B & C: FUSE IGNITION & TIMED COUNTDOWN (Starts at exactly 900ms)
        addTimer(() => {
          setStage('tnt_primed');
          const fuseDuration = 3200; // 3.20 seconds countdown

          // Synchronized fuse sound starts at the exact ignition millisecond
          if (canPlayAudio) {
            fuseStopperRef.current = introAudio.playFuse(volumeRef.current * 0.85, 3.2);
          }

          const countdownStart = performance.now();
          let sparkTicks = 0;

          // Unified countdown tick (every 50ms) driving sparks, white flashing, and primer glow
          const countdownInterval = window.setInterval(() => {
            const timeElapsed = performance.now() - countdownStart;
            const progress = Math.min(1, timeElapsed / fuseDuration);
            setCountdownProgress(progress);

            sparkTicks++;
            setFuseSparkCount(sparkTicks);

            // Progressive flash rate: accelerates as countdown approaches zero
            const flashFrequency = 1.0 + progress * 2.0;
            setPulsePhase((sparkTicks * 0.12 * flashFrequency) % 1.0);
          }, 50);

          // 3. STAGE D: EXACT MOMENT OF EXPLOSION (Ends fuse, triggers blast visual & audio)
          addTimer(() => {
            clearInterval(countdownInterval);
            if (fuseStopperRef.current) {
              fuseStopperRef.current.stop();
              fuseStopperRef.current = null;
            }

            // Guarded single explosion event
            setStage('exploding');
            setIsExplosionActive(true);
            setScreenShake(14);

            // Explosion sound & stereo debris impacts fire at the exact blast millisecond
            if (canPlayAudio) {
              introAudio.playExplosion(volumeRef.current * 0.95);
            }

            // Screen shake dampening
            addTimer(() => setScreenShake(7), 90);
            addTimer(() => setScreenShake(-4), 180);
            addTimer(() => setScreenShake(0), 300);

            // Stage E & F: Center clears for title, items settle
            addTimer(() => setClearingCenter(true), 400);

            // 4. STAGE G: Reveal LOVE PIXEL 3D Title (at 5.05s)
            addTimer(() => {
              setStage('title_reveal');
            }, 950);
          }, fuseDuration);
        }, 200);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animateDrop);

    return () => {
      clearAllTimers();
      introAudio.stopAll();
    };
  }, [hasEnteredSite, prefersReducedMotion, replayKey, isAutoplayBlocked]);

  // Handle user activating "TAP TO ENTER"
  const handleEnterWorld = useCallback(() => {
    if (stage === 'transitioning_out' || stage === 'finished') return;

    setStage('transitioning_out');

    // 1. Play glorious level-up entry sting
    if (!isMutedRef.current) {
      introAudio.playEntrySting(volumeRef.current * 0.75);
    }

    // 2. Unmute & prime existing ambient audio system seamlessly
    enableAudio();
    introAudio.handoffToSite(650);

    // 3. Complete intro and dissolve into real website
    addTimer(() => {
      setHasEnteredSite(true);
      setStage('finished');
      if (onFinish) onFinish();
    }, 650);
  }, [stage, enableAudio, onFinish]);

  // Instant Skip Intro function
  const handleSkipIntro = useCallback(() => {
    clearAllTimers();
    introAudio.stopAll();
    enableAudio();
    setHasEnteredSite(true);
    setStage('finished');
    if (onFinish) onFinish();
  }, [enableAudio, onFinish]);

  // Keyboard activation: Enter or Space to enter world once intro finishes; Escape to skip immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkipIntro();
        return;
      }
      if (stage === 'title_reveal' && (e.code === 'Space' || e.code === 'Enter')) {
        e.preventDefault();
        handleEnterWorld();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [stage, handleEnterWorld, handleSkipIntro]);

  // If already entered and not forced to show, do not render overlay
  if (hasEnteredSite && !forceShow && stage === 'finished') {
    return null;
  }

  const isTntVisible = stage === 'tnt_falling' || stage === 'tnt_primed';
  const groundShadowScale = Math.max(0.2, 1 - Math.abs(tntY) / 420);

  return (
    <AnimatePresence>
      <motion.div
        key="pixel-mc-cinematic-intro"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === 'transitioning_out' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#080a0f] select-none"
        style={{
          transform: screenShake !== 0 ? `translate(${screenShake}px, ${-screenShake * 0.7}px)` : 'none',
        }}
      >
        {/* ----------------- 1. CINEMATIC MINECRAFT WORLD BACKGROUND ----------------- */}
        <CinematicWorldBackground
          currentBiome={currentBiome}
          isPrimed={stage === 'tnt_primed'}
          pulsePhase={pulsePhase}
          isExploding={stage === 'exploding'}
          onBiomeChange={setCurrentBiome}
        />

        {/* ----------------- 2. AUTOPLAY FALLBACK ACTIVATION CONTROL ----------------- */}
        {isAutoplayBlocked && stage !== 'title_reveal' && stage !== 'transitioning_out' && (
          <div className="absolute top-8 sm:top-10 z-40 flex items-center justify-center animate-bounce">
            <button
              onClick={handleStartWithSound}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-[#55ff55] hover:bg-[#80ff20] text-slate-950 font-minecraft font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-[0_0_35px_rgba(85,255,85,0.7)] border-2 border-emerald-300 flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="TAP TO START CINEMATIC WITH SOUND"
            >
              <span className="text-base sm:text-lg">🔊</span>
              <span>TAP TO START CINEMATIC WITH SOUND</span>
            </button>
          </div>
        )}

        {/* ----------------- 3. INSTANT SKIP INTRO BUTTON ----------------- */}
        {stage !== 'finished' && stage !== 'transitioning_out' && (
          <button
            onClick={handleSkipIntro}
            className="absolute top-5 right-5 z-40 px-3.5 py-1.5 rounded-lg bg-black/60 hover:bg-black/85 border border-slate-700/80 hover:border-emerald-500/60 text-[11px] font-minecraft text-slate-300 hover:text-[#55ff55] uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer flex items-center gap-2 shadow-lg"
            title="Skip Intro (Escape)"
            aria-label="Skip Intro"
          >
            <span>Skip Intro</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">ESC</span>
          </button>
        )}

        {/* ----------------- 4. 3D TNT BLOCK & GROUND SHADOW ----------------- */}
        {isTntVisible && (
          <div
            className="absolute z-10 flex flex-col items-center pointer-events-none"
            style={{
              transform: `translateY(${tntY}px) scale(${tntBounceScale.x}, ${tntBounceScale.y})`,
              transition: 'transform 0.05s ease-out',
            }}
          >
            {/* Ground Contact Shadow */}
            <div
              className="absolute top-[108px] pointer-events-none"
              style={{
                width: '130px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                transform: `scale(${groundShadowScale})`,
                filter: 'blur(4px)',
                opacity: groundShadowScale,
              }}
            />

            {/* 3D Voxel TNT Block with Progressive Countdown Dynamics */}
            <TntVoxelBlock
              isPrimed={stage === 'tnt_primed'}
              pulsePhase={pulsePhase}
              fuseSparkCount={fuseSparkCount}
              countdownProgress={countdownProgress}
            />
          </div>
        )}

        {/* ----------------- 5. EXPLOSION & ITEM SCATTER SYSTEM ----------------- */}
        <ItemScatterSystem
          isActive={isExplosionActive}
          clearingCenter={clearingCenter}
        />

        {/* ----------------- 6. 3D TITLE REVEAL & TAP TO ENTER ----------------- */}
        <CinematicTitleReveal
          isVisible={stage === 'title_reveal' || stage === 'transitioning_out'}
          onEnter={handleEnterWorld}
          isTransitioningOut={stage === 'transitioning_out'}
        />

        {/* ----------------- 7. CINEMATIC PASS-THROUGH TRANSITION ON ENTER ----------------- */}
        {stage === 'transitioning_out' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-40 bg-gradient-to-b from-[#80ff20]/20 via-transparent to-black pointer-events-none"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};
