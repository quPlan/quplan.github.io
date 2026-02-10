
import * as THREE from 'three';
export type FurnitureType = 'sofa' | 'chair' | 'table' | 'bed' | 'lamp' | 'plant' | 'rug' | 'door';
export type AppMode = 'BUILD' | 'DESIGN' | 'CONCLUSION';
export type RoomShape = 'RECTANGLE' | 'L_SHAPE' | 'U_SHAPE' | 'CUSTOM';
export type FloorMaterial = 'plain' | 'wood' | 'tile' | 'carpet';
export type SidebarLayout = 'FLOATING' | 'FIXED';
export type SidebarSide = 'LEFT' | 'RIGHT';

export interface Notification {
  id: string;
  message: string;
  type: 'error' | 'success' | 'info';
}

export interface FurnitureTemplate {
  id: string;
  name: string;
  type: FurnitureType;
  dimensions: [number, number, number]; // w, h, d in meters
  color: string;
  icon: string;
}

export interface PlacedItem {
  instanceId: string;
  templateId: string;
  position: [number, number, number];
  rotation: number;
  color: string;
  isColliding?: boolean;
}

export interface RoomDefinition {
  id: string;
  name: string;
  shape: RoomShape;
  width: number;
  length: number;
  height: number;
  wallThickness: number;
  position: [number, number];
  subWidth?: number;
  subLength?: number;
  vertices?: [number, number][];
  floorMaterial?: FloorMaterial;
  floorColor?: string;
  wallColor?: string;
  isColliding?: boolean; // New: for room-on-room collisions
}

export interface HomeState {
  rooms: RoomDefinition[];
  items: PlacedItem[];
}

export interface WallSettings {
  showWalls: boolean;
  transparentWalls: boolean;
  autoHideWalls: boolean;
  transparencyLevel: number;
}

export interface WallProps { // New: interface for wall component props, including collision status
  args: [number, number, number];
  position: [number, number, number];
  outwardNormal: THREE.Vector3;
  autoHide?: boolean;
  transparent?: boolean;
  transparencyLevel?: number;
  isDarkMode?: boolean;
  wallColor?: string;
  isColliding?: boolean; // New: for wall-on-item collisions
}