
import React from 'react';
import { ToggleField } from './settings/ToggleField';
import { WallSettings } from './settings/WallSettings';
import { WallSettings as WallSettingsType, HomeState, SidebarLayout, SidebarSide } from '../types';
import { PlanImporter } from './io/PlanIO';
import { SidebarLayoutSettings } from './sidebar/SidebarLayoutSettings';
import { CollisionDetectionSettings } from './settings/CollisionDetectionSettings'; // New import

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
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

export const SettingsMenu: React.FC<SettingsMenuProps> = (props) => {
  const { 
    isOpen, showErrors, setShowErrors, smoothFollow, 
    setSmoothFollow, isDarkMode, setIsDarkMode,
    showGrid, setShowGrid,
    showGridInConclusion, setShowGridInConclusion,
    showFloorInConclusion, setShowFloorInConclusion,
    showRoomLabels, setShowRoomLabels,
    wallSettings, setWallSettings,
    onImportState,
    is2DView, setIs2DView,
    sidebarLayout, setSidebarLayout,
    sidebarSide, setSidebarSide,
    showCollisions, setShowCollisions // Destructure new props
  } = props;

  if (!isOpen) return null;

  const bgStyle = isDarkMode ? 'bg-[#0a0a0a]/95 border-white/10' : 'bg-white/95 border-white/60';

  return (
    <div className={`absolute top-full right-0 mt-3 glass p-6 rounded-[2.5rem] shadow-2xl border pointer-events-auto min-w-[320px] max-h-[80vh] overflow-y-auto custom-scrollbar flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200 origin-top-right ${bgStyle}`}>
      <div className={`flex flex-col gap-1 border-b pb-3 ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
        <h3 className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-black'}`}>System Configuration</h3>
        <p className="text-[8px] font-bold text-gray-500 uppercase tracking-tighter">OS Engine v2.5.0</p>
      </div>
      
      <div className="space-y-6">
        <SidebarLayoutSettings 
          layout={sidebarLayout} 
          onLayoutChange={setSidebarLayout} 
          side={sidebarSide}
          onSideChange={setSidebarSide}
          isDarkMode={isDarkMode} 
        />

        <div className="space-y-4">
          <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">View Preferences</p>
          <ToggleField label="2D Blueprint" sublabelText="Top-Down Only" active={is2DView} onClick={() => setIs2DView(!is2DView)} isDarkMode={isDarkMode} />
          <ToggleField label="Room Labels" sublabelText="Names & Sizes" active={showRoomLabels} onClick={() => setShowRoomLabels(!showRoomLabels)} isDarkMode={isDarkMode} />
          <ToggleField label="Master Grid" sublabelText="Guidelines" active={showGrid} onClick={() => setShowGrid(!showGrid)} isDarkMode={isDarkMode} />
          <ToggleField label="Black Mode" sublabelText="OLED Deep Blacks" active={isDarkMode} onClick={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} />
        </div>

        <WallSettings 
          settings={wallSettings} 
          updateSettings={(u) => setWallSettings({...wallSettings, ...u})} 
          isDarkMode={isDarkMode} 
        />

        <CollisionDetectionSettings // New component
          showCollisions={showCollisions}
          setShowCollisions={setShowCollisions}
          isDarkMode={isDarkMode}
        />

        <PlanImporter onImport={onImportState} isDarkMode={isDarkMode} />

        <div className="space-y-4">
          <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Review Filters</p>
          <ToggleField label="Grid Review" sublabelText="Grid in Conclusion" active={showGridInConclusion} onClick={() => setShowGridInConclusion(!showGridInConclusion)} isDarkMode={isDarkMode} />
          <ToggleField label="Floor Review" sublabelText="Floor in Conclusion" active={showFloorInConclusion} onClick={() => setShowFloorInConclusion(!showFloorInConclusion)} isDarkMode={isDarkMode} />
          <ToggleField label="Safety Check" sublabelText="Collision Alerts" active={showErrors} onClick={() => setShowErrors(!showErrors)} isDarkMode={isDarkMode} />
          <ToggleField label="Kinetic Cam" sublabelText="Smooth Following" active={smoothFollow} onClick={() => setSmoothFollow(!smoothFollow)} isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};
