
import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface CameraManagerProps {
  targetPos: THREE.Vector3;
  selectedId: string | null;
  smoothEnabled: boolean;
  isDrawing?: boolean;
  is2DView?: boolean;
}

export const CameraManager: React.FC<CameraManagerProps> = ({ targetPos, selectedId, smoothEnabled, isDrawing, is2DView }) => {
  const { camera, gl } = useThree();
  const controlsRef = useRef<any>(null);

  const isTopDown = isDrawing || is2DView;

  useEffect(() => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;
    controls.enableDamping = true;
    controls.dampingFactor = smoothEnabled ? 0.08 : 0.04;
    controls.rotateSpeed = 0.8;
    controls.panSpeed = 1.2;
    controls.minDistance = 1.5;
    controls.maxDistance = 60;
    
    if (isTopDown) {
      // Force top-down view for drafting or 2D mode
      controls.minPolarAngle = 0;
      controls.maxPolarAngle = 0;
      controls.enableRotate = false;
      
      const targetY = 20;
      if (Math.abs(camera.position.y - targetY) > 0.1 || Math.abs(camera.position.x) > 10 || Math.abs(camera.position.z) > 10) {
        if (!selectedId) {
          camera.position.set(0, targetY, 0.01);
          controls.target.set(0, 0, 0);
        }
      }
    } else {
      // Limit polar angle to prevent looking under the floor
      controls.minPolarAngle = 0.1;
      controls.maxPolarAngle = Math.PI / 2.1; // Slightly less than 90 deg to stay above horizon
      controls.enableRotate = true;
    }
    
    controls.update();
  }, [smoothEnabled, isTopDown, camera, selectedId]);

  useFrame(() => {
    if (controlsRef.current) {
      // Smoothly follow selected target in 3D mode
      if (selectedId && !isDrawing) {
        controlsRef.current.target.lerp(targetPos, 0.1);
      }
      
      // Safety: Prevent camera from ever going below the grid plane
      if (camera.position.y < 0.5) {
        camera.position.y = 0.5;
        controlsRef.current.update();
      }
      
      // Safety: Prevent target from going below floor level to keep camera looking up
      if (controlsRef.current.target.y < 0) {
        controlsRef.current.target.y = 0;
        controlsRef.current.update();
      }
    }
  });

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!controlsRef.current) return;
      const controls = controlsRef.current;
      const delta = Math.sign(e.deltaY);
      const currentDistance = camera.position.distanceTo(controls.target);
      const zoomFactor = currentDistance * 0.12;
      let newDistance = Math.max(1.8, Math.min(currentDistance + delta * zoomFactor * 1.5, 55));
      const direction = camera.position.clone().sub(controls.target).normalize();
      const newPosition = controls.target.clone().add(direction.multiplyScalar(newDistance));
      camera.position.lerp(newPosition, smoothEnabled ? 0.3 : 0.6);
      controls.update();
    };
    gl.domElement.addEventListener('wheel', handleWheel, { passive: false });
    return () => gl.domElement.removeEventListener('wheel', handleWheel);
  }, [gl, camera, smoothEnabled]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={true}
      enableRotate={!isTopDown}
      enableZoom={false}
      mouseButtons={{
        LEFT: isTopDown ? THREE.MOUSE.PAN : THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN,
      }}
    />
  );
};
