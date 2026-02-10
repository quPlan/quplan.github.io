
import React from 'react';
import { HomeState, PlacedItem, AppMode, RoomDefinition } from '../types';
import { DraftingPanel } from './DraftingPanel';
import { BlueprintPanel } from './blueprint/BlueprintPanel';
import { FurnitureStore } from './FurnitureStore';
import { InspectorPanel } from './inspector/InspectorPanel';
import { SidebarScrollContainer } from './sidebar/SidebarScrollContainer';

interface SidebarProps {
  mode: AppMode;
  homeState: HomeState;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onAddItem: (templateId: string) => void;
  onUpdateItem: (id: string, updates: Partial<PlacedItem>, commit?: boolean) => void;
  onRemoveItem: (id: string) => void;
  onAddRoom: () => void;
  onUpdateRoom: (id: string, updates: Partial<RoomDefinition>, commit?: boolean) => void;
  onRemoveRoom: (id: string) => void;
  isDrawing?: boolean;
  onStartDrawing?: () => void;
  onFinishDrawing: (vertices?: [number, number][]) => void;
  onCancelDrawing?: () => void;
  onAddVertex: (point: [number, number]) => void;
  currentPath?: [number, number][];
  onUpdateVertex?: (index: number, newPoint: [number, number]) => void;
  isDarkMode: boolean;
  showRoomLabels: boolean;
  onUpdatePreview: (vertices: [number, number][]) => void;
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { 
    mode, homeState, selectedId, onSelect,
    onAddItem, onUpdateItem, onRemoveItem, 
    onAddRoom, onUpdateRoom, onRemoveRoom,
    isDrawing, onFinishDrawing, onCancelDrawing, onStartDrawing, onAddVertex,
    currentPath = [], onUpdateVertex,
    isDarkMode, showRoomLabels, onUpdatePreview
  } = props;

  const selectedItem = homeState.items.find(i => i.instanceId === selectedId);
  const selectedRoom = homeState.rooms.find(r => r.id === selectedId);

  if (mode === 'CONCLUSION' && !selectedItem && !selectedRoom) {
    return null;
  }

  // When drawing, we use a specialized panel that might want its own scroll behavior
  if (isDrawing) {
    return (
      <DraftingPanel 
        onCancelDrawing={onCancelDrawing!} 
        onFinishDrawing={onFinishDrawing} 
        onAddVertex={onAddVertex}
        currentPath={currentPath} 
        onUpdateVertex={onUpdateVertex} 
        isDarkMode={isDarkMode}
        onUpdatePreview={onUpdatePreview}
      />
    );
  }

  return (
    <SidebarScrollContainer isDarkMode={isDarkMode}>
      {mode !== 'CONCLUSION' && (
        <>
          {mode === 'BUILD' ? (
            <BlueprintPanel 
              rooms={homeState.rooms} 
              selectedId={selectedId} 
              onSelect={onSelect} 
              onAddRoom={onAddRoom} 
              onStartDrawing={onStartDrawing!} 
              isDarkMode={isDarkMode}
              showDimensions={showRoomLabels}
            />
          ) : (
            <FurnitureStore onAddItem={onAddItem} isDarkMode={isDarkMode} />
          )}
          
          <div className="h-px bg-white/5 mx-2" />
        </>
      )}

      {(selectedRoom || selectedItem) && (
        <InspectorPanel 
          selectedRoom={selectedRoom} 
          selectedItem={selectedItem} 
          onRemoveRoom={onRemoveRoom} 
          onUpdateRoom={onUpdateRoom} 
          onRemoveItem={onRemoveItem} 
          onUpdateItem={onUpdateItem} 
          isDarkMode={isDarkMode}
        />
      )}
    </SidebarScrollContainer>
  );
};
