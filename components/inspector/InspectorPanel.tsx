
import React from 'react';
import { RoomDefinition, PlacedItem } from '../../types';
import { RoomInspector } from './RoomInspector';
import { ItemInspector } from './ItemInspector';

interface InspectorPanelProps {
  selectedRoom?: RoomDefinition;
  selectedItem?: PlacedItem;
  onRemoveRoom: (id: string) => void;
  onUpdateRoom: (id: string, updates: Partial<RoomDefinition>, commit?: boolean) => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, updates: Partial<PlacedItem>, commit?: boolean) => void;
  isDarkMode: boolean;
}

export const InspectorPanel: React.FC<InspectorPanelProps> = (props) => {
  const { selectedRoom, selectedItem, isDarkMode } = props;
  const panelStyle = isDarkMode ? "bg-black/60 border-white/10 shadow-2xl" : "bg-white/75 border-white/60 shadow-xl";

  if (!selectedRoom && !selectedItem) return null;

  return (
    <div className={`glass p-5 rounded-[2.5rem] pointer-events-auto border animate-in slide-in-from-bottom-4 duration-500 ${panelStyle}`}>
      {selectedRoom && (
        <RoomInspector 
          room={selectedRoom} 
          onRemove={props.onRemoveRoom} 
          onUpdate={props.onUpdateRoom} 
          isDarkMode={isDarkMode} 
        />
      )}
      {selectedItem && (
        <ItemInspector 
          item={selectedItem} 
          onRemove={props.onRemoveItem} 
          onUpdate={props.onUpdateItem} 
          isDarkMode={isDarkMode} 
        />
      )}
    </div>
  );
};
