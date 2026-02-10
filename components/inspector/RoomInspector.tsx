
import React from 'react';
import { RoomDefinition } from '../../types';
import { WallColorPicker } from './WallColorPicker';
import { RoomNameInput } from './RoomNameInput';
import { FloorInspector } from './FloorInspector';
import { DimensionsInspector } from './DimensionsInspector';

interface RoomInspectorProps {
  room: RoomDefinition;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<RoomDefinition>, commit?: boolean) => void;
  isDarkMode: boolean;
}

export const RoomInspector: React.FC<RoomInspectorProps> = ({ room, onRemove, onUpdate, isDarkMode }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Structure Setup</h2>
        <button 
          onClick={() => onRemove(room.id)} 
          className="text-red-500 hover:text-red-700 transition-colors p-1"
          title="Delete Room"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1-1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-5">
        <RoomNameInput 
          name={room.name} 
          onChange={(name) => onUpdate(room.id, { name })} 
          isDarkMode={isDarkMode} 
        />
        
        <FloorInspector 
          currentMaterial={room.floorMaterial} 
          currentColor={room.floorColor} 
          onUpdate={(updates) => onUpdate(room.id, updates, true)} 
          isDarkMode={isDarkMode} 
        />

        <div className="pt-2 border-t border-white/5">
          <WallColorPicker 
            selectedColor={room.wallColor} 
            onSelect={(c) => onUpdate(room.id, { wallColor: c }, true)} 
            isDarkMode={isDarkMode} 
          />
        </div>

        <DimensionsInspector 
          width={room.width} 
          length={room.length} 
          height={room.height} 
          isCustom={room.shape === 'CUSTOM'} 
          onUpdate={(updates) => onUpdate(room.id, updates)} 
          isDarkMode={isDarkMode} 
        />
      </div>
    </div>
  );
};
