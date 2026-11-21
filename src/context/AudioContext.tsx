import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AudioContext } from './AudioContextDefinition';

const STORAGE_MUTED_KEY = 'pixel_mc_audio_muted_v1';
const STORAGE_VOLUME_KEY = 'pixel_mc_audio_volume_v1';
const DEFAULT_VOLUME = 0.08; // 8% volume as per requirement (5-10%)

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_MUTED_KEY);
      return stored !== null ? JSON.parse(stored) : false; // Default unmuted so intro plays audibly where autoplay is permitted
    } catch {
      return false;
    }
  });

  const [volume, setVolumeState] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_VOLUME_KEY);
      return stored !== null ? parseFloat(stored) : DEFAULT_VOLUME;
    } catch {
      return DEFAULT_VOLUME;
    }
  });

  const volumeRef = useRef(volume);
  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const ambientTimerRef = useRef<number | null>(null);

  // Web Audio nodes for the continuous ambient background bed (zero silence)
  const ambientGainRef = useRef<GainNode | null>(null);
  const ambientOscsRef = useRef<OscillatorNode[]>([]);

  // Initialize audio element
  useEffect(() => {
    try {
      const audio = new Audio('/assets/audio/xp_orb.ogg');
      audio.volume = volumeRef.current;
      audio.preload = 'auto';
      audioElementRef.current = audio;
    } catch {
      // Audio element not supported, synth fallback will be used
    }

    return () => {
      if (ambientTimerRef.current) {
        clearTimeout(ambientTimerRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Update volume on audio element and ambient gain
  useEffect(() => {
    if (audioElementRef.current) {
      audioElementRef.current.volume = volume;
    }
    if (ambientGainRef.current && audioContextRef.current) {
      try {
        const now = audioContextRef.current.currentTime;
        const targetVol = isMuted ? 0 : volume * 0.15;
        ambientGainRef.current.gain.linearRampToValueAtTime(targetVol, now + 0.2);
      } catch {
        // ignore
      }
    }
  }, [volume, isMuted]);

  // Save volume and muted states
  const setVolume = (newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolumeState(clamped);
    if (audioElementRef.current) {
      audioElementRef.current.volume = clamped;
    }
    try {
      localStorage.setItem(STORAGE_VOLUME_KEY, clamped.toString());
    } catch {
      // ignore
    }
  };

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume().catch(() => {});
    }
    return audioContextRef.current;
  }, []);

  // Continuous subtle Minecraft atmospheric ambient pad (zero dead silence)
  const startContinuousAmbientBed = useCallback(() => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      // Stop existing if any
      ambientOscsRef.current.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      ambientOscsRef.current = [];

      const masterGain = ctx.createGain();
      const now = ctx.currentTime;
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(volume * 0.15, now + 1.5);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(380, now); // Warm, gentle low-pass cutoff

      // Gentle C418-inspired pentatonic harmonic drone (C3, G3, D4)
      const frequencies = [130.81, 196.0, 293.66];
      const oscs = frequencies.map((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq + (idx === 1 ? 0.3 : 0), now);

        const subGain = ctx.createGain();
        subGain.gain.setValueAtTime(idx === 0 ? 0.6 : 0.35, now);

        osc.connect(subGain);
        subGain.connect(filter);
        osc.start(now);
        return osc;
      });

      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      ambientGainRef.current = masterGain;
      ambientOscsRef.current = oscs;
    } catch {
      // Audio autoplay blocked
    }
  }, [getAudioContext, volume]);

  const stopContinuousAmbientBed = useCallback(() => {
    try {
      if (ambientGainRef.current && audioContextRef.current) {
        const now = audioContextRef.current.currentTime;
        ambientGainRef.current.gain.linearRampToValueAtTime(0.0001, now + 0.4);
      }
      setTimeout(() => {
        ambientOscsRef.current.forEach(osc => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // ignore
          }
        });
        ambientOscsRef.current = [];
      }, 500);
    } catch {
      // ignore
    }
  }, []);

  // High-fidelity procedural Web Audio synth fallback
  const playSynthesizedXpOrb = useCallback(
    (pitch = 1.0) => {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        // Minecraft XP orb base frequencies: rapid frequency shimmer ~1200Hz up to 1800Hz
        const baseFreq = 1350 * pitch;
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, now + 0.08);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(volume * 0.7, now + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.2);
      } catch {
        // Audio blocked or unavailable
      }
    },
    [getAudioContext, volume]
  );

  // Main XP Orb pickup playback function
  const playXpOrb = useCallback(
    (pitchVariation = 1.0) => {
      if (isMuted) return;

      if (audioElementRef.current) {
        const audio = audioElementRef.current.cloneNode(true) as HTMLAudioElement;
        audio.volume = Math.min(1, volume * 0.85);
        // Pitch variation (0.9 to 1.25) like authentic Minecraft random orb pitch
        audio.playbackRate = pitchVariation;
        audio.play().catch(() => {
          // Autoplay or decode blocked, trigger synth fallback
          playSynthesizedXpOrb(pitchVariation);
        });
      } else {
        playSynthesizedXpOrb(pitchVariation);
      }
    },
    [isMuted, volume, playSynthesizedXpOrb]
  );

  const toggleMute = () => {
    setIsMuted(prev => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_MUTED_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      if (!next) {
        // Enabled audio! Trigger instant chime confirmation
        setAudioEnabled(true);
        startContinuousAmbientBed();
        setTimeout(() => playXpOrb(1.0), 60);
      } else {
        stopContinuousAmbientBed();
      }
      return next;
    });
  };

  const enableAudio = () => {
    setAudioEnabled(true);
    if (isMuted) {
      setIsMuted(false);
      try {
        localStorage.setItem(STORAGE_MUTED_KEY, JSON.stringify(false));
      } catch {
        // ignore
      }
      startContinuousAmbientBed();
      setTimeout(() => playXpOrb(1.0), 60);
    }
  };

  // Continuous Minecraft XP Orb Pickup ambience loop (nearly gapless, 2.8 - 4.2s intervals)
  useEffect(() => {
    if (isMuted || !audioEnabled) {
      if (ambientTimerRef.current) {
        clearTimeout(ambientTimerRef.current);
        ambientTimerRef.current = null;
      }
      stopContinuousAmbientBed();
      return;
    }

    // Start continuous harmonic bed
    startContinuousAmbientBed();

    let isRunning = true;

    const playAmbientStreamLoop = () => {
      if (!isRunning) return;

      // Subtle organic pitch shift (0.92 to 1.14) replicating authentic continuous XP orb pickup stream
      const pitch = 0.92 + Math.random() * 0.22;
      playXpOrb(pitch);

      // Repeat rhythmically every 2.8 to 4.2 seconds — zero noticeable silence!
      const nextDelay = Math.floor(2800 + Math.random() * 1400);
      ambientTimerRef.current = window.setTimeout(playAmbientStreamLoop, nextDelay);
    };

    // First chime after smooth 500ms lead-in
    ambientTimerRef.current = window.setTimeout(playAmbientStreamLoop, 500);

    return () => {
      isRunning = false;
      if (ambientTimerRef.current) {
        clearTimeout(ambientTimerRef.current);
        ambientTimerRef.current = null;
      }
    };
  }, [isMuted, audioEnabled, playXpOrb, startContinuousAmbientBed, stopContinuousAmbientBed]);

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        toggleMute,
        volume,
        setVolume,
        playXpOrb,
        audioEnabled,
        enableAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
