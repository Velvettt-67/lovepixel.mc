import React, { useMemo } from 'react';

interface TntVoxelBlockProps {
  isPrimed: boolean;
  pulsePhase: number; // 0 to 1 for white flashing
  fuseSparkCount: number;
  countdownProgress?: number; // 0 (start) to 1 (near blast)
}

/**
 * Authentic 16x16 pixel-grid SVG for the TNT Side Face.
 * Red dynamite sticks with white paper band and bold pixel "TNT" lettering.
 */
export const TntSideTexture: React.FC<{ flashOpacity?: number }> = ({ flashOpacity = 0 }) => (
  <svg
    viewBox="0 0 16 16"
    className="w-full h-full select-none"
    shapeRendering="crispEdges"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Red Dynamite Sticks Background */}
    <rect width="16" height="16" fill="#b91c1c" />
    {/* Vertical Stick Seams / Highlights */}
    <rect x="0" y="0" width="1" height="16" fill="#991b1b" />
    <rect x="1" y="0" width="2" height="6" fill="#dc2626" />
    <rect x="4" y="0" width="1" height="16" fill="#7f1d1d" />
    <rect x="5" y="0" width="2" height="6" fill="#dc2626" />
    <rect x="8" y="0" width="1" height="16" fill="#7f1d1d" />
    <rect x="9" y="0" width="2" height="6" fill="#dc2626" />
    <rect x="12" y="0" width="1" height="16" fill="#7f1d1d" />
    <rect x="13" y="0" width="2" height="6" fill="#dc2626" />

    {/* Lower Sticks Highlights */}
    <rect x="1" y="10" width="2" height="6" fill="#dc2626" />
    <rect x="5" y="10" width="2" height="6" fill="#dc2626" />
    <rect x="9" y="10" width="2" height="6" fill="#dc2626" />
    <rect x="13" y="10" width="2" height="6" fill="#dc2626" />

    {/* White Wrapping Band */}
    <rect x="0" y="6" width="16" height="4" fill="#e4e4e7" />
    <rect x="0" y="6" width="16" height="1" fill="#f4f4f5" />
    <rect x="0" y="9" width="16" height="1" fill="#d4d4d8" />

    {/* Pixel "TNT" Lettering */}
    {/* 'T' */}
    <rect x="2" y="6" width="3" height="1" fill="#18181b" />
    <rect x="3" y="7" width="1" height="3" fill="#18181b" />

    {/* 'N' */}
    <rect x="6" y="6" width="1" height="4" fill="#18181b" />
    <rect x="7" y="7" width="1" height="1" fill="#18181b" />
    <rect x="8" y="8" width="1" height="1" fill="#18181b" />
    <rect x="9" y="6" width="1" height="4" fill="#18181b" />

    {/* 'T' */}
    <rect x="11" y="6" width="3" height="1" fill="#18181b" />
    <rect x="12" y="7" width="1" height="3" fill="#18181b" />

    {/* Vanilla Minecraft Primed Pulsing White Flash Overlay */}
    {flashOpacity > 0 && (
      <rect
        width="16"
        height="16"
        fill="#ffffff"
        opacity={Math.min(flashOpacity * 0.58, 0.58)}
      />
    )}
  </svg>
);

/**
 * Authentic 16x16 pixel-grid SVG for the TNT Top Face.
 * Red dynamite caps, dark gunpowder bed, and center fuse wire.
 */
export const TntTopTexture: React.FC<{ flashOpacity?: number }> = ({ flashOpacity = 0 }) => (
  <svg
    viewBox="0 0 16 16"
    className="w-full h-full select-none"
    shapeRendering="crispEdges"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Red Outer Dynamite Ring */}
    <rect width="16" height="16" fill="#b91c1c" />
    <rect x="1" y="1" width="14" height="14" fill="#dc2626" />
    {/* Shaded dynamite ends */}
    <rect x="2" y="2" width="12" height="12" fill="#991b1b" />
    {/* Gunpowder Core */}
    <rect x="4" y="4" width="8" height="8" fill="#27272a" />
    <rect x="5" y="5" width="6" height="6" fill="#18181b" />
    <rect x="6" y="6" width="4" height="4" fill="#09090b" />
    {/* Fuse Cord Center */}
    <rect x="7" y="7" width="2" height="2" fill="#71717a" />
    <rect x="8" y="7" width="1" height="1" fill="#a1a1aa" />

    {/* Vanilla Minecraft Primed Pulsing White Flash Overlay */}
    {flashOpacity > 0 && (
      <rect
        width="16"
        height="16"
        fill="#ffffff"
        opacity={Math.min(flashOpacity * 0.58, 0.58)}
      />
    )}
  </svg>
);

/**
 * TNT Bottom Face Texture
 */
export const TntBottomTexture: React.FC = () => (
  <svg
    viewBox="0 0 16 16"
    className="w-full h-full select-none"
    shapeRendering="crispEdges"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="16" height="16" fill="#7f1d1d" />
    <rect x="2" y="2" width="12" height="12" fill="#5b1313" />
    <rect x="4" y="4" width="8" height="8" fill="#1c1917" />
  </svg>
);

/**
 * 3D Isometric Voxel TNT Block with dynamic fuse spark particle emitter
 * and authentic vanilla Minecraft primed pulse animation.
 */
