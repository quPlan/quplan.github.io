
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WallProps } from '../types'; // Import WallProps
import { WallMesh } from './room/WallMesh'; // Import WallMesh

export const Wall: React.FC<WallProps> = ({ 
  args, position, outwardNormal, autoHide = true, transparent = true, 
  transparencyLevel = 0.8, isDarkMode = false, wallColor, isColliding = false // Destructure isColliding prop
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [internalVisible, setInternalVisible] = React.useState(true);
  
  useFrame(({ camera }) => {
    if (!groupRef.current || !autoHide) {
      if (!internalVisible) setInternalVisible(true);
      return;
    }
    
    const wallWorldPos = groupRef.current.getWorldPosition(new THREE.Vector3());
    const cameraToWall = new THREE.Vector3().subVectors(wallWorldPos, camera.position).normalize();
    const dot = cameraToWall.dot(outwardNormal);
    
    const isTopDown = camera.position.y > 15;
    const shouldBeVisible = isTopDown || dot >= -0.15;
    
    if (shouldBeVisible !== internalVisible) {
      setInternalVisible(shouldBeVisible);
    }
  });

  const finalOpacity = useMemo(() => {
    if (!internalVisible) return 0;
    // Transparency level 1.0 means fully transparent (alpha 0)
    // Transparency level 0.0 means solid (alpha 1)
    return transparent ? Math.max(0.01, 1 - transparencyLevel) : 1.0;
  }, [internalVisible, transparent, transparencyLevel]);

  return (
    <group ref={groupRef} position={position}>
      {internalVisible && (
        <WallMesh 
          args={args} 
          opacity={finalOpacity} 
          transparent={transparent || !internalVisible} 
          isDarkMode={isDarkMode}
          color={wallColor}
          isColliding={isColliding} // Pass isColliding to WallMesh
        />
      )}
    </group>
  );
};