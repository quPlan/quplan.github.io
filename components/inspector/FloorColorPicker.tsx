
import React from 'react';
import { ColorPalette } from './ColorPalette';
import { FloorColorInput } from './FloorColorInput';

interface FloorColorPickerProps {
  selectedColor?: string;
  onSelect: (color: string) => void;
  isDarkMode: boolean;
}

const FLOOR_PRESETS = [
  '#ffffff', // Plain White
  '#b58c5f', // Oak Wood
  '#d2b48c', // Tan
  '#cbd5e1', // Stone
  '#94a3b8', // Carpet Slate
  '#4a5568', // Dark Slate
  '#f1f5f9', // Cool Gray
  '#1a202c', // charcoal
  '#6366f1', // Indigo
  '#ec4899', // Pink
];

export const FloorColorPicker: React.FC<FloorColorPickerProps> = ({ 
  selectedColor, onSelect, isDarkMode 
}) => {
  return (
    <div className="space-y-4">
      <ColorPalette 
        label="Floor Color Palette" 
        colors={FLOOR_PRESETS} 
        selectedColor={selectedColor} 
        onSelect={onSelect} 
        isDarkMode={isDarkMode} 
      />
      
      <FloorColorInput 
        value={selectedColor}
        onChange={onSelect}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};
