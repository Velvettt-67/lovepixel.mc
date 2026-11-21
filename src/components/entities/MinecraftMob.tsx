import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { MinecraftMobMesh } from './MinecraftEntityMesh';
import { ENTITY_CAMERA_REGISTRY } from '../../config/minecraftEntityConfig';
import type { MobKey } from '../../config/minecraftEntityConfig';
import {
  PixelCreeperSprite,
  PixelAllaySprite,
  PixelBeeSprite,
  PixelWolfSprite,
  PixelPigSprite,
  PixelSheepSprite,
  PixelAxolotlSprite,
  PixelIronGolemSprite,
  PixelEndermanSprite,
} from './PixelEntitySprites';

export interface MinecraftMobProps {
  mobId:
    | 'creeper'
    | 'allay'
    | 'bee'
    | 'slime'
    | 'axolotl'
    | 'wolf'
    | 'pig'
    | 'sheep'
    | 'iron-golem'
    | 'enderman';
  mode?: '3d' | 'sprite';
  size?: number;
  scale?: number;
  interactive?: boolean;
  className?: string;
  badge?: string;
  showNameTag?: boolean;
  name?: string;
}

export const MinecraftMob: React.FC<MinecraftMobProps> = ({
  mobId,
  mode = 'sprite',
  size = 32,
  scale = 1,
  interactive = true,
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

  const has3DSupport = [
    'creeper',
    'allay',
    'bee',
    'slime',
    'axolotl',
    'wolf',
    'sheep',
    'enderman',
    'pig',
  ].includes(mobId);

  if (mode === '3d' && has3DSupport) {
    const mobKey = mobId as MobKey;
    const camConfig =
      ENTITY_CAMERA_REGISTRY[`mob-${mobKey}`] || {
        position: [0, 0.6, 2.5],
        target: [0, 0.5, 0],
        fov: 35,
      };

    return (
      <div
        ref={containerRef}
        className={`relative flex flex-col items-center justify-center ${className}`}
        style={{ width: `${160 * scale}px`, height: `${180 * scale}px` }}
      >
        {showNameTag && name && (
          <div className="absolute top-1 z-10 px-2 py-0.5 rounded bg-black/75 border border-slate-700/80 text-[10px] font-minecraft text-white mc-shadow select-none">
            {name}
          </div>
        )}

        {isVisible ? (
          <Canvas
            camera={{
              position: camConfig.position,
              fov: camConfig.fov,
            }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[3, 5, 3]} intensity={2.0} color="#fffbeb" />
            <directionalLight position={[-3, 2, -2]} intensity={1.0} color="#38bdf8" />
            <Suspense fallback={null}>
              <MinecraftMobMesh mobKey={mobKey} interactive={interactive} />
            </Suspense>
          </Canvas>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {renderFallbackSprite(mobId, size)}
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

  // Crisp 2D pixel sprite mode
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      {renderFallbackSprite(mobId, size)}
      {showNameTag && name && (
        <span className="text-[10px] font-minecraft text-slate-300 mt-1 select-none">
          {name}
        </span>
      )}
    </div>
  );
};

function renderFallbackSprite(mobId: string, size: number) {
  switch (mobId) {
    case 'allay':
      return <PixelAllaySprite size={size} animate />;
    case 'bee':
      return <PixelBeeSprite size={size} animate />;
    case 'wolf':
      return <PixelWolfSprite size={size} animate />;
    case 'pig':
      return <PixelPigSprite size={size} animate />;
    case 'sheep':
      return <PixelSheepSprite size={size} animate />;
    case 'axolotl':
      return <PixelAxolotlSprite size={size} animate />;
    case 'iron-golem':
      return <PixelIronGolemSprite size={size} animate />;
    case 'enderman':
      return <PixelEndermanSprite size={size} animate />;
    case 'creeper':
    default:
      return <PixelCreeperSprite size={size} animate />;
  }
}
