
import React, { useState } from 'react';
import { AppMode, WallSettings as WallSettingsType, HomeState, SidebarLayout, SidebarSide } from '../types';
import { ModeSelector } from './ModeSelector';
import { SettingsMenu } from './SettingsMenu';
import { MainControls } from './MainControls';
import { StatusBadge } from './header/StatusBadge';

interface HeaderProps {
  onSave: () => void;
  onClear: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  isDrawing?: boolean;
  showErrors: boolean;
  setShowErrors: (val: boolean) => void;
  smoothFollow: boolean;
  setSmoothFollow: (val: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  showGrid: boolean;
  setShowGrid: (val: boolean) => void;
  showGridInConclusion: boolean;
  setShowGridInConclusion: (val: boolean) => void;
  showFloorInConclusion: boolean;
  setShowFloorInConclusion: (val: boolean) => void;
  showRoomLabels: boolean;
  setShowRoomLabels: (val: boolean) => void;
  wallSettings: WallSettingsType;
  setWallSettings: (settings: WallSettingsType) => void;
  homeState: HomeState;
  onImportState: (state: HomeState) => void;
  is2DView: boolean;
  setIs2DView: (val: boolean) => void;
  sidebarLayout: SidebarLayout;
  setSidebarLayout: (layout: SidebarLayout) => void;
  sidebarSide: SidebarSide;
  setSidebarSide: (side: SidebarSide) => void;
  showCollisions: boolean; // New prop
  setShowCollisions: (val: boolean) => void; // New prop
}

export const Header: React.FC<HeaderProps> = (props) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { 
    isDrawing, isDarkMode, mode, setMode, onClear, onSave, 
    onUndo, onRedo, canUndo, canRedo,
    showErrors, setShowErrors, smoothFollow, setSmoothFollow, 
    setIsDarkMode, showGrid, setShowGrid,
    showGridInConclusion, setShowGridInConclusion,
    showFloorInConclusion, setShowFloorInConclusion,
    showRoomLabels, setShowRoomLabels,
    wallSettings, setWallSettings,
    homeState, onImportState,
    is2DView, setIs2DView,
    sidebarLayout, setSidebarLayout,
    sidebarSide, setSidebarSide,
    showCollisions, setShowCollisions // Destructure new props
  } = props;

  return (
    <nav className="absolute top-0 left-0 w-full p-4 flex justify-between items-start pointer-events-none z-40">
      <div className="flex gap-2 items-start">
        <ModeSelector 
          mode={mode} 
          setMode={setMode} 
          isDrawing={!!isDrawing} 
          isDarkMode={isDarkMode} 
        />
        
        <StatusBadge isDrawing={!!isDrawing} isDarkMode={isDarkMode} />
      </div>
      
      <div className="flex items-start gap-2 relative">
        <MainControls 
          onSave={onSave} 
          onClear={onClear}
          onUndo={onUndo}
          onRedo={onRedo}
          canUndo={canUndo}
          canRedo={canRedo}
          isSettingsOpen={isSettingsOpen} 
          toggleSettings={() => setIsSettingsOpen(!isSettingsOpen)} 
          isDarkMode={isDarkMode} 
          isDisabled={!!isDrawing || mode === 'CONCLUSION'}
          homeState={homeState}
        />

        <SettingsMenu 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)}
          showErrors={showErrors} 
          setShowErrors={setShowErrors} 
          smoothFollow={smoothFollow} 
          setSmoothFollow={setSmoothFollow}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          showGrid={showGrid}
          setShowGrid={setShowGrid}
          showGridInConclusion={showGridInConclusion}
          setShowGridInConclusion={setShowGridInConclusion}
          showFloorInConclusion={showFloorInConclusion}
          setShowFloorInConclusion={setShowFloorInConclusion}
          showRoomLabels={showRoomLabels}
          setShowRoomLabels={setShowRoomLabels}
          wallSettings={wallSettings}
          setWallSettings={setWallSettings}
          onImportState={onImportState}
          is2DView={is2DView}
          setIs2DView={setIs2DView}
          sidebarLayout={sidebarLayout}
          setSidebarLayout={setSidebarLayout}
          sidebarSide={sidebarSide}
          setSidebarSide={setSidebarSide}
          showCollisions={showCollisions} // Pass new prop
          setShowCollisions={setShowCollisions} // Pass new prop
        />
      </div>
    </nav>
  );
};
