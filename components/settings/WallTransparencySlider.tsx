
import React from 'react';

interface WallTransparencySliderProps {
  value: number;
  onChange: (val: number) => void;
  isDarkMode: boolean;
  disabled: boolean;
}

export const WallTransparencySlider: React.FC<WallTransparencySliderProps> = ({ value, onChange, isDarkMode, disabled }) => {
  const labelColor = isDarkMode ? "text-gray-400" : "text-gray-500";
  const valueColor = isDarkMode ? "text-blue-400" : "text-blue-600";
  
  return (
    <div className={`space-y-2 pt-1 transition-opacity duration-300 ${disabled ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
      <div className="flex justify-between items-center px-1">
        <span className={`text-[7px] font-black uppercase tracking-tighter ${labelColor}`}>Transparency Factor</span>
        <span className={`text-[8px] font-black ${valueColor}`}>{Math.round(value * 100)}%</span>
      </div>
      <div className="relative group flex items-center h-4">
        <input 
          type="range" 
          min="0" 
          max="0.95" 
          step="0.05" 
          value={value} 
          onChange={(e) => onChange(parseFloat(e.target.value))} 
          className={`w-full h-1 rounded-full appearance-none outline-none cursor-pointer transition-all accent-blue-500 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}
        />
      </div>
      <div className="flex justify-between px-1">
        <span className="text-[6px] font-bold text-gray-500">Solid</span>
        <span className="text-[6px] font-bold text-gray-500">Ghost</span>
      </div>
    </div>
  );
};
