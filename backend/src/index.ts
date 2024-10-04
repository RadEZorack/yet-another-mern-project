import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import { authMiddleware } from './middleware/authMiddleware';
import modelsRoutes from './routes/models';
import './cronJobs/modelStatusChecker';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.use('/api/auth', authRoutes);
app.use('/api/models', modelsRoutes);

// Protected Route Example
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL || 'mongodb://mongo:27017/mydatabase')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
