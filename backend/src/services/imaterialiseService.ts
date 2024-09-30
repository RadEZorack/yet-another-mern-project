// src/services/imaterialiseService.ts
import axios from 'axios';

const IMATERIALISE_API_URL = 'https://imaterialise.com/api/order';
const IMATERIALISE_API_KEY = process.env.IMATERIALISE_API_KEY;

export const submitPrintJob = async (modelUrl: string, options: PrintOptions) => {
  try {
    const response = await axios.post(
      IMATERIALISE_API_URL,
      {
        modelUrl,
        ...options,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'API-Key': IMATERIALISE_API_KEY,
        },
      }
    );
    return response.data.orderId;
  } catch (error) {
    console.error('Error submitting print job:', error);
    throw new Error('Could not submit print job');
  }
};
