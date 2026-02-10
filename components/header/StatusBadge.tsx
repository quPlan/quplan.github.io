
import React from 'react';

interface StatusBadgeProps {
  isDrawing: boolean;
  isDarkMode: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ isDrawing, isDarkMode }) => {
  if (!isDrawing) return null;

  return (
    <div className={`glass px-6 py-3 rounded-2xl shadow-lg pointer-events-auto border-2 ${
      isDarkMode 
        ? 'border-blue-400/30 bg-blue-900/20' 
        : 'border-blue-500/50 bg-blue-50/80'
    } animate-pulse`}>
      <span className={`text-[10px] font-black ${isDarkMode ? 'text-blue-300' : 'text-blue-600'} uppercase tracking-widest`}>
        Architectural Draft Mode
      </span>
    </div>
  );
};
