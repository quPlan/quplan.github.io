
import React from 'react';
import { ToggleField } from './ToggleField';
import { WallTransparencySlider } from './WallTransparencySlider';
import { WallSettings as WallSettingsType } from '../../types';

interface WallSettingsProps {
  settings: WallSettingsType;
  updateSettings: (updates: Partial<WallSettingsType>) => void;
  isDarkMode: boolean;
}

export const WallSettings: React.FC<WallSettingsProps> = ({ settings, updateSettings, isDarkMode }) => {
  return (
    <div className="space-y-4">
      <div className={`flex flex-col gap-1 border-b pb-2 ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
        <h3 className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Wall Architecture</h3>
      </div>
      
      <div className="space-y-3">
        <ToggleField 
          label="Show Walls" 
          sublabelText="Toggle Visibility" 
          active={settings.showWalls} 
          onClick={() => updateSettings({ showWalls: !settings.showWalls })} 
          isDarkMode={isDarkMode} 
        />
        
        <div className="space-y-3">
          <ToggleField 
            label="Transparent Walls" 
            sublabelText="Dynamic Alpha" 
            active={settings.transparentWalls} 
            onClick={() => updateSettings({ transparentWalls: !settings.transparentWalls })} 
            isDarkMode={isDarkMode} 
          />
          
          <WallTransparencySlider 
            value={settings.transparencyLevel} 
            onChange={(val) => updateSettings({ transparencyLevel: val })} 
            isDarkMode={isDarkMode}
            disabled={!settings.transparentWalls}
          />
        </div>

        <ToggleField 
          label="Intelligent Hide" 
          sublabelText="Camera Occlusion" 
          active={settings.autoHideWalls} 
          onClick={() => updateSettings({ autoHideWalls: !settings.autoHideWalls })} 
          isDarkMode={isDarkMode} 
        />
      </div>
    </div>
  );
};
