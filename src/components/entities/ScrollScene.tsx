import React, { useRef, useState, useEffect } from 'react';

interface ScrollSceneProps {
  children: React.ReactNode;
  speed?: number; // e.g. -0.15 for foreground or +0.1 for background
  rotateFactor?: number;
  className?: string;
  fadeOnScroll?: boolean;
}

export const ScrollScene: React.FC<ScrollSceneProps> = ({
  children,
  speed = 0.05,
  rotateFactor = 0,
  className = '',
  fadeOnScroll = false,
}) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState({
    translateY: 0,
    rotate: 0,
    opacity: 1,
  });

  useEffect(() => {
    // Check reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId: number;

    const onScroll = () => {
      if (!domRef.current) return;
      const rect = domRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Only calculate if near or inside viewport
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const centerDistance = rect.top - viewportHeight / 2;
        const translateY = centerDistance * speed;
        const rotate = rotateFactor !== 0 ? (centerDistance / viewportHeight) * rotateFactor : 0;
        const opacity = fadeOnScroll
          ? Math.max(0.2, Math.min(1, 1 - Math.abs(centerDistance) / (viewportHeight * 0.85)))
          : 1;

        setTransformStyle({ translateY, rotate, opacity });
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(onScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed, rotateFactor, fadeOnScroll]);

  return (
    <div
      ref={domRef}
      className={`will-change-transform ${className}`}
      style={{
        transform: `translate3d(0, ${transformStyle.translateY}px, 0) rotate(${transformStyle.rotate}deg)`,
        opacity: transformStyle.opacity,
        transition: 'transform 0.15s ease-out, opacity 0.2s ease-out',
      }}
    >
      {children}
    </div>
  );
};
