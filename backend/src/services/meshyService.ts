// src/services/meshyService.ts
import axios from 'axios';

const MESHY_API_URL = 'https://api.meshy.ai/generate';
const MESHY_API_KEY = process.env.MESHY_API_KEY;

export const generate3DModel = async (textInput: string): Promise<string> => {
  try {
    const response = await axios.post(
      MESHY_API_URL,
      { prompt: textInput },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MESHY_API_KEY}`,
        },
      }
    );
    // Assuming the API returns a URL to the 3D model
    return response.data.modelUrl;
  } catch (error) {
    console.error('Error generating 3D model:', error);
    throw new Error('Could not generate 3D model');
  }
};
