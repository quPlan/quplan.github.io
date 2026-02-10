
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { CameraManager } from './CameraManager';
import { SceneLights } from './SceneLights';
import { AppGrid } from './AppGrid';
import { RoomCanvas } from './RoomCanvas';
import { HomeState, AppMode, PlacedItem, RoomDefinition, WallSettings } from '../types';

interface CanvasSceneProps {
  isDarkMode: boolean;
  mode: AppMode;
  cameraTarget: THREE.Vector3;
  selectedId: string | null;
  smoothFollow: boolean;
  homeState: HomeState;
  setSelectedId: (id: string | null) => void;
  updateItem: (id: string, updates: Partial<PlacedItem>, commit?: boolean) => void;
  updateRoom: (id: string, updates: Partial<RoomDefinition>, commit?: boolean) => void;
  isDrawing: boolean;
  currentPath: [number, number][];
  onAddVertex: (point: [number, number]) => void;
  gridLimit: number;
  collidingItems: string[];
  collidingRooms: string[]; // New prop
  collidingWalls: { roomId: string, wallIndex: number }[]; // New prop
  setIsTransforming: (val: boolean) => void;
  showGrid: boolean;
  showGridInConclusion: boolean;
  showFloorInConclusion: boolean;
  showRoomLabels: boolean;
  wallSettings?: WallSettings;
  is2DView: boolean;
  showCollisions: boolean; // New prop
}

export const CanvasScene: React.FC<CanvasSceneProps> = (props) => {
  const { 
    isDarkMode, mode, cameraTarget, selectedId, smoothFollow, 
    homeState, setSelectedId, updateItem, updateRoom, isDrawing, 
    currentPath, onAddVertex, gridLimit, collidingItems, collidingRooms, collidingWalls, setIsTransforming, showGrid,
    showGridInConclusion, showFloorInConclusion, showRoomLabels, wallSettings,
    is2DView, showCollisions // Destructure new props
  } = props;

  return (
    <main className="absolute inset-0 z-0">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [12, 10, 12], fov: 40 }}>
        <color attach="background" args={[isDarkMode ? '#000000' : '#ffffff']} />
        
        <CameraManager 
          targetPos={cameraTarget} 
          selectedId={selectedId} 
          smoothEnabled={smoothFollow} 
          isDrawing={isDrawing}
          is2DView={is2DView}
        />
        
        <SceneLights isDarkMode={isDarkMode} />
        
        <RoomCanvas 
          homeState={homeState} 
          selectedId={selectedId} 
          onSelect={setSelectedId}
          onUpdateItem={updateItem} 
          onUpdateRoom={updateRoom} 
          mode={mode}
          isDrawing={isDrawing} 
          currentPath={currentPath}
          onAddVertex={onAddVertex}
          gridLimit={gridLimit} 
          collidingItems={collidingItems}
          collidingRooms={collidingRooms} // Pass collision results
          collidingWalls={collidingWalls} // Pass collision results
          setIsTransforming={setIsTransforming}
          isDarkMode={isDarkMode}
          showFloorInConclusion={showFloorInConclusion}
          showRoomLabels={showRoomLabels}
          wallSettings={wallSettings}
          showCollisions={showCollisions} // Pass new prop
        />

        <AppGrid 
          mode={mode} 
          isDarkMode={isDarkMode} 
          showGrid={showGrid} 
          showGridInConclusion={showGridInConclusion}
        />
        
        <ContactShadows 
          position={[0, -0.01, 0]} 
          opacity={isDarkMode ? 0.6 : 0.3} 
          scale={50} 
          blur={2.5} 
          far={15} 
        />
      </Canvas>
    </main>
  );
};
