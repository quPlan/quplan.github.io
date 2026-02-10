
import React from 'react';
import { RoomDefinition } from '../../types';

interface RoomListItemProps {
  room: RoomDefinition;
  isSelected: boolean;
  onSelect: (id: string) => void;
  isDarkMode: boolean;
  showDimensions: boolean;
}

export const RoomListItem: React.FC<RoomListItemProps> = ({ room, isSelected, onSelect, isDarkMode, showDimensions }) => {
  const activeStyles = isDarkMode 
    ? 'bg-white text-black border-white shadow-xl scale-[1.02]' 
    : 'bg-black text-white border-black shadow-xl scale-[1.02]';
  
  const inactiveStyles = isDarkMode 
    ? 'bg-white/5 border-white/5 text-gray-300 hover:border-white/20' 
    : 'bg-white/60 border-gray-100 hover:border-gray-300';

  return (
    <button
      onClick={() => onSelect(room.id)} 
      className={`w-full p-4 rounded-2xl border transition-all text-left flex flex-col gap-1.5 ${isSelected ? activeStyles : inactiveStyles}`}
    >
      <div className="flex justify-between items-start">
        <p className="text-[12px] font-black uppercase tracking-tight truncate flex-1">{room.name}</p>
        <span className={`text-[6px] font-black uppercase px-1.5 py-0.5 rounded border ${isSelected ? 'border-current opacity-40' : 'border-blue-500/30 text-blue-500'}`}>
          {room.shape}
        </span>
      </div>
      
      {showDimensions && (
        <div className="flex flex-wrap gap-x-3 gap-y-1 items-center opacity-70">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span className="text-[9px] font-bold">{room.width.toFixed(1)}m × {room.length.toFixed(1)}m</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[7px] font-black uppercase bg-current/10 px-1 rounded-sm">
              {(room.width * room.length).toFixed(1)} m²
            </span>
          </div>
        </div>
      )}
    </button>
  );
};
