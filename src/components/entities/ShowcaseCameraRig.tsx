import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';

interface ShowcaseCameraRigProps {
  camPosition: [number, number, number];
  lookAt: [number, number, number];
  fov?: number;
}

export const ShowcaseCameraRig: React.FC<ShowcaseCameraRigProps> = ({
  camPosition,
  lookAt,
  fov = 32,
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const isInteractingRef = useRef(false);

  const [px, py, pz] = camPosition;
  const desiredPos = useMemo(() => new THREE.Vector3(px, py, pz), [px, py, pz]);

  const [lx, ly, lz] = lookAt;
  const desiredLookAt = useMemo(() => new THREE.Vector3(lx, ly, lz), [lx, ly, lz]);

  // Synchronize target immediately on entity/camera change
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.copy(desiredLookAt);
      controlsRef.current.update();
    }
  }, [desiredLookAt]);

  useFrame((state) => {
    const cam = state.camera as THREE.PerspectiveCamera;
    if (cam.fov !== fov) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }

    // Only auto-lerp camera when user is not actively orbiting
    if (!isInteractingRef.current) {
      cam.position.lerp(desiredPos, 0.08);
      if (controlsRef.current) {
        controlsRef.current.target.lerp(desiredLookAt, 0.08);
        controlsRef.current.update();
      } else {
        cam.lookAt(desiredLookAt);
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 1.75}
      rotateSpeed={0.8}
      onStart={() => {
        isInteractingRef.current = true;
      }}
      onEnd={() => {
        isInteractingRef.current = false;
      }}
    />
  );
};
