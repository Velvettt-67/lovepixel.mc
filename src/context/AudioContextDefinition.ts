import { createContext } from 'react';

export interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  volume: number;
  setVolume: (vol: number) => void;
  playXpOrb: (pitchVariation?: number) => void;
  audioEnabled: boolean;
  enableAudio: () => void;
}

export const AudioContext = createContext<AudioContextType | undefined>(undefined);
