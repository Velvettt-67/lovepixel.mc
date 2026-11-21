import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  getSteveHeadTexture,
  getSteveTorsoTexture,
  getSteveLegsTexture,
  getAlexHeadTexture,
  getAlexTorsoTexture,
  getDiamondArmorTexture,
  getNetheriteArmorTexture,
  getWolfHeadTexture,
  getWolfBodyTexture,
  getSheepWoolTexture,
  getSheepFaceTexture,
  getAxolotlBodyTexture,
  getCreeperTexture,
  getEndermanHeadTexture,
  getEndermanBodyTexture,
} from './minecraftTextures';

// -------------------------------------------------------------
// 1. VOXEL PLAYER RIG (Steve, Alex, Diamond Knight, Netherite Paladin)
// -------------------------------------------------------------
export interface VoxelPlayerRigProps {
  skin?: 'steve' | 'alex' | 'diamond-knight' | 'netherite-paladin' | 'explorer';
  interactive?: boolean;
  heldItem?: 'sword' | 'torch' | 'poppy' | 'none';
  scale?: number;
}

export const VoxelPlayerRig: React.FC<VoxelPlayerRigProps> = ({
  skin = 'steve',
  interactive = true,
  heldItem = 'none',
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);

  // Textures
  const steveHeadTex = useMemo(() => getSteveHeadTexture(), []);
  const steveTorsoTex = useMemo(() => getSteveTorsoTexture(), []);
  const steveLegsTex = useMemo(() => getSteveLegsTexture(), []);
  const alexHeadTex = useMemo(() => getAlexHeadTexture(), []);
  const alexTorsoTex = useMemo(() => getAlexTorsoTexture(), []);
  const diamondArmorTex = useMemo(() => getDiamondArmorTexture(), []);
  const netheriteArmorTex = useMemo(() => getNetheriteArmorTexture(), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Breathing motion
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 2) * 0.02;
    }

    // Pointer-guided head tracking
    if (headRef.current && interactive) {
      const targetYaw = state.pointer.x * 0.45;
      const targetPitch = -state.pointer.y * 0.3;
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetYaw, 0.08);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetPitch, 0.08);
    }

    // Gentle limb sway
    if (leftArmRef.current && rightArmRef.current) {
      const armSway = Math.sin(time * 2.2) * 0.06;
      leftArmRef.current.rotation.x = armSway;
      rightArmRef.current.rotation.x = -armSway + (heldItem !== 'none' ? 0.4 : 0);
    }

    if (leftLegRef.current && rightLegRef.current) {
      const legSway = Math.sin(time * 2.2) * 0.04;
      leftLegRef.current.rotation.x = -legSway;
      rightLegRef.current.rotation.x = legSway;
    }
  });

  const isArmored = skin === 'diamond-knight' || skin === 'netherite-paladin';
  const isNetherite = skin === 'netherite-paladin';
  const isDiamond = skin === 'diamond-knight';
  const isAlex = skin === 'alex';

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, 0, 0]}>
      {/* 1. HEAD (8x8x8 pixels = 0.8 x 0.8 x 0.8) */}
      <group ref={headRef} position={[0, 1.4, 0]}>
        {/* Main Head Cube */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial
            map={isAlex ? alexHeadTex : steveHeadTex}
            roughness={0.7}
          />
        </mesh>

        {/* Armor Helmet (Dimensional 3D shell over head) */}
        {isArmored && (
          <group position={[0, 0.02, 0]}>
            {/* Crown & Sides */}
            <mesh position={[0, 0.04, 0]}>
              <boxGeometry args={[0.88, 0.88, 0.88]} />
              <meshStandardMaterial
                map={isNetherite ? netheriteArmorTex : diamondArmorTex}
                roughness={0.35}
                metalness={isNetherite ? 0.6 : 0.4}
              />
            </mesh>
            {/* Helmet Brow & Nose Guard */}
            <mesh position={[0, 0.08, 0.46]}>
              <boxGeometry args={[0.2, 0.28, 0.06]} />
              <meshStandardMaterial
                color={isNetherite ? '#1c1917' : '#0284c7'}
                metalness={0.5}
              />
            </mesh>
          </group>
        )}
      </group>

      {/* 2. TORSO (8x12x4 pixels = 0.8 x 1.1 x 0.4) */}
      <group position={[0, 0.68, 0]}>
        <mesh>
          <boxGeometry args={[0.8, 1.1, 0.4]} />
          <meshStandardMaterial
            map={
              isNetherite
                ? netheriteArmorTex
                : isDiamond
                ? diamondArmorTex
                : isAlex
                ? alexTorsoTex
                : steveTorsoTex
            }
            roughness={isArmored ? 0.4 : 0.8}
            metalness={isArmored ? 0.45 : 0}
          />
        </mesh>

        {/* Armor Chestplate Shoulder Pauldrons */}
        {isArmored && (
          <>
            <mesh position={[-0.48, 0.45, 0]}>
              <boxGeometry args={[0.22, 0.24, 0.46]} />
              <meshStandardMaterial
                map={isNetherite ? netheriteArmorTex : diamondArmorTex}
                roughness={0.35}
                metalness={0.5}
              />
            </mesh>
            <mesh position={[0.48, 0.45, 0]}>
              <boxGeometry args={[0.22, 0.24, 0.46]} />
              <meshStandardMaterial
                map={isNetherite ? netheriteArmorTex : diamondArmorTex}
                roughness={0.35}
                metalness={0.5}
              />
            </mesh>
          </>
        )}
      </group>

      {/* 3. LEFT ARM (4x12x4 pixels = 0.38 x 1.1 x 0.38) */}
      <group ref={leftArmRef} position={[-0.58, 1.15, 0]}>
        <mesh position={[0, -0.48, 0]}>
          <boxGeometry args={[isAlex ? 0.32 : 0.38, 1.1, 0.38]} />
          <meshStandardMaterial
            map={
              isNetherite
                ? netheriteArmorTex
                : isDiamond
                ? diamondArmorTex
                : isAlex
                ? alexTorsoTex
                : steveTorsoTex
            }
            roughness={0.7}
          />
        </mesh>
      </group>

      {/* 4. RIGHT ARM (Pivot at shoulder) */}
      <group ref={rightArmRef} position={[0.58, 1.15, 0]}>
        <mesh position={[0, -0.48, 0]}>
          <boxGeometry args={[isAlex ? 0.32 : 0.38, 1.1, 0.38]} />
          <meshStandardMaterial
            map={
              isNetherite
                ? netheriteArmorTex
                : isDiamond
                ? diamondArmorTex
                : isAlex
                ? alexTorsoTex
                : steveTorsoTex
            }
            roughness={0.7}
          />
        </mesh>

        {/* Held Equipment */}
        {heldItem === 'sword' && (
          <group position={[0, -1.0, 0.4]} rotation={[-Math.PI / 4, 0, 0]}>
            {/* Blade */}
            <mesh position={[0, 0.45, 0]}>
              <boxGeometry args={[0.1, 0.9, 0.03]} />
              <meshStandardMaterial
                color={isNetherite ? '#475569' : '#38bdf8'}
                roughness={0.2}
                metalness={0.7}
                emissive={isNetherite ? '#9333ea' : '#0ea5e9'}
                emissiveIntensity={0.25}
              />
            </mesh>
            {/* Crossguard */}
            <mesh position={[0, 0.04, 0]}>
              <boxGeometry args={[0.32, 0.08, 0.08]} />
              <meshStandardMaterial color={isNetherite ? '#1e293b' : '#0284c7'} metalness={0.6} />
            </mesh>
            {/* Grip & Pommel */}
            <mesh position={[0, -0.15, 0]}>
              <boxGeometry args={[0.07, 0.26, 0.06]} />
              <meshStandardMaterial color="#451a03" />
            </mesh>
          </group>
        )}

        {heldItem === 'torch' && (
          <group position={[0, -0.9, 0.25]} rotation={[0.2, 0, 0]}>
            <mesh position={[0, 0.15, 0]}>
              <boxGeometry args={[0.1, 0.45, 0.1]} />
              <meshStandardMaterial color="#78350f" />
            </mesh>
            {/* Glowing Torch Head */}
            <mesh position={[0, 0.42, 0]}>
              <boxGeometry args={[0.12, 0.12, 0.12]} />
              <meshStandardMaterial
                color="#f59e0b"
                emissive="#f59e0b"
                emissiveIntensity={1.2}
              />
            </mesh>
            <pointLight position={[0, 0.5, 0]} intensity={1.8} color="#f59e0b" distance={3} />
          </group>
        )}
      </group>

      {/* 5. LEGS (4x12x4 pixels = 0.38 x 1.15 x 0.38 each) */}
      <group position={[0, 0, 0]}>
        {/* Left Leg */}
        <group ref={leftLegRef} position={[-0.2, 0.55, 0]}>
          <mesh position={[0, -0.55, 0]}>
            <boxGeometry args={[0.38, 1.1, 0.38]} />
            <meshStandardMaterial
              map={
                isNetherite
                  ? netheriteArmorTex
                  : isDiamond
                  ? diamondArmorTex
                  : steveLegsTex
              }
              roughness={0.8}
            />
          </mesh>
        </group>

        {/* Right Leg */}
        <group ref={rightLegRef} position={[0.2, 0.55, 0]}>
          <mesh position={[0, -0.55, 0]}>
            <boxGeometry args={[0.38, 1.1, 0.38]} />
            <meshStandardMaterial
              map={
                isNetherite
                  ? netheriteArmorTex
                  : isDiamond
                  ? diamondArmorTex
                  : steveLegsTex
              }
              roughness={0.8}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
};

