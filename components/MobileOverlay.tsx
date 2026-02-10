
import React, { useState, useEffect } from 'react';

export const MobileOverlay: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Check for touch support and screen width
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024;
      if (hasTouch || isSmallScreen) {
        setIsMobile(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile || dismissed) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm text-white font-inter">
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none bg-black">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px]" />
      </div>

      <div className="relative glass p-8 md:p-10 rounded-[3rem] border border-white/10 max-w-md w-full text-center space-y-8 shadow-2xl backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-500">
        <div className="flex justify-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            quPlan
          </h1>
          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Device Optimization Warning</p>
          <p className="text-sm text-gray-400 font-medium leading-relaxed">
            quPlan is a professional architectural drafting engine optimized for precise desktop interactions.
          </p>
          <div className="pt-4 border-t border-white/5 space-y-2">
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
              Mobile browsers may experience performance limitations or UI constraints. For full parametric control, a keyboard and mouse are recommended.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <button 
            onClick={() => setDismissed(true)}
            className="w-full py-4 bg-white text-black text-[11px] font-black uppercase tracking-[0.15em] rounded-2xl shadow-xl hover:bg-gray-100 transition-all active:scale-95"
          >
            Continue to App
          </button>
          <div className="flex justify-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/60 animate-pulse delay-75" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30 animate-pulse delay-150" />
          </div>
        </div>
      </div>
    </div>
  );
};
