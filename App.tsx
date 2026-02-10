
import React, { useState, useCallback, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CanvasScene } from './components/CanvasScene';
import { NotificationOverlay } from './components/NotificationOverlay';
import { MobileOverlay } from './components/MobileOverlay';
import { SidebarToggle } from './components/sidebar/SidebarToggle';
import { FixedSidebar } from './components/sidebar/FixedSidebar';
import { FloatingSidebar } from './components/sidebar/FloatingSidebar';
import { useCollisionDetection } from './hooks/useCollisionDetection';
import { useHomeState } from './hooks/useHomeState';
import { useDrawingLogic } from './hooks/useDrawingLogic';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { AppMode, RoomDefinition, Notification, PlacedItem, WallSettings, HomeState, SidebarLayout, SidebarSide } from './types';
import { FURNITURE_CATALOG } from './constants';

const GRID_LIMIT = 20;

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('BUILD');
  const [showErrors, setShowErrors] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showGridInConclusion, setShowGridInConclusion] = useState(false);
  const [showFloorInConclusion, setShowFloorInConclusion] = useState(true);
  const [showRoomLabels, setShowRoomLabels] = useState(true);
  const [smoothFollow, setSmoothFollow] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarLayout, setSidebarLayout] = useState<SidebarLayout>('FIXED');
  const [sidebarSide, setSidebarSide] = useState<SidebarSide>('LEFT');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isTransforming, setIsTransforming] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [is2DView, setIs2DView] = useState(false);
  const [showCollisions, setShowCollisions] = useState(true); // New state for collision detection
  
  // Ref to track last valid camera target for smoother transitions
  const lastCameraTarget = useRef(new THREE.Vector3(0, 0, 0));

  const [wallSettings, setWallSettings] = useState<WallSettings>({
    showWalls: true,
    transparentWalls: false,
    autoHideWalls: true,
    transparencyLevel: 0.8
  });

  const notify = useCallback((message: string, type: 'error' | 'success' | 'info' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3000);
  }, []);

  const { 
    homeState, setHomeState, saveToBrowser, updateItem, updateRoom, 
    clearState, undo, redo, addItem, addRoom, removeItem, removeRoom,
    canUndo, canRedo 
  } = useHomeState(notify);
  
  const { 
    isDrawing, currentPath, startDrawing, cancelDrawing, 
    addVertex, updateVertex, finishDrawing, setCurrentPath 
  } = useDrawingLogic(homeState, addRoom, notify);

  const { collidingItems, collidingRooms, collidingWalls, hasCollision } = useCollisionDetection(homeState, showCollisions); // Pass showCollisions

  const handleDeleteSelected = useCallback(() => {
    if (!selectedId) return;

    const roomToDelete = homeState.rooms.find(r => r.id === selectedId);
    if (roomToDelete) {
      removeRoom(roomToDelete.id);
      notify(`Deleted room: ${roomToDelete.name}`, 'success');
      setSelectedId(null);
      return;
    }

    const itemToDelete = homeState.items.find(i => i.instanceId === selectedId);
    if (itemToDelete) {
      const template = FURNITURE_CATALOG.find(t => t.id === itemToDelete.templateId);
      removeItem(itemToDelete.instanceId);
      notify(`Deleted item: ${template?.name || 'Unknown Item'}`, 'success');
      setSelectedId(null);
      return;
    }
  }, [selectedId, homeState.rooms, homeState.items, removeRoom, removeItem, notify]);

  useKeyboardShortcuts({ 
    onUndo: undo, 
    onRedo: redo, 
    canUndo, 
    canRedo,
    onDelete: handleDeleteSelected // Pass the new delete handler
  });

  const handleModeChange = useCallback((newMode: AppMode) => {
    setMode(newMode);
    // When switching to CONCLUSION, we deselect everything.
    // We don't null selectedId immediately if it's the model we were looking at,
    // to allow the camera logic to transition smoothly.
    if (newMode === 'CONCLUSION') {
      notify("Conclusion Mode", "info");
      setSidebarOpen(false);
      // Wait a tiny bit for the layout animation to start before resetting selection
      setTimeout(() => setSelectedId(null), 50);
    } else {
      setSelectedId(null);
      setSidebarOpen(true);
    }
  }, [notify]);

  const cameraTarget = useMemo(() => {
    let target = new THREE.Vector3(0, 0, 0);
    if (isDrawing) {
      target.set(0, 0, 0);
    } else if (selectedId) {
      const room = homeState.rooms.find(r => r.id === selectedId);
      if (room) {
        target.set(room.position[0], 0.5, room.position[1]);
      } else {
        const item = homeState.items.find(i => i.instanceId === selectedId);
        if (item) {
          const template = FURNITURE_CATALOG.find(t => t.id === item.templateId);
          target.set(item.position[0], (template?.dimensions[1] || 1) / 2, item.position[2]);
        }
      }
    }

    // Update last camera target ref
    lastCameraTarget.current.copy(target);
    return target;
  }, [selectedId, homeState, isDrawing]);

  const handleAddItem = (templateId: string) => {
    const newItem: PlacedItem = { instanceId: `item-${Date.now()}`, templateId, position: [0, 0.1, 0], rotation: 0, color: '' };
    addItem(newItem);
    setSelectedId(newItem.instanceId);
    setMode('DESIGN');
  };

  const handleAddRoom = () => {
    const newRoom: RoomDefinition = {
      id: `room-${Date.now()}`, name: `New Room`, shape: 'RECTANGLE',
      width: 5, length: 5, height: 2.6, wallThickness: 0.15,
      position: [homeState.rooms.length * 2, homeState.rooms.length * 2],
      floorMaterial: 'carpet',
      floorColor: '#94a3b8', // Gray for floor
      wallColor: '#94a3b8' // Gray for walls
    };
    addRoom(newRoom);
    setSelectedId(newRoom.id);
  };

  const handleFinishDrawingWrapper = (customVertices?: [number, number][]) => {
    const newId = finishDrawing(customVertices);
    if (newId) setSelectedId(newId);
  };

  const handleImportState = (newState: HomeState) => {
    setHomeState(newState);
    notify("Project Restored", "success");
  };

  const handleSaveAll = () => {
    saveToBrowser();
    const dataStr = JSON.stringify(homeState, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `quPlan_Plan_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    notify("Plan Saved & Downloaded", "success");
  };

  const hasSidebarContent = mode !== 'CONCLUSION' || !!selectedId;
  const isFixed = sidebarLayout === 'FIXED';
  const sidebarContent = hasSidebarContent && (
    <Sidebar 
      mode={mode} homeState={homeState} selectedId={selectedId} onSelect={setSelectedId}
      onAddItem={handleAddItem} onUpdateItem={updateItem} onRemoveItem={removeItem}
      onAddRoom={handleAddRoom} onUpdateRoom={updateRoom} onRemoveRoom={removeRoom}
      isDrawing={isDrawing} 
      onStartDrawing={startDrawing} 
      onCancelDrawing={cancelDrawing} 
      onFinishDrawing={handleFinishDrawingWrapper}
      onAddVertex={addVertex}
      currentPath={currentPath}
      onUpdateVertex={updateVertex}
      isDarkMode={isDarkMode}
      showRoomLabels={showRoomLabels}
      onUpdatePreview={setCurrentPath}
    />
  );

  return (
    <div className={`relative w-full h-screen select-none overflow-hidden font-inter transition-colors duration-500 ${
      isDarkMode ? 'bg-[#000000]' : 'bg-white'
    } flex ${sidebarSide === 'RIGHT' ? 'flex-row-reverse' : 'flex-row'}`}>
      
      <MobileOverlay />

      <Header 
        onSave={handleSaveAll} onClear={clearState} 
        onUndo={undo} onRedo={redo} canUndo={canUndo} canRedo={canRedo}
        mode={mode} setMode={handleModeChange} isDrawing={isDrawing}
        showErrors={showErrors} setShowErrors={setShowErrors}
        smoothFollow={smoothFollow} setSmoothFollow={setSmoothFollow}
        isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}
        showGrid={showGrid} setShowGrid={setShowGrid}
        showGridInConclusion={showGridInConclusion} setShowGridInConclusion={setShowGridInConclusion}
        showFloorInConclusion={showFloorInConclusion} setShowFloorInConclusion={setShowFloorInConclusion}
        showRoomLabels={showRoomLabels} setShowRoomLabels={setShowRoomLabels}
        wallSettings={wallSettings} setWallSettings={setWallSettings}
        homeState={homeState}
        onImportState={handleImportState}
        is2DView={is2DView}
        setIs2DView={setIs2DView}
        sidebarLayout={sidebarLayout}
        setSidebarLayout={setSidebarLayout}
        sidebarSide={sidebarSide}
        setSidebarSide={setSidebarSide}
        showCollisions={showCollisions} // Pass new prop
        setShowCollisions={setShowCollisions} // Pass new prop
      />
      
      {/* SIDEBAR RENDERING */}
      {isFixed ? (
        <FixedSidebar isOpen={sidebarOpen && hasSidebarContent} side={sidebarSide} isDarkMode={isDarkMode}>
          {sidebarContent}
        </FixedSidebar>
      ) : (
        <FloatingSidebar isOpen={sidebarOpen && hasSidebarContent} side={sidebarSide}>
          {sidebarContent}
        </FloatingSidebar>
      )}

      {/* MAIN VIEWPORT */}
      <div className="relative flex-1 h-full overflow-hidden">
        <CanvasScene 
          isDarkMode={isDarkMode}
          mode={mode}
          cameraTarget={cameraTarget}
          selectedId={selectedId}
          smoothFollow={smoothFollow}
          homeState={homeState}
          setSelectedId={setSelectedId}
          updateItem={updateItem}
          updateRoom={updateRoom}
          isDrawing={isDrawing}
          currentPath={currentPath}
          onAddVertex={addVertex}
          gridLimit={GRID_LIMIT}
          collidingItems={collidingItems} // Pass collision results
          collidingRooms={collidingRooms} // Pass collision results
          collidingWalls={collidingWalls} // Pass collision results
          setIsTransforming={setIsTransforming}
          showGrid={showGrid}
          showGridInConclusion={showGridInConclusion}
          showFloorInConclusion={showFloorInConclusion}
          showRoomLabels={showRoomLabels}
          wallSettings={wallSettings}
          is2DView={is2DView}
          showCollisions={showCollisions} // Pass new prop
        />

        {/* UNIFIED TOGGLE BUTTON */}
        {hasSidebarContent && (
          <SidebarToggle 
            isOpen={sidebarOpen} 
            onToggle={() => setSidebarOpen(!sidebarOpen)} 
            layout={sidebarLayout} 
            side={sidebarSide} 
            isDarkMode={isDarkMode} 
          />
        )}
      </div>

      <NotificationOverlay 
        notifications={notifications} 
        hasCollision={hasCollision} // Use general hasCollision from hook
        showErrors={showErrors} 
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default App;
