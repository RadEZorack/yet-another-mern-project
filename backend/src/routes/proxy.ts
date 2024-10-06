// src/routes/proxy.ts
import express, { Request, RequestHandler, Response, NextFunction } from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/model', async (req: Request, res: Response, next: NextFunction) => {
  const { url } = req.query;

  // Validate the URL
  const isValidUrl = (inputUrl: string): boolean => {
    try {
      const parsedUrl = new URL(inputUrl);
      return parsedUrl.hostname.endsWith('meshy.ai');
    } catch {
      return false;
    }
  };

  if (!url || !isValidUrl(url as string)) {
    res.status(400).json({ error: 'Invalid or missing URL parameter' });
    return
  }

  try {
    const response = await axios.get(url as string, {
      responseType: 'arraybuffer',
    });

    // Set the content type based on the response
    res.set('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching model:', error);
    res.status(500).json({ error: 'Failed to fetch model' });
  }
});

export default router;
