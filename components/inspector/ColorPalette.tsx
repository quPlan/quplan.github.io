
import React from 'react';

interface ColorPaletteProps {
  label: string;
  colors: string[];
  selectedColor?: string;
  onSelect: (color: string) => void;
  isDarkMode: boolean;
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({ label, colors, selectedColor, onSelect, isDarkMode }) => {
  return (
    <div className="space-y-2">
      <p className={`text-[8px] font-black uppercase px-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
      <div className="grid grid-cols-5 gap-1.5">
        {colors.map(c => (
          <button 
            key={c} 
            onClick={() => onSelect(c)} 
            className={`w-full aspect-square rounded-lg border-2 transition-all hover:scale-110 active:scale-90 ${
              selectedColor?.toLowerCase() === c.toLowerCase() 
                ? (isDarkMode ? 'border-white' : 'border-black') 
                : 'border-transparent shadow-sm'
            }`} 
            style={{ backgroundColor: c }} 
            title={c}
          />
        ))}
      </div>
    </div>
  );
};
