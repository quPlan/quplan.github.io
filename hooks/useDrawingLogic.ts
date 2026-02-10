
import { useState, useCallback } from 'react';
import { RoomDefinition, HomeState } from '../types';

export const useDrawingLogic = (
  homeState: HomeState,
  addRoom: (room: RoomDefinition) => void,
  notify: (msg: string, type?: 'success' | 'error' | 'info') => void
) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<[number, number][]>([]);

  const startDrawing = useCallback(() => {
    setIsDrawing(true);
    setCurrentPath([]);
  }, []);

  const cancelDrawing = useCallback(() => {
    setIsDrawing(false);
    setCurrentPath([]);
  }, []);

  const addVertex = useCallback((point: [number, number]) => {
    setCurrentPath(prev => [...prev, point]);
  }, []);

  const updateVertex = useCallback((idx: number, pt: [number, number]) => {
    setCurrentPath(prev => {
      const n = [...prev];
      n[idx] = pt;
      return n;
    });
  }, []);

  const finishDrawing = useCallback((overrideVertices?: [number, number][]) => {
    const finalPath = overrideVertices || currentPath;
    
    if (finalPath.length < 3) {
      notify("Room needs at least 3 points", "error");
      return null;
    }
    
    const xs = finalPath.map(p => p[0]);
    const zs = finalPath.map(p => p[1]);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minZ = Math.min(...zs);
    const maxZ = Math.max(...zs);
    const centerX = (minX + maxX) / 2;
    const centerZ = (minZ + maxZ) / 2;

    const newRoom: RoomDefinition = {
      id: `room-${Date.now()}`,
      name: `Custom Room ${homeState.rooms.length + 1}`,
      shape: 'CUSTOM',
      width: maxX - minX,
      length: maxZ - minZ,
      height: 2.6,
      wallThickness: 0.15,
      position: [centerX, centerZ],
      vertices: finalPath.map(p => [p[0] - centerX, p[1] - centerZ]),
      floorMaterial: 'wood',
      floorColor: '#b58c5f'
    };

    addRoom(newRoom);
    setIsDrawing(false);
    setCurrentPath([]);
    notify("Custom room drafted successfully", "success");
    return newRoom.id;
  }, [currentPath, homeState.rooms.length, addRoom, notify]);

  return {
    isDrawing,
    currentPath,
    startDrawing,
    cancelDrawing,
    addVertex,
    updateVertex,
    finishDrawing,
    setCurrentPath
  };
};
