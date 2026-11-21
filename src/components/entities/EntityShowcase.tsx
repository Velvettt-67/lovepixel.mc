import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  MinecraftMobMesh,
  MinecraftPlayerMesh,
} from './MinecraftEntityMesh';
import {
  TABS,
  SHOWCASE_ENTITIES,
  ENTITY_CAMERA_REGISTRY,
} from '../../config/minecraftEntityConfig';
import type { BiomeTab } from '../../config/minecraftEntityConfig';
import { MinecraftBiomeStage } from './MinecraftBiomeStage';
import { ShowcaseCameraRig } from './ShowcaseCameraRig';
import { CHARACTER_MOB_MANIFEST } from '../../config/characterMobManifest';
import type { CharacterMobEntry } from '../../config/characterMobManifest';

export const EntityShowcase: React.FC = () => {
  // Authoritative Single Source of Truth for Entity Selection
  const [selectedEntityId, setSelectedEntityId] = useState<string>('player-steve');
  const [heldItem, setHeldItem] = useState<'sword' | 'torch' | 'none'>('sword');

  const containerRef = useRef<HTMLDivElement>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(() =>
    typeof document !== 'undefined' ? document.visibilityState === 'visible' : true
  );

  // Lazy visibility check for showcase WebGL rendering
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Performance control: Suspend 3D canvas when tab is minimized/inactive
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const selectedEntity =
    SHOWCASE_ENTITIES.find((e) => e.id === selectedEntityId) || SHOWCASE_ENTITIES[0];

  const activeTab: BiomeTab = selectedEntity.category;

  // Authoritative tab switch
  const handleTabChange = (tabId: BiomeTab) => {
    const firstInTab = SHOWCASE_ENTITIES.find((e) => e.category === tabId);
    if (firstInTab) {
      setSelectedEntityId(firstInTab.id);
    }
  };

  // Authoritative entity switch
  const handleSelectEntity = (entityId: string) => {
    setSelectedEntityId(entityId);
  };

  useEffect(() => {
    (window as any).__selectShowcaseEntity = handleSelectEntity;
    return () => {
      delete (window as any).__selectShowcaseEntity;
    };
  }, []);

  const currentTabConfig = TABS.find((t) => t.id === activeTab) || TABS[0];
  const tabEntities = SHOWCASE_ENTITIES.filter((e) => e.category === activeTab);

  const manifestData: CharacterMobEntry | undefined = CHARACTER_MOB_MANIFEST.find(
    (m) => m.id === selectedEntity.id
  );

  const cameraConfig =
    ENTITY_CAMERA_REGISTRY[selectedEntity.id] || ENTITY_CAMERA_REGISTRY['player-steve'];

  return (
    <div ref={containerRef} className="space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-minecraft font-bold uppercase tracking-widest text-[#55ff55] bg-emerald-950/70 border border-emerald-500/40 px-3.5 py-1 rounded-full inline-block mb-3">
          Living Minecraft Ecosystem
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-minecraft font-bold text-white tracking-tight uppercase mc-shadow">
          CHARACTERS & FAUNA OF LOVE PIXEL
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed font-minecraft">
          Encounter iconic player skins, peaceful wildlife, and legendary creatures natively rendered inside authentic Minecraft biomes.
        </p>
      </div>

      {/* Main Showcase Panel */}
      <div className="max-w-6xl mx-auto w-full mc-panel rounded-3xl p-4 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Biome / Category Tabs */}
        <div className="flex flex-wrap items-center gap-2.5 pb-6 border-b border-slate-800">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-minecraft font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-emerald-950/90 text-[#55ff55] border border-emerald-500/60 shadow-[0_0_20px_rgba(85,255,85,0.25)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive 3D Viewing Area & Spec Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-7 items-stretch">
          {/* Left Column: Full-Height 3D Voxel Stage with Contextual Biome Environment */}
          <div className="lg:col-span-7 flex flex-col relative h-[480px] sm:h-[540px] rounded-2xl overflow-hidden mc-slot border border-slate-700/80 shadow-2xl">
            {/* Background Image Layer (Contextual Authentic Minecraft Biome) */}
            <div
              key={selectedEntity.backdropImage}
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out filter brightness-[0.5] saturate-[1.2] scale-105"
              style={{ backgroundImage: `url('${selectedEntity.backdropImage}')` }}
            />
            {/* Atmospheric Vignette & Depth Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-black/50 pointer-events-none" />

            {/* Top Biome Indicator Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/85 backdrop-blur-md border border-emerald-500/50 text-[10px] font-minecraft text-[#55ff55]">
              <span className="w-2 h-2 rounded-full bg-[#55ff55] animate-pulse" />
              <span className="font-bold">{selectedEntity.biomeBadge}</span>
              <span className="text-slate-400">• {selectedEntity.biomeLabel}</span>
            </div>

            {/* Top Right Cursor Guide */}
            <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/75 backdrop-blur-sm border border-slate-700/70 text-[9px] font-minecraft text-slate-300">
              <span>Drag to Rotate • Head Tracking</span>
            </div>

            {/* The 3D Canvas Stage */}
            <div className="relative z-0 w-full h-full flex items-center justify-center">
              {isSectionVisible && isTabVisible ? (
                <Canvas
                  camera={{
                    position: cameraConfig.position,
                    fov: cameraConfig.fov,
                  }}
                  dpr={[1, 1.5]}
                  gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                >
                  <Suspense fallback={null}>
                    {/* Authentic Biome Lighting, Particles & Soft Ground Shadow */}
                    <MinecraftBiomeStage biome={selectedEntity.biome} />

                    {/* Smooth Camera Rig that frames each entity perfectly */}
                    <ShowcaseCameraRig
                      camPosition={cameraConfig.position}
                      lookAt={cameraConfig.target}
                      fov={cameraConfig.fov}
                    />

                    {/* Authentic 3D Model with key to prevent stale state */}
                    {selectedEntity.type === 'player' && selectedEntity.playerKey && (
                      <MinecraftPlayerMesh
                        key={selectedEntity.id}
                        skinKey={selectedEntity.playerKey}
                        heldItem={heldItem}
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
              ) : (
                <div className="text-xs font-minecraft text-slate-500">
                  Loading biome environment...
                </div>
              )}
            </div>

            {/* Held Item Controls (for Player Characters) */}
            {selectedEntity.gearAvailable && (
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 bg-black/85 backdrop-blur-md p-1.5 rounded-xl border border-slate-700/80">
                <span className="text-[10px] font-minecraft text-slate-400 px-2">Gear:</span>
                {(['sword', 'torch', 'none'] as const).map((item) => (
                  <button
                    key={item}
                    onClick={() => setHeldItem(item)}
                    className={`px-2.5 py-1 rounded text-[10px] font-minecraft uppercase transition-all cursor-pointer ${
                      heldItem === item
                        ? 'bg-emerald-950 text-[#55ff55] border border-emerald-500/60 font-bold shadow-[0_0_10px_rgba(85,255,85,0.2)]'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Entity Dossier & Spec Manifest */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Biome Tags */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded bg-emerald-950/80 text-[#55ff55] border border-emerald-500/40 text-[10px] font-minecraft font-bold uppercase">
                  {currentTabConfig.badge}
                </span>
                <span className="text-[10px] font-minecraft text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                  {selectedEntity.behavior}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl sm:text-3xl font-minecraft font-bold text-white mc-shadow leading-tight">
                {selectedEntity.name}
              </h3>
              <p className="text-xs text-[#55ffff] font-minecraft mt-1">
                {selectedEntity.tagline}
              </p>

              {/* Entity Description */}
              <p className="text-xs sm:text-sm text-slate-300 font-minecraft leading-relaxed mt-4">
                {manifestData?.description ||
                  'Authentic Minecraft entity rendered with canonical Bedrock geometry, pixel textures, and biome environmental depth.'}
              </p>

              {/* Structured Metadata Box */}
              <div className="mt-5 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-2.5 text-[11px] font-minecraft">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Environment:</span>
                  <span className="text-white font-bold">{selectedEntity.biomeLabel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Behavior / Role:</span>
                  <span className="text-[#55ff55]">{selectedEntity.behavior}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Texture Quality:</span>
                  <span className="text-[#55ffff]">Crisp 16px Nearest-Neighbor</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Geometry Fidelity:</span>
                  <span className="text-[#ffaa00]">
                    {selectedEntity.type === 'player' ? 'Canonical Dual-Layer + 3D Armor' : 'Canonical Bedrock Rig'}
                  </span>
                </div>
              </div>
            </div>

            {/* Entity Selection Buttons */}
            <div className="pt-4 border-t border-slate-800">
              <span className="text-[10px] font-minecraft text-slate-400 block mb-3 uppercase tracking-wider">
                Select Entity to Inspect:
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {tabEntities.map((ent) => (
                  <button
                    key={ent.id}
                    onClick={() => handleSelectEntity(ent.id)}
                    className={`p-3 rounded-xl border flex flex-col items-start transition-all cursor-pointer ${
                      selectedEntityId === ent.id
                        ? 'bg-emerald-950/80 border-emerald-500 text-[#55ff55] shadow-[0_0_15px_rgba(85,255,85,0.25)]'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-minecraft font-bold block truncate w-full">
                      {ent.name}
                    </span>
                    <span className="text-[9px] text-slate-400 font-minecraft block truncate w-full mt-0.5">
                      {ent.behavior}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
