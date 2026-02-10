
import React from 'react';
import { SidebarSide } from '../../types';

interface FixedSidebarProps {
  isOpen: boolean;
  side: SidebarSide;
  isDarkMode: boolean;
  children: React.ReactNode;
}

export const FixedSidebar: React.FC<FixedSidebarProps> = ({ isOpen, side, isDarkMode, children }) => {
  const isLeft = side === 'LEFT';
  
  // We use border on the side that touches the main viewport
  const borderClass = isLeft ? 'border-r' : 'border-l';
  
  return (
    <aside 
      className={`h-full relative transition-all duration-500 overflow-hidden flex flex-col shrink-0 z-30 ${
        isOpen ? 'w-[380px]' : 'w-0'
      } ${borderClass} ${
        isDarkMode ? 'bg-[#0a0a0a] border-white/5 shadow-2xl' : 'bg-gray-50 border-gray-200'
      }`}
    >
      <div className="flex-1 w-full p-6 pt-24 overflow-y-auto custom-scrollbar">
        {children}
      </div>
    </aside>
  );
};