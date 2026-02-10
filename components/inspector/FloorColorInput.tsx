
import React from 'react';

interface FloorColorInputProps {
  value?: string;
  onChange: (color: string) => void;
  isDarkMode: boolean;
}

export const FloorColorInput: React.FC<FloorColorInputProps> = ({ value = '#ffffff', onChange, isDarkMode }) => {
  const inputBg = isDarkMode ? "bg-black/40 border-white/10" : "bg-white border-gray-200";
  
  return (
    <div className="flex items-center gap-3 mt-3 px-1">
      <div className="relative group w-10 h-10 shrink-0">
        <input 
          type="color" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div 
          className="w-full h-full rounded-xl border-2 border-white/20 shadow-inner group-hover:scale-110 transition-transform duration-200" 
          style={{ backgroundColor: value }}
        />
      </div>
      <div className="flex-1">
        <p className="text-[7px] font-black text-gray-500 uppercase mb-1">Direct Hex Code</p>
        <input 
          type="text" 
          value={value.toUpperCase()} 
          onChange={(e) => {
            const val = e.target.value;
            if (/^#[0-9A-F]{0,6}$/i.test(val)) {
              onChange(val);
            }
          }}
          className={`w-full px-3 py-2 rounded-xl text-[10px] font-black focus:outline-none border ${inputBg}`}
          placeholder="#FFFFFF"
        />
      </div>
    </div>
  );
};
