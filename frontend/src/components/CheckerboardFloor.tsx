// src/components/CheckerboardFloor.tsx
import React, { useMemo } from 'react';
import { useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const CheckerboardFloor: React.FC = () => {
  const { size } = useThree();
  const textureSize = 512;

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = textureSize;
    canvas.height = textureSize;
    const context = canvas.getContext('2d');

    const colors = ['#ffffff', '#cccccc'];
    const squareSize = textureSize / 8;

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        context!.fillStyle = colors[(x + y) % 2];
        context!.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);

    return texture;
  }, []);

  return (
    <>
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial map={texture} />
    </mesh>
    <primitive object={new THREE.GridHelper(20, 20)} rotation={[-Math.PI / 2, 0, 0]} />
    <primitive object={new THREE.GridHelper(20, 20)} rotation={[0, -Math.PI / 2, 0]} />
    <primitive object={new THREE.GridHelper(20, 20)} rotation={[0, 0, -Math.PI / 2]} />
    </>
  );
};

export default CheckerboardFloor;
