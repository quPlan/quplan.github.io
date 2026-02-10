
import React from 'react';
import { RoomDefinition, PlacedItem, RoomShape, FloorMaterial } from '../types';
import { FLOOR_MATERIALS } from '../constants';

interface InspectorPanelProps {
  selectedRoom?: RoomDefinition;
  selectedItem?: PlacedItem;
  onRemoveRoom: (id: string) => void;
  onUpdateRoom: (id: string, updates: Partial<RoomDefinition>, commit?: boolean) => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, updates: Partial<PlacedItem>, commit?: boolean) => void;
  isDarkMode: boolean;
}

export const InspectorPanel: React.FC<InspectorPanelProps> = ({ selectedRoom, selectedItem, onRemoveRoom, onUpdateRoom, onRemoveItem, onUpdateItem, isDarkMode }) => {
  const panelStyle = isDarkMode ? "bg-black/60 border-white/10" : "bg-white/75 border-white/60";
  const inputBg = isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-white/80 border-gray-100 text-black";
  const labelColor = isDarkMode ? "text-gray-400" : "text-gray-500";

  if (selectedRoom) {
    return (
      <div className={`glass p-4 rounded-2xl shadow-lg pointer-events-auto border animate-in slide-in-from-bottom-4 duration-500 ${panelStyle}`}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Room Config</h2>
            <button onClick={() => onRemoveRoom(selectedRoom.id)} className="text-red-500 hover:text-red-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1-1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="space-y-3">
            <div className={`p-2 rounded-xl border ${inputBg}`}>
              <p className={`text-[8px] font-black uppercase mb-1 ${labelColor}`}>Room Name</p>
              <input value={selectedRoom.name} onChange={e => onUpdateRoom(selectedRoom.id, { name: e.target.value })} className="w-full text-[10px] font-black bg-transparent focus:outline-none uppercase" />
            </div>
            
            <div className="space-y-2">
              <p className={`text-[8px] font-black uppercase ${labelColor}`}>Floor Material</p>
              <div className="grid grid-cols-2 gap-1">
                {FLOOR_MATERIALS.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => onUpdateRoom(selectedRoom.id, { floorMaterial: mat.id, floorColor: mat.color }, true)}
                    className={`p-2 rounded-xl border text-[8px] font-black uppercase transition-all ${
                      selectedRoom.floorMaterial === mat.id
                        ? (isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black')
                        : (isDarkMode ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-white/60 border-gray-100 text-gray-500')
                    }`}
                  >
                    {mat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className={`text-[8px] font-black uppercase ${labelColor}`}>Custom Floor Color</p>
              <div className="grid grid-cols-5 gap-1">
                {['#ffffff', '#b58c5f', '#d2b48c', '#cbd5e1', '#94a3b8', '#4a5568', '#f1f5f9', '#1a202c', '#6366f1', '#ec4899'].map(c => (
                  <button 
                    key={c} 
                    onClick={() => onUpdateRoom(selectedRoom.id, { floorColor: c, floorMaterial: 'plain' }, true)} 
                    className={`w-full aspect-square rounded-lg border-2 transition-all ${selectedRoom.floorColor === c ? (isDarkMode ? 'border-white' : 'border-black') : 'border-transparent'}`} 
                    style={{ backgroundColor: c }} 
                  />
                ))}
              </div>
            </div>

            {selectedRoom.shape !== 'CUSTOM' && (
              <>
                <div className="grid grid-cols-3 gap-1">
                  {(['RECTANGLE', 'L_SHAPE', 'U_SHAPE'] as RoomShape[]).map(s => (
                    <button 
                      key={s}
                      onClick={() => onUpdateRoom(selectedRoom.id, { shape: s }, true)}
                      className={`py-1 rounded-md text-[7px] font-black transition-all ${selectedRoom.shape === s ? (isDarkMode ? 'bg-white text-black' : 'bg-black text-white') : (isDarkMode ? 'bg-white/10 text-gray-400 hover:bg-white/20' : 'bg-gray-100 text-gray-400 hover:bg-gray-200')}`}
                    >
                      {s.split('_')[0]}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className={`p-2 rounded-xl border ${inputBg}`}>
                    <p className={`text-[8px] font-black uppercase mb-1 ${labelColor}`}>Width (m)</p>
                    <input type="number" step="0.1" value={selectedRoom.width} onChange={e => onUpdateRoom(selectedRoom.id, { width: parseFloat(e.target.value) || 1 })} className="w-full text-[10px] font-black bg-transparent focus:outline-none" />
                  </div>
                  <div className={`p-2 rounded-xl border ${inputBg}`}>
                    <p className={`text-[8px] font-black uppercase mb-1 ${labelColor}`}>Length (m)</p>
                    <input type="number" step="0.1" value={selectedRoom.length} onChange={e => onUpdateRoom(selectedRoom.id, { length: parseFloat(e.target.value) || 1 })} className="w-full text-[10px] font-black bg-transparent focus:outline-none" />
                  </div>
                </div>
              </>
            )}
            <div className={`p-2 rounded-xl border ${inputBg}`}>
              <p className={`text-[8px] font-black uppercase mb-1 ${labelColor}`}>Height ({selectedRoom.height}m)</p>
              <input type="range" min="1.5" max="5" step="0.1" value={selectedRoom.height} onChange={e => onUpdateRoom(selectedRoom.id, { height: parseFloat(e.target.value) })} className={`w-full h-1 rounded-lg appearance-none accent-blue-500 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedItem) {
    return (
      <div className={`glass p-4 rounded-2xl shadow-lg pointer-events-auto border animate-in slide-in-from-bottom-4 duration-500 ${panelStyle}`}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Item Style</h2>
            <button onClick={() => onRemoveItem(selectedItem.instanceId)} className="text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1-1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="space-y-3">
            <div className={`p-2 rounded-xl border ${inputBg}`}>
              <p className={`text-[8px] font-black uppercase mb-1 ${labelColor}`}>Rotation</p>
              <input type="range" min="0" max={Math.PI * 2} step="0.1" value={selectedItem.rotation} onChange={e => onUpdateItem(selectedItem.instanceId, { rotation: parseFloat(e.target.value) })} className={`w-full h-1 rounded-lg appearance-none accent-blue-500 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {['#ffffff', '#1a1a1a', '#4A5568', '#CBD5E0', '#FBD38D', '#9AE6B4', '#FBB6CE', '#4299E1'].map(c => (
                <button key={c} onClick={() => onUpdateItem(selectedItem.instanceId, { color: c }, true)} className={`w-full aspect-square rounded-lg border-2 transition-all ${selectedItem.color === c ? (isDarkMode ? 'border-white' : 'border-black') : 'border-transparent'}`} style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
