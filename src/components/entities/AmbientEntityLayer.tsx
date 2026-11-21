import React, { useState, useEffect } from 'react';
import { PixelAllaySprite, PixelBeeSprite } from './PixelEntitySprites';

interface AmbientEntityLayerProps {
  variant?: 'sky-allay' | 'forest-bees' | 'twilight-mix';
  className?: string;
}

export const AmbientEntityLayer: React.FC<AmbientEntityLayerProps> = ({
  variant = 'sky-allay',
  className = '',
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMediaChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (prefersReducedMotion) return null;

  // Gentle subtle parallax shift
  const parallaxOffset = scrollY * 0.08;

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}>
      {variant === 'sky-allay' && (
        <>
          {/* Subtle floating Allay 1 */}
          <div
            className="absolute top-16 right-[12%] opacity-65 transition-transform duration-300 will-change-transform animate-float-slow"
            style={{
              transform: `translate3d(0, ${-parallaxOffset * 0.7}px, 0)`,
            }}
          >
            <div className="relative">
              <span className="absolute -inset-2 bg-sky-400/20 blur-md rounded-full pointer-events-none" />
              <PixelAllaySprite size={28} />
            </div>
          </div>

          {/* Gentle distant Allay 2 */}
          <div
            className="absolute top-48 left-[8%] opacity-40 transition-transform duration-300 will-change-transform hidden sm:block animate-float-reverse"
            style={{
              transform: `translate3d(0, ${parallaxOffset * 0.5}px, 0)`,
            }}
          >
            <PixelAllaySprite size={20} />
          </div>
        </>
      )}

      {variant === 'forest-bees' && (
        <>
          {/* Pollinating Bee near right border */}
          <div
            className="absolute top-24 right-[15%] opacity-75 transition-transform duration-300 will-change-transform animate-float-slow"
            style={{
              transform: `translate3d(0, ${-parallaxOffset * 0.6}px, 0)`,
            }}
          >
            <div className="relative">
              <span className="absolute -inset-1 bg-amber-400/20 blur-sm rounded-full pointer-events-none" />
              <PixelBeeSprite size={24} />
            </div>
          </div>
        </>
      )}

      {variant === 'twilight-mix' && (
        <>
          <div
            className="absolute top-20 left-[10%] opacity-50 transition-transform duration-300 will-change-transform animate-float-slow"
            style={{
              transform: `translate3d(0, ${-parallaxOffset * 0.8}px, 0)`,
            }}
          >
            <PixelAllaySprite size={24} />
          </div>
          <div
            className="absolute top-36 right-[8%] opacity-60 transition-transform duration-300 will-change-transform animate-float-reverse"
            style={{
              transform: `translate3d(0, ${parallaxOffset * 0.4}px, 0)`,
            }}
          >
            <PixelBeeSprite size={22} />
          </div>
        </>
      )}
    </div>
  );
};
