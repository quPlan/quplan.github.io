
import React from 'react';
import { PlacedItem } from '../../types';

interface ItemInspectorProps {
  item: PlacedItem;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<PlacedItem>, commit?: boolean) => void;
  isDarkMode: boolean;
}

const PRESET_COLORS = ['#ffffff', '#1a1a1a', '#4A5568', '#CBD5E0', '#FBD38D', '#9AE6B4', '#FBB6CE', '#4299E1', '#6366f1', '#ec4899'];

export const ItemInspector: React.FC<ItemInspectorProps> = ({ item, onRemove, onUpdate, isDarkMode }) => {
  const inputBg = isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-white/80 border-gray-100 text-black";
  const labelColor = isDarkMode ? "text-gray-400" : "text-gray-500";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Interior Style</h2>
        <button onClick={() => onRemove(item.instanceId)} className="text-red-500 hover:text-red-700 transition-colors p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1-1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="space-y-4">
        <div className={`p-3 rounded-2xl border ${inputBg}`}>
          <div className="flex justify-between items-center mb-2">
            <p className={`text-[8px] font-black uppercase ${labelColor}`}>Rotation Orientation</p>
            <span className="text-[10px] font-black">{Math.round((item.rotation * 180) / Math.PI)}°</span>
          </div>
          <input type="range" min="0" max={Math.PI * 2} step="0.1" value={item.rotation} onChange={e => onUpdate(item.instanceId, { rotation: parseFloat(e.target.value) })} className={`w-full h-1 rounded-lg appearance-none accent-blue-500 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {PRESET_COLORS.map(c => (
            <button key={c} onClick={() => onUpdate(item.instanceId, { color: c }, true)} className={`w-full aspect-square rounded-lg border-2 transition-all hover:scale-110 active:scale-90 ${item.color === c ? (isDarkMode ? 'border-white' : 'border-black') : 'border-transparent shadow-sm'}`} style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
    </div>
  );
};
