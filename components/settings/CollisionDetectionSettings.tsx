
import React from 'react';
import { ToggleField } from './ToggleField'; // Assuming this is in the same directory

interface CollisionDetectionSettingsProps {
  showCollisions: boolean;
  setShowCollisions: (val: boolean) => void;
  isDarkMode: boolean;
}

export const CollisionDetectionSettings: React.FC<CollisionDetectionSettingsProps> = ({
  showCollisions,
  setShowCollisions,
  isDarkMode,
}) => {
  return (
    <div className="space-y-4">
      <div className={`flex flex-col gap-1 border-b pb-2 ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
        <h3 className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>Collision Detection</h3>
        <p className="text-[8px] font-bold text-gray-500 uppercase tracking-tighter">Spatial Integrity Engine</p>
      </div>

      <ToggleField
        label="Enable Collisions"
        sublabelText="Detect Overlapping Objects"
        active={showCollisions}
        onClick={() => setShowCollisions(!showCollisions)}
        isDarkMode={isDarkMode}
      />
      {showCollisions && (
        <p className={`text-[7px] font-bold ${isDarkMode ? 'text-orange-300' : 'text-orange-700'} uppercase pl-4`}>
          Highlights conflicts between items, walls, and rooms.
        </p>
      )}
    </div>
  );
};
