import type { FastifyInstance } from 'fastify';
import { CreateStrategySchema, type Strategy } from '@evolvex/shared';
import { store } from '../services/store.js';
import { NotFoundError } from '../errors.js';

export async function strategyRoutes(fastify: FastifyInstance) {
  // GET /api/strategies - List strategies
  fastify.get('/api/strategies', async (request) => {
    const query = request.query as { status?: string };
    let list = [...store.strategies];
    if (query.status) {
      list = list.filter((s) => s.status === query.status);
    }
    return {
      count: list.length,
      data: list,
    };
  });

  // GET /api/strategies/:id - Get strategy by ID
  fastify.get('/api/strategies/:id', async (request) => {
    const { id } = request.params as { id: string };
    const strategy = store.strategies.find((s) => s.id === id);
    if (!strategy) {
      throw new NotFoundError('Strategy', id);
    }
    return strategy;
  });

  // POST /api/strategies - Create or register a strategy
  fastify.post('/api/strategies', async (request, reply) => {
    const parsed = CreateStrategySchema.parse(request.body);

    const newStrategy: Strategy = {
      id: `str-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6)}`,
      name: parsed.name,
      version: '1.0.0',
      status: 'DRAFT',
      description: parsed.description,
      parameters: parsed.parameters,
      riskScore: parsed.riskScore,
      parentStrategyId: parsed.parentStrategyId,
      generation: parsed.generation,
      fitnessScore: parsed.fitnessScore,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    store.strategies.push(newStrategy);
    fastify.log.info({ strategyId: newStrategy.id }, 'Strategy created');

    return reply.status(201).send({
      message: 'Strategy registered',
      strategy: newStrategy,
    });
  });
}