// -------------------------------------------------------------
// 2. VOXEL WOLF RIG (Faithful Minecraft Wolf Model)
// -------------------------------------------------------------
export const VoxelWolfRig: React.FC<{ scale?: number; interactive?: boolean }> = ({
  scale = 1,
  interactive = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Group>(null);

  const wolfHeadTex = useMemo(() => getWolfHeadTexture(), []);
  const wolfBodyTex = useMemo(() => getWolfBodyTexture(), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Tail wagging
    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(time * 8) * 0.45;
    }

    // Curious head tilting
    if (headRef.current && interactive) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        state.pointer.x * 0.4,
        0.08
      );
      headRef.current.rotation.z = THREE.MathUtils.lerp(
        headRef.current.rotation.z,
        -state.pointer.x * 0.15,
        0.08
      );
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, 0, 0]}>
      {/* 1. HEAD (6x6x6 pixels = 0.55 x 0.55 x 0.55) */}
      <group ref={headRef} position={[0, 0.8, 0.55]}>
        <mesh>
          <boxGeometry args={[0.55, 0.55, 0.55]} />
          <meshStandardMaterial map={wolfHeadTex} roughness={0.8} />
        </mesh>

        {/* Snout (3x3x4 pixels) with Black Nose */}
        <mesh position={[0, -0.09, 0.36]}>
          <boxGeometry args={[0.3, 0.22, 0.3]} />
          <meshStandardMaterial map={wolfBodyTex} roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.02, 0.52]}>
          <boxGeometry args={[0.1, 0.08, 0.04]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>

        {/* Pointed Triangular Ears */}
        <mesh position={[-0.18, 0.34, -0.08]}>
          <boxGeometry args={[0.14, 0.22, 0.1]} />
          <meshStandardMaterial color="#64748b" roughness={0.8} />
        </mesh>
        <mesh position={[0.18, 0.34, -0.08]}>
          <boxGeometry args={[0.14, 0.22, 0.1]} />
          <meshStandardMaterial color="#64748b" roughness={0.8} />
        </mesh>
      </group>

      {/* 2. TAMED RED COLLAR (8x8x3 pixels around neck) */}
      <mesh position={[0, 0.62, 0.32]}>
        <boxGeometry args={[0.58, 0.16, 0.58]} />
        <meshStandardMaterial color="#dc2626" roughness={0.6} />
      </mesh>

      {/* 3. MAIN TORSO (6x6x9 pixels) */}
      <mesh position={[0, 0.48, -0.12]}>
        <boxGeometry args={[0.52, 0.52, 0.8]} />
        <meshStandardMaterial map={wolfBodyTex} roughness={0.8} />
      </mesh>

      {/* 4. TAIL (Wagging pivot) */}
      <group ref={tailRef} position={[0, 0.58, -0.52]} rotation={[0.7, 0, 0]}>
        <mesh position={[0, 0.24, 0]}>
          <boxGeometry args={[0.14, 0.5, 0.14]} />
          <meshStandardMaterial map={wolfBodyTex} roughness={0.8} />
        </mesh>
      </group>

      {/* 5. FOUR LEGS (2x2x8 pixels) */}
      <mesh position={[-0.17, 0.22, 0.18]}>
        <boxGeometry args={[0.16, 0.52, 0.16]} />
        <meshStandardMaterial map={wolfBodyTex} roughness={0.8} />
      </mesh>
      <mesh position={[0.17, 0.22, 0.18]}>
        <boxGeometry args={[0.16, 0.52, 0.16]} />
        <meshStandardMaterial map={wolfBodyTex} roughness={0.8} />
      </mesh>
      <mesh position={[-0.17, 0.22, -0.38]}>
        <boxGeometry args={[0.16, 0.52, 0.16]} />
        <meshStandardMaterial map={wolfBodyTex} roughness={0.8} />
      </mesh>
      <mesh position={[0.17, 0.22, -0.38]}>
        <boxGeometry args={[0.16, 0.52, 0.16]} />
        <meshStandardMaterial map={wolfBodyTex} roughness={0.8} />
      </mesh>
    </group>
  );
};

