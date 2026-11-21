import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MobKey, PlayerSkinKey } from '../../config/minecraftEntityConfig';
import { buildBedrockMob, buildPlayerModel, type CanonicalPlayer } from './minecraftEntityUtils';

// -------------------------------------------------------------
// 1. CANONICAL BEDROCK MOB MESH COMPONENT
// -------------------------------------------------------------
export interface MinecraftMobMeshProps {
  mobKey: MobKey;
  interactive?: boolean;
}

export const MinecraftMobMesh: React.FC<MinecraftMobMeshProps> = ({
  mobKey,
  interactive = true,
}) => {
  const rootRef = useRef<THREE.Group>(null);
  const boneMapRef = useRef<Map<string, THREE.Group>>(new Map());

  const { root, bones } = useMemo(() => {
    return buildBedrockMob(mobKey);
  }, [mobKey]);

  useEffect(() => {
    boneMapRef.current = bones;
    return () => {
      // Clean up GPU resources on unmount
      root.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });
    };
  }, [bones, root]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const bMap = boneMapRef.current;
    if (!bMap || bMap.size === 0) return;

    let mouseX = 0;
    let mouseY = 0;
    if (interactive) {
      mouseX = state.pointer.x * 0.45;
      mouseY = state.pointer.y * 0.35;
    }

    if (mobKey === 'wolf') {
      const tail = bMap.get('tail');
      if (tail) {
        tail.rotation.y = Math.sin(time * 5) * 0.35;
        tail.rotation.x = -0.45 + Math.sin(time * 2) * 0.08;
      }
      const head = bMap.get('head');
      if (head) {
        head.rotation.y = mouseX + Math.sin(time * 1.5) * 0.05;
        head.rotation.x = -mouseY + Math.sin(time * 2) * 0.04;
      }
    } else if (mobKey === 'bee') {
      const rightWing = bMap.get('rightwing_bone');
      const leftWing = bMap.get('leftwing_bone');
      if (rightWing) rightWing.rotation.y = Math.sin(time * 28) * 0.6;
      if (leftWing) leftWing.rotation.y = -Math.sin(time * 28) * 0.6;
      if (rootRef.current) {
        rootRef.current.position.y = Math.sin(time * 3) * 0.06;
      }
    } else if (mobKey === 'allay') {
      const rightWing = bMap.get('right_wing');
      const leftWing = bMap.get('left_wing');
      if (rightWing) rightWing.rotation.y = Math.sin(time * 22) * 0.55;
      if (leftWing) leftWing.rotation.y = -Math.sin(time * 22) * 0.55;
      const head = bMap.get('look_at') || bMap.get('head');
      if (head) {
        head.rotation.y = mouseX + Math.sin(time * 1.5) * 0.08;
        head.rotation.x = -mouseY + Math.sin(time * 2) * 0.06;
      }
      if (rootRef.current) {
        rootRef.current.position.y = 0.15 + Math.sin(time * 2.5) * 0.08;
      }
    } else if (mobKey === 'slime') {
      if (rootRef.current) {
        const bounce = Math.abs(Math.sin(time * 3.5));
        rootRef.current.scale.set(
          (1 / 16) * (1 - bounce * 0.08),
          (1 / 16) * (1 + bounce * 0.12),
          (1 / 16) * (1 - bounce * 0.08)
        );
        rootRef.current.position.y = bounce * 0.06;
      }
    } else if (mobKey === 'sheep') {
      const head = bMap.get('head');
      if (head) {
        head.rotation.y = mouseX * 0.65;
        head.rotation.x = 0.1 + -mouseY * 0.45 + Math.sin(time * 1.5) * 0.06;
      }
    } else if (mobKey === 'pig') {
      const head = bMap.get('head');
      if (head) {
        head.rotation.y = mouseX * 0.65;
        head.rotation.x = 0.05 + -mouseY * 0.45 + Math.sin(time * 1.8) * 0.05;
      }
    } else if (mobKey === 'creeper') {
      const head = bMap.get('head');
      if (head) {
        head.rotation.y = mouseX;
        head.rotation.x = -mouseY;
      }
    } else if (mobKey === 'enderman') {
      const head = bMap.get('head');
      if (head) {
        head.rotation.y = mouseX * 0.85;
        head.rotation.x = -mouseY * 0.65;
      }
      const rightArm = bMap.get('rightArm');
      const leftArm = bMap.get('leftArm');
      if (rightArm) rightArm.rotation.x = Math.sin(time * 1.5) * 0.06;
      if (leftArm) leftArm.rotation.x = -Math.sin(time * 1.5) * 0.06;
    } else if (mobKey === 'axolotl') {
      const tail = bMap.get('tail');
      if (tail) tail.rotation.y = Math.sin(time * 3.2) * 0.35;
      const head = bMap.get('head');
      if (head) {
        head.rotation.y = mouseX * 0.5;
        head.rotation.x = -mouseY * 0.4;
      }
    }
  });

  return (
    <group ref={rootRef}>
      <primitive object={root} />
    </group>
  );
};

// -------------------------------------------------------------
// 2. CANONICAL MINECRAFT PLAYER MESH COMPONENT
// -------------------------------------------------------------
export interface MinecraftPlayerMeshProps {
  skinKey: PlayerSkinKey;
  heldItem?: 'sword' | 'torch' | 'poppy' | 'none';
  interactive?: boolean;
}

export const MinecraftPlayerMesh: React.FC<MinecraftPlayerMeshProps> = ({
  skinKey,
  heldItem = 'sword',
  interactive = true,
}) => {
  const rootRef = useRef<THREE.Group>(null);
  const playerRef = useRef<CanonicalPlayer | null>(null);

  const { root, player } = useMemo(() => {
    const item = heldItem === 'poppy' ? 'none' : heldItem;
    return buildPlayerModel(skinKey, item);
  }, [skinKey, heldItem]);

  useEffect(() => {
    playerRef.current = player;
    return () => {
      // Clean up GPU resources on unmount
      root.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });
    };
  }, [player, root]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const p = playerRef.current;
    if (!p) return;

    let mouseX = 0;
    let mouseY = 0;
    if (interactive) {
      mouseX = state.pointer.x * 0.45;
      mouseY = state.pointer.y * 0.35;
    }

    // Head orientation
    if (p.skin.head) {
      p.skin.head.rotation.y = mouseX;
      p.skin.head.rotation.x = -mouseY;
    }

    // Subtle breathing motion (body pivot is Y=24 in Bedrock space)
    if (p.skin.body) {
      p.skin.body.position.y = 12 + Math.sin(time * 2) * 0.15;
    }

    // Arm motions & gear posing
    if (p.skin.rightArm) {
      if (heldItem !== 'none') {
        p.skin.rightArm.rotation.x = -0.65 + Math.sin(time * 1.8) * 0.04;
        p.skin.rightArm.rotation.y = -0.15;
        p.skin.rightArm.rotation.z = 0.08;
      } else {
        p.skin.rightArm.rotation.x = Math.sin(time * 1.5) * 0.08;
        p.skin.rightArm.rotation.y = 0;
        p.skin.rightArm.rotation.z = 0;
      }
    }

    if (p.skin.leftArm) {
      p.skin.leftArm.rotation.x = -Math.sin(time * 1.5) * 0.08;
    }
  });

  return (
    <group ref={rootRef}>
      <primitive object={root} />
    </group>
  );
};
