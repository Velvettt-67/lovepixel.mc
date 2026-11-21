import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export type BiomeEnvironment =
  | 'grassland'
  | 'taiga'
  | 'meadow'
  | 'lush-cave'
  | 'end'
  | 'nether';

interface MinecraftBiomeStageProps {
  biome: BiomeEnvironment;
}

export const MinecraftBiomeStage: React.FC<MinecraftBiomeStageProps> = ({ biome }) => {
  const particlesRef = useRef<THREE.Points>(null);

  // Biome-specific particle colors and attributes
  const particleConfig = useMemo(() => {
    switch (biome) {
      case 'nether':
        return { count: 32, color: '#f97316', size: 0.05, speed: 0.45, spread: 2.5 };
      case 'end':
        return { count: 28, color: '#c084fc', size: 0.04, speed: 0.2, spread: 3.0 };
      case 'lush-cave':
        return { count: 30, color: '#2dd4bf', size: 0.04, speed: 0.25, spread: 2.2 };
      case 'meadow':
        return { count: 35, color: '#fbcfe8', size: 0.045, speed: 0.3, spread: 2.8 }; // Sakura petals
      case 'taiga':
        return { count: 20, color: '#e0f2fe', size: 0.035, speed: 0.25, spread: 2.4 };
      default: // grassland
        return { count: 25, color: '#86efac', size: 0.04, speed: 0.25, spread: 2.5 };
    }
  }, [biome]);

  const particleGeo = useMemo(() => {
    const count = particleConfig.count;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.sin(i * 1.93) * particleConfig.spread);
      pos[i * 3 + 1] = ((Math.sin(i * 3.71) + 1) * 0.5) * 3.0;
      pos[i * 3 + 2] = (Math.cos(i * 2.41) * (particleConfig.spread * 0.8));
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [particleConfig]);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const count = particleConfig.count;
      for (let i = 0; i < count; i++) {
        // Upward or drifting float
        positions[i * 3 + 1] += delta * particleConfig.speed;
        if (positions[i * 3 + 1] > 3.2) {
          positions[i * 3 + 1] = 0.05;
        }
        positions[i * 3] += Math.sin(state.clock.elapsedTime * 1.2 + i) * 0.002;
        positions[i * 3 + 2] += Math.cos(state.clock.elapsedTime * 1.1 + i) * 0.002;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* ----------------- 1. BIOME LIGHTING ----------------- */}
      {biome === 'end' ? (
        <>
          <ambientLight intensity={0.9} color="#7c3aed" />
          <directionalLight position={[0, 6, 2]} intensity={1.8} color="#f5f3ff" />
          {/* Vibrant purple rim lights to make Enderman's black silhouette pop */}
          <directionalLight position={[-4, 3, -3]} intensity={4.0} color="#c084fc" />
          <directionalLight position={[4, 3, -3]} intensity={4.0} color="#a855f7" />
          <pointLight position={[0, 1.2, 1.5]} intensity={2.0} color="#e9d5ff" distance={8} />
        </>
      ) : biome === 'nether' ? (
        <>
          <ambientLight intensity={0.75} color="#991b1b" />
          <directionalLight position={[3, 6, 3]} intensity={2.4} color="#fed7aa" />
          <directionalLight position={[-3, 2, -2]} intensity={2.0} color="#ea580c" />
          {/* Magma underglow */}
          <pointLight position={[0, 0.1, 0]} intensity={3.5} color="#f97316" distance={6} />
        </>
      ) : biome === 'lush-cave' ? (
        <>
          <ambientLight intensity={0.95} color="#0f766e" />
          <directionalLight position={[2, 6, 3]} intensity={2.2} color="#f0fdf4" />
          <directionalLight position={[-3, 2, -2]} intensity={1.5} color="#2dd4bf" />
          {/* Glow berries amber accent */}
          <pointLight position={[0.6, 1.8, 0.8]} intensity={2.8} color="#fbbf24" distance={6} />
        </>
      ) : (
        /* Overworld Daylight (Grassland, Meadow, Taiga) */
        <>
          <ambientLight intensity={1.2} color="#f0fdf4" />
          <directionalLight position={[4, 8, 4]} intensity={2.6} color="#fffbeb" castShadow />
          <directionalLight position={[-4, 3, -2]} intensity={1.1} color="#bae6fd" />
          <directionalLight position={[0, -2, 2]} intensity={0.4} color="#a7f3d0" />
        </>
      )}

      {/* ----------------- 2. SOFT GROUND CONTACT SHADOW ----------------- */}
      {/* Subtle natural contact shadow anchoring the entity to y = 0 */}
      <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.55, 32]} />
        <meshBasicMaterial
          color="#020617"
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.9, 32]} />
        <meshBasicMaterial
          color="#020617"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>

      {/* ----------------- 3. ATMOSPHERIC PARTICLES ----------------- */}
      <points ref={particlesRef} geometry={particleGeo}>
        <pointsMaterial
          size={particleConfig.size}
          color={particleConfig.color}
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};