// -------------------------------------------------------------
// 3. VOXEL SHEEP RIG (Fluffy Textured Minecraft Sheep)
// -------------------------------------------------------------
export const VoxelSheepRig: React.FC<{ scale?: number; interactive?: boolean }> = ({
  scale = 1,
  interactive = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  const woolTex = useMemo(() => getSheepWoolTexture(), []);
  const faceTex = useMemo(() => getSheepFaceTexture(), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    // Gentle grazing bob
    if (headRef.current && interactive) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        state.pointer.x * 0.35,
        0.06
      );
      headRef.current.rotation.x = 0.1 + Math.sin(time * 1.5) * 0.08;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, 0, 0]}>
      {/* 1. FLUFFY WOOL BODY (Big chunky 12x10x14 pixel cube) */}
      <mesh position={[0, 0.72, -0.05]}>
        <boxGeometry args={[1.05, 0.9, 1.25]} />
        <meshStandardMaterial map={woolTex} roughness={0.9} />
      </mesh>

      {/* 2. HEAD & FLEECE (Pivot at neck) */}
      <group ref={headRef} position={[0, 0.95, 0.68]}>
        {/* Head Base with Face Texture */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.48, 0.48, 0.55]} />
          <meshStandardMaterial map={faceTex} roughness={0.75} />
        </mesh>

        {/* Fluffy Wool Forehead Layer */}
        <mesh position={[0, 0.12, -0.05]}>
          <boxGeometry args={[0.52, 0.32, 0.52]} />
          <meshStandardMaterial map={woolTex} roughness={0.9} />
        </mesh>
      </group>

      {/* 3. FOUR STURDY TAN LEGS */}
      <mesh position={[-0.32, 0.28, 0.35]}>
        <boxGeometry args={[0.18, 0.58, 0.18]} />
        <meshStandardMaterial color="#d4a373" roughness={0.8} />
      </mesh>
      <mesh position={[0.32, 0.28, 0.35]}>
        <boxGeometry args={[0.18, 0.58, 0.18]} />
        <meshStandardMaterial color="#d4a373" roughness={0.8} />
      </mesh>
      <mesh position={[-0.32, 0.28, -0.45]}>
        <boxGeometry args={[0.18, 0.58, 0.18]} />
        <meshStandardMaterial color="#d4a373" roughness={0.8} />
      </mesh>
      <mesh position={[0.32, 0.28, -0.45]}>
        <boxGeometry args={[0.18, 0.58, 0.18]} />
        <meshStandardMaterial color="#d4a373" roughness={0.8} />
      </mesh>
    </group>
  );
};

