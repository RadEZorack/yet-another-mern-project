// src/pages/Dashboard.tsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import axios from 'axios';
import PlatterDesigner from '../components/PlatterDesigner';

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

const Dashboard: React.FC = () => {
  const auth = useContext(AuthContext);

  // Form state
  const [prompt, setPrompt] = useState('');
  // const [stylePrompt, setStylePrompt] = useState('');
  const [artStyle, setArtStyle] = useState('realistic');
  const [negativePrompt, setNegativePrompt] = useState('low quality, low resolution, low poly, ugly');
  const [loading, setLoading] = useState(false);
  const [modelRequests, setModelRequests] = useState<ModelRequest[]>([]);

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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5001/api/models', {
        prompt,
        // style_prompt: stylePrompt,
        art_style: artStyle,
        negative_prompt: negativePrompt,
        mode: 'preview',
      });

      // Handle successful response
      console.log('Model creation initiated:', response.data);
      alert('Model creation initiated!');
      // Reset form
      setPrompt('');
    } catch (error) {
      console.error('Error creating model:', error);
      alert('Failed to create model.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={auth.logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar> */}
      {/* Rest of your content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {auth.user.username}!
        </Typography>

        <Grid container spacing={3}>
          {/* Create 3D Model Form */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Create a New 3D Model
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                  label="Prompt"
                  fullWidth
                  multiline
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="art-style-label">Art Style</InputLabel>
                  <Select
                    labelId="art-style-label"
                    value={artStyle}
                    label="Art Style"
                    onChange={(e) => setArtStyle(e.target.value)}
                  >
                    <MenuItem value="realistic">Realistic</MenuItem>
                    <MenuItem value="cartoon">Cartoon</MenuItem>
                    <MenuItem value="abstract">Abstract</MenuItem>
                    {/* Add more styles as needed */}
                  </Select>
                </FormControl>
                <TextField
                  label="Negative Prompt"
                  fullWidth
                  multiline
                  rows={2}
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Model'}
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid container spacing={3}>
            {/* Main Content */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 240,
                }}
              >
                {/* Add your dashboard content here */}
                <Typography variant="h6">Your Dashboard</Typography>
                <Typography>
                  This is where you can manage your 3D models, orders, and account settings.
                </Typography>
                <Grid container spacing={3}>
                  {/* Recent Models */}
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6">Recent Models</Typography>
                      {/* Add content or components to display models */}
                      <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                          <Typography variant="h6" gutterBottom>
                            Your Model Requests
                          </Typography>
                          {modelRequests.length === 0 ? (
                            <Typography>No model requests found.</Typography>
                          ) : (
                            <List>
                              {modelRequests.map((model) => (
                                <ListItem key={model._id}>
                                  <ListItemText
                                    primary={<Typography variant="h6">{model.prompt}</Typography>}
                                    secondary={
                                      <>
                                        <Typography>Model Status: {model.status} {model.progress && (<>{model.progress}%</>)}</Typography>
                                        <Typography>Texture Status: {model.textureStatus} {model.progress && (<>{model.progress}%</>)}</Typography>
                                        <Typography>
                                          Created at: {new Date(model.createdAt).toLocaleString()}
                                        </Typography>
                                        {model.glb && (
                                          <>
                                            <Typography>Textured Model:</Typography>
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              href={model.glb}
                                              download
                                              sx={{ mt: 1 }}
                                            >
                                              Download .glb File
                                            </Button>
                                          </>
                                        )}
                                        {model.video_url && (
                                            <video
                                              width="320"
                                              height="240"
                                              controls
                                              src={model.video_url}
                                              style={{ maxWidth: '100%', marginTop: '10px' }}
                                            >
                                              Your browser does not support the video tag.
                                            </video>
                                        )}
                                        {model.thumbnail_url && (
                                            <img
                                              width="320"
                                              height="320"
                                              alt={model.prompt}
                                              src={model.thumbnail_url}
                                              style={{ maxWidth: '100%' }}
                                            />
                                        )}
                                      </>
                                    }
                                  />
                                </ListItem>
                              ))}
                            </List>
                          )}
                        </Paper>
                      </Grid>

                    </Paper>
                  </Grid>

                  {/* Recent Orders */}
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6">Recent Orders</Typography>
                      {/* Add content or components to display orders */}
                    </Paper>
                  </Grid>

                  {/* Account Information */}
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6">Account Information</Typography>
                      {/* Display user's account information */}
                      <Typography>Email: {auth.user.email}</Typography>
                      {/* Add more user info if needed */}
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
  