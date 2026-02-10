
import React from 'react';

interface DimensionsInspectorProps {
  width: number;
  length: number;
  height: number;
  isCustom: boolean;
  onUpdate: (updates: { width?: number; length?: number; height?: number }) => void;
  isDarkMode: boolean;
}

export const DimensionsInspector: React.FC<DimensionsInspectorProps> = ({ 
  width, length, height, isCustom, onUpdate, isDarkMode 
}) => {
  const inputBg = isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-white/80 border-gray-100 text-black";
  const labelColor = isDarkMode ? "text-gray-400" : "text-gray-500";

  return (
    <div className="space-y-4">
      {!isCustom && (
        <div className="grid grid-cols-2 gap-3">
          <div className={`p-3 rounded-2xl border ${inputBg}`}>
            <p className={`text-[8px] font-black uppercase mb-1 ${labelColor}`}>Dim X (m)</p>
            <input 
              type="number" 
              step="0.1" 
              value={width} 
              onChange={e => onUpdate({ width: parseFloat(e.target.value) || 1 })} 
              className="w-full text-[11px] font-black bg-transparent focus:outline-none" 
            />
          </div>
          <div className={`p-3 rounded-2xl border ${inputBg}`}>
            <p className={`text-[8px] font-black uppercase mb-1 ${labelColor}`}>Dim Z (m)</p>
            <input 
              type="number" 
              step="0.1" 
              value={length} 
              onChange={e => onUpdate({ length: parseFloat(e.target.value) || 1 })} 
              className="w-full text-[11px] font-black bg-transparent focus:outline-none" 
            />
          </div>
        </div>
      )}

      <div className={`p-3 rounded-2xl border ${inputBg}`}>
        <div className="flex justify-between items-center mb-2">
          <p className={`text-[8px] font-black uppercase ${labelColor}`}>Elevation Height</p>
          <span className="text-[10px] font-black">{height}m</span>
        </div>
        <input 
          type="range" 
          min="1.5" 
          max="5" 
          step="0.1" 
          value={height} 
          onChange={e => onUpdate({ height: parseFloat(e.target.value) })} 
          className={`w-full h-1 rounded-lg appearance-none accent-blue-500 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} 
        />
      </div>
    </div>
  );
};
