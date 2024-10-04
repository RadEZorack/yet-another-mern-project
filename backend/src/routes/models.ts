// src/routes/models.ts
import { Router } from 'express';
import { createModel, getModelRequests } from '../controllers/modelsController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Protect the route with authentication middleware
router.post('/', authMiddleware, createModel);
router.get('/', authMiddleware, getModelRequests);

export default router;
