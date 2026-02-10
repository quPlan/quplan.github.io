
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Wall } from '../Wall';
import { WallSettings } from '../../types';

interface CustomRoomGeometryProps {
  vertices: [number, number][];
  height: number;
  wallThickness: number;
  wallSettings?: WallSettings;
  isDarkMode?: boolean;
  wallColor?: string;
  collidingWalls?: { roomId: string, wallIndex: number }[]; // New prop
}

export const CustomRoomGeometry: React.FC<CustomRoomGeometryProps> = ({ 
  vertices, height, wallThickness, wallSettings, isDarkMode, wallColor, collidingWalls = []
}) => {
  const walls = useMemo(() => {
    if (!vertices || vertices.length < 2 || (wallSettings && !wallSettings.showWalls)) return null;
    return vertices.map((p1, i) => {
      const p2 = vertices[(i + 1) % vertices.length];
      const dx = p2[0] - p1[0];
      const dz = p2[1] - p1[1];
      const segmentLen = Math.sqrt(dx * dx + dz * dz);
      const midX = (p1[0] + p2[0]) / 2;
      const midZ = (p1[1] + p2[1]) / 2;
      
      // Calculate outward normal for the segment
      const normal = new THREE.Vector3(-dz, 0, dx).normalize();

      // Check if this specific wall segment is colliding
      const isWallColliding = collidingWalls.some(cw => cw.wallIndex === i);

      return (
        <Wall 
          key={`wall-${i}`}
          args={[segmentLen + wallThickness, height, wallThickness]} 
          position={[midX, height / 2, midZ]} 
          outwardNormal={normal}
          autoHide={wallSettings?.autoHideWalls}
          transparent={wallSettings?.transparentWalls}
          transparencyLevel={wallSettings?.transparencyLevel}
          isDarkMode={isDarkMode}
          wallColor={wallColor}
          isColliding={isWallColliding} // Pass collision status
        />
      );
    });
  }, [vertices, height, wallThickness, wallSettings, isDarkMode, wallColor, collidingWalls]);

  return (
    <group rotation={[0, 0, 0]}>
      {walls}
    </group>
  );
};
