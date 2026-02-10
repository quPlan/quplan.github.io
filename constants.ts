

import { FurnitureTemplate, FloorMaterial } from './types';

export const FURNITURE_CATALOG: FurnitureTemplate[] = [
  { id: 'modern-sofa', name: 'Modern Sofa', type: 'sofa', dimensions: [2, 0.8, 0.9], color: '#FFFFFF', icon: '🛋️' },
  { id: 'armchair', name: 'Lounge Chair', type: 'chair', dimensions: [0.8, 0.9, 0.8], color: '#FFFFFF', icon: '🪑' },
  { id: 'coffee-table', name: 'Coffee Table', type: 'table', dimensions: [1.2, 0.4, 0.6], color: '#FFFFFF', icon: '☕' },
  { id: 'dining-table', name: 'Dining Table', type: 'table', dimensions: [1.8, 0.75, 0.9], color: '#FFFFFF', icon: '🍽️' },
  { id: 'king-bed', name: 'King Bed', type: 'bed', dimensions: [2, 0.6, 2.2], color: '#FFFFFF', icon: '🛏️' },
  { id: 'floor-lamp', name: 'Floor Lamp', type: 'lamp', dimensions: [0.3, 1.8, 0.3], color: '#FFFFFF', icon: '💡' },
  { id: 'potted-plant', name: 'Monstera', type: 'plant', dimensions: [0.5, 1.2, 0.5], color: '#FFFFFF', icon: '🌿' },
  { id: 'area-rug', name: 'Area Rug', type: 'rug', dimensions: [3, 0.05, 2], color: '#FFFFFF', icon: '🧶' },
  { id: 'standard-door', name: 'Internal Door', type: 'door', dimensions: [0.9, 2.1, 0.1], color: '#FFFFFF', icon: '🚪' },
  { id: 'glass-door', name: 'Glass Door', type: 'door', dimensions: [1.6, 2.1, 0.1], color: '#FFFFFF', icon: '🪟' },
  { id: 'axolotl-aquarium', name: 'Axolotl Aquarium', type: 'plant', dimensions: [0.6, 0.7, 0.4], color: '#808080', icon: '🐠' },
];

export const FLOOR_MATERIALS: { id: FloorMaterial; name: string; color: string }[] = [
  { id: 'plain', name: 'Plain', color: '#ffffff' },
  { id: 'wood', name: 'Oak Wood', color: '#b58c5f' },
  { id: 'tile', name: 'Stone Tile', color: '#cbd5e1' },
  { id: 'carpet', name: 'Soft Carpet', color: '#94a3b8' },
];

export const STORAGE_KEY = 'quplan_room_design_v2';
export const ROOM_MIN_SIZE = 4;
export const ROOM_MAX_SIZE = 12;
