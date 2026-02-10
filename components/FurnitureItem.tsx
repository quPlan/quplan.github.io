
import React, { useState } from 'react';
import { useCursor, RoundedBox, Edges } from '@react-three/drei';
import { PlacedItem, AppMode, FurnitureTemplate } from '../types';

interface FurnitureItemProps {
  item: PlacedItem;
  template: FurnitureTemplate;
  isSelected: boolean;
  onSelect: () => void;
  mode: AppMode;
  isColliding: boolean;
}

export const FurnitureItem: React.FC<FurnitureItemProps> = ({ item, template, isSelected, onSelect, mode, isColliding }) => {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered && mode === 'DESIGN');
  
  const highlightColor = isColliding ? "#ef4444" : "#3b82f6";

  return (
    <group 
      position={item.position} 
      rotation={[0, item.rotation, 0]} 
      onClick={e => { if(mode === 'DESIGN'){ e.stopPropagation(); onSelect(); } }} 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
    >
      <RoundedBox args={template.dimensions} radius={0.05} position={[0, template.dimensions[1]/2, 0]} castShadow receiveShadow>
        <meshStandardMaterial 
          color={item.color || template.color} 
          roughness={0.7}
          emissive={isColliding ? "#cc0000" : "#000000"} // Brighter red for collision
        />
        {(isSelected || isColliding) && mode === 'DESIGN' && (
          <Edges color={highlightColor} scale={1.05} threshold={15} />
        )}
      </RoundedBox>
    </group>
  );
};