// -------------------------------------------------------------
// 4. VOXEL AXOLOTL RIG (Lucy Pink Cavern Swimmer)
// -------------------------------------------------------------
export const VoxelAxolotlRig: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Group>(null);

  const axolotlTex = useMemo(() => getAxolotlBodyTexture(), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime * 3.5;
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.05 + 0.2;
      groupRef.current.rotation.y = Math.sin(time) * 0.15;
    }
    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(time - 1.0) * 0.4;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, 0.2, 0]}>
      {/* 1. BROAD FLAT HEAD */}
      <mesh position={[0, 0, 0.42]}>
        <boxGeometry args={[0.65, 0.34, 0.45]} />
        <meshStandardMaterial map={axolotlTex} roughness={0.5} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.26, 0.08, 0.64]}>
        <boxGeometry args={[0.07, 0.07, 0.02]} />
        <meshStandardMaterial color="#1e1b4b" roughness={0.2} />
      </mesh>
      <mesh position={[0.26, 0.08, 0.64]}>
        <boxGeometry args={[0.07, 0.07, 0.02]} />
        <meshStandardMaterial color="#1e1b4b" roughness={0.2} />
      </mesh>

      {/* 6 External Pink Gill Frills (3 on left, 3 on right) */}
      <group position={[-0.4, 0.1, 0.38]}>
        <mesh position={[0, 0.12, 0]} rotation={[0, 0, 0.35]}>
          <boxGeometry args={[0.24, 0.1, 0.04]} />
          <meshStandardMaterial color="#db2777" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.26, 0.1, 0.04]} />
          <meshStandardMaterial color="#ec4899" roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.12, 0]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.22, 0.1, 0.04]} />
          <meshStandardMaterial color="#f472b6" roughness={0.4} />
        </mesh>
      </group>

      <group position={[0.4, 0.1, 0.38]}>
        <mesh position={[0, 0.12, 0]} rotation={[0, 0, -0.35]}>
          <boxGeometry args={[0.24, 0.1, 0.04]} />
          <meshStandardMaterial color="#db2777" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.26, 0.1, 0.04]} />
          <meshStandardMaterial color="#ec4899" roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.12, 0]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.22, 0.1, 0.04]} />
          <meshStandardMaterial color="#f472b6" roughness={0.4} />
        </mesh>
      </group>

      {/* 2. BODY WITH DORSAL FIN */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[0.45, 0.32, 0.6]} />
        <meshStandardMaterial map={axolotlTex} roughness={0.5} />
      </mesh>

      {/* 3. UNDULATING TAIL & PADDLE FIN */}
      <group ref={tailRef} position={[0, 0, -0.35]}>
        <mesh position={[0, 0.02, -0.32]}>
          <boxGeometry args={[0.08, 0.42, 0.65]} />
          <meshStandardMaterial color="#ec4899" roughness={0.5} />
        </mesh>
      </group>

      {/* 4. PADDLE FEET */}
      <mesh position={[-0.28, -0.16, 0.15]} rotation={[0, 0.4, -0.2]}>
        <boxGeometry args={[0.18, 0.06, 0.18]} />
        <meshStandardMaterial color="#f472b6" />
      </mesh>
      <mesh position={[0.28, -0.16, 0.15]} rotation={[0, -0.4, 0.2]}>
        <boxGeometry args={[0.18, 0.06, 0.18]} />
        <meshStandardMaterial color="#f472b6" />
      </mesh>
      <mesh position={[-0.28, -0.16, -0.25]} rotation={[0, 0.4, -0.2]}>
        <boxGeometry args={[0.18, 0.06, 0.18]} />
        <meshStandardMaterial color="#f472b6" />
      </mesh>
      <mesh position={[0.28, -0.16, -0.25]} rotation={[0, -0.4, 0.2]}>
        <boxGeometry args={[0.18, 0.06, 0.18]} />
        <meshStandardMaterial color="#f472b6" />
      </mesh>
    </group>
  );
};

