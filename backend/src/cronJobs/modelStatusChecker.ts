// src/cronJobs/modelStatusChecker.ts
import cron from 'node-cron';
import ModelRequest from '../models/ModelRequest';
import { checkModelStatus, checkTextureStatus, initiateTextureRequest } from '../services/meshyService';

cron.schedule('*/1 * * * *', async () => {
  console.log('Checking status of pending models...');
  const pendingModels = await ModelRequest.find({ status: ['PENDING', 'IN_PROGRESS'] });

  for (const model of pendingModels) {
    try {
      const statusResponse = await checkModelStatus(model.resultId);
      console.log(statusResponse);
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
        // model.base_color = statusResponse.texture_urls[0].base_color; // URL
        await model.save();
        console.log(`Model ${model.resultId} SUCCEEDED.`);

        const textureResult = await initiateTextureRequest(model.resultId);
        model.textureResultId = textureResult.resultId;
        model.textureStatus = 'PENDING';
        await model.save();
        console.log(`Texture request initiated for model ${model.resultId}.`);

      } else if (statusResponse.status === 'FAILED') {
        model.status = 'FAILED';
        await model.save();
        console.log(`Model ${model.resultId} FAILED.`);
      } else if (statusResponse.status === 'PENDING') {
        // model.status = 'FAILED';
        // model.save();
        console.log(`Model ${model.resultId} PENDING.`);
      } else {
        model.status = statusResponse.status;
        await model.save();
        console.log(`Model ${model.resultId} ${statusResponse.status}.`);
      }
    } catch (error) {
      console.error(`Error checking status for model ${model.resultId}:`, error);
    }
  }

  console.log('Checking status of pending textures...');
  const pendingModelTextures = await ModelRequest.find({ status: 'SUCCEEDED', textureStatus: ['PENDING', 'IN_PROGRESS'] });

  for (const model of pendingModelTextures) {
    try {
      const statusResponse = await checkTextureStatus(model.textureResultId!);
      // Update the model status based on the response
      if (statusResponse.status === 'SUCCEEDED') {
        model.textureStatus = 'SUCCEEDED';
        // Save additional data if available, e.g., model URL
        model.glb = statusResponse.model_urls.glb; // URL
        model.fbx = statusResponse.model_urls.fbx; // URL
        model.usdz = statusResponse.model_urls.usdz; // URL
        // model.obj = statusResponse.model_urls.obj; // URL
        // model.mtl = statusResponse.model_urls.mtl; // URL
        model.thumbnail_url = statusResponse.thumbnail_url; // URL
        model.base_color = statusResponse.texture_urls[0].base_color; // URL
        // model.metallic = statusResponse.texture_urls[0].metallic; // URL
        // model.normal = statusResponse.texture_urls[0].normal; // URL
        // model.roughness = statusResponse.texture_urls[0].roughness; // URL
        await model.save();
        console.log(`Texture ${model.resultId} SUCCEEDED.`);

      } else if (statusResponse.status === 'FAILED') {
        model.textureStatus = 'FAILED';
        await model.save();
        console.log(`Texture ${model.resultId} FAILED.`);

      } else if (statusResponse.status === 'PENDING') {
        // model.status = 'FAILED';
        // model.save();
        console.log(`Texture ${model.resultId} PENDING.`);

      } else {
        model.textureStatus = statusResponse.status;
        await model.save();
        console.log(`Texture ${model.resultId} ${statusResponse.status}.`);
      }
    } catch (error) {
      console.error(`Error checking status for texture ${model.resultId}:`, error);
    }
  }
});
