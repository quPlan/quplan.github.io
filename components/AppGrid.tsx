
import React from 'react';
import { Grid } from '@react-three/drei';

interface AppGridProps {
  mode: string;
  isDarkMode: boolean;
  showGrid: boolean;
  showGridInConclusion: boolean;
}

export const AppGrid: React.FC<AppGridProps> = ({ mode, isDarkMode, showGrid, showGridInConclusion }) => {
  const isConclusion = mode === 'CONCLUSION';
  if (!showGrid) return null;
  if (isConclusion && !showGridInConclusion) return null;

  // Dark colors for light mode to make it clearly visible
  const lightModeSection = "#64748b"; // slate-500
  const lightModeCell = "#94a3b8";    // slate-400
  
  // Subtle colors for dark mode (OLED friendly)
  const darkModeSection = "#444444";
  const darkModeCell = "#222222";

  return (
    <Grid 
      infiniteGrid 
      sectionSize={1} 
      cellSize={0.5} 
      sectionThickness={1.2}
      cellThickness={0.8}
      sectionColor={isDarkMode ? darkModeSection : lightModeSection} 
      cellColor={isDarkMode ? darkModeCell : lightModeCell} 
      fadeDistance={30}
      fadeStrength={5}
    />
  );
};
