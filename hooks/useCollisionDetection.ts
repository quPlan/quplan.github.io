
import { useMemo } from 'react';
import * as THREE from 'three';
import { HomeState, PlacedItem, RoomDefinition } from '../types';
import { FURNITURE_CATALOG } from '../constants';

interface WallBoundingBox {
  id: string; // Unique ID for the wall segment (e.g., roomId-wallIndex)
  roomId: string;
  box: THREE.Box3;
}

// Helper to create a Bounding Box for a wall segment
const createWallBoundingBox = (
  room: RoomDefinition,
  p1: [number, number], // Local vertex 1
  p2: [number, number], // Local vertex 2
  wallIndex: number
): WallBoundingBox => {
  const thickness = room.wallThickness;
  const height = room.height;

  // Calculate segment vector
  const segmentVec = new THREE.Vector2(p2[0] - p1[0], p2[1] - p1[1]);
  const length = segmentVec.length();

  // Midpoint of the segment in local room coordinates
  const midLocalX = (p1[0] + p2[0]) / 2;
  const midLocalZ = (p1[1] + p2[1]) / 2;

  // Global position of the wall segment's midpoint
  const globalMidX = room.position[0] + midLocalX;
  const globalMidZ = room.position[1] + midLocalZ;

  // Angle of the wall segment relative to the positive Z-axis
  // (In Three.js, Y is up, X-Z is the ground plane. `Math.atan2(dz, dx)` is standard.)
  const rotationAngle = Math.atan2(segmentVec.x, segmentVec.y); // This gives angle relative to Z-axis.

  const halfLength = length / 2;
  const halfThickness = thickness / 2;
  const halfHeight = height / 2;

  // Create a local box for the wall segment, centered at (0, halfHeight, 0)
  // Dimensions are length, height, thickness
  const localBox = new THREE.Box3(
    new THREE.Vector3(-halfLength, 0, -halfThickness), // Min X, Y, Z
    new THREE.Vector3(halfLength, height, halfThickness) // Max X, Y, Z
  );

  // Create a transformation matrix for the wall segment
  const wallMatrix = new THREE.Matrix4();
  wallMatrix.makeRotationY(rotationAngle); // Rotate around Y-axis
  wallMatrix.setPosition(globalMidX, halfHeight, globalMidZ); // Translate to world position

  // Apply transformation to the local box to get its world AABB
  const worldBox = localBox.clone().applyMatrix4(wallMatrix);

  return {
    id: `${room.id}-wall-${wallIndex}`,
    roomId: room.id,
    box: worldBox,
  };
};


