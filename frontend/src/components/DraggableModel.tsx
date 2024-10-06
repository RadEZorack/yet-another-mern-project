// src/components/DraggableModel.tsx
import React, { useRef, FC } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

interface DraggableModelProps {
    url: string;
    position: [number, number, number];
    setPosition?: (position: [number, number, number]) => void;
}  

const DraggableModel: FC<DraggableModelProps> = ({ url, position }) => {
  const ref = useRef<THREE.Mesh>();
  
  const proxyUrl = `http://localhost:5001/api/proxy/model?url=${encodeURIComponent(url)}`;
  const gltf = useLoader(GLTFLoader, proxyUrl);

  return <primitive ref={ref} object={gltf.scene} position={position} />;
};

export default DraggableModel;