// -------------------------------------------------------------
// 5. VOXEL ENDERMAN RIG (3 Blocks Tall, Glowing Eyes)
// -------------------------------------------------------------
export const VoxelEndermanRig: React.FC<{ scale?: number; interactive?: boolean }> = ({
  scale = 1,
  interactive = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  const headTex = useMemo(() => getEndermanHeadTexture(), []);
  const bodyTex = useMemo(() => getEndermanBodyTexture(), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    // Ominous breathing motion
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 1.5) * 0.02;
    }

    if (headRef.current && interactive) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        state.pointer.x * 0.4,
        0.06
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -state.pointer.y * 0.3,
        0.06
      );
    }

    // Menacing arm twitches
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(time * 1.8) * 0.04;
      rightArmRef.current.rotation.x = -Math.sin(time * 1.8) * 0.04;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, 0, 0]}>
      {/* 1. HEAD (8x8x8 pixels = 0.65 x 0.65 x 0.65) */}
      <group ref={headRef} position={[0, 2.25, 0]}>
        <mesh>
          <boxGeometry args={[0.65, 0.65, 0.65]} />
          <meshStandardMaterial
            map={headTex}
            roughness={0.5}
            emissive="#581c87"
            emissiveIntensity={0.25}
          />
        </mesh>
      </group>

      {/* 2. SLENDER TORSO (4x12x2 pixels = 0.35 x 1.05 x 0.2) */}
      <mesh position={[0, 1.45, 0]}>
        <boxGeometry args={[0.35, 1.05, 0.2]} />
        <meshStandardMaterial map={bodyTex} roughness={0.6} />
      </mesh>

      {/* 3. EXTRA-LONG SLENDER ARMS (2x30x2 pixels = 0.14 x 1.75 x 0.14) */}
      <group ref={leftArmRef} position={[-0.26, 1.9, 0]}>
        <mesh position={[0, -0.82, 0]}>
          <boxGeometry args={[0.14, 1.75, 0.14]} />
          <meshStandardMaterial map={bodyTex} roughness={0.6} />
        </mesh>
      </group>
      <group ref={rightArmRef} position={[0.26, 1.9, 0]}>
        <mesh position={[0, -0.82, 0]}>
          <boxGeometry args={[0.14, 1.75, 0.14]} />
          <meshStandardMaterial map={bodyTex} roughness={0.6} />
        </mesh>
      </group>

      {/* 4. EXTRA-LONG LEGS (2x30x2 pixels = 0.14 x 1.75 x 0.14) */}
      <mesh position={[-0.1, 0.88, 0]}>
        <boxGeometry args={[0.14, 1.75, 0.14]} />
        <meshStandardMaterial map={bodyTex} roughness={0.6} />
      </mesh>
      <mesh position={[0.1, 0.88, 0]}>
        <boxGeometry args={[0.14, 1.75, 0.14]} />
        <meshStandardMaterial map={bodyTex} roughness={0.6} />
      </mesh>
    </group>
  );
};

