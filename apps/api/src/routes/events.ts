import type { FastifyInstance } from 'fastify';
import { IngestEventSchema, type BlockchainEvent } from '@evolvex/shared';
import { store } from '../services/store.js';

export async function eventRoutes(fastify: FastifyInstance) {
  // GET /api/events - List monitored on-chain events
  fastify.get('/api/events', async (request) => {
    const query = request.query as { limit?: string; chainId?: string; status?: string };
    let events = [...store.events];

    if (query.chainId) {
      events = events.filter((e) => e.chainId === Number(query.chainId));
    }
    if (query.status) {
      events = events.filter((e) => e.status === query.status);
    }

    const limit = query.limit ? parseInt(query.limit, 10) : 50;
    return {
      count: events.length,
      data: events.slice(0, limit),
    };
  });

  // POST /api/events - Ingest or simulate an on-chain event
  fastify.post('/api/events', async (request, reply) => {
    const parsed = IngestEventSchema.parse(request.body);

    const newEvent: BlockchainEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      chainId: parsed.chainId,
      contractAddress: parsed.contractAddress,
      eventSignature: parsed.eventSignature,
      blockNumber: parsed.blockNumber,
      txHash: parsed.txHash,
      payload: parsed.payload,
      status: 'PENDING',
      detectedAt: new Date().toISOString(),
    };

    store.events.unshift(newEvent);
    fastify.log.info({ eventId: newEvent.id, chainId: newEvent.chainId }, 'New blockchain event ingested');

    return reply.status(201).send({
      message: 'Event successfully ingested and queued for AI analysis',
      event: newEvent,
    });
  });
}