export const TntVoxelBlock: React.FC<TntVoxelBlockProps> = ({
  isPrimed,
  pulsePhase,
  fuseSparkCount,
  countdownProgress = 0,
}) => {
  // Generate lively spark particles around the fuse tip (progressively increasing activity)
  const sparks = useMemo(() => {
    const count = Math.floor(10 + countdownProgress * 10);
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + fuseSparkCount * (0.35 + countdownProgress * 0.4);
      const dist = 5 + ((i * 7 + fuseSparkCount * 6) % (16 + Math.floor(countdownProgress * 12)));
      const x = Math.cos(angle) * dist;
      const y = -Math.sin(angle) * dist - 8;
      const size = (i % 3 === 0) ? 4 : (i % 2 === 0) ? 3 : 2;
      const isSmoke = i % 4 === 0;
      return { id: i, x, y, size, isSmoke };
    });
  }, [fuseSparkCount, countdownProgress]);

  // Authentic vanilla Minecraft primed flash:
  // Pulsing white wash intensity (0 to 1), accelerating as the countdown reaches 0.
  // CRITICAL: The red dynamite sticks, white paper band, and bold pixel "TNT" lettering
  // NEVER disappear and are NEVER replaced by a solid white box.
  const flashIntensity = isPrimed ? Math.max(0, Math.sin(pulsePhase * Math.PI)) : 0;
  const blockScale = isPrimed ? 1.0 + countdownProgress * 0.08 + flashIntensity * 0.04 : 1.0;

  return (
    <div className="relative flex items-center justify-center pointer-events-none">
      {/* Subtle Environmental Primer Glow Pulse */}
      {isPrimed && (
        <div
          className="absolute -inset-16 rounded-full pointer-events-none transition-opacity duration-150"
          style={{
            background: 'radial-gradient(circle, rgba(251, 146, 60, 0.45) 0%, rgba(239, 68, 68, 0.18) 45%, transparent 70%)',
            opacity: 0.35 + flashIntensity * 0.65,
            filter: 'blur(12px)',
          }}
        />
      )}

      {/* Dynamic 3D Scene Viewport */}
      <div
        className="relative"
        style={{
          width: '120px',
          height: '120px',
          perspective: '700px',
        }}
      >
        {/* 3D Transform Cube Container */}
        <div
          className="relative w-full h-full transition-transform duration-75"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(-24deg) rotateY(45deg) scale(${blockScale})`,
          }}
        >
          {/* Front Face (South) */}
          <div
            className="absolute inset-0 shadow-lg border border-black/30"
            style={{
              transform: 'translateZ(60px)',
              backfaceVisibility: 'hidden',
              filter: 'brightness(0.95)',
            }}
          >
            <TntSideTexture flashOpacity={flashIntensity} />
          </div>

          {/* Right Face (East) */}
          <div
            className="absolute inset-0 shadow-lg border border-black/30"
            style={{
              transform: 'rotateY(90deg) translateZ(60px)',
              backfaceVisibility: 'hidden',
              filter: 'brightness(0.8)', // Minecraft natural side shadow
            }}
          >
            <TntSideTexture flashOpacity={flashIntensity} />
          </div>

          {/* Top Face */}
          <div
            className="absolute inset-0 shadow-lg border border-black/30"
            style={{
              transform: 'rotateX(90deg) translateZ(60px)',
              backfaceVisibility: 'hidden',
            }}
          >
            <TntTopTexture flashOpacity={flashIntensity} />
          </div>

          {/* Authentic 3D Fuse Cord & Animated Lit Fuse Sparks */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: '50%',
              top: '0',
              transformStyle: 'preserve-3d',
              transform: 'translate(-50%, -100%) rotateY(-45deg) rotateX(24deg)',
              transformOrigin: 'bottom center',
              zIndex: 30,
            }}
          >
            {/* Fuse Base Grommet on TNT Top */}
            <div className="w-2.5 h-1 bg-[#18181b] mx-auto rounded-none mb-[1px]" />

            {/* Vertical Fuse Cord */}
            <div
              className="w-[4px] h-[18px] bg-[#3f3f46] mx-auto border-x border-[#18181b] relative"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, #27272a, #27272a 2px, #52525b 2px, #52525b 4px)',
              }}
            >
              {/* Lit Fuse Flame & Sparks Emitter */}
              {isPrimed && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center">
                  {/* Glowing Core Flame */}
                  <div className="w-3.5 h-3.5 bg-[#fde047] rounded-none rotate-45 shadow-[0_0_12px_#f97316,0_0_24px_#ef4444] animate-pulse" />

                  {/* Pixel Spark Particles */}
                  {sparks.map(s => (
                    <div
                      key={s.id}
                      className="absolute rounded-none pointer-events-none"
                      style={{
                        transform: `translate3d(${s.x}px, ${s.y}px, 0)`,
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        backgroundColor: s.isSmoke
                          ? '#a1a1aa'
                          : s.id % 2 === 0
                          ? '#facc15'
                          : '#fb923c',
                        boxShadow: s.isSmoke ? 'none' : '0 0 6px #f59e0b',
                        opacity: s.isSmoke ? 0.6 : 0.9,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Face */}
          <div
            className="absolute inset-0"
            style={{
              transform: 'rotateX(-90deg) translateZ(60px)',
              backfaceVisibility: 'hidden',
              filter: 'brightness(0.5)',
            }}
          >
            <TntBottomTexture />
          </div>

          {/* Left Face (West) */}
          <div
            className="absolute inset-0"
            style={{
              transform: 'rotateY(-90deg) translateZ(60px)',
              backfaceVisibility: 'hidden',
              filter: 'brightness(0.7)',
            }}
          >
            <TntSideTexture flashOpacity={flashIntensity} />
          </div>

          {/* Back Face (North) */}
          <div
            className="absolute inset-0"
            style={{
              transform: 'rotateY(180deg) translateZ(60px)',
              backfaceVisibility: 'hidden',
              filter: 'brightness(0.65)',
            }}
          >
            <TntSideTexture flashOpacity={flashIntensity} />
          </div>
        </div>
      </div>
    </div>
  );
};
