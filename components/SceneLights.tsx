
import React from 'react';
import { Environment } from '@react-three/drei';

interface SceneLightsProps {
  isDarkMode: boolean;
}

export const SceneLights: React.FC<SceneLightsProps> = ({ isDarkMode }) => {
  return (
    <>
      <ambientLight intensity={isDarkMode ? 0.6 : 1.2} />
      <spotLight 
        position={[15, 20, 15]} 
        angle={0.4} 
        penumbra={1} 
        intensity={isDarkMode ? 1.5 : 2.5} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
      />
      <Environment preset={isDarkMode ? "night" : "city"} />
    </>
  );
};
