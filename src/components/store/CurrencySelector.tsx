import React from 'react';
import { useCurrency } from '../../context/useCurrency';
import { useAudio } from '../../context/useAudio';
import type { CurrencyCode } from '../../config/currencyConfig';

interface CurrencySelectorProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  className = '',
  variant = 'full',
}) => {
  const { currency, setCurrency } = useCurrency();
  const { playXpOrb } = useAudio();

  const handleSelect = (code: CurrencyCode) => {
    if (code !== currency) {
      setCurrency(code);
      playXpOrb(1.1);
    }
  };

  return (
    <div
      role="group"
      aria-label="Currency selection"
      className={`inline-flex items-center p-1 rounded-xl bg-slate-950/80 border border-slate-800 backdrop-blur-md shadow-inner ${className}`}
    >
      <button
        type="button"
        onClick={() => handleSelect('USD')}
        aria-pressed={currency === 'USD'}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-minecraft font-bold tracking-wider transition-all duration-200 cursor-pointer ${
          currency === 'USD'
            ? 'bg-emerald-500/20 text-[#55ff55] border border-emerald-500/50 shadow-[0_0_12px_rgba(85,255,85,0.25)]'
            : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
        }`}
      >
        <span className="font-bold text-xs">$</span>
        <span>USD</span>
        {variant === 'full' && <span className="hidden sm:inline text-[10px] text-slate-500 font-mono">(US$)</span>}
      </button>

      <button
        type="button"
        onClick={() => handleSelect('INR')}
        aria-pressed={currency === 'INR'}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-minecraft font-bold tracking-wider transition-all duration-200 cursor-pointer ${
          currency === 'INR'
            ? 'bg-emerald-500/20 text-[#55ff55] border border-emerald-500/50 shadow-[0_0_12px_rgba(85,255,85,0.25)]'
            : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
        }`}
      >
        <span className="font-bold text-xs">₹</span>
        <span>INR</span>
        {variant === 'full' && <span className="hidden sm:inline text-[10px] text-slate-500 font-mono">(₹)</span>}
      </button>
    </div>
  );
};
