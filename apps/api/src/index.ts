import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorMiddleware } from './middleware/error.middleware';
import { requestIdMiddleware } from './middleware/request-id.middleware';
import { authMiddleware } from './middleware/auth.middleware';
import { logger } from '@repo/logger';
import missionRoutes from './routes/mission.routes';
import governanceRoutes from './modules/governance/controllers/governance.controller';

const app = express();
const port = process.env.PORT || 4000;

// Security & Observability
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestIdMiddleware);

// Logging Middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      requestId: req.headers['x-request-id']
    });
  });
  next();
});

// Internal Health & Metrics
app.get('/health', (req, res) => {
  res.json({ 
    status: 'operational', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Protect all API routes
app.use('/api', authMiddleware);

// API Routes
app.use('/api/missions', missionRoutes);
app.use('/api/governance', governanceRoutes);

// SHIELDA Error Handler
app.use(errorMiddleware);

app.listen(port, () => {
  logger.info(`[GEMINI HQ] Intelligence Hub operational on port ${port}`);
});
