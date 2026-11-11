import React from 'react';
import { MockDataBadge } from '../../components/MockDataBadge';
import { Settings, Shield, Cpu, Layers, Terminal, CheckCircle2, Clock } from 'lucide-react';

const STATUS_MATRIX = [
  { feature: 'Monorepo foundation', status: 'Implemented', done: true },
  { feature: 'Dashboard foundation', status: 'Implemented with benchmark layer', done: true },
  { feature: 'Backend API foundation', status: 'Implemented', done: true },
  { feature: 'AI API & heuristic baseline', status: 'Implemented', done: true },
  { feature: 'Strategy evolution experiments', status: 'In development', done: false },
  { feature: 'Reactive testnet deployment', status: 'Pending', done: false },
  { feature: 'Live cross-chain callbacks', status: 'Pending', done: false },
  { feature: 'End-to-end AI & contract integration', status: 'Pending', done: false },
];

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <MockDataBadge />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
            <Settings className="w-5 h-5 text-zinc-300" />
            System Configuration & Status Matrix
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Reactive Omni Buildathon 2026 • AI proposes. Validation checks. Smart contracts enforce.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800">
            Version 0.1.0-alpha
          </span>
        </div>
      </div>

      {/* Implementation Status Matrix */}
      <div className="p-5 rounded border border-zinc-800 bg-[#0a0a0a] space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h3 className="text-xs uppercase tracking-wider font-mono text-zinc-200 font-semibold flex items-center gap-2">
            Current Development Status Matrix
          </h3>
          <span className="text-[10px] font-mono text-zinc-500">
            Reactive Omni Buildathon 2026
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {STATUS_MATRIX.map((item) => (
            <div
              key={item.feature}
              className="p-3 rounded bg-zinc-950 border border-zinc-900 text-xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-zinc-300">{item.feature}</span>
                {item.done ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                )}
              </div>
              <div
                className={`text-[10px] font-mono ${
                  item.done ? 'text-emerald-400' : 'text-zinc-500'
                }`}
              >
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Guard Constraints (Trust Boundary) */}
        <div className="p-5 rounded border border-zinc-800 bg-[#0a0a0a] space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Shield className="w-4 h-4 text-zinc-300" />
            <h3 className="text-xs uppercase tracking-wider font-mono text-zinc-200 font-semibold">
              On-Chain Risk Guard Constraints
            </h3>
          </div>

          <p className="text-xs text-zinc-400">
            Immutable and admin limits enforced by <code className="text-zinc-200">RiskGuard.sol</code>.
            AI suggestions exceeding these thresholds are rejected on-chain before execution.
          </p>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 rounded bg-zinc-950 border border-zinc-900 flex items-center justify-between">
              <div>
                <div className="text-zinc-200 font-medium">Max Single-Tx Slippage</div>
                <div className="text-[10px] text-zinc-500">Absolute protocol ceiling</div>
              </div>
              <span className="text-zinc-100 font-bold">500 bps (5.0%)</span>
            </div>

            <div className="p-3 rounded bg-zinc-950 border border-zinc-900 flex items-center justify-between">
              <div>
                <div className="text-zinc-200 font-medium">Max Allocation Per Execution</div>
                <div className="text-[10px] text-zinc-500">Drawdown prevention cap</div>
              </div>
              <span className="text-zinc-100 font-bold">$100,000 USD</span>
            </div>

            <div className="p-3 rounded bg-zinc-950 border border-zinc-900 flex items-center justify-between">
              <div>
                <div className="text-zinc-200 font-medium">Global Circuit Breaker</div>
                <div className="text-[10px] text-zinc-500">Instant kill switch</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] border border-zinc-800 bg-zinc-900 text-zinc-400">
                INACTIVE (NORMAL)
              </span>
            </div>

            <div className="p-3 rounded bg-zinc-950 border border-zinc-900 space-y-1.5">
              <div className="text-zinc-200 font-medium">Allowed Target Protocols</div>
              <div className="flex flex-wrap gap-1.5 text-[10px]">
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                  UniswapV3 Router
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                  Curve 3Pool
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                  Balancer Vault
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reactive Network & RPC Configuration */}
        <div className="p-5 rounded border border-zinc-800 bg-[#0a0a0a] space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Layers className="w-4 h-4 text-zinc-300" />
            <h3 className="text-xs uppercase tracking-wider font-mono text-zinc-200 font-semibold">
              Reactive Network Integration
            </h3>
          </div>

          <p className="text-xs text-zinc-400">
            Network endpoints and contract configuration for Reactive Kopli testnet and destination chain.
          </p>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 rounded bg-zinc-950 border border-zinc-900 space-y-1">
              <div className="text-[10px] text-zinc-500 uppercase">Reactive Kopli RPC URL</div>
              <div className="text-zinc-200 truncate">https://kopli-rpc.reactive.network</div>
              <div className="text-[10px] text-zinc-500">Chain ID: 5318008 • Native: REACT</div>
            </div>

            <div className="p-3 rounded bg-zinc-950 border border-zinc-900 space-y-1">
              <div className="text-[10px] text-zinc-500 uppercase">Destination Chain (Sepolia)</div>
              <div className="text-zinc-200 truncate">https://rpc.sepolia.org</div>
              <div className="text-[10px] text-zinc-500">Chain ID: 11155111 • Native: SepoliaETH</div>
            </div>

            <div className="p-3 rounded bg-zinc-950 border border-zinc-900 space-y-1">
              <div className="text-[10px] text-zinc-500 uppercase">Reactive Monitor Contract</div>
              <div className="text-zinc-400 truncate">
                0x00000000000000000000000000000000000000ff (Pending Deployment)
              </div>
            </div>

            <div className="p-3 rounded bg-zinc-950 border border-zinc-900 space-y-1">
              <div className="text-[10px] text-zinc-500 uppercase">Destination Strategy Executor</div>
              <div className="text-zinc-400 truncate">
                0x0000000000000000000000000000000000000000 (Pending Deployment)
              </div>
            </div>
          </div>
        </div>

        {/* Off-Chain AI Decision Engine */}
        <div className="p-5 rounded border border-zinc-800 bg-[#0a0a0a] space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Cpu className="w-4 h-4 text-zinc-300" />
            <h3 className="text-xs uppercase tracking-wider font-mono text-zinc-200 font-semibold">
              AI Decision Engine Service
            </h3>
          </div>

          <p className="text-xs text-zinc-400">
            Python FastAPI worker evaluating on-chain event payloads and synthesizing strategy candidates.
          </p>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 rounded bg-zinc-950 border border-zinc-900 space-y-1">
              <div className="text-[10px] text-zinc-500 uppercase">AI Service Endpoint</div>
              <div className="text-zinc-200">http://localhost:8000</div>
              <div className="text-[10px] text-zinc-500">Health: GET /health • Eval: POST /evaluate-strategy</div>
            </div>

            <div className="p-3 rounded bg-zinc-950 border border-zinc-900 space-y-1">
              <div className="text-[10px] text-zinc-500 uppercase">Model Runtime Status</div>
              <div className="text-zinc-300">
                Modular Heuristic Baseline (Deterministic Mock Active)
              </div>
              <div className="text-[10px] text-zinc-500">
                PyTorch Evolutionary RL module interface ready for training weights.
              </div>
            </div>
          </div>
        </div>

        {/* Backend API Service */}
        <div className="p-5 rounded border border-zinc-800 bg-[#0a0a0a] space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Terminal className="w-4 h-4 text-zinc-300" />
            <h3 className="text-xs uppercase tracking-wider font-mono text-zinc-200 font-semibold">
              Backend Fastify & Prisma
            </h3>
          </div>

          <p className="text-xs text-zinc-400">
            Core event ingest, experiment scheduling, and evolutionary state database.
          </p>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 rounded bg-zinc-950 border border-zinc-900 space-y-1">
              <div className="text-[10px] text-zinc-500 uppercase">API Endpoint</div>
              <div className="text-zinc-200">http://localhost:4000</div>
              <div className="text-[10px] text-zinc-500">Modular Fastify routes with centralized Zod validation</div>
            </div>

            <div className="p-3 rounded bg-zinc-950 border border-zinc-900 space-y-1">
              <div className="text-[10px] text-zinc-500 uppercase">Database Schema Models</div>
              <div className="text-zinc-300">
                BlockchainEvent, Strategy, Experiment, ExperimentResult, EvolutionNode, Transaction
              </div>
              <div className="text-[10px] text-zinc-500">PostgreSQL + Prisma ORM (with in-memory test fallback)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
