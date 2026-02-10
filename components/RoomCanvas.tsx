
import React, { useState, useMemo } from 'react';
import { TransformControls } from '@react-three/drei';
import * as THREE from 'three';
import { HomeState, PlacedItem, RoomDefinition, AppMode, WallSettings } from '../types';
import { FURNITURE_CATALOG } from '../constants';
import { RoomInstance } from './RoomInstance';
import { FurnitureItem } from './FurnitureItem';
import { DraftingOverlay } from './DraftingOverlay';

interface RoomCanvasProps {
  homeState: HomeState;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onUpdateItem: (id: string, updates: Partial<PlacedItem>, commit?: boolean) => void;
  onUpdateRoom: (id: string, updates: Partial<RoomDefinition>, commit?: boolean) => void;
  mode: AppMode;
  isDrawing?: boolean;
  onAddVertex?: (point: [number, number]) => void;
  currentPath?: [number, number][];
  setIsTransforming?: (val: boolean) => void;
  gridLimit: number;
  collidingItems: string[];
  collidingRooms: string[]; // New prop
  collidingWalls: { roomId: string, wallIndex: number }[]; // New prop
  isDarkMode: boolean;
  showFloorInConclusion: boolean;
  showRoomLabels: boolean;
  wallSettings?: WallSettings;
  showCollisions: boolean; // New prop
}

export const RoomCanvas: React.FC<RoomCanvasProps> = ({ 
  homeState, selectedId, onSelect, onUpdateItem, onUpdateRoom, mode, isDrawing, onAddVertex, currentPath = [], setIsTransforming, gridLimit, 
  collidingItems, collidingRooms, collidingWalls, isDarkMode, showFloorInConclusion, showRoomLabels, wallSettings, showCollisions
}) => {
  const [hoverPos, setHoverPos] = useState<[number, number] | null>(null);

  const selectedItem = useMemo(() => homeState.items.find(i => i.instanceId === selectedId), [homeState.items, selectedId]);
  const selectedRoom = useMemo(() => homeState.rooms.find(r => r.id === selectedId), [homeState.rooms, selectedId]);

  const showOutlines = mode !== 'CONCLUSION';

  return (
    <group>
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        onPointerMove={(e) => {
          if (isDrawing) {
            const snap = 0.5;
            setHoverPos([Math.round(e.point.x / snap) * snap, Math.round(e.point.z / snap) * snap]);
          }
        }}
        onClick={(e) => {
          if (isDrawing && onAddVertex && hoverPos) {
            e.stopPropagation();
            onAddVertex(hoverPos);
          } else if (!isDrawing) {
            onSelect(null);
          }
        }}
        visible={false}
      >
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {isDrawing && (
        <DraftingOverlay path={currentPath} isDarkMode={isDarkMode} />
      )}

      {homeState.rooms.map((room) => (
        <RoomInstance 
          key={room.id}
          room={room}
          isSelected={showOutlines && selectedId === room.id}
          onSelect={() => onSelect(room.id)}
          mode={mode}
          showFloorInConclusion={showFloorInConclusion}
          showLabels={showRoomLabels}
          isDarkMode={isDarkMode}
          wallSettings={wallSettings}
          isRoomColliding={showCollisions && collidingRooms.includes(room.id)} // Pass room collision status
          collidingWalls={showCollisions ? collidingWalls.filter(w => w.roomId === room.id) : []} // Filter and pass wall collision status
        />
      ))}

      {homeState.items.map((item) => {
        const template = FURNITURE_CATALOG.find(t => t.id === item.templateId);
        if (!template) return null;
        return (
          <FurnitureItem 
            key={item.instanceId}
            item={item}
            template={template}
            isSelected={showOutlines && selectedId === item.instanceId}
            onSelect={() => onSelect(item.instanceId)}
            mode={mode}
            isColliding={showCollisions && collidingItems.includes(item.instanceId)} // Pass item collision status
          />
        );
      })}

      {mode === 'DESIGN' && selectedId && selectedItem && (
        <TransformControls 
          position={selectedItem.position} mode="translate" showY={false}
          onMouseDown={() => setIsTransforming?.(true)} 
          onMouseUp={() => {
            setIsTransforming?.(false);
            onUpdateItem(selectedId, {}, true); 
          }}
          onObjectChange={(e: any) => {
            const { x, z } = e.target.object.position;
            onUpdateItem(selectedId, { position: [Math.max(-gridLimit, Math.min(gridLimit, x)), 0, Math.max(-gridLimit, Math.min(gridLimit, z))] });
          }}
        />
      )}

      {mode === 'BUILD' && selectedId && selectedRoom && (
        <TransformControls 
          position={[selectedRoom.position[0], 0, selectedRoom.position[1]]} mode="translate" showY={false}
          onMouseDown={() => setIsTransforming?.(true)} 
          onMouseUp={() => {
            setIsTransforming?.(false);
            onUpdateRoom(selectedId, {}, true); 
          }}
          onObjectChange={(e: any) => {
            const { x, z } = e.target.object.position;
            onUpdateRoom(selectedId, { position: [Math.max(-gridLimit, Math.min(gridLimit, x)), Math.max(-gridLimit, Math.min(gridLimit, z))] });
          }}
        />
      )}
    </group>
  );
};