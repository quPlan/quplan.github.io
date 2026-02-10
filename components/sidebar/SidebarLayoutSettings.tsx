
import React from 'react';
import { SidebarLayout, SidebarSide } from '../../types';

interface SidebarLayoutSettingsProps {
  layout: SidebarLayout;
  onLayoutChange: (layout: SidebarLayout) => void;
  side: SidebarSide;
  onSideChange: (side: SidebarSide) => void;
  isDarkMode: boolean;
}

export const SidebarLayoutSettings: React.FC<SidebarLayoutSettingsProps> = ({ 
  layout, onLayoutChange, side, onSideChange, isDarkMode 
}) => {
  const activeBtn = isDarkMode ? "bg-white text-black" : "bg-black text-white";
  const inactiveBtn = isDarkMode ? "bg-white/5 text-gray-400 hover:bg-white/10" : "bg-gray-100 text-gray-500 hover:bg-gray-200";

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className={`flex flex-col gap-1 border-b pb-2 ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
          <h3 className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Sidebar Style</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => onLayoutChange('FLOATING')}
            className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all border ${layout === 'FLOATING' ? activeBtn : inactiveBtn} ${isDarkMode ? 'border-white/5' : 'border-transparent'}`}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <span className="text-[8px] font-black uppercase">Floating</span>
          </button>

          <button 
            onClick={() => onLayoutChange('FIXED')}
            className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all border ${layout === 'FIXED' ? activeBtn : inactiveBtn} ${isDarkMode ? 'border-white/5' : 'border-transparent'}`}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zM9 5v14" />
              </svg>
            </div>
            <span className="text-[8px] font-black uppercase">Hard Fixed</span>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className={`flex flex-col gap-1 border-b pb-2 ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
          <h3 className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Screen Anchor</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => onSideChange('LEFT')}
            className={`flex items-center justify-center gap-2 p-2.5 rounded-xl transition-all border text-[8px] font-black uppercase ${side === 'LEFT' ? activeBtn : inactiveBtn} ${isDarkMode ? 'border-white/5' : 'border-transparent'}`}
          >
            Left Side
          </button>

          <button 
            onClick={() => onSideChange('RIGHT')}
            className={`flex items-center justify-center gap-2 p-2.5 rounded-xl transition-all border text-[8px] font-black uppercase ${side === 'RIGHT' ? activeBtn : inactiveBtn} ${isDarkMode ? 'border-white/5' : 'border-transparent'}`}
          >
            Right Side
          </button>
        </div>
      </div>
    </div>
  );
};