// -------------------------------------------------------------
// 6. VOXEL CREEPER RIG (Iconic Frowning Stalker)
// -------------------------------------------------------------
export const VoxelCreeperRig: React.FC<{ scale?: number; interactive?: boolean }> = ({
  scale = 1,
  interactive = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const flLegRef = useRef<THREE.Mesh>(null);
  const frLegRef = useRef<THREE.Mesh>(null);
  const blLegRef = useRef<THREE.Mesh>(null);
  const brLegRef = useRef<THREE.Mesh>(null);

  const creeperTex = useMemo(() => getCreeperTexture(), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (headRef.current && interactive) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        state.pointer.x * 0.4,
        0.06
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -state.pointer.y * 0.25,
        0.06
      );
    }

    // Quadruped walk cycle
    const walk = Math.sin(time * 3) * 0.18;
    if (flLegRef.current) flLegRef.current.rotation.x = walk;
    if (frLegRef.current) frLegRef.current.rotation.x = -walk;
    if (blLegRef.current) blLegRef.current.rotation.x = -walk;
    if (brLegRef.current) brLegRef.current.rotation.x = walk;
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, 0, 0]}>
      {/* 1. HEAD (8x8x8 pixels = 0.75 x 0.75 x 0.75) */}
      <group ref={headRef} position={[0, 1.25, 0]}>
        <mesh>
          <boxGeometry args={[0.75, 0.75, 0.75]} />
          <meshStandardMaterial map={creeperTex} roughness={0.7} />
        </mesh>

        {/* Frowning Face (Black Pixels) */}
        <mesh position={[-0.18, 0.12, 0.38]}>
          <boxGeometry args={[0.15, 0.15, 0.02]} />
          <meshStandardMaterial color="#052e16" roughness={0.9} />
        </mesh>
        <mesh position={[0.18, 0.12, 0.38]}>
          <boxGeometry args={[0.15, 0.15, 0.02]} />
          <meshStandardMaterial color="#052e16" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0.38]}>
          <boxGeometry args={[0.14, 0.16, 0.02]} />
          <meshStandardMaterial color="#052e16" roughness={0.9} />
        </mesh>
        <mesh position={[-0.14, -0.16, 0.38]}>
          <boxGeometry args={[0.14, 0.22, 0.02]} />
          <meshStandardMaterial color="#052e16" roughness={0.9} />
        </mesh>
        <mesh position={[0.14, -0.16, 0.38]}>
          <boxGeometry args={[0.14, 0.22, 0.02]} />
          <meshStandardMaterial color="#052e16" roughness={0.9} />
        </mesh>
      </group>

      {/* 2. TORSO */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[0.5, 0.9, 0.32]} />
        <meshStandardMaterial map={creeperTex} roughness={0.8} />
      </mesh>

      {/* 3. FOUR STUBBY FEET */}
      <mesh ref={flLegRef} position={[-0.2, 0.15, 0.18]}>
        <boxGeometry args={[0.26, 0.45, 0.26]} />
        <meshStandardMaterial map={creeperTex} roughness={0.8} />
      </mesh>
      <mesh ref={frLegRef} position={[0.2, 0.15, 0.18]}>
        <boxGeometry args={[0.26, 0.45, 0.26]} />
        <meshStandardMaterial map={creeperTex} roughness={0.8} />
      </mesh>
      <mesh ref={blLegRef} position={[-0.2, 0.15, -0.18]}>
        <boxGeometry args={[0.26, 0.45, 0.26]} />
        <meshStandardMaterial map={creeperTex} roughness={0.8} />
      </mesh>
      <mesh ref={brLegRef} position={[0.2, 0.15, -0.18]}>
        <boxGeometry args={[0.26, 0.45, 0.26]} />
        <meshStandardMaterial map={creeperTex} roughness={0.8} />
      </mesh>
    </group>
  );
};

