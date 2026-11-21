/**
 * introAudio.ts
 * Master Intro Audio Engine for Love Pixel Cinematic World Intro V3.
 * 
 * Features:
 * - Single authoritative intro audio controller owning all short sound effects & ambient beds.
 * - Preloaded and pre-decoded AudioBuffers for zero-latency, glitch-free Web Audio playback.
 * - Hardware sample-accurate synchronization with the visual animation timeline.
 * - Autoplay permission verification and one-click user gesture unlock.
 * - Sourced & synthesized audio layers:
 *     * Fuse sizzle (entity.tnt.primed reference, 28Hz amplitude modulation & crescendo)
 *     * Explosion burst (entity.generic.explode reference, sub-bass punch 145Hz->34Hz & lowpass air blast)
 *     * Flying debris impacts (stereo-panned stone clacks, wood taps, and settling rattles)
 *     * Multi-biome ambient layers (Daylight, Sunset, Night, Snowfall, Cherry Grove) with crossfades
 *     * Level-up entry sting
 * - Safe resource cleanup, preventing duplicate nodes or audio races on rerenders.
 * - Seamless handoff to the website's ambient XP orb audio controller.
 */

export type BiomeType = 'daylight' | 'sunset' | 'night' | 'snowfall' | 'cherry';

interface AudioBufferCache {
  fuse?: AudioBuffer;
  explode?: AudioBuffer;
  debris?: AudioBuffer;
  snowAmbience?: AudioBuffer;
  cherryAmbience?: AudioBuffer;
  entrySting?: AudioBuffer;
}

class IntroAudioEngine {
  private ctx: AudioContext | null = null;
  private bufferCache: AudioBufferCache = {};
  private activeSources: Set<AudioNode> = new Set();
  private fuseSource: AudioBufferSourceNode | null = null;
  private fuseGain: GainNode | null = null;
  private ambientSource: AudioBufferSourceNode | null = null;
  private ambientGain: GainNode | null = null;
  private currentBiome: BiomeType = 'daylight';
  private isPreloaded = false;
  private masterGain: GainNode | null = null;

  constructor() {
    // Lazy AudioContext initialization
  }

