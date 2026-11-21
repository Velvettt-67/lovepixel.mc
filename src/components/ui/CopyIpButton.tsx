import React, { useState } from 'react';
import { Copy, Check, Server } from 'lucide-react';
import { SERVER_CONFIG } from '../../config/serverConfig';
import { useCart } from '../../context/useCart';
import { useAudio } from '../../context/useAudio';

interface CopyIpButtonProps {
  variant?: 'primary' | 'compact' | 'hero';
  className?: string;
}

export const CopyIpButton: React.FC<CopyIpButtonProps> = ({
  variant = 'hero',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useCart();
  const { playXpOrb } = useAudio();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_CONFIG.serverAddress);
      setCopied(true);
      playXpOrb(1.15); // Authentic high-pitch XP orb chime on copy!
      showToast(`Server IP copied: ${SERVER_CONFIG.serverAddress}`);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      showToast(`Server Address: ${SERVER_CONFIG.serverAddress}`);
    }
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleCopy}
        aria-label="Copy server IP address"
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 border cursor-pointer ${
          copied
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_10px_rgba(85,255,85,0.3)]'
            : 'bg-slate-900/60 text-slate-300 border-slate-700/60 hover:border-emerald-500/40 hover:text-white'
        } ${className}`}
      >
        <Server className="w-3.5 h-3.5 text-emerald-400" />
        <span className="font-minecraft text-[11px]">{SERVER_CONFIG.serverAddress}</span>
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
        )}
      </button>
    );
  }

  return (
    <div className={`relative inline-flex flex-col items-center sm:items-start ${className}`}>
      <button
        onClick={handleCopy}
        aria-label="Click to copy server IP address"
        className={`group relative flex items-center justify-between gap-4 px-5 py-3.5 rounded-xl border backdrop-blur-md transition-all duration-300 shadow-xl overflow-hidden cursor-pointer ${
          copied
            ? 'bg-emerald-950/70 border-emerald-500/60 shadow-[0_0_25px_rgba(85,255,85,0.3)]'
            : 'mc-panel hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-lg transition-colors mc-slot ${
              copied
                ? 'text-emerald-300'
                : 'text-emerald-400 group-hover:text-emerald-300'
            }`}
          >
            <Server className="w-5 h-5" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[10px] font-minecraft font-bold uppercase tracking-wider text-slate-400 group-hover:text-emerald-400 transition-colors">
              {copied ? 'COPIED TO CLIPBOARD!' : 'SERVER ADDRESS (CLICK TO COPY)'}
            </span>
            <span className="text-base sm:text-lg font-minecraft font-bold tracking-wide text-white mc-shadow">
              {SERVER_CONFIG.serverAddress}
            </span>
          </div>
        </div>

        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-minecraft font-bold uppercase tracking-wider transition-all duration-200 border ${
            copied
              ? 'mc-button-primary'
              : 'mc-button text-slate-200'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>COPIED</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>COPY</span>
            </>
          )}
        </div>
      </button>

      {/* Subtext info */}
      <div className="flex items-center gap-3 mt-2 text-[10px] sm:text-[11px] text-slate-400 font-minecraft">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Java: {SERVER_CONFIG.serverPortJava}
        </span>
        <span className="text-slate-600">•</span>
        <span>Bedrock: {SERVER_CONFIG.serverPortBedrock}</span>
        <span className="text-slate-600">•</span>
        <span>v1.20 - 1.21.x</span>
      </div>
    </div>
  );
};
