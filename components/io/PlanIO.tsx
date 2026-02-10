
import React from 'react';
import { HomeState } from '../../types';

interface PlanIOProps {
  state: HomeState;
  onImport: (newState: HomeState) => void;
  isDarkMode: boolean;
}

export const PlanExporter: React.FC<{ state: HomeState }> = ({ state }) => {
  const handleExport = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `quPlan_Project_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button 
      onClick={handleExport}
      className="flex items-center gap-2 p-2 hover:bg-blue-500/10 rounded-lg transition-colors group"
      title="Download Project File"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    </button>
  );
};

export const PlanImporter: React.FC<{ onImport: (state: HomeState) => void, isDarkMode: boolean }> = ({ onImport, isDarkMode }) => {
  const fileRef = React.useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.rooms && Array.isArray(json.rooms)) {
          onImport(json);
        } else {
          alert("Invalid quPlan project file.");
        }
      } catch (err) {
        alert("Error parsing project file.");
      }
    };
    reader.readAsText(file);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      <div className={`flex flex-col gap-1 border-b pb-2 ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
        <h3 className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Backup & Import</h3>
      </div>
      <button 
        onClick={() => fileRef.current?.click()}
        className={`w-full p-4 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all group ${isDarkMode ? 'border-white/10 bg-white/5 hover:border-green-500/40 hover:bg-green-500/5' : 'border-gray-100 bg-gray-50 hover:border-green-500/40 hover:bg-green-50/50'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-hover:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <div className="text-center">
          <p className="text-[9px] font-black uppercase tracking-widest group-hover:text-green-500">Restore File</p>
          <p className="text-[7px] text-gray-500 uppercase">Select .json project</p>
        </div>
        <input ref={fileRef} type="file" accept=".json" onChange={handleFile} className="hidden" />
      </button>
    </div>
  );
};
