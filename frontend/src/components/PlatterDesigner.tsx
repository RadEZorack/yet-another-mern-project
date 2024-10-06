// src/components/PlatterDesigner.tsx
import React, { useContext, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ModelSelector from './ModelSelector';
import DraggableModel from './DraggableModel';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

interface Model {
    _id: string;
    prompt: string;
    glb: string;
}

// Define the interface
interface ModelRequest {
    _id: string;
    prompt: string;
    style_prompt?: string;
    art_style: string;
    negative_prompt?: string;
    mode: string;
    resultId: string;
    status: 'NOT_STARTED' | 'PENDING' | 'IN_PROGRESS' | 'SUCCEEDED' | 'FAILED' | 'EXPIRED';
    createdAt: string;
    updatedAt: string;
    progress: number;
    glb?: string; // URL
    fbx?: string; // URL
    usdz?: string; // URL
    obj?: string; // URL
    mtl?: string; // URL
    thumbnail_url?: string; // URL
    video_url?: string; // URL;
    // Texture
    textureResultId?: string;
    textureStatus?: 'NOT_STARTED' | 'PENDING' | 'IN_PROGRESS' | 'SUCCEEDED' | 'FAILED' | 'EXPIRED';
    // URLs
    base_color?: string;
    metallic?: string;
    normal?: string;
    roughness?: string;
  }

const PlatterDesigner: React.FC = () => {
    const [models, setModels] = useState<
      { url: string; position: [number, number, number] }[]
    >([]);

    const auth = useContext(AuthContext);

    const [userModels, setModelRequests] = useState<Model[]>([]);

    // const userModels: Model[] = [
    //     { id: '1', name: 'Model One', url: '/models/model-one.glb' },
    //     { id: '2', name: 'Model Two', url: '/models/model-two.glb' },
    //     // Add your models here
    //   ];

    useEffect(() => {
    const fetchModelRequests = async () => {
        try {
        const response = await axios.get('http://localhost:5001/api/models');
        setModelRequests(response.data);
        } catch (error) {
        console.error('Error fetching model requests:', error);
        }
    };

    fetchModelRequests();
    }, [auth?.user]);

    if (auth?.loading) {
    return <div>Loading...</div>;
    }

    if (!auth?.user) {
    return <Navigate to="/login" />;
    }

  const handleAddModel = (url: any) => {
    setModels([...models, { url, position: [0, 0, 0] }]);
  };

  return (
    <>
        {/* Model Selector */}
        <ModelSelector models={userModels} onAddModel={handleAddModel} />
        
        {/* Three.js Canvas */}
        <Canvas camera={{ position: [0, 20, 30], fov: 60 }}>
            {/* Camera Controls */}
            <OrbitControls />
            {/* Lights */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            {/* Your components will go here */}
            {models.map((model, index) => (
                <DraggableModel key={index} url={model.url} position={model.position} />
            ))}
        </Canvas>
    </>
  );
};

export default PlatterDesigner;
