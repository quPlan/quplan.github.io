
import React from 'react';
import { Line, Text } from '@react-three/drei';
import * as THREE from 'three';

interface DraftingOverlayProps {
  path: [number, number][];
  isDarkMode: boolean;
}

export const DraftingOverlay: React.FC<DraftingOverlayProps> = ({ path, isDarkMode }) => {
  if (path.length < 1) return null;

  const color = isDarkMode ? "#60a5fa" : "#2563eb";
  const textColor = isDarkMode ? "#ffffff" : "#000000";

  return (
    <group>
      {/* Visual Vertices */}
      {path.map((p, i) => (
        <mesh key={`v-${i}`} position={[p[0], 0.02, p[1]]}>
          <circleGeometry args={[0.08, 32]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}

      {/* Path Lines and Dimensions */}
      {path.map((p, i) => {
        if (i === 0) return null;
        const prev = path[i - 1];
        const midX = (p[0] + prev[0]) / 2;
        const midZ = (p[1] + prev[1]) / 2;
        const dist = Math.sqrt(Math.pow(p[0] - prev[0], 2) + Math.pow(p[1] - prev[1], 2));

        return (
          <group key={`seg-${i}`}>
            <Line 
              points={[[prev[0], 0.02, prev[1]], [p[0], 0.02, p[1]]]} 
              color={color} 
              lineWidth={3} 
            />
            {dist > 0.2 && (
              <Text
                position={[midX, 0.1, midZ]}
                rotation={[-Math.PI / 2, 0, 0]}
                fontSize={0.25}
                color={textColor}
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
              >
                {dist.toFixed(1)}m
              </Text>
            )}
          </group>
        );
      })}

      {/* Closing hint if path > 2 */}
      {path.length > 2 && (
        <Line 
          points={[[path[path.length-1][0], 0.01, path[path.length-1][1]], [path[0][0], 0.01, path[0][1]]]} 
          color={color} 
          lineWidth={1}
          dashed
          dashSize={0.2}
          gapSize={0.1}
        />
      )}
    </group>
  );
};
