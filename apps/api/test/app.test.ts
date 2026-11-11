import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';

describe('EvolveX API Server', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /health returns 200 and healthy status', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/health',
    });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.status).toBe('ok');
    expect(body.service).toBe('evolvex-api');
  });

  it('GET /api/events returns event list', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/events',
    });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.count).toBeGreaterThanOrEqual(1);
  });

  it('GET /api/strategies returns strategies', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/strategies',
    });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(Array.isArray(body.data)).toBe(true);
  });

  it('GET /api/evolution returns nodes and metrics', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/evolution',
    });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(Array.isArray(body.nodes)).toBe(true);
    expect(body.metrics).toBeDefined();
  });
});

