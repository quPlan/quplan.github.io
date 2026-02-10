
import React from 'react';

interface RoomNameInputProps {
  name: string;
  onChange: (name: string) => void;
  isDarkMode: boolean;
}

export const RoomNameInput: React.FC<RoomNameInputProps> = ({ name, onChange, isDarkMode }) => {
  const inputBg = isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-white/80 border-gray-100 text-black";
  const labelColor = isDarkMode ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`p-3 rounded-2xl border ${inputBg}`}>
      <p className={`text-[8px] font-black uppercase mb-1.5 ${labelColor}`}>Label Identity</p>
      <input 
        value={name} 
        onChange={e => onChange(e.target.value)} 
        placeholder="Enter room name..."
        className="w-full text-[11px] font-black bg-transparent focus:outline-none uppercase tracking-tight" 
      />
    </div>
  );
};
