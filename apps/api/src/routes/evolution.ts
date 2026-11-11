import type { FastifyInstance } from 'fastify';
import { store } from '../services/store.js';
import { NotFoundError } from '../errors.js';

export async function evolutionRoutes(fastify: FastifyInstance) {
  // GET /api/evolution - Get full evolution tree and lineage graph
  fastify.get('/api/evolution', async () => {
    return {
      nodes: store.evolutionNodes,
      metrics: store.getMetrics(),
      totalGenerations: Math.max(...store.evolutionNodes.map((n) => n.generation), 0),
    };
  });

  // GET /api/evolution/nodes/:id - Get individual node details
  fastify.get('/api/evolution/nodes/:id', async (request) => {
    const { id } = request.params as { id: string };
    const node = store.evolutionNodes.find((n) => n.id === id);
    if (!node) {
      throw new NotFoundError('EvolutionNode', id);
    }
    const associatedStrategy = store.strategies.find((s) => s.id === node.strategyId);
    return {
      node,
      strategy: associatedStrategy || null,
    };
  });
}

