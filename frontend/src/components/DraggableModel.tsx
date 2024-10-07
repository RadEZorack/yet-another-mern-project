// src/components/DraggableModel.tsx
import React, { useRef, FC } from 'react';
import { useLoader, useFrame, ThreeEvent } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useDrag } from '@use-gesture/react';
import * as THREE from 'three';

interface DraggableModelProps {
    url: string;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
}  

const DraggableModel: FC<DraggableModelProps> = ({ url, position, rotation, scale }) => {
  const proxyUrl = `http://localhost:5001/api/proxy/model?url=${encodeURIComponent(url)}`;
  const gltf = useLoader(GLTFLoader, proxyUrl);

  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <primitive object={gltf.scene} />
    </mesh>
  );
};

export default DraggableModel;
