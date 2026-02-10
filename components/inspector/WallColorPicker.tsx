
import React from 'react';
import { ColorPalette } from './ColorPalette';

interface WallColorPickerProps {
  selectedColor?: string;
  onSelect: (color: string) => void;
  isDarkMode: boolean;
}

const WALL_PRESETS = [
  '#f8fafc', // Slate 50 (Default)
  '#f1f5f9', // Slate 100
  '#e2e8f0', // Slate 200
  '#94a3b8', // Slate 400
  '#475569', // Slate 600
  '#1e293b', // Slate 800
  '#fff7ed', // Orange 50 (Warm white)
  '#f0fdf4', // Green 50 (Mint)
  '#eff6ff', // Blue 50 (Cool)
  '#faf5ff', // Purple 50 (Lavender)
];

export const WallColorPicker: React.FC<WallColorPickerProps> = ({ selectedColor, onSelect, isDarkMode }) => {
  return (
    <ColorPalette 
      label="Wall Finish" 
      colors={WALL_PRESETS} 
      selectedColor={selectedColor} 
      onSelect={onSelect} 
      isDarkMode={isDarkMode} 
    />
  );
};
