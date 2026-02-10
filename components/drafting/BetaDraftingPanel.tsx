
import React, { useState } from 'react';
import { useBetaDrawing, CardinalDirection } from '../../hooks/useBetaDrawing';

interface BetaDraftingPanelProps {
  onCancel: () => void;
  onFinish: (vertices: [number, number][], height?: number) => void;
  isDarkMode: boolean;
  onUpdatePreview: (vertices: [number, number][]) => void;
}

export const BetaDraftingPanel: React.FC<BetaDraftingPanelProps> = ({ onCancel, onFinish, isDarkMode, onUpdatePreview }) => {
  const [roomHeight, setRoomHeight] = useState(2.6);
  const { segments, vertices, addSegment, updateSegment, removeSegment } = useBetaDrawing(() => {});

  // Sync preview whenever vertices change
  React.useEffect(() => {
    onUpdatePreview(vertices);
  }, [vertices, onUpdatePreview]);

  const panelBg = isDarkMode ? "bg-black/95 border-purple-500/40" : "bg-white/95 border-purple-500/30";

  return (
    <div className={`glass p-6 rounded-[2.5rem] shadow-2xl flex flex-col pointer-events-auto border-2 space-y-6 animate-in slide-in-from-left-8 duration-200 w-[380px] ${panelBg}`}>
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className={`text-[12px] font-black uppercase tracking-widest ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Parametric Beta</h2>
            <span className="bg-purple-500 text-white text-[7px] px-1.5 py-0.5 rounded-full font-black animate-pulse">BETA</span>
          </div>
          <span className="text-[8px] font-bold text-gray-500 uppercase">Input manual dimensions</span>
        </div>
        <button onClick={onCancel} className="text-gray-400 hover:text-red-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-purple-50/20 border-purple-100'}`}>
        <p className="text-[7px] font-black uppercase text-gray-500 mb-1.5">Shared Configuration</p>
        <div className="flex justify-between items-center gap-4">
           <span className={`text-[10px] font-black uppercase ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Wall Height</span>
           <div className="flex items-center gap-2">
             <input 
              type="number" step="0.1" value={roomHeight}
              onChange={(e) => setRoomHeight(parseFloat(e.target.value) || 2.4)}
              className={`w-20 p-2 rounded-xl text-[11px] font-black text-center focus:outline-none border ${isDarkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-white border-purple-100 text-black'}`}
             />
             <span className="text-[8px] font-bold text-gray-400">m</span>
           </div>
        </div>
      </div>

      <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
        {segments.map((seg, idx) => (
          <div key={seg.id} className={`p-4 rounded-2xl border flex flex-col gap-3 transition-all ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-purple-50/30 border-purple-100'}`}>
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black text-gray-400 uppercase">Segment {idx + 1}</span>
              {segments.length > 1 && (
                <button onClick={() => removeSegment(seg.id)} className="text-red-400 hover:text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <p className="text-[7px] font-black uppercase text-gray-500">Length (m)</p>
                <input 
                  type="number" step="0.1" value={seg.length}
                  onChange={(e) => updateSegment(seg.id, { length: parseFloat(e.target.value) || 0.1 })}
                  className={`w-full p-2.5 rounded-xl text-[12px] font-black focus:outline-none border ${isDarkMode ? 'bg-black/40 border-white/5 text-white' : 'bg-white border-purple-100 text-black'}`}
                />
              </div>
              <div className="space-y-1.5">
                <p className="text-[7px] font-black uppercase text-gray-500">Heading</p>
                <div className="grid grid-cols-4 gap-1">
                  {(['N', 'S', 'W', 'E'] as CardinalDirection[]).map(d => (
                    <button 
                      key={d}
                      onClick={() => updateSegment(seg.id, { direction: d })}
                      className={`h-8 rounded-lg flex items-center justify-center text-[10px] font-black border transition-all ${seg.direction === d ? 'bg-purple-600 border-purple-400 text-white shadow-lg' : (isDarkMode ? 'bg-white/5 border-white/5 text-gray-500 hover:bg-white/10' : 'bg-white border-purple-50 text-gray-400 hover:border-purple-200')}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={addSegment}
        className={`w-full py-3 rounded-2xl border-2 border-dashed text-[10px] font-black uppercase transition-all ${isDarkMode ? 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10' : 'border-purple-200 text-purple-600 hover:bg-purple-50'}`}
      >
        + Add Next Segment
      </button>

      <button 
        onClick={() => onFinish(vertices)}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:shadow-purple-500/20 transition-all active:scale-95"
      >
        Construct Structure
      </button>
    </div>
  );
};
