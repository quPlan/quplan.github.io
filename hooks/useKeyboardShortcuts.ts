
import { useEffect } from 'react';

interface ShortcutProps {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onDelete: () => void; // New prop for delete action
}

export const useKeyboardShortcuts = ({ onUndo, onRedo, canUndo, canRedo, onDelete }: ShortcutProps) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Undo: Ctrl+Z or Cmd+Z
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          if (canRedo) onRedo();
        } else {
          if (canUndo) onUndo();
        }
      } 
      // Redo: Ctrl+Y or Cmd+Y
      else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        if (canRedo) onRedo();
      }
      // Delete: Delete or Backspace key
      else if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        onDelete();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onUndo, onRedo, canUndo, canRedo, onDelete]); // Add onDelete to dependency array
};
