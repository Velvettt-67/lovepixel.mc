import { createContext } from 'react';

export interface PageTransitionContextType {
  homeTransitionKey: number;
  triggerHomeReturn: () => void;
}

export const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);
