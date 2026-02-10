
import React, { useState } from 'react';

interface SegmentInputProps {
  currentPathLength: number;
  onAddVertex: (point: [number, number]) => void;
  lastVertex?: [number, number];
  isDarkMode: boolean;
}

export const SegmentInput: React.FC<SegmentInputProps> = ({ 
  currentPathLength, onAddVertex, lastVertex, isDarkMode 
}) => {
  const [nextLength, setNextLength] = useState<number>(2.0);
  const [direction, setDirection] = useState<'N' | 'S' | 'E' | 'W'>('E');

  const inputBg = isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-blue-50/50 border-blue-100 text-black";

  const handleAddByLength = () => {
    if (currentPathLength === 0) {
      onAddVertex([0, 0]);
      return;
    }

    if (!lastVertex) return;
    // Fix: Explicitly copy tuple elements to maintain [number, number] type
    // Using spread operator [...lastVertex] results in number[] which is incompatible
    const next: [number, number] = [lastVertex[0], lastVertex[1]];

    switch (direction) {
      case 'N': next[1] -= nextLength; break;
      case 'S': next[1] += nextLength; break;
      case 'W': next[0] -= nextLength; break;
      case 'E': next[0] += nextLength; break;
    }

    onAddVertex(next);
  };

  return (
    <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-blue-50/20 border-blue-100'} space-y-4`}>
      <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Add Segment by Length</p>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <span className="text-[7px] text-gray-400 uppercase font-bold">Length (m)</span>
          <input 
            type="number" step="0.5" min="0.5"
            value={nextLength}
            onChange={(e) => setNextLength(parseFloat(e.target.value) || 1)}
            className={`w-full p-2 rounded-xl text-[11px] font-black focus:outline-none border ${isDarkMode ? 'bg-black/20' : 'bg-white border-gray-200'}`}
          />
        </div>
        <div className="space-y-1">
          <span className="text-[7px] text-gray-400 uppercase font-bold">Direction</span>
          <div className="grid grid-cols-4 gap-1">
            {(['N', 'S', 'W', 'E'] as const).map(d => (
              <button 
                key={d}
                onClick={() => setDirection(d)}
                className={`aspect-square rounded-lg flex items-center justify-center text-[9px] font-black border transition-all ${direction === d ? 'bg-blue-500 border-blue-400 text-white' : (isDarkMode ? 'bg-white/5 border-white/10 text-gray-500' : 'bg-white border-gray-100 text-gray-400')}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={handleAddByLength}
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-black uppercase rounded-xl transition-all shadow-md active:scale-95"
      >
        {currentPathLength === 0 ? 'Place Start (0,0)' : 'Extend Wall'}
      </button>
    </div>
  );
};
