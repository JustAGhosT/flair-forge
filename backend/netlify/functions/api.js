import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import serverless from 'serverless-http';
import { flyerController } from '../../src/controllers/flyerController.js';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' })); // Increased limit for potential image uploads
app.use(express.urlencoded({ extended: true }));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'FlairForge API is running' });
});

// Flyer Endpoints
app.post('/api/generate-flyer', flyerController.generate);
app.get('/api/templates', flyerController.getTemplates);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something broke!',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

// Export for Netlify Functions
export const handler = serverless(app);
