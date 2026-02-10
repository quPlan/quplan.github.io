
import React from 'react';
import { SidebarSide } from '../../types';

interface FloatingSidebarProps {
  isOpen: boolean;
  side: SidebarSide;
  children: React.ReactNode;
}

export const FloatingSidebar: React.FC<FloatingSidebarProps> = ({ isOpen, side, children }) => {
  const isLeft = side === 'LEFT';
  
  return (
    <div 
      className={`absolute inset-y-0 ${isLeft ? 'left-0' : 'right-0'} p-4 flex items-center transition-transform duration-500 z-30 pointer-events-none ${
        isOpen 
          ? 'translate-x-0' 
          : (isLeft ? '-translate-x-[calc(340px+2rem)]' : 'translate-x-[calc(340px+2rem)]')
      }`}
    >
      <div className="pointer-events-auto">
        {children}
      </div>
    </div>
  );
};
