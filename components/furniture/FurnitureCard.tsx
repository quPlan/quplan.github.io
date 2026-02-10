
import React from 'react';
import { FurnitureTemplate } from '../../types';

interface FurnitureCardProps {
  item: FurnitureTemplate;
  onClick: () => void;
  isDarkMode: boolean;
}

export const FurnitureCard: React.FC<FurnitureCardProps> = ({ item, onClick, isDarkMode }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 border rounded-2xl border-dashed transition-all group ${
        isDarkMode 
          ? 'border-white/10 bg-white/5 hover:border-white/40 hover:bg-white/10' 
          : 'border-gray-100 bg-white/40 hover:border-black hover:bg-white'
      }`}
    >
      <span className="text-3xl mb-1.5 group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
      <span className={`text-[9px] font-black uppercase truncate w-full text-center tracking-tight ${isDarkMode ? 'text-gray-400 group-hover:text-white' : 'text-gray-500 group-hover:text-black'}`}>
        {item.name}
      </span>
      <div className="flex gap-1 mt-1 opacity-40 group-hover:opacity-100 transition-opacity">
        <span className="text-[6px] font-bold">{item.dimensions[0]}x{item.dimensions[2]}m</span>
      </div>
    </button>
  );
};
