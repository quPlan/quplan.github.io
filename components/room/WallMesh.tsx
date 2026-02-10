
import React from 'react';
import { RoundedBox } from '@react-three/drei';

interface WallMeshProps {
  args: [number, number, number];
  opacity: number;
  transparent: boolean;
  isDarkMode: boolean;
  color?: string;
  isColliding?: boolean; // New prop
}

export const WallMesh: React.FC<WallMeshProps> = ({ args, opacity, transparent, isDarkMode, color, isColliding = false }) => {
  // Use collision color if colliding, otherwise use custom color or fallback to neutral white
  const resolvedColor = isColliding ? '#ef4444' : (color || '#FFFFFF');
  
  return (
    <RoundedBox args={args} radius={0.02} smoothness={4} castShadow receiveShadow>
      <meshStandardMaterial 
        color={resolvedColor} 
        roughness={0.4} 
        metalness={0.1} 
        transparent={transparent}
        opacity={opacity}
        depthWrite={!transparent || opacity > 0.5}
      />
    </RoundedBox>
  );
};
