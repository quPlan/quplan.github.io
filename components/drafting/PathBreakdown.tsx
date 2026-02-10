
import React from 'react';

interface PathBreakdownProps {
  currentPath: [number, number][];
  onUpdateVertex?: (index: number, newPoint: [number, number]) => void;
  isDarkMode: boolean;
}

export const PathBreakdown: React.FC<PathBreakdownProps> = ({ currentPath, onUpdateVertex, isDarkMode }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-1">
        <p className="text-[8px] font-bold uppercase text-gray-500">Path Breakdown</p>
        <span className="text-[8px] font-bold text-blue-500">{currentPath.length} Nodes</span>
      </div>
      
      <div className="max-h-40 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {currentPath.length === 0 ? (
          <div className={`py-6 text-center rounded-xl border border-dashed ${isDarkMode ? 'bg-blue-900/10 border-blue-400/20' : 'bg-blue-50/30 border-blue-100'}`}>
            <p className="text-[9px] font-bold uppercase text-blue-400/60">Click on 3D Grid or use inputs</p>
          </div>
        ) : (
          currentPath.map((v, i) => (
            <div key={i} className={`p-2 rounded-xl border flex items-center gap-3 transition-all ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}>
              <span className={`text-[10px] font-black w-4 text-center ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}>{i + 1}</span>
              <div className="flex-1 grid grid-cols-2 gap-2">
                <div className="space-y-0.5">
                  <span className="text-[6px] text-gray-400 uppercase font-bold">Coord X</span>
                  <input 
                    type="number" step="0.5" value={v[0]} 
                    onChange={(e) => onUpdateVertex?.(i, [parseFloat(e.target.value) || 0, v[1]])}
                    className="w-full text-[10px] font-black bg-transparent focus:outline-none"
                  />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[6px] text-gray-400 uppercase font-bold">Coord Z</span>
                  <input 
                    type="number" step="0.5" value={v[1]} 
                    onChange={(e) => onUpdateVertex?.(i, [v[0], parseFloat(e.target.value) || 0])}
                    className="w-full text-[10px] font-black bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