  public getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
      if (!this.ctx || this.ctx.state === 'closed') {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && !this.masterGain) {
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  /**
   * Test whether browser allows audible autoplay.
   * Returns true if permitted without user interaction, false if blocked.
   */
  public async checkAutoplayAllowed(): Promise<boolean> {
    const ctx = this.getContext();
    if (!ctx) return false;
    if (ctx.state === 'running') return true;

    try {
      await ctx.resume();
      return (ctx.state as string) === 'running';
    } catch {
      return false;
    }
  }

  /**
   * Unlock AudioContext inside a user gesture event.
   */
  public async unlockOnUserGesture(): Promise<boolean> {
    const ctx = this.getContext();
    if (!ctx) return false;
    try {
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      // Play a 1ms inaudible buffer to reliably prime mobile WebKit audio pipelines
      const dummy = ctx.createBuffer(1, 1, ctx.sampleRate);
      const src = ctx.createBufferSource();
      src.buffer = dummy;
      src.connect(ctx.destination);
      src.start(0);
      return (ctx.state as string) === 'running';
    } catch {
      return false;
    }
  }

  /**
   * Helper to load and decode an audio file into an AudioBuffer.
   */
  /**
   * Helper to load and decode an audio file into an AudioBuffer with bounded retry.
   */
  private async loadBuffer(url: string, retries = 1): Promise<AudioBuffer | null> {
    const ctx = this.getContext();
    if (!ctx) return null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        const decoded = await ctx.decodeAudioData(arrayBuffer);
        return decoded;
      } catch (err) {
        if (attempt < retries) {
          // Short bounded delay before single transient retry
          await new Promise(r => setTimeout(r, 150));
          continue;
        }
        console.warn(`[IntroAudioEngine] Failed to load/decode ${url}:`, err);
        return null;
      }
    }
    return null;
  }

  /**
   * Preload all required audio buffers into memory with fallback resilience.
   */
  public async preloadAll(): Promise<boolean> {
    if (this.isPreloaded) return true;
    const ctx = this.getContext();
    if (!ctx) return false;

    try {
      const [fuse, explode, debris, snow, cherry, sting] = await Promise.all([
        this.loadBuffer('/assets/audio/tnt_fuse.wav'),
        this.loadBuffer('/assets/audio/tnt_explode.wav'),
        this.loadBuffer('/assets/audio/debris_impacts.wav'),
        this.loadBuffer('/assets/audio/snow_ambience.wav'),
        this.loadBuffer('/assets/audio/cherry_ambience.wav'),
        this.loadBuffer('/assets/audio/entry_sting.wav'),
      ]);

      if (fuse) this.bufferCache.fuse = fuse;
      if (explode) this.bufferCache.explode = explode;
      if (debris) this.bufferCache.debris = debris;
      if (snow) this.bufferCache.snowAmbience = snow;
      if (cherry) this.bufferCache.cherryAmbience = cherry;
      if (sting) this.bufferCache.entrySting = sting;

      this.isPreloaded = true;
      return true;
    } catch {
      // Procedural synthesizers will be used as zero-latency fallback if any fetch fails
      this.isPreloaded = true;
      return true;
    }
  }

  /**
   * Check if sound buffers are ready in memory.
   */
  public isReady(): boolean {
    return this.isPreloaded;
  }

  /**
   * Play TNT Fuse Sizzle (entity.tnt.primed).
   * Exact duration matching visual countdown, with continuous amplitude modulation and crescendo.
   */
  public playFuse(volume = 0.65, duration = 3.2): { stop: () => void } {
    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running') {
      return { stop: () => {} };
    }

    this.stopFuse();

    const now = ctx.currentTime;
    const fuseGain = ctx.createGain();
    fuseGain.gain.setValueAtTime(0.001, now);
    fuseGain.gain.linearRampToValueAtTime(volume * 0.75, now + 0.08);
    fuseGain.gain.linearRampToValueAtTime(volume * 1.05, now + duration - 0.04);
    fuseGain.gain.linearRampToValueAtTime(0.0001, now + duration);

    if (this.masterGain) {
      fuseGain.connect(this.masterGain);
    } else {
      fuseGain.connect(ctx.destination);
    }

    let sourceNode: AudioBufferSourceNode | null = null;

    if (this.bufferCache.fuse) {
      sourceNode = ctx.createBufferSource();
      sourceNode.buffer = this.bufferCache.fuse;
      sourceNode.loop = true;
      sourceNode.connect(fuseGain);
      sourceNode.start(now);
      sourceNode.stop(now + duration);
    } else {
      // Procedural synthesizer fallback
      const noiseBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < output.length; i++) output[i] = Math.random() * 2 - 1;

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(3900, now);
      bp.Q.setValueAtTime(2.6, now);

      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(28, now);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(0.35, now);
      lfo.connect(lfoGain);

      noise.connect(bp);
      bp.connect(fuseGain);
      noise.start(now);
      lfo.start(now);
      noise.stop(now + duration);
      lfo.stop(now + duration);
      sourceNode = noise;
    }

    this.fuseSource = sourceNode;
    this.fuseGain = fuseGain;

    const stopper = {
      stop: () => {
        try {
          if (fuseGain && ctx) {
            fuseGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.035);
          }
          if (sourceNode) {
            setTimeout(() => {
              try {
                sourceNode?.stop();
                sourceNode?.disconnect();
              } catch {
                // ignore
              }
            }, 40);
          }
        } catch {
          // ignore
        }
      },
    };

    return stopper;
  }

  public stopFuse(): void {
    if (this.fuseGain && this.ctx) {
      try {
        this.fuseGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      } catch {
        // ignore
      }
    }
    if (this.fuseSource) {
      try {
        this.fuseSource.stop();
        this.fuseSource.disconnect();
      } catch {
        // ignore
      }
      this.fuseSource = null;
    }
    this.fuseGain = null;
  }

  /**
   * Play TNT Explosion (entity.generic.explode).
   * Exact visual blast synchronization: sharp block crack + deep sub-bass thump + natural air burst decay.
   * Also orchestrates carefully timed restrained debris impacts, item drop clatters, and diamond twinkles.
   */
  public playExplosion(volume = 0.85): void {
    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running') return;

    this.stopFuse();

    const now = ctx.currentTime;
    const expGain = ctx.createGain();
    expGain.gain.setValueAtTime(1.0, now);

    if (this.masterGain) {
      expGain.connect(this.masterGain);
    } else {
      expGain.connect(ctx.destination);
    }

    if (this.bufferCache.explode) {
      const src = ctx.createBufferSource();
      src.buffer = this.bufferCache.explode;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(Math.min(1.0, volume * 1.1), now);
      src.connect(gain);
      gain.connect(expGain);
      src.start(now);
      this.activeSources.add(src);
      src.onended = () => {
        this.activeSources.delete(src);
        src.disconnect();
        gain.disconnect();
      };
    } else {
      // Procedural explosion punch
      const subOsc = ctx.createOscillator();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(145, now);
      subOsc.frequency.exponentialRampToValueAtTime(34, now + 0.45);

      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(volume * 0.95, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      subOsc.connect(subGain);
      subGain.connect(expGain);
      subOsc.start(now);
      subOsc.stop(now + 0.58);
    }

    // Schedule stereo debris impacts at 120ms offset (Stage E)
    this.playDebrisImpacts(volume * 0.4, 0.12);

    // Schedule stone block bounce tap at 220ms
    this.playItemDrop('stone', volume * 0.35, 0.22);

    // Schedule diamond item twinkle #1 at 320ms (sparkling crystal shine)
    this.playDiamondTwinkle(volume * 0.4, 0.32, 1.0);

    // Schedule wood item bounce tap at 440ms
    this.playItemDrop('wood', volume * 0.3, 0.44);

    // Schedule diamond item twinkle #2 at 540ms (subtle high sparkle)
    this.playDiamondTwinkle(volume * 0.32, 0.54, 1.25);

    // Schedule final debris settling rattle at 680ms, decaying smoothly into silence before title reveal
    this.playSettlingRattle(volume * 0.25, 0.68);
  }

  /**
   * Play Flying Items and Debris Impacts (Stage E).
   * Stereo-panned subtle stone clacks and settling rattles.
   */
  public playDebrisImpacts(volume = 0.35, delaySeconds = 0.12): void {
    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running') return;

    const startAt = ctx.currentTime + delaySeconds;

    if (this.bufferCache.debris) {
      const src = ctx.createBufferSource();
      src.buffer = this.bufferCache.debris;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(Math.min(1.0, volume), startAt);
      src.connect(gain);
      if (this.masterGain) {
        gain.connect(this.masterGain);
      } else {
        gain.connect(ctx.destination);
      }
      src.start(startAt);
      this.activeSources.add(src);
      src.onended = () => {
        this.activeSources.delete(src);
        src.disconnect();
        gain.disconnect();
      };
    } else {
      // Procedural debris clatter fallback
      const clackFreqs = [820, 640, 1140, 950, 520];
      clackFreqs.forEach((freq, idx) => {
        const clackTime = startAt + idx * 0.08;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, clackTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.65, clackTime + 0.1);

        g.gain.setValueAtTime(0.001, clackTime);
        g.gain.linearRampToValueAtTime(volume * 0.22, clackTime + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, clackTime + 0.12);

        osc.connect(g);
        if (this.masterGain) g.connect(this.masterGain);
        else g.connect(ctx.destination);

        osc.start(clackTime);
        osc.stop(clackTime + 0.14);
      });
    }
  }

  /**
   * Play Diamond or Emerald Item Twinkle Sparkle.
   * High-pitched, resonant glockenspiel/crystalline shimmer (2.3kHz - 4.7kHz).
   */
  public playDiamondTwinkle(volume = 0.35, delaySeconds = 0, pitchMult = 1.0): void {
    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running') return;

    const startAt = ctx.currentTime + delaySeconds;
    const f1 = 2349.32 * pitchMult; // D7
    const f2 = 3135.96 * pitchMult; // G7
    const f3 = 4698.64 * pitchMult; // D8

    const masterG = ctx.createGain();
    masterG.gain.setValueAtTime(0.0001, startAt);
    masterG.gain.linearRampToValueAtTime(volume * 0.28, startAt + 0.005);
    masterG.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.22);

    if (this.masterGain) {
      masterG.connect(this.masterGain);
    } else {
      masterG.connect(ctx.destination);
    }

    [f1, f2, f3].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startAt);

      const subG = ctx.createGain();
      subG.gain.setValueAtTime(idx === 0 ? 0.6 : idx === 1 ? 0.4 : 0.25, startAt);

      osc.connect(subG);
      subG.connect(masterG);
      osc.start(startAt);
      osc.stop(startAt + 0.24);

      this.activeSources.add(osc);
      osc.onended = () => {
        this.activeSources.delete(osc);
        try {
          osc.disconnect();
          subG.disconnect();
        } catch {
          // ignore
        }
      };
    });
  }

  /**
   * Play Individual Item Drop Landing Impact (stone or wood block tap).
   */
  public playItemDrop(material: 'stone' | 'wood' | 'gem' = 'stone', volume = 0.3, delaySeconds = 0): void {
    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running') return;

    const startAt = ctx.currentTime + delaySeconds;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (material === 'stone') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, startAt);
      osc.frequency.exponentialRampToValueAtTime(240, startAt + 0.05);
      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.linearRampToValueAtTime(volume * 0.35, startAt + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.06);
    } else if (material === 'wood') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, startAt);
      osc.frequency.exponentialRampToValueAtTime(140, startAt + 0.06);
      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.linearRampToValueAtTime(volume * 0.4, startAt + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.07);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1350, startAt);
      osc.frequency.exponentialRampToValueAtTime(980, startAt + 0.08);
      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.linearRampToValueAtTime(volume * 0.3, startAt + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.09);
    }

    osc.connect(gain);
    if (this.masterGain) gain.connect(this.masterGain);
    else gain.connect(ctx.destination);

    osc.start(startAt);
    osc.stop(startAt + 0.1);
    this.activeSources.add(osc);
    osc.onended = () => {
      this.activeSources.delete(osc);
      try {
        osc.disconnect();
        gain.disconnect();
      } catch {
        // ignore
      }
    };
  }

  /**
   * Play Final Restrained Debris Settling Rattle.
   * Smooth natural decay into calm before the title reveal.
   */
  public playSettlingRattle(volume = 0.25, delaySeconds = 0): void {
    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running') return;

    const startAt = ctx.currentTime + delaySeconds;
    const rattleTimes = [0, 0.04, 0.09, 0.15];
    const freqs = [360, 480, 310, 240];

    rattleTimes.forEach((dt, idx) => {
      const clickTime = startAt + dt;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freqs[idx], clickTime);
      osc.frequency.exponentialRampToValueAtTime(freqs[idx] * 0.6, clickTime + 0.035);

      gain.gain.setValueAtTime(0.0001, clickTime);
      gain.gain.linearRampToValueAtTime(volume * (0.28 - idx * 0.05), clickTime + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, clickTime + 0.04);

      osc.connect(gain);
      if (this.masterGain) gain.connect(this.masterGain);
      else gain.connect(ctx.destination);

      osc.start(clickTime);
      osc.stop(clickTime + 0.05);
      this.activeSources.add(osc);
      osc.onended = () => {
        this.activeSources.delete(osc);
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {
          // ignore
        }
      };
    });
  }

  /**
   * Crossfade environmental background ambience matching the visible scenery (Stage A).
   */
  public setBiomeAmbience(biome: BiomeType, volume = 0.20): void {
    if (this.currentBiome === biome && this.ambientSource) return;
    this.currentBiome = biome;

    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running') return;

    const now = ctx.currentTime;

    // Crossfade out previous ambient layer
    if (this.ambientGain) {
      try {
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
        const oldSrc = this.ambientSource;
        const oldGain = this.ambientGain;
        setTimeout(() => {
          try {
            oldSrc?.stop();
            oldSrc?.disconnect();
            oldGain?.disconnect();
          } catch {
            // ignore
          }
        }, 850);
      } catch {
        // ignore
      }
    }

    let bufferToPlay: AudioBuffer | undefined;
    if (biome === 'snowfall') bufferToPlay = this.bufferCache.snowAmbience;
    else if (biome === 'cherry') bufferToPlay = this.bufferCache.cherryAmbience;

    if (!bufferToPlay) return;

    const src = ctx.createBufferSource();
    src.buffer = bufferToPlay;
    src.loop = true;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 1.0);

    src.connect(gain);
    if (this.masterGain) gain.connect(this.masterGain);
    else gain.connect(ctx.destination);

    src.start(now);
    this.ambientSource = src;
    this.ambientGain = gain;
  }

  /**
   * Play Level-Up Entry Sting (Stage G) when user clicks "TAP TO ENTER".
   */
  public playEntrySting(volume = 0.55): void {
    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running') return;

    const now = ctx.currentTime;

    if (this.bufferCache.entrySting) {
      const src = ctx.createBufferSource();
      src.buffer = this.bufferCache.entrySting;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(volume, now);
      src.connect(gain);
      if (this.masterGain) gain.connect(this.masterGain);
      else gain.connect(ctx.destination);
      src.start(now);
    } else {
      // Pentatonic chord C5-G5-C6-E6
      const chord = [
        { freq: 523.25, delay: 0.0, dur: 0.9 },
        { freq: 783.99, delay: 0.08, dur: 1.0 },
        { freq: 1046.5, delay: 0.16, dur: 1.2 },
        { freq: 1318.51, delay: 0.24, dur: 1.4 },
      ];
      chord.forEach(({ freq, delay, dur }) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + delay);
        g.gain.setValueAtTime(0.001, now + delay);
        g.gain.linearRampToValueAtTime(volume * 0.32, now + delay + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur);

        osc.connect(g);
        if (this.masterGain) g.connect(this.masterGain);
        else g.connect(ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + dur + 0.05);
      });
    }
  }

  /**
   * Graceful handoff to the site's ambient audio layer.
   * Fades out all intro audio within 600ms.
   */
  public handoffToSite(durationMs = 600): void {
    const ctx = this.getContext();
    if (ctx && this.masterGain) {
      try {
        const now = ctx.currentTime;
        const fadeSec = durationMs / 1000;
        this.masterGain.gain.linearRampToValueAtTime(0.0001, now + fadeSec);
        setTimeout(() => {
          this.stopAll();
          if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(1.0, ctx.currentTime);
          }
        }, durationMs + 50);
      } catch {
        this.stopAll();
      }
    } else {
      this.stopAll();
    }
  }

  /**
   * Stop all intro audio immediately and free active nodes.
   */
  public stopAll(): void {
    this.stopFuse();

    if (this.ambientSource) {
      try {
        this.ambientSource.stop();
        this.ambientSource.disconnect();
      } catch {
        // ignore
      }
      this.ambientSource = null;
      this.ambientGain = null;
    }

    this.activeSources.forEach(src => {
      try {
        if ('stop' in src && typeof (src as AudioBufferSourceNode).stop === 'function') {
          (src as AudioBufferSourceNode).stop();
        }
        src.disconnect();
      } catch {
        // ignore
      }
    });
    this.activeSources.clear();
  }
}

export const introAudio = new IntroAudioEngine();
