
import { useState, useCallback, useMemo } from 'react';

export type CardinalDirection = 'N' | 'S' | 'E' | 'W';

export interface WallSegment {
  id: string;
  length: number;
  direction: CardinalDirection;
}

export const useBetaDrawing = (onFinish: (vertices: [number, number][]) => void) => {
  const [segments, setSegments] = useState<WallSegment[]>([
    { id: '1', length: 4, direction: 'E' }
  ]);

  const addSegment = useCallback(() => {
    const lastDir = segments[segments.length - 1]?.direction || 'E';
    setSegments(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), length: 2, direction: lastDir }]);
  }, [segments]);

  const updateSegment = useCallback((id: string, updates: Partial<WallSegment>) => {
    setSegments(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  }, []);

  const removeSegment = useCallback((id: string) => {
    if (segments.length <= 1) return;
    setSegments(prev => prev.filter(s => s.id !== id));
  }, [segments]);

  const vertices = useMemo(() => {
    const pts: [number, number][] = [[0, 0]];
    let curX = 0;
    let curZ = 0;
    
    segments.forEach(seg => {
      switch (seg.direction) {
        case 'N': curZ -= seg.length; break;
        case 'S': curZ += seg.length; break;
        case 'E': curX += seg.length; break;
        case 'W': curX -= seg.length; break;
      }
      pts.push([curX, curZ]);
    });
    
    return pts;
  }, [segments]);

  const handleFinish = () => {
    // We don't include the auto-closing point as the CustomRoomGeometry handles closing
    onFinish(vertices);
  };

  return {
    segments,
    vertices,
    addSegment,
    updateSegment,
    removeSegment,
    handleFinish
  };
};
