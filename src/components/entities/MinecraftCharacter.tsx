import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { MinecraftPlayerMesh } from './MinecraftEntityMesh';
import type { PlayerSkinKey } from '../../config/minecraftEntityConfig';
import {
  PixelSteveSprite,
  PixelAlexSprite,
  PixelDiamondKnightSprite,
  PixelNetheritePaladinSprite,
  PixelRedstoneEngineerSprite,
} from './PixelEntitySprites';

export interface MinecraftCharacterProps {
  skinId: 'steve' | 'alex' | 'diamond-knight' | 'netherite-paladin' | 'explorer' | 'redstone-engineer';
  mode?: '3d' | 'sprite';
  size?: number; // For sprite
  scale?: number; // For 3D
  interactive?: boolean;
  heldItem?: 'sword' | 'torch' | 'poppy' | 'none';
  className?: string;
  badge?: string;
  showNameTag?: boolean;
  name?: string;
}

export const MinecraftCharacter: React.FC<MinecraftCharacterProps> = ({
  skinId,
  mode = 'sprite',
  size = 36,
  scale = 1,
  interactive = true,
  heldItem = 'none',
  className = '',
  badge,
  showNameTag = false,
  name,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Lazy visibility check for 3D canvas
  useEffect(() => {
    if (mode !== '3d' || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [mode]);

  if (mode === '3d') {
    const playerKey: PlayerSkinKey =
      skinId === 'alex'
        ? 'player-alex'
        : skinId === 'diamond-knight'
        ? 'player-diamond-knight'
        : skinId === 'netherite-paladin'
        ? 'player-netherite-paladin'
        : 'player-steve';

    return (
      <div
        ref={containerRef}
        className={`relative flex flex-col items-center justify-center ${className}`}
        style={{ width: `${140 * scale}px`, height: `${200 * scale}px` }}
      >
        {showNameTag && name && (
          <div className="absolute top-2 z-10 px-2.5 py-0.5 rounded bg-black/75 border border-slate-700/80 text-[10px] font-minecraft text-white mc-shadow select-none">
            {name}
          </div>
        )}

        {isVisible ? (
          <Canvas
            camera={{ position: [0, 1.25, 3.8], fov: 35 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[4, 6, 4]} intensity={2.0} color="#fffbeb" />
            <directionalLight position={[-4, 2, -2]} intensity={0.8} color="#38bdf8" />
            <Suspense fallback={null}>
              <MinecraftPlayerMesh
                skinKey={playerKey}
                interactive={interactive}
                heldItem={heldItem === 'poppy' ? 'none' : heldItem}
              />
            </Suspense>
          </Canvas>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {renderFallbackSprite(skinId, size)}
          </div>
        )}

        {badge && (
          <span className="absolute bottom-1 z-10 text-[9px] font-minecraft px-2 py-0.5 rounded bg-black/80 text-[#55ff55] border border-emerald-500/40">
            {badge}
          </span>
        )}
      </div>
    );
  }

  // Fallback / standard crisp 2D pixel sprite mode
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      {renderFallbackSprite(skinId, size)}
      {showNameTag && name && (
        <span className="text-[10px] font-minecraft text-slate-300 mt-1 select-none">
          {name}
        </span>
      )}
    </div>
  );
};

function renderFallbackSprite(skinId: string, size: number) {
  switch (skinId) {
    case 'alex':
      return <PixelAlexSprite size={size} animate />;
    case 'diamond-knight':
      return <PixelDiamondKnightSprite size={size} animate />;
    case 'netherite-paladin':
      return <PixelNetheritePaladinSprite size={size} animate />;
    case 'redstone-engineer':
      return <PixelRedstoneEngineerSprite size={size} animate />;
    case 'steve':
    default:
      return <PixelSteveSprite size={size} animate />;
  }
}
