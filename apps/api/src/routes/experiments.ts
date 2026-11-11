import type { FastifyInstance } from 'fastify';
import { CreateExperimentSchema, type Experiment } from '@evolvex/shared';
import { store } from '../services/store.js';
import { NotFoundError } from '../errors.js';

export async function experimentRoutes(fastify: FastifyInstance) {
  // GET /api/experiments - List experiments
  fastify.get('/api/experiments', async (request) => {
    const query = request.query as { status?: string };
    let list = [...store.experiments];
    if (query.status) {
      list = list.filter((e) => e.status === query.status);
    }
    return {
      count: list.length,
      data: list,
    };
  });

  // GET /api/experiments/:id - Get experiment details with results
  fastify.get('/api/experiments/:id', async (request) => {
    const { id } = request.params as { id: string };
    const experiment = store.experiments.find((e) => e.id === id);
    if (!experiment) {
      throw new NotFoundError('Experiment', id);
    }
    const result = store.results.find((r) => r.experimentId === id);
    return {
      experiment,
      result: result || null,
    };
  });

  // POST /api/experiments - Launch or schedule an experiment
  fastify.post('/api/experiments', async (request, reply) => {
    const parsed = CreateExperimentSchema.parse(request.body);

    const newExp: Experiment = {
      id: `exp-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6)}`,
      name: parsed.name,
      hypothesis: parsed.hypothesis,
      candidateStrategyId: parsed.candidateStrategyId,
      baselineStrategyId: parsed.baselineStrategyId,
      status: 'RUNNING',
      sampleSize: parsed.sampleSize,
      durationSeconds: parsed.durationSeconds,
      startedAt: new Date().toISOString(),
      endedAt: null,
      createdAt: new Date().toISOString(),
    };

    store.experiments.unshift(newExp);
    fastify.log.info({ experimentId: newExp.id }, 'Experiment initiated');

    return reply.status(201).send({
      message: 'Experiment started',
      experiment: newExp,
    });
  });
}