// -------------------------------------------------------------
// 7. VOXEL SLIME RIG (Squishy Bouncy Gel Cube)
// -------------------------------------------------------------
export const VoxelSlimeRig: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime * 2.5;
    if (meshRef.current) {
      const cycle = Math.sin(time);
      if (cycle > 0) {
        meshRef.current.position.y = cycle * 0.45 + 0.1;
        meshRef.current.scale.y = scale * (1 + cycle * 0.18);
        meshRef.current.scale.x = scale * (1 - cycle * 0.1);
        meshRef.current.scale.z = scale * (1 - cycle * 0.1);
      } else {
        meshRef.current.position.y = 0.1;
        meshRef.current.scale.y = scale * (1 + cycle * 0.25);
        meshRef.current.scale.x = scale * (1 - cycle * 0.15);
        meshRef.current.scale.z = scale * (1 - cycle * 0.15);
      }
    }
  });

  return (
    <group ref={meshRef} position={[0, 0.1, 0]}>
      {/* Translucent Outer Gelatinous Cube */}
      <mesh>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial
          color="#84cc16"
          transparent
          opacity={0.55}
          roughness={0.1}
          metalness={0.15}
        />
      </mesh>

      {/* Solid Inner Dark Core */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.48, 0.48, 0.48]} />
        <meshStandardMaterial color="#4d7c0f" roughness={0.6} />
      </mesh>

      {/* Black Square Eyes */}
      <mesh position={[-0.2, 0.14, 0.46]}>
        <boxGeometry args={[0.15, 0.15, 0.02]} />
        <meshStandardMaterial color="#14532d" roughness={0.9} />
      </mesh>
      <mesh position={[0.2, 0.14, 0.46]}>
        <boxGeometry args={[0.15, 0.15, 0.02]} />
        <meshStandardMaterial color="#14532d" roughness={0.9} />
      </mesh>
    </group>
  );
};

