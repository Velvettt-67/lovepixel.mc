import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  MinecraftMobMesh,
  MinecraftPlayerMesh,
} from './MinecraftEntityMesh';
import {
  SHOWCASE_ENTITIES,
  ENTITY_CAMERA_REGISTRY,
} from '../../config/minecraftEntityConfig';
import type { ShowcaseEntityItem } from '../../config/minecraftEntityConfig';
import { ShowcaseCameraRig } from './ShowcaseCameraRig';

export const ModelVerificationGallery: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('player-steve');
  const [viewMode, setViewMode] = useState<'inspector' | 'grid'>('inspector');
  const [bgMode, setBgMode] = useState<'studio' | 'biome'>('studio');

  const selectedEntity =
    SHOWCASE_ENTITIES.find((e) => e.id === selectedId) || SHOWCASE_ENTITIES[0];

  const camConfig =
    ENTITY_CAMERA_REGISTRY[selectedEntity.id] || ENTITY_CAMERA_REGISTRY['player-steve'];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950/95 border border-emerald-500/30 rounded-3xl text-white font-minecraft shadow-2xl my-8">
      {/* Gallery Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#55ff55] animate-pulse" />
            <span className="text-xs uppercase text-[#55ff55] font-bold tracking-widest">
              Authentic Minecraft Model Verification Gallery
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase mt-1">
            Production Entity Inspector ({SHOWCASE_ENTITIES.length} Entities)
          </h2>
        </div>

        {/* View Mode & Backdrop Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBgMode(bgMode === 'biome' ? 'studio' : 'biome')}
            className="px-3 py-1.5 rounded-lg text-[10px] bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 uppercase cursor-pointer"
          >
            Backdrop: {bgMode.toUpperCase()}
          </button>
          <div className="bg-slate-900 p-0.5 rounded-lg border border-slate-700 flex items-center">
            <button
              onClick={() => setViewMode('inspector')}
              className={`px-3 py-1.5 rounded-md text-[10px] uppercase cursor-pointer ${
                viewMode === 'inspector'
                  ? 'bg-emerald-950 text-[#55ff55] font-bold border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Single Inspector
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-md text-[10px] uppercase cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-emerald-950 text-[#55ff55] font-bold border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Grid
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'inspector' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-stretch">
          {/* Main 3D Stage */}
          <div className="lg:col-span-8 relative h-[480px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-inner">
            {bgMode === 'biome' ? (
              <div
                className="absolute inset-0 bg-cover bg-center filter brightness-[0.45] saturate-[1.2]"
                style={{ backgroundImage: `url('${selectedEntity.backdropImage}')` }}
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/40 pointer-events-none" />

            {/* Spec HUD Overlay */}
            <div className="absolute top-3 left-3 z-10 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 text-[10px]">
              <div className="text-[#55ff55] font-bold">{selectedEntity.name}</div>
              <div className="text-slate-400">{selectedEntity.behavior} • {selectedEntity.biomeLabel}</div>
            </div>

            <div className="absolute bottom-3 right-3 z-10 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-slate-800 text-[9px] text-slate-400">
              Drag to Orbit • 32° FOV Authentic Framing
            </div>

            <Canvas
              camera={{
                position: camConfig.position,
                fov: camConfig.fov,
              }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
              <ambientLight intensity={1.3} />
              <directionalLight position={[4, 7, 4]} intensity={2.4} color="#fffbeb" />
              <directionalLight position={[-4, 3, -2]} intensity={1.2} color="#67e8f9" />
              {/* Ground contact shadow */}
              <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.6, 32]} />
                <meshBasicMaterial color="#020617" transparent opacity={0.35} depthWrite={false} />
              </mesh>
              <Suspense fallback={null}>
                <ShowcaseCameraRig
                  camPosition={camConfig.position}
                  lookAt={camConfig.target}
                  fov={camConfig.fov}
                />
                {selectedEntity.type === 'player' && selectedEntity.playerKey && (
                  <MinecraftPlayerMesh
                    key={selectedEntity.id}
                    skinKey={selectedEntity.playerKey}
                    heldItem="sword"
                    interactive={true}
                  />
                )}
                {selectedEntity.type === 'mob' && selectedEntity.mobKey && (
                  <MinecraftMobMesh
                    key={selectedEntity.id}
                    mobKey={selectedEntity.mobKey}
                    interactive={true}
                  />
                )}
              </Suspense>
            </Canvas>
          </div>

          {/* Selector Drawer */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] text-slate-400 block mb-2 uppercase tracking-wider">
                Select Model to Verify ({SHOWCASE_ENTITIES.length} Total):
              </span>
              <div className="grid grid-cols-2 gap-2 max-h-[360px] overflow-y-auto pr-1">
                {SHOWCASE_ENTITIES.map((ent) => (
                  <button
                    key={ent.id}
                    onClick={() => setSelectedId(ent.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedId === ent.id
                        ? 'bg-emerald-950/80 border-emerald-500 text-[#55ff55] shadow-[0_0_12px_rgba(85,255,85,0.2)]'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{ent.name}</div>
                    <div className="text-[9px] text-slate-500 truncate">{ent.category}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Diagnostic Data */}
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2 text-[10px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Target Vector:</span>
                <span className="text-white font-mono">{camConfig.target.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Camera Vector:</span>
                <span className="text-white font-mono">{camConfig.position.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Rendering Engine:</span>
                <span className="text-[#55ffff]">
                  {selectedEntity.type === 'player' ? 'Canonical Dual-Layer + 3D Armor' : 'Canonical Bedrock Rig'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Full Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6">
          {SHOWCASE_ENTITIES.map((ent) => (
            <GridCard key={ent.id} entity={ent} bgMode={bgMode} />
          ))}
        </div>
      )}
    </div>
  );
};

const GridCard: React.FC<{ entity: ShowcaseEntityItem; bgMode: 'biome' | 'studio' }> = ({
  entity,
  bgMode,
}) => {
  const camConfig = ENTITY_CAMERA_REGISTRY[entity.id] || {
    position: [0, 1.2, 4.0],
    target: [0, 0.8, 0],
    fov: 32,
  };

  return (
    <div className="relative h-60 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-lg flex flex-col justify-between">
      {bgMode === 'biome' ? (
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.45] saturate-[1.1]"
          style={{ backgroundImage: `url('${entity.backdropImage}')` }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 to-slate-950" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

      {/* Top Name */}
      <div className="relative z-10 p-2.5 flex items-center justify-between">
        <span className="text-[11px] font-bold text-white mc-shadow">{entity.name}</span>
        <span className="text-[8px] px-1.5 py-0.5 rounded bg-black/70 border border-slate-700 text-slate-300">
          {entity.behavior}
        </span>
      </div>

      {/* 3D Canvas */}
      <div className="relative z-0 w-full h-full">
        <Canvas
          camera={{
            position: camConfig.position,
            fov: camConfig.fov,
          }}
          dpr={[1, 1.2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        >
          <ambientLight intensity={1.3} />
          <directionalLight position={[3, 5, 3]} intensity={2.0} color="#fffbeb" />
          <Suspense fallback={null}>
            {entity.type === 'player' && entity.playerKey && (
              <MinecraftPlayerMesh key={entity.id} skinKey={entity.playerKey} heldItem="sword" interactive={false} />
            )}
            {entity.type === 'mob' && entity.mobKey && (
              <MinecraftMobMesh key={entity.id} mobKey={entity.mobKey} interactive={false} />
            )}
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom Label */}
      <div className="relative z-10 px-2.5 py-1.5 bg-black/60 backdrop-blur-xs border-t border-slate-800 text-[9px] text-slate-400 truncate">
        {entity.tagline}
      </div>
    </div>
  );
};
