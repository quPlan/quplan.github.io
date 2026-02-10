
import React from 'react';
import { Notification } from '../types';

interface NotificationOverlayProps {
  notifications: Notification[];
  hasCollision: boolean;
  showErrors: boolean;
  isDarkMode: boolean;
}

export const NotificationOverlay: React.FC<NotificationOverlayProps> = ({ notifications, hasCollision, showErrors, isDarkMode }) => {
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 z-50 pointer-events-none items-center">
      {hasCollision && showErrors && (
        <div className="px-6 py-3 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl animate-bounce flex items-center gap-2 border border-red-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Overlay Issue: Objects Intersecting
        </div>
      )}
      {notifications.map(n => (
        <div key={n.id} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl border transition-all ${isDarkMode ? 'bg-white text-black border-white/20' : 'bg-black text-white border-white/20'}`}>
          {n.message}
        </div>
      ))}
    </div>
  );
};
