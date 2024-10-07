// src/components/PlatterDesigner.tsx
import React, { useContext, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ModelSelector from './ModelSelector';
import DraggableModel from './DraggableModel';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Container, Grid, Paper, Typography } from '@mui/material';
import CheckerboardFloor from './CheckerboardFloor';

interface Model {
    _id: string;
    prompt: string;
    glb: string;
    thumbnail_url: string;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
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
    const [models, setModels] = useState<Model[]>([]);
    const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

    const auth = useContext(AuthContext);

    const [userModels, setModelRequests] = useState<Model[]>([]);

    const selectedModel = models.find((model) => model._id === selectedModelId);

    // Function to update a model's position
    const updateModelPosition = (_id: string, newPosition: [number, number, number]) => {
        setModels((prevModels) =>
            prevModels.map((model) =>
                model._id === _id ? { ...model, position: newPosition } : model
            )
        );
    };

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

    const handleAddModel = (url: string, name: string) => {
        const newModel = {
          _id: Date.now().toString(),
          glb: url,
          prompt: name,
          thumbnail_url: "",
          position: [0, 0, 0] as [number, number, number],
          rotation: [0, 0, 0] as [number, number, number],
          scale: [1, 1, 1] as [number, number, number],
        };
        setModels([...models, newModel]);
      };

  const updateModelTransform = (
        type: 'position' | 'rotation' | 'scale',
        index: number,
        value: number
    ) => {
        if (!selectedModelId) return;
        setModels((prevModels) =>
        prevModels.map((model) =>
            model._id === selectedModelId
            ? {
                ...model,
                [type]: model[type].map((v: any, i: any) =>
                    i === index ? value : v
                ) as [number, number, number],
                }
            : model
        )
        );
    };
  

  return (
    <>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {auth.user.username}!
        </Typography>

            <Grid container spacing={3}>
                {/* Model Selector */}
                <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6">Select Models to Add</Typography>
                    <ModelSelector models={userModels} onAddModel={handleAddModel} />
                </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                    <select
                        value={selectedModelId || ''}
                        onChange={(e) => setSelectedModelId(e.target.value)}
                        >
                        <option value="" disabled>
                            Select a model
                        </option>
                        {models.map((model) => (
                            <option key={model._id} value={model._id}>
                            {model._id}
                            </option>
                        ))}
                    </select>
                    {selectedModel && (
                        <div>
                            <h3>Transform Model: {selectedModel._id}</h3>
                            <div>
                            <h4>Position</h4>
                            {['X', 'Y', 'Z'].map((axis, index) => (
                                <label key={axis}>
                                {axis}:
                                <input
                                    type="number"
                                    value={selectedModel.position[index]}
                                    onChange={(e) =>
                                    updateModelTransform('position', index, parseFloat(e.target.value))
                                    }
                                />
                                </label>
                            ))}
                            </div>
                            <div>
                            <h4>Rotation (Degrees)</h4>
                            {['X', 'Y', 'Z'].map((axis, index) => (
                                <label key={axis}>
                                {axis}:
                                <input
                                    type="number"
                                    value={(selectedModel.rotation[index] * 180) / Math.PI}
                                    onChange={(e) =>
                                    updateModelTransform(
                                        'rotation',
                                        index,
                                        (parseFloat(e.target.value) * Math.PI) / 180
                                    )
                                    }
                                />
                                </label>
                            ))}
                            </div>
                            <div>
                            <h4>Scale</h4>
                            {['X', 'Y', 'Z'].map((axis, index) => (
                                <label key={axis}>
                                {axis}:
                                <input
                                    type="number"
                                    value={selectedModel.scale[index]}
                                    onChange={(e) =>
                                    updateModelTransform('scale', index, parseFloat(e.target.value))
                                    }
                                />
                                </label>
                            ))}
                            </div>
                        </div>
                    )}
                </Paper>
                </Grid>
                
                {/* Three.js Canvas */}
                <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6">Your Platter</Typography>
                    {/* Add content or components to display orders */}
                    <div style={{ width: '100%', height: '50vh' }}>
                        <Canvas camera={{ position: [0, 3, 3], fov: 60 }} style={{ width: '100%', height: '100%' }}>
                            {/* Camera Controls */}
                            <OrbitControls />
                            {/* Lights */}
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[10, 10, 5]} intensity={1} />
                            {/* Your components will go here */}
                            <CheckerboardFloor />
                            {models.map((model) => (
                                <DraggableModel
                                    key={model._id}
                                    url={model.glb}
                                    position={model.position}
                                    rotation={model.rotation}
                                    scale={model.scale}
                                />
                            ))}
                        </Canvas>
                    </div>
                </Paper>
                </Grid>
            </Grid>
        </Container>    
    </>
  );
};

export default PlatterDesigner;
