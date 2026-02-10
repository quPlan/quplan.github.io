
import React from 'react';

interface SidebarScrollContainerProps {
  children: React.ReactNode;
  isDarkMode: boolean;
}

export const SidebarScrollContainer: React.FC<SidebarScrollContainerProps> = ({ children, isDarkMode }) => {
  const glassStyle = isDarkMode 
    ? "bg-black/80 border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.8)]" 
    : "bg-white/85 border-white/60 shadow-[0_16px_48px_rgba(0,0,0,0.1)]";

  return (
    <div className={`glass w-full max-w-[340px] max-h-[85vh] flex flex-col rounded-[2.5rem] border transition-all overflow-hidden pointer-events-auto ${glassStyle} flex-shrink-0 mx-auto`}>
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        {children}
      </div>
    </div>
  );
};
