import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { flyerController } from './controllers/flyerController.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'FlairForge Backend is running' });
});

app.post('/api/generate-flyer', flyerController.generate);
app.post('/api/enhance-content', flyerController.enhanceContent); // Added endpoint
app.get('/api/templates', flyerController.getTemplates);

// Error handling middleware
app.use((err, req, res, _next) => {
  console.error(err.stack);
  const isProduction = process.env.NODE_ENV === 'production';
  res.status(500).json({
    error: 'Something went wrong!',
    message: isProduction ? 'Internal server error' : err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 FlairForge Backend running on port ${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
