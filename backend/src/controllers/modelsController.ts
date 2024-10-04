// src/controllers/modelsController.ts
import { Request, Response } from 'express';
import axios from 'axios';
import ModelRequest from '../models/ModelRequest';

const MESHY_API_URL = 'https://api.meshy.ai/v2/text-to-3d';
const MESHY_API_KEY = process.env.MESHY_API_KEY;

export const createModel = async (req: Request, res: Response) => {
  const { prompt, art_style, negative_prompt, mode } = req.body;
  const userId = (req as any).user.id; // Assuming user ID is attached to the request by authMiddleware

  const headers = { Authorization: `Bearer ${MESHY_API_KEY}` };
  const payload = {
    mode: mode,
    prompt: prompt,
    art_style: art_style,
    negative_prompt: negative_prompt,
  };

  try {
    // Send request to Meshy.ai
    const response = await axios.post(
      'https://api.meshy.ai/v2/text-to-3d',
      payload,
      { headers }
    );
    console.log(response.data);

    const resultId = response.data.result;

    // Save the result ID to the database
    const modelRequest = new ModelRequest({
      user: userId,
      prompt,
      art_style,
      negative_prompt,
      mode,
      resultId,
      status: 'PENDING',
    });

    await modelRequest.save();

    res.status(201).json({ message: 'Model creation initiated', resultId });
  } catch (error) {
    console.error('Error creating model:', error);
    res.status(500).json({ message: 'Failed to create model', error });
  }
};

// src/controllers/modelsController.ts
export const getModelRequests = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
  
    try {
      const models = await ModelRequest.find({ user: userId }).sort({ createdAt: -1 });
      res.json(models);
    } catch (error) {
      console.error('Error fetching model requests:', error);
      res.status(500).json({ message: 'Failed to fetch model requests', error });
    }
  };
  
