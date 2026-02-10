
import React from 'react';
import { PlanExporter } from './io/PlanIO';
import { HomeState } from '../types';

interface MainControlsProps {
  onSave: () => void;
  onClear: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isSettingsOpen: boolean;
  toggleSettings: () => void;
  isDarkMode: boolean;
  isDisabled: boolean;
  homeState: HomeState;
}

export const MainControls: React.FC<MainControlsProps> = (props) => {
  const { onSave, onClear, onUndo, onRedo, canUndo, canRedo, isSettingsOpen, toggleSettings, isDarkMode, isDisabled, homeState } = props;
  const glassStyle = isDarkMode ? "bg-black/60 border-white/10" : "bg-white/75 border-white/60";
  const primaryBtn = isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800';
  const iconBtn = isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-black';

  return (
    <div className={`glass px-4 py-2 rounded-2xl shadow-lg pointer-events-auto flex items-center gap-4 border transition-all ${glassStyle} ${isDisabled ? 'opacity-20 pointer-events-none' : ''}`}>
      <button 
        onClick={onClear}
        className="text-[10px] font-black text-gray-400 hover:text-red-600 transition-all uppercase tracking-[0.1em] py-1 px-2"
      >
        Reset
      </button>

      <div className="flex gap-1 border-x border-white/10 px-2">
        <button 
          onClick={onUndo} 
          disabled={!canUndo}
          className={`p-1.5 transition-all ${canUndo ? iconBtn : 'opacity-20 cursor-not-allowed'}`}
          title="Undo (Ctrl+Z)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
        </button>
        <button 
          onClick={onRedo} 
          disabled={!canRedo}
          className={`p-1.5 transition-all ${canRedo ? iconBtn : 'opacity-20 cursor-not-allowed'}`}
          title="Redo (Ctrl+Y)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-1 pr-2">
        <PlanExporter state={homeState} />
        <button 
          onClick={toggleSettings}
          className={`p-2 rounded-xl transition-all flex items-center justify-center ${isSettingsOpen ? (isDarkMode ? 'bg-white text-black shadow-xl scale-110' : 'bg-black text-white shadow-xl scale-110') : 'text-gray-400 hover:bg-white/10'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
      
      <button 
        onClick={onSave}
        className={`${primaryBtn} px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] transition-all shadow-xl active:scale-95`}
      >
        Save Plan
      </button>
    </div>
  );
};
