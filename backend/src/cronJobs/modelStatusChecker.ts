// src/cronJobs/modelStatusChecker.ts
import cron from 'node-cron';
import ModelRequest from '../models/ModelRequest';
import { checkModelStatus } from '../services/meshyService';

cron.schedule('*/5 * * * *', async () => {
  console.log('Checking status of pending models...');
  const pendingModels = await ModelRequest.find({ status: 'PENDING' });

  for (const model of pendingModels) {
    try {
      const statusResponse = await checkModelStatus(model.resultId);
      console.log(statusResponse)
      // Update the model status based on the response
      if (statusResponse.status === 'SUCCEEDED') {
        model.status = 'SUCCEEDED';
        // Save additional data if available, e.g., model URL
        model.glb = statusResponse.model_urls.glb; // URL
        model.fbx = statusResponse.model_urls.fbx; // URL
        model.usdz = statusResponse.model_urls.usdz; // URL
        model.obj = statusResponse.model_urls.obj; // URL
        model.mtl = statusResponse.model_urls.mtl; // URL
        model.thumbnail_url = statusResponse.thumbnail_url; // URL
        model.video_url = statusResponse.video_url; // URL;
        model.save();
        console.log(`Model ${model.resultId} SUCCEEDED.`);
      } else if (statusResponse.status === 'FAILED') {
        model.status = 'FAILED';
        model.save();
        console.log(`Model ${model.resultId} FAILED.`);
      } else if (statusResponse.status === 'PENDING') {
        // model.status = 'FAILED';
        // model.save();
        console.log(`Model ${model.resultId} PENDING.`);
      } else {
        model.status = statusResponse.status;
        model.save();
        console.log(`Model ${model.resultId} ${statusResponse.status}.`);
      }
    } catch (error) {
      console.error(`Error checking status for model ${model.resultId}:`, error);
    }
  }
});
