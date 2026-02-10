
import React from 'react';
import { RoomDefinition } from '../types';

interface BlueprintPanelProps {
  rooms: RoomDefinition[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onAddRoom: () => void;
  onStartDrawing: () => void;
  isDarkMode: boolean;
  showDimensions: boolean;
}

export const BlueprintPanel: React.FC<BlueprintPanelProps> = ({ rooms, selectedId, onSelect, onAddRoom, onStartDrawing, isDarkMode, showDimensions }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Blueprint</h2>
        <div className="flex gap-1">
          <button 
            onClick={onAddRoom}
            className={`${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} px-2 py-1.5 rounded-lg flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all text-[9px] font-black uppercase`}
          >
            + Std
          </button>
          <button 
            onClick={onStartDrawing}
            className="bg-blue-600 text-white px-2 py-1.5 rounded-lg flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all text-[9px] font-black uppercase"
          >
            Draw
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        {rooms.length === 0 && (
          <div className={`py-6 text-center rounded-xl border border-dashed ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50/50 border-gray-200'}`}>
            <p className="text-[9px] text-gray-500 font-black uppercase">No rooms created</p>
          </div>
        )}
        {rooms.map(room => (
          <button
            key={room.id}
            onClick={() => onSelect(room.id)} 
            className={`w-full p-4 rounded-2xl border transition-all text-left flex flex-col gap-1 ${
              selectedId === room.id 
                ? (isDarkMode ? 'bg-white text-black border-white shadow-xl' : 'bg-black text-white border-black shadow-xl') 
                : (isDarkMode ? 'bg-white/5 border-white/5 text-gray-300 hover:border-white/20' : 'bg-white/60 border-gray-100 hover:border-gray-300')
            }`}
          >
            <div className="flex justify-between items-start">
              <p className="text-[11px] font-black uppercase truncate flex-1">{room.name}</p>
              <p className={`text-[7px] font-black uppercase opacity-60 ml-2 ${selectedId === room.id ? '' : 'text-blue-500'}`}>
                {room.shape === 'CUSTOM' ? 'Draft' : 'Standard'}
              </p>
            </div>
            {showDimensions && (
              <div className="flex gap-2 items-center opacity-70">
                <span className="text-[8px] font-bold">{room.width.toFixed(1)}m × {room.length.toFixed(1)}m</span>
                <span className="text-[6px] font-black uppercase px-1 border border-current rounded">S: {(room.width * room.length).toFixed(1)}m²</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
