
import React from 'react';
import { AppMode } from '../types';

interface ModeSelectorProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  isDrawing: boolean;
  isDarkMode: boolean;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, setMode, isDrawing, isDarkMode }) => {
  const glassStyle = isDarkMode ? "bg-black/60 border-white/10" : "bg-white/75 border-white/30";
  const btnActiveStyle = isDarkMode ? "bg-white text-black" : "bg-black text-white";
  const btnInactiveStyle = isDarkMode ? "text-gray-500 hover:text-gray-200" : "text-gray-400 hover:text-gray-900";

  return (
    <div className={`glass p-1 rounded-2xl shadow-lg pointer-events-auto flex gap-1 border transition-all ${glassStyle} ${isDrawing ? 'opacity-20 pointer-events-none' : ''}`}>
      {(['BUILD', 'DESIGN', 'CONCLUSION'] as AppMode[]).map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-300 ${mode === m ? btnActiveStyle : btnInactiveStyle}`}
        >
          {m}
        </button>
      ))}
    </div>
  );
};
