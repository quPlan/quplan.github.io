
import React, { useState, useMemo } from 'react';
import { useCursor, Edges, Text } from '@react-three/drei';
import * as THREE from 'three';
import { RoomDefinition, AppMode, WallSettings } from '../types';
import { CustomRoomGeometry } from './room/CustomRoomGeometry';
import { StandardRoomGeometry } from './room/StandardRoomGeometry';

interface RoomInstanceProps {
  room: RoomDefinition;
  isSelected: boolean;
  onSelect: () => void;
  mode: AppMode;
  showFloorInConclusion: boolean;
  showLabels: boolean;
  isDarkMode: boolean;
  wallSettings?: WallSettings;
  isRoomColliding: boolean; // New prop for room-on-room collision
  collidingWalls: { roomId: string, wallIndex: number }[]; // New prop for wall-on-item collisions
}

export const RoomInstance: React.FC<RoomInstanceProps> = ({ 
  room, isSelected, onSelect, mode, showFloorInConclusion, showLabels, isDarkMode, wallSettings, isRoomColliding, collidingWalls 
}) => {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered && mode === 'BUILD');
  
  const floorVisible = mode !== 'CONCLUSION' || showFloorInConclusion;
  // Always use the room's defined color; selection is indicated by Edges.
  // If room is colliding, override floor color to red
  const resolvedFloorColor = isRoomColliding ? '#ef4444' : (room.floorColor || "#ffffff"); 

  const floorGeometry = useMemo(() => {
    if (room.shape === 'CUSTOM' && room.vertices && room.vertices.length >= 3) {
      const shape = new THREE.Shape();
      shape.moveTo(room.vertices[0][0], -room.vertices[0][1]);
      for (let i = 1; i < room.vertices.length; i++) {
        shape.lineTo(room.vertices[i][0], -room.vertices[i][1]);
      }
      shape.closePath();
      return new THREE.ShapeGeometry(shape);
    }
    return new THREE.PlaneGeometry(room.width, room.length);
  }, [room.shape, room.vertices, room.width, room.length]);

  const floorRotation: [number, number, number] = room.shape === 'CUSTOM' ? [-Math.PI / 2, 0, 0] : [-Math.PI / 2, 0, 0];

  return (
    <group 
      position={[room.position[0], 0, room.position[1]]} 
      onClick={e => { if(mode === 'BUILD'){ e.stopPropagation(); onSelect(); } }} 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
    >
      {showLabels && (
        <group position={[0, room.height + 0.6, 0]}>
          <Text
            fontSize={0.28}
            color={isDarkMode ? "white" : "black"}
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
            anchorY="bottom"
            outlineWidth={0.02}
            outlineColor={isDarkMode ? "black" : "white"}
          >
            {room.name.toUpperCase()}
          </Text>
          <Text
            position={[0, -0.15, 0]}
            fontSize={0.16}
            color={isDarkMode ? "#94a3b8" : "#64748b"}
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
            anchorY="top"
          >
            {room.width.toFixed(1)}m x {room.length.toFixed(1)}m • {(room.width * room.length).toFixed(1)}m²
          </Text>
        </group>
      )}

      <group visible={floorVisible}>
        {room.shape === 'CUSTOM' && room.vertices ? (
          <CustomRoomGeometry 
            vertices={room.vertices} 
            height={room.height} 
            wallThickness={room.wallThickness} 
            wallSettings={wallSettings}
            isDarkMode={isDarkMode}
            wallColor={room.wallColor}
            collidingWalls={collidingWalls} // Pass wall collision data
          />
        ) : (
          <StandardRoomGeometry 
            width={room.width} 
            length={room.length} 
            height={room.height} 
            wallThickness={room.wallThickness} 
            wallSettings={wallSettings}
            isDarkMode={isDarkMode}
            wallColor={room.wallColor}
            collidingWalls={collidingWalls} // Pass wall collision data
          />
        )}
      </group>

      {/* Primary floor mesh for color and selection */}
      <mesh 
        rotation={floorRotation} 
        position={[0, 0.005, 0]} 
        visible={floorVisible} 
        geometry={floorGeometry}
        receiveShadow
      >
        <meshStandardMaterial 
          color={resolvedFloorColor} 
          transparent={false} 
          opacity={1}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Hidden floor trigger for selection (slightly larger/buffered) */}
      <mesh rotation={floorRotation} position={[0, 0.001, 0]} visible={false} geometry={floorGeometry}>
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {isSelected && (
        <mesh rotation={floorRotation} position={[0, 0.01, 0]} geometry={floorGeometry}>
          <meshBasicMaterial transparent opacity={0} />
          <Edges color="#3b82f6" threshold={15} />
        </mesh>
      )}
    </group>
  );
};