export const useCollisionDetection = (homeState: HomeState, showCollisions: boolean) => {
  return useMemo(() => {
    if (!showCollisions) {
      return {
        collidingItems: [],
        collidingRooms: [],
        collidingWalls: [],
        hasCollision: false,
      };
    }

    const collidingItems = new Set<string>();
    const collidingRooms = new Set<string>();
    const collidingWallSegmentIds = new Set<string>(); // Stores `roomId-wallIndex` string IDs

    const allItemBoxes: { id: string; box: THREE.Box3; item: PlacedItem }[] = homeState.items.map((item) => {
      const template = FURNITURE_CATALOG.find((t) => t.id === item.templateId);
      if (!template) return null;

      const itemSize = new THREE.Vector3(...template.dimensions);
      // Item's local origin is at its base center. Shift by half height to get true center.
      const itemCenter = new THREE.Vector3(item.position[0], item.position[1] + itemSize.y / 2, item.position[2]);

      // Create an oriented bounding box (OBB) for the item by rotating its AABB
      const itemLocalBox = new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(0, itemSize.y / 2, 0), itemSize); // Local box centered at origin
      const rotationQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), item.rotation);
      const rotationMatrix = new THREE.Matrix4().makeRotationFromQuaternion(rotationQuaternion);
      
      const translationMatrix = new THREE.Matrix4().makeTranslation(item.position[0], item.position[1], item.position[2]);
      
      // Combine rotation and translation
      const itemWorldMatrix = new THREE.Matrix4().multiplyMatrices(translationMatrix, rotationMatrix);

      const rotatedItemWorldBox = itemLocalBox.clone().applyMatrix4(itemWorldMatrix);
      
      return { id: item.instanceId, box: rotatedItemWorldBox, item };
    }).filter(Boolean) as { id: string; box: THREE.Box3; item: PlacedItem }[];

    // --- Rooms vs. Rooms Collision ---
    const allRoomBoxes: { id: string; box: THREE.Box3; room: RoomDefinition }[] = homeState.rooms.map((room) => {
      let minX, maxX, minZ, maxZ;

      if (room.shape === 'CUSTOM' && room.vertices && room.vertices.length >= 3) {
        // For custom rooms, find the min/max X and Z from its vertices relative to its position
        const localXs = room.vertices.map(v => v[0]);
        const localZs = room.vertices.map(v => v[1]);
        minX = Math.min(...localXs) + room.position[0];
        maxX = Math.max(...localXs) + room.position[0];
        minZ = Math.min(...localZs) + room.position[1];
        maxZ = Math.max(...localZs) + room.position[1];
      } else {
        // For standard rooms (rectangle)
        minX = room.position[0] - room.width / 2;
        maxX = room.position[0] + room.width / 2;
        minZ = room.position[1] - room.length / 2;
        maxZ = room.position[1] + room.length / 2;
      }
      
      const roomBox = new THREE.Box3(
        new THREE.Vector3(minX, 0, minZ),
        new THREE.Vector3(maxX, room.height, maxZ)
      );
      return { id: room.id, box: roomBox, room };
    });

    allRoomBoxes.forEach((roomA, i) => {
      allRoomBoxes.forEach((roomB, j) => {
        if (i >= j) return; // Avoid self-comparison and duplicate checks
        if (roomA.box.intersectsBox(roomB.box)) {
          collidingRooms.add(roomA.id);
          collidingRooms.add(roomB.id);
        }
      });
    });

    // --- Furniture vs. Furniture Collision ---
    allItemBoxes.forEach((itemA, i) => {
      allItemBoxes.forEach((itemB, j) => {
        if (i >= j) return; // Avoid self-comparison and duplicate checks
        if (itemA.box.intersectsBox(itemB.box)) {
          collidingItems.add(itemA.id);
          collidingItems.add(itemB.id);
        }
      });
    });

    // --- Furniture vs. Walls Collision ---
    homeState.rooms.forEach((room) => {
      let wallSegments: WallBoundingBox[] = [];

      if (room.shape === 'CUSTOM' && room.vertices && room.vertices.length >= 3) {
        for (let i = 0; i < room.vertices.length; i++) {
          const p1 = room.vertices[i];
          const p2 = room.vertices[(i + 1) % room.vertices.length];
          wallSegments.push(createWallBoundingBox(room, p1, p2, i));
        }
      } else {
        // Standard (Rectangle) room walls
        const halfWidth = room.width / 2;
        const halfLength = room.length / 2;

        // Vertices for a rectangle centered at (0,0) locally
        const v1: [number, number] = [-halfWidth, -halfLength];
        const v2: [number, number] = [halfWidth, -halfLength];
        const v3: [number, number] = [halfWidth, halfLength];
        const v4: [number, number] = [-halfWidth, halfLength];

        // North wall (v1 to v2)
        wallSegments.push(createWallBoundingBox(room, v1, v2, 0));
        // East wall (v2 to v3)
        wallSegments.push(createWallBoundingBox(room, v2, v3, 1));
        // South wall (v3 to v4)
        wallSegments.push(createWallBoundingBox(room, v3, v4, 2));
        // West wall (v4 to v1)
        wallSegments.push(createWallBoundingBox(room, v4, v1, 3));
      }

      allItemBoxes.forEach((itemBoxData) => {
        wallSegments.forEach((wallBoxData) => {
          // Check for collision
          if (itemBoxData.box.intersectsBox(wallBoxData.box)) {
            collidingItems.add(itemBoxData.id); // Mark item as colliding
            collidingWallSegmentIds.add(wallBoxData.id); // Mark wall segment as colliding
          }
        });
      });
    });
    
    const finalCollidingWallSegments = Array.from(collidingWallSegmentIds).map(id => {
      const parts = id.split('-'); // Format: roomId-wall-wallIndex
      return { roomId: parts[0], wallIndex: parseInt(parts[2]) };
    });

    const totalCollisions = collidingItems.size + collidingRooms.size + collidingWallSegmentIds.size;

    return {
      collidingItems: Array.from(collidingItems),
      collidingRooms: Array.from(collidingRooms),
      collidingWalls: finalCollidingWallSegments,
      hasCollision: totalCollisions > 0,
    };
  }, [homeState, showCollisions]);
};
