
import React, { useState } from 'react';
import { SegmentInput } from './drafting/SegmentInput';
import { PathBreakdown } from './drafting/PathBreakdown';
import { BetaDraftingPanel } from './drafting/BetaDraftingPanel';

interface DraftingPanelProps {
  onCancelDrawing: () => void;
  onFinishDrawing: (customVertices?: [number, number][]) => void;
  currentPath: [number, number][];
  onAddVertex: (point: [number, number]) => void;
  onUpdateVertex?: (index: number, newPoint: [number, number]) => void;
  isDarkMode: boolean;
  onUpdatePreview: (vertices: [number, number][]) => void;
}

export const DraftingPanel: React.FC<DraftingPanelProps> = ({ 
  onCancelDrawing, onFinishDrawing, currentPath, onAddVertex, onUpdateVertex, isDarkMode, onUpdatePreview 
}) => {
  const [useBeta, setUseBeta] = useState(false);
  
  if (useBeta) {
    return (
      <BetaDraftingPanel 
        onCancel={() => setUseBeta(false)} 
        onFinish={(v) => onFinishDrawing(v)} 
        isDarkMode={isDarkMode}
        onUpdatePreview={onUpdatePreview}
      />
    );
  }

  const panelStyle = isDarkMode ? "bg-black/80 border-blue-400/40" : "bg-white/90 border-blue-500/30";

  return (
    <div className={`glass p-5 rounded-[2.5rem] shadow-2xl flex flex-col pointer-events-auto border-2 space-y-5 animate-in slide-in-from-left-4 duration-500 ${panelStyle}`}>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Architectural Draft</h2>
          <span className="text-[7px] font-bold text-gray-500 uppercase">Precision Mode active</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setUseBeta(true)}
            className="bg-purple-600 text-[7px] text-white px-2 py-1 rounded-full font-black tracking-widest hover:scale-110 transition-transform shadow-lg shadow-purple-500/20"
          >
            BETA
          </button>
          <button onClick={onCancelDrawing} className={`text-[9px] font-black uppercase hover:text-red-500 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Discard</button>
        </div>
      </div>

      <SegmentInput 
        currentPathLength={currentPath.length} 
        onAddVertex={onAddVertex} 
        lastVertex={currentPath[currentPath.length - 1]}
        isDarkMode={isDarkMode}
      />

      <PathBreakdown 
        currentPath={currentPath} 
        onUpdateVertex={onUpdateVertex} 
        isDarkMode={isDarkMode} 
      />

      {currentPath.length >= 3 && (
        <div className="pt-2">
          <button 
            onClick={() => onFinishDrawing()}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:shadow-blue-500/20 transition-all hover:-translate-y-0.5 active:scale-95"
          >
            Finalize Room
          </button>
        </div>
      )}
    </div>
  );
};
