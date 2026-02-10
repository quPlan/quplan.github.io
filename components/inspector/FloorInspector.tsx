
import React from 'react';
import { FloorMaterial } from '../../types';
import { FLOOR_MATERIALS } from '../../constants';
import { FloorColorPicker } from './FloorColorPicker';

interface FloorInspectorProps {
  currentMaterial?: FloorMaterial;
  currentColor?: string;
  onUpdate: (updates: { floorMaterial?: FloorMaterial; floorColor?: string }, commit?: boolean) => void;
  isDarkMode: boolean;
}

export const FloorInspector: React.FC<FloorInspectorProps> = ({ 
  currentMaterial, currentColor, onUpdate, isDarkMode 
}) => {
  const labelColor = isDarkMode ? "text-gray-400" : "text-gray-500";

  return (
    <div className="space-y-4">
      <div className="space-y-2.5">
        <p className={`text-[8px] font-black uppercase ${labelColor} px-1`}>Surface Material</p>
        <div className="grid grid-cols-2 gap-1.5">
          {FLOOR_MATERIALS.map((mat) => (
            <button
              key={mat.id}
              onClick={() => onUpdate({ floorMaterial: mat.id, floorColor: mat.color }, true)}
              className={`p-2.5 rounded-xl border text-[9px] font-black uppercase transition-all flex flex-col items-center gap-1 ${
                currentMaterial === mat.id
                  ? (isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black')
                  : (isDarkMode ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-white/60 border-gray-100 text-gray-500 hover:bg-gray-100')
              }`}
            >
              <div 
                className="w-full h-1 rounded-full opacity-50" 
                style={{ backgroundColor: mat.color }} 
              />
              {mat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-2 border-t border-white/5">
        <FloorColorPicker 
          selectedColor={currentColor} 
          onSelect={(c) => onUpdate({ floorColor: c, floorMaterial: 'plain' }, true)} 
          isDarkMode={isDarkMode} 
        />
      </div>
    </div>
  );
};
