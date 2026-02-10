
import { useState, useCallback, useRef } from 'react';
import { HomeState, PlacedItem, RoomDefinition } from '../types';
import { STORAGE_KEY } from '../constants';

export const useHomeState = (notify: (msg: string, type?: 'success' | 'error' | 'info') => void) => {
  const [homeState, setHomeState] = useState<HomeState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Load failed", e);
      }
    }
    return {
      rooms: [{ id: 'room-1', name: 'Living Room', shape: 'RECTANGLE', width: 8, length: 6, height: 2.6, wallThickness: 0.15, position: [0, 0], floorMaterial: 'carpet', floorColor: '#94a3b8', wallColor: '#94a3b8' }],
      items: [],
    };
  });

  const history = useRef<{ past: HomeState[]; future: HomeState[] }>({
    past: [],
    future: [],
  });

  const saveToHistory = useCallback(() => {
    history.current.past.push(JSON.parse(JSON.stringify(homeState)));
    history.current.future = [];
    if (history.current.past.length > 50) history.current.past.shift();
  }, [homeState]);

  const undo = useCallback(() => {
    if (history.current.past.length === 0) return;
    const previous = history.current.past.pop()!;
    history.current.future.push(JSON.parse(JSON.stringify(homeState)));
    setHomeState(previous);
    notify("Undo", "info");
  }, [homeState, notify]);

  const redo = useCallback(() => {
    if (history.current.future.length === 0) return;
    const next = history.current.future.pop()!;
    history.current.past.push(JSON.parse(JSON.stringify(homeState)));
    setHomeState(next);
    notify("Redo", "info");
  }, [homeState, notify]);

  const saveToBrowser = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(homeState));
    notify("Saved successfully", "success");
  }, [homeState, notify]);

  const updateItem = useCallback((id: string, updates: Partial<PlacedItem>, commit = false) => {
    setHomeState(prev => {
      const newState = {
        ...prev,
        items: prev.items.map(i => i.instanceId === id ? { ...i, ...updates } : i)
      };
      if (commit) {
        history.current.past.push(JSON.parse(JSON.stringify(prev)));
        history.current.future = [];
      }
      return newState;
    });
  }, []);

  const updateRoom = useCallback((id: string, updates: Partial<RoomDefinition>, commit = false) => {
    setHomeState(prev => {
      const newState = {
        ...prev,
        rooms: prev.rooms.map(r => r.id === id ? { ...r, ...updates } : r)
      };
      if (commit) {
        history.current.past.push(JSON.parse(JSON.stringify(prev)));
        history.current.future = [];
      }
      return newState;
    });
  }, []);

  const addItem = useCallback((newItem: PlacedItem) => {
    saveToHistory();
    setHomeState(prev => ({ ...prev, items: [...prev.items, newItem] }));
  }, [saveToHistory]);

  const addRoom = useCallback((newRoom: RoomDefinition) => {
    saveToHistory();
    setHomeState(prev => ({ ...prev, rooms: [...prev.rooms, newRoom] }));
  }, [saveToHistory]);

  const removeItem = useCallback((id: string) => {
    saveToHistory();
    setHomeState(prev => ({ ...prev, items: prev.items.filter(i => i.instanceId !== id) }));
  }, [saveToHistory]);

  const removeRoom = useCallback((id: string) => {
    saveToHistory();
    setHomeState(prev => ({ ...prev, rooms: prev.rooms.filter(r => r.id !== id) }));
  }, [saveToHistory]);

  const clearState = useCallback(() => {
    saveToHistory();
    setHomeState({ rooms: [], items: [] });
  }, [saveToHistory]);

  return {
    homeState,
    setHomeState,
    saveToBrowser,
    updateItem,
    updateRoom,
    clearState,
    undo,
    redo,
    addItem,
    addRoom,
    removeItem,
    removeRoom,
    canUndo: history.current.past.length > 0,
    canRedo: history.current.future.length > 0
  };
};