// -------------------------------------------------------------
// 8. VOXEL ALLAY RIG (Fairy with 26Hz Wing Flutter)
// -------------------------------------------------------------
export const VoxelAllayRig: React.FC<{ scale?: number; interactive?: boolean }> = ({
  scale = 1,
  interactive = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Group>(null);
  const rightWingRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = 0.5 + Math.sin(time * 3) * 0.08;
    }
    if (headRef.current && interactive) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        state.pointer.x * 0.35,
        0.08
      );
    }
    // High frequency wing flutter
    const wingFlap = Math.sin(time * 26) * 0.45;
    if (leftWingRef.current) leftWingRef.current.rotation.y = -wingFlap;
    if (rightWingRef.current) rightWingRef.current.rotation.y = wingFlap;
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, 0.5, 0]}>
      {/* Head */}
      <group ref={headRef} position={[0, 0.42, 0]}>
        <mesh>
          <boxGeometry args={[0.38, 0.38, 0.38]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.4} />
        </mesh>
        {/* Indigo Eyes */}
        <mesh position={[-0.1, 0.02, 0.2]}>
          <boxGeometry args={[0.08, 0.12, 0.02]} />
          <meshStandardMaterial color="#1e3a8a" />
        </mesh>
        <mesh position={[0.1, 0.02, 0.2]}>
          <boxGeometry args={[0.08, 0.12, 0.02]} />
          <meshStandardMaterial color="#1e3a8a" />
        </mesh>
      </group>

      {/* Torso & Robe */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.26, 0.35, 0.22]} />
        <meshStandardMaterial color="#0284c7" roughness={0.6} />
      </mesh>

      {/* Translucent Wings */}
      <group ref={leftWingRef} position={[-0.14, 0.24, -0.12]}>
        <mesh position={[-0.2, 0.08, 0]}>
          <boxGeometry args={[0.38, 0.48, 0.02]} />
          <meshStandardMaterial color="#bae6fd" transparent opacity={0.7} />
        </mesh>
      </group>
      <group ref={rightWingRef} position={[0.14, 0.24, -0.12]}>
        <mesh position={[0.2, 0.08, 0]}>
          <boxGeometry args={[0.38, 0.48, 0.02]} />
          <meshStandardMaterial color="#bae6fd" transparent opacity={0.7} />
        </mesh>
      </group>
    </group>
  );
};

// -------------------------------------------------------------
// 9. VOXEL BEE RIG (Fuzzy Pollen Harvester)
// -------------------------------------------------------------
export const VoxelBeeRig: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Group>(null);
  const rightWingRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = 0.45 + Math.sin(time * 4) * 0.06;
      groupRef.current.position.x = Math.sin(time * 2) * 0.04;
    }
    const wingFlutter = Math.sin(time * 35) * 0.55;
    if (leftWingRef.current) leftWingRef.current.rotation.z = -wingFlutter;
    if (rightWingRef.current) rightWingRef.current.rotation.z = wingFlutter;
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, 0.45, 0]}>
      {/* Striped Torso */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.65, 0.6, 0.7]} />
        <meshStandardMaterial color="#eab308" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[0.67, 0.62, 0.2]} />
        <meshStandardMaterial color="#451a03" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0, -0.32]}>
        <boxGeometry args={[0.67, 0.62, 0.12]} />
        <meshStandardMaterial color="#292524" roughness={0.8} />
      </mesh>

      {/* Cyan Eyes */}
      <mesh position={[-0.2, 0.08, 0.36]}>
        <boxGeometry args={[0.1, 0.12, 0.02]} />
        <meshStandardMaterial color="#38bdf8" />
      </mesh>
      <mesh position={[0.2, 0.08, 0.36]}>
        <boxGeometry args={[0.1, 0.12, 0.02]} />
        <meshStandardMaterial color="#38bdf8" />
      </mesh>

      {/* Antennae */}
      <mesh position={[-0.15, 0.38, 0.28]}>
        <boxGeometry args={[0.04, 0.2, 0.04]} />
        <meshStandardMaterial color="#292524" />
      </mesh>
      <mesh position={[0.15, 0.38, 0.28]}>
        <boxGeometry args={[0.04, 0.2, 0.04]} />
        <meshStandardMaterial color="#292524" />
      </mesh>

      {/* Fluttering Wings */}
      <group ref={leftWingRef} position={[-0.32, 0.32, 0.05]}>
        <mesh position={[-0.22, 0, 0]}>
          <boxGeometry args={[0.48, 0.02, 0.35]} />
          <meshStandardMaterial color="#bae6fd" transparent opacity={0.7} />
        </mesh>
      </group>
      <group ref={rightWingRef} position={[0.32, 0.32, 0.05]}>
        <mesh position={[0.22, 0, 0]}>
          <boxGeometry args={[0.48, 0.02, 0.35]} />
          <meshStandardMaterial color="#bae6fd" transparent opacity={0.7} />
        </mesh>
      </group>
    </group>
  );
};
