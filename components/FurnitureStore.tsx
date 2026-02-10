
import React from 'react';
import { FURNITURE_CATALOG } from '../constants';
import { FurnitureCard } from './furniture/FurnitureCard';

interface FurnitureStoreProps {
  onAddItem: (templateId: string) => void;
  isDarkMode: boolean;
}

export const FurnitureStore: React.FC<FurnitureStoreProps> = ({ onAddItem, isDarkMode }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col px-1">
        <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Interior Assets</h2>
        <span className="text-[7px] font-bold text-gray-500 uppercase">Premium Catalog</span>
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto pr-1 custom-scrollbar">
        {FURNITURE_CATALOG.map(item => (
          <FurnitureCard 
            key={item.id} 
            item={item} 
            onClick={() => onAddItem(item.id)} 
            isDarkMode={isDarkMode} 
          />
        ))}
      </div>
    </div>
  );
};
