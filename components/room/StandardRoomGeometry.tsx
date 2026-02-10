
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Wall } from '../Wall';
import { WallSettings } from '../../types';

interface StandardRoomGeometryProps {
  width: number;
  length: number;
  height: number;
  wallThickness: number;
  wallSettings?: WallSettings;
  isDarkMode?: boolean;
  wallColor?: string;
  collidingWalls?: { roomId: string, wallIndex: number }[]; // New prop
}

export const StandardRoomGeometry: React.FC<StandardRoomGeometryProps> = ({ 
  width, length, height, wallThickness, wallSettings, isDarkMode, wallColor, collidingWalls = []
}) => {
  const normals = useMemo(() => ({
    north: new THREE.Vector3(0, 0, -1),
    south: new THREE.Vector3(0, 0, 1),
    west: new THREE.Vector3(-1, 0, 0),
    east: new THREE.Vector3(1, 0, 0)
  }), []);

  if (wallSettings && !wallSettings.showWalls) {
    return null;
  }

  // Helper to check if a specific wall index is colliding
  const checkWallCollision = (wallIndex: number) => 
    collidingWalls.some(cw => cw.wallIndex === wallIndex);

  return (
    <>
      <Wall 
        args={[width + wallThickness, height, wallThickness]} 
        position={[0, height/2, -length/2]} 
        outwardNormal={normals.north} 
        autoHide={wallSettings?.autoHideWalls}
        transparent={wallSettings?.transparentWalls}
        transparencyLevel={wallSettings?.transparencyLevel}
        isDarkMode={isDarkMode}
        wallColor={wallColor}
        isColliding={checkWallCollision(0)} // Index 0 for North wall
      />
      <Wall 
        args={[width + wallThickness, height, wallThickness]} 
        position={[0, height/2, length/2]} 
        outwardNormal={normals.south} 
        autoHide={wallSettings?.autoHideWalls}
        transparent={wallSettings?.transparentWalls}
        transparencyLevel={wallSettings?.transparencyLevel}
        isDarkMode={isDarkMode}
        wallColor={wallColor}
        isColliding={checkWallCollision(1)} // Index 1 for South wall
      />
      <Wall 
        args={[wallThickness, height, length + wallThickness]} 
        position={[-width/2, height/2, 0]} 
        outwardNormal={normals.west} 
        autoHide={wallSettings?.autoHideWalls}
        transparent={wallSettings?.transparentWalls}
        transparencyLevel={wallSettings?.transparencyLevel}
        isDarkMode={isDarkMode}
        wallColor={wallColor}
        isColliding={checkWallCollision(2)} // Index 2 for West wall
      />
      <Wall 
        args={[wallThickness, height, length + wallThickness]} 
        position={[width/2, height/2, 0]} 
        outwardNormal={normals.east} 
        autoHide={wallSettings?.autoHideWalls}
        transparent={wallSettings?.transparentWalls}
        transparencyLevel={wallSettings?.transparencyLevel}
        isDarkMode={isDarkMode}
        wallColor={wallColor}
        isColliding={checkWallCollision(3)} // Index 3 for East wall
      />
    </>
  );
};
