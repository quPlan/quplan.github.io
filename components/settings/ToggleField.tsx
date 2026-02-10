
import React from 'react';

interface ToggleFieldProps {
  label: string;
  sublabelText: string;
  active: boolean;
  onClick: () => void;
  isDarkMode: boolean;
}

export const ToggleField: React.FC<ToggleFieldProps> = ({ label, sublabelText, active, onClick, isDarkMode }) => {
  const textColor = isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-800 group-hover:text-black';
  const accentColor = isDarkMode ? 'bg-blue-500' : 'bg-black';

  return (
    <div className="flex items-center justify-between group cursor-pointer" onClick={onClick}>
      <div className="flex flex-col">
        <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${textColor}`}>{label}</span>
        <span className="text-[7px] font-bold text-gray-500 uppercase">{sublabelText}</span>
      </div>
      <button 
        className={`w-9 h-5 rounded-full transition-all relative ${active ? accentColor : 'bg-gray-400/30'}`}
      >
        <div className={`absolute top-1 w-3 h-3 rounded-full transition-all shadow-sm ${active ? (isDarkMode ? 'bg-black left-5' : 'bg-white left-5') : 'bg-white left-1'}`} />
      </button>
    </div>
  );
};
