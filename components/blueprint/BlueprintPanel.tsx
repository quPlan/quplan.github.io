
import React from 'react';
import { RoomDefinition } from '../../types';
import { RoomListItem } from './RoomListItem';

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
      <div className="flex justify-between items-center px-1">
        <div className="flex flex-col">
          <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Blueprint</h2>
          <span className="text-[7px] font-bold text-gray-500 uppercase">Architecture Stack</span>
        </div>
        <div className="flex gap-1.5">
          <button 
            onClick={onAddRoom}
            className={`${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} px-3 py-1.5 rounded-xl flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all text-[9px] font-black uppercase`}
          >
            + Standard
          </button>
          <button 
            onClick={onStartDrawing}
            className="bg-blue-600 text-white px-3 py-1.5 rounded-xl flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all text-[9px] font-black uppercase"
          >
            Draw
          </button>
        </div>
      </div>
      
      <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-1 custom-scrollbar">
        {rooms.length === 0 ? (
          <div className={`py-10 text-center rounded-[2rem] border-2 border-dashed ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50/50 border-gray-200'}`}>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">No plans found</p>
          </div>
        ) : (
          rooms.map(room => (
            <RoomListItem
              key={room.id}
              room={room}
              isSelected={selectedId === room.id}
              onSelect={onSelect}
              isDarkMode={isDarkMode}
              showDimensions={showDimensions}
            />
          ))
        )}
      </div>
    </div>
  );
};
