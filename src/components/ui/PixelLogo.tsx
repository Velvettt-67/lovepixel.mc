import React from 'react';

interface PixelLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const PixelLogo: React.FC<PixelLogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 26, text: 'text-lg', badge: 'text-[10px] px-1.5 py-0.5' },
    md: { icon: 34, text: 'text-xl', badge: 'text-xs px-2 py-0.5' },
    lg: { icon: 44, text: 'text-2xl sm:text-3xl', badge: 'text-xs sm:text-sm px-2.5 py-1' },
    xl: { icon: 64, text: 'text-4xl sm:text-5xl', badge: 'text-sm sm:text-base px-3 py-1.5' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Original Isometric Voxel Crystal Emblem */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:rotate-6 drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]"
        >
          {/* Top isometric block facet */}
          <polygon
            points="24,4 42,14 24,24 6,14"
            fill="url(#emeraldTopGrad)"
            stroke="#34d399"
            strokeWidth="1.2"
          />
          {/* Left isometric block facet */}
          <polygon
            points="6,14 24,24 24,44 6,34"
            fill="url(#emeraldLeftGrad)"
            stroke="#059669"
            strokeWidth="1.2"
          />
          {/* Right isometric block facet */}
          <polygon
            points="24,24 42,14 42,34 24,44"
            fill="url(#emeraldRightGrad)"
            stroke="#047857"
            strokeWidth="1.2"
          />
          {/* Inner floating cyan energy core */}
          <polygon
            points="24,14 31,18 24,22 17,18"
            fill="#22d3ee"
            opacity="0.9"
          />
          <polygon
            points="17,18 24,22 24,30 17,26"
            fill="#06b6d4"
            opacity="0.9"
          />
          <polygon
            points="24,22 31,18 31,26 24,30"
            fill="#0891b2"
            opacity="0.9"
          />
          
          <defs>
            <linearGradient id="emeraldTopGrad" x1="6" y1="4" x2="42" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#34d399" />
              <stop offset="1" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="emeraldLeftGrad" x1="6" y1="14" x2="24" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#059669" />
              <stop offset="1" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="emeraldRightGrad" x1="24" y1="24" x2="42" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0f766e" />
              <stop offset="1" stopColor="#064e3b" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Wordmark and Realm Tag */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className={`font-bold tracking-tight text-white ${currentSize.text} font-minecraft mc-shadow`}>
            LOVE
          </span>
          <span
            className={`font-bold tracking-wider font-minecraft text-[#55ff55] bg-emerald-950/90 border border-emerald-500/50 rounded ${currentSize.badge} shadow-[0_0_12px_rgba(85,255,85,0.3)] mc-shadow`}
          >
            PIXEL
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] tracking-widest text-slate-400 font-medium uppercase mt-1">
            Minecraft Universe
          </span>
        )}
      </div>
    </div>
  );
};
