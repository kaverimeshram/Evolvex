import Fastify, { type FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import sensible from '@fastify/sensible';
import { centralizedErrorHandler } from './errors.js';
import { healthRoutes } from './routes/health.js';
import { eventRoutes } from './routes/events.js';
import { strategyRoutes } from './routes/strategies.js';
import { experimentRoutes } from './routes/experiments.js';
import { evolutionRoutes } from './routes/evolution.js';

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: {
      level: process.env.NODE_ENV === 'test' ? 'silent' : 'info',
    },
  });

  // Plugins
  await app.register(cors, {
    origin: true,
  });
  await app.register(sensible);

  // Error handling
  app.setErrorHandler(centralizedErrorHandler);

  // Register modular routes
  await app.register(healthRoutes);
  await app.register(eventRoutes);
  await app.register(strategyRoutes);
  await app.register(experimentRoutes);
  await app.register(evolutionRoutes);

  return app;
}

