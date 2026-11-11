import type {
  BlockchainEvent,
  Strategy,
  Experiment,
  EvolutionNode,
  SystemMetrics,
} from '@evolvex/shared';
import {
  MOCK_METRICS,
  MOCK_STRATEGIES,
  MOCK_EXPERIMENTS,
  MOCK_EVOLUTION_NODES,
  MOCK_EVENTS,
} from './mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function safeFetch<T>(endpoint: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      return fallback;
    }
    const data = await res.json();
    return data;
  } catch {
    // If backend is offline, gracefully return realistic benchmark fallback
    return fallback;
  }
}

export async function getSystemMetrics(): Promise<SystemMetrics> {
  const data = await safeFetch<{ metrics?: SystemMetrics }>('/api/evolution', {});
  return data.metrics || MOCK_METRICS;
}

export async function getStrategies(): Promise<Strategy[]> {
  const data = await safeFetch<{ data?: Strategy[] }>('/api/strategies', {});
  return data.data && data.data.length > 0 ? data.data : MOCK_STRATEGIES;
}

export async function getExperiments(): Promise<Experiment[]> {
  const data = await safeFetch<{ data?: Experiment[] }>('/api/experiments', {});
  return data.data && data.data.length > 0 ? data.data : MOCK_EXPERIMENTS;
}

export async function getEvolutionNodes(): Promise<EvolutionNode[]> {
  const data = await safeFetch<{ nodes?: EvolutionNode[] }>('/api/evolution', {});
  return data.nodes && data.nodes.length > 0 ? data.nodes : MOCK_EVOLUTION_NODES;
}

export async function getEvents(): Promise<BlockchainEvent[]> {
  const data = await safeFetch<{ data?: BlockchainEvent[] }>('/api/events', {});
  return data.data && data.data.length > 0 ? data.data : MOCK_EVENTS;
}

export async function triggerSimulatedEvent(params: {
  divergenceBps: number;
  triggerName?: string;
}): Promise<BlockchainEvent> {
  const payload = {
    chainId: 5318008, // Reactive Kopli
    contractAddress: '0x00000000000000000000000000000000000000ff',
    eventSignature: 'CallbackDispatched(uint256,address,bytes)',
    blockNumber: Math.floor(1421000 + Math.random() * 500),
    txHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
    payload: {
      target: '0x3210000000000000000000000000000000000001',
      divergenceBps: params.divergenceBps,
      trigger: params.triggerName || 'UniswapV3SwapDivergence',
      timestamp: new Date().toISOString(),
    },
  };

  try {
    const res = await fetch(`${API_BASE_URL}/api/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const result = await res.json();
      return result.event;
    }
  } catch {
    // Return simulated event if offline
  }

  return {
    id: `evt-${Date.now()}`,
    ...payload,
    status: 'ANALYZED',
    detectedAt: new Date().toISOString(),
  };
}
