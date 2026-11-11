'use client';

import React, { useState } from 'react';
import { triggerSimulatedEvent } from '../lib/api';
import { Zap, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import type { BlockchainEvent } from '@evolvex/shared';

interface SimulateEventTriggerProps {
  onEventGenerated?: (event: BlockchainEvent) => void;
}

export function SimulateEventTrigger({ onEventGenerated }: SimulateEventTriggerProps) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<number | null>(null);
  const [lastTxHash, setLastTxHash] = useState<string | null>(null);

  const runSimulation = async () => {
    setLoading(true);
    setStep(1); // 1. Origin chain event

    await new Promise((r) => setTimeout(r, 400));
    setStep(2); // 2. Reactive Network react() callback

    await new Promise((r) => setTimeout(r, 400));
    setStep(3); // 3. StrategyExecutor receives callback

    const divergence = Math.floor(25 + Math.random() * 35); // 25-60 bps
    const event = await triggerSimulatedEvent({
      divergenceBps: divergence,
      triggerName: 'UniswapV3SwapDivergence',
    });

    setStep(4); // 4. AI Engine analyzes divergence
    await new Promise((r) => setTimeout(r, 400));

    setStep(5); // 5. RiskGuard safety verification
    await new Promise((r) => setTimeout(r, 350));

    setStep(6); // 6. Guarded execution approval
    setLastTxHash(event.txHash);
    setLoading(false);

    if (onEventGenerated) {
      onEventGenerated(event);
    }
  };

  return (
    <div className="p-4 rounded border border-zinc-800 bg-[#0a0a0a] space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-zinc-300" />
            <h4 className="text-xs uppercase font-mono font-semibold text-zinc-200">
              Reactive Event Simulator
            </h4>
          </div>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            Trigger a cross-chain Reactive callback to test the autonomous AI decision loop
          </p>
        </div>

        <button
          onClick={runSimulation}
          disabled={loading}
          className="px-3.5 py-1.5 rounded bg-zinc-100 hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-900 text-xs font-semibold font-mono flex items-center gap-1.5 transition-colors shrink-0"
        >
          {loading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-900" />
              <span>Running Step {step}/6...</span>
            </>
          ) : (
            <>
              <Zap className="w-3.5 h-3.5 text-zinc-900" />
              <span>Simulate Cross-Chain Event</span>
            </>
          )}
        </button>
      </div>

      {/* 6-Step Visual Pipeline */}
      {step !== null && (
        <div className="pt-2 border-t border-zinc-900">
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-[10px] font-mono">
            <div className={`p-2 rounded border ${step >= 1 ? 'border-zinc-700 bg-zinc-900 text-zinc-200' : 'border-zinc-900 text-zinc-600'}`}>
              <div className="text-[9px] uppercase text-zinc-500">Step 1</div>
              <div>Event Trigger</div>
            </div>
            <div className={`p-2 rounded border ${step >= 2 ? 'border-zinc-700 bg-zinc-900 text-zinc-200' : 'border-zinc-900 text-zinc-600'}`}>
              <div className="text-[9px] uppercase text-zinc-500">Step 2</div>
              <div>Reactive Callback</div>
            </div>
            <div className={`p-2 rounded border ${step >= 3 ? 'border-zinc-700 bg-zinc-900 text-zinc-200' : 'border-zinc-900 text-zinc-600'}`}>
              <div className="text-[9px] uppercase text-zinc-500">Step 3</div>
              <div>Executor Ingest</div>
            </div>
            <div className={`p-2 rounded border ${step >= 4 ? 'border-zinc-700 bg-zinc-900 text-zinc-200' : 'border-zinc-900 text-zinc-600'}`}>
              <div className="text-[9px] uppercase text-zinc-500">Step 4</div>
              <div>AI Analysis</div>
            </div>
            <div className={`p-2 rounded border ${step >= 5 ? 'border-zinc-700 bg-zinc-900 text-zinc-200' : 'border-zinc-900 text-zinc-600'}`}>
              <div className="text-[9px] uppercase text-zinc-500">Step 5</div>
              <div>RiskGuard Check</div>
            </div>
            <div className={`p-2 rounded border ${step >= 6 ? 'border-emerald-800 bg-emerald-950/40 text-emerald-300' : 'border-zinc-900 text-zinc-600'}`}>
              <div className="text-[9px] uppercase text-zinc-500">Step 6</div>
              <div>Action Approved</div>
            </div>
          </div>

          {step === 6 && lastTxHash && (
            <div className="mt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Simulated callback completed: {lastTxHash.substring(0, 18)}... (Validated by RiskGuard)</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
