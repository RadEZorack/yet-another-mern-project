// src/services/meshyService.ts
import axios from 'axios';

const MESHY_API_URL = 'https://api.meshy.ai';
const MESHY_API_KEY = process.env.MESHY_API_KEY;

// src/services/meshyService.ts
export const checkModelStatus = async (resultId: string): Promise<any> => {
  try {
    const response = await axios.get(`${MESHY_API_URL}/v2/text-to-3d/${resultId}`, {
      headers: {
        Authorization: `Bearer ${MESHY_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error checking model status:', error);
    throw error;
  }
};

// New function to initiate texture request
export const initiateTextureRequest = async (preview_task_id: string): Promise<any> => {
  try {
    const response = await axios.post(
      `${MESHY_API_URL}/v2/text-to-3d`,
      {
        mode: "refine",
        preview_task_id: preview_task_id
        // model_url: model_url,
        // object_prompt: object_prompt,
        // enable_original_uv: false,
        // enable_pbr: false,
        // art_style: art_style,
        // negative_prompt: negative_prompt
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${MESHY_API_KEY}`,
        },
      }
    );

    return {
      resultId: response.data.result,
    };
  } catch (error) {
    console.error('Error initiating texture request:', error);
    throw error;
  }
};

// New function to check texture status
export const checkTextureStatus = async (resultId: string): Promise<any> => {
  try {
    const response = await axios.get(`${MESHY_API_URL}/v2/text-to-3d/${resultId}`, {
      headers: {
        Authorization: `Bearer ${MESHY_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error checking texture status:', error);
    throw error;
  }
};