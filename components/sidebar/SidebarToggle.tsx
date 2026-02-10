
import React from 'react';
import { SidebarLayout, SidebarSide } from '../../types';

interface SidebarToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  layout: SidebarLayout;
  side: SidebarSide;
  isDarkMode: boolean;
}

export const SidebarToggle: React.FC<SidebarToggleProps> = ({ isOpen, onToggle, layout, side, isDarkMode }) => {
  const isFixed = layout === 'FIXED';
  const isLeft = side === 'LEFT';

  // Fixed layout toggle: Centered on the divider, higher z-index, no overlap
  if (isFixed) {
    return (
      <div 
        className={`absolute top-1/2 -translate-y-1/2 z-[100] pointer-events-none transition-all duration-500 ${
          isLeft ? 'left-0' : 'right-0'
        }`}
      >
        <button
          onClick={onToggle}
          className={`group pointer-events-auto flex items-center justify-center w-6 h-28 rounded-full transition-all shadow-2xl border-2 ${
            isLeft ? 'translate-x-2' : '-translate-x-2' // Changed from -translate-x-1/2 and translate-x-1/2 to move it away from the fixed sidebar edge
          } ${
            isDarkMode 
              ? 'bg-[#000000] border-white/20 text-blue-400 hover:border-blue-500' 
              : 'bg-white border-gray-200 text-blue-600 hover:border-blue-600'
          }`}
          title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          <div className={`transition-transform duration-500 ${
            (isLeft && isOpen) || (!isLeft && !isOpen) ? 'rotate-0' : 'rotate-180'
          }`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </button>
      </div>
    );
  }

  // Floating layout toggle: Placed vertically centered next to the panel
  return (
    <div 
      className={`absolute top-1/2 -translate-y-1/2 z-[100] pointer-events-none transition-all duration-500 ${
        isOpen 
          ? (isLeft ? 'left-[340px] -translate-x-1/2' : 'right-[340px] translate-x-1/2') // Centered on the sidebar edge when open
          : (isLeft ? 'left-4' : 'right-4')
      }`}
    >
      <button
        onClick={onToggle}
        className={`group pointer-events-auto flex items-center justify-center w-10 h-10 rounded-2xl transition-all shadow-2xl border-2 hover:scale-110 active:scale-90 ${
          isDarkMode 
            ? 'bg-blue-600 border-white/20 text-white hover:bg-blue-500' 
            : 'bg-black border-gray-800 text-white hover:bg-gray-900'
        }`}
        title={isOpen ? "Hide Panel" : "Show Panel"}
      >
        <div className={`transition-transform duration-500 ${
          (isLeft && isOpen) || (!isLeft && !isOpen) ? 'rotate-0' : 'rotate-180'
        }`}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M11 19l-7-7 7-7" />
          </svg>
        </div>
      </button>
    </div>
  );
};