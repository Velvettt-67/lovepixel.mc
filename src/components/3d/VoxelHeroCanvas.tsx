import React, { useState, useEffect, useRef } from 'react';

export const VoxelHeroCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(() =>
    typeof document !== 'undefined' ? document.visibilityState === 'visible' : true
  );
  const [prefersReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Suspend parallax when scrolled past hero
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Suspend parallax when browser tab is hidden/minimized
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Subtle natural mouse parallax on scenery
  useEffect(() => {
    if (!isVisible || !isTabVisible || prefersReducedMotion) {
      return;
    }

    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = ((e.clientX / innerWidth) - 0.5) * -16;
      targetY = ((e.clientY / innerHeight) - 0.5) * -10;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      setMouseOffset({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, isTabVisible, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      {/* Layer 1: High-Resolution Complementary Shader Atmospheric Landscape with subtle Parallax */}
      <div
        className="absolute -inset-4 bg-cover bg-center transition-transform duration-75 will-change-transform"
        style={{
          backgroundImage: `url('/assets/images/hero-landscape.png')`,
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0) scale(1.05)`,
          filter: 'brightness(0.82) saturate(1.10) contrast(1.04)',
        }}
      />

      {/* Layer 2: Clean contrast gradients preserving landscape beauty while keeping typography readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080a0f]/92 via-[#080a0f]/45 to-[#080a0f]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-transparent to-[#080a0f]/40" />

      {/* Bottom fade for seamless transition to content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080a0f] to-transparent" />
    </div>
  );
};
