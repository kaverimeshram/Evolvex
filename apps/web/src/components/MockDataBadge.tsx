import React from 'react';
import { AlertCircle } from 'lucide-react';

interface MockDataBadgeProps {
  className?: string;
  compact?: boolean;
}

export function MockDataBadge({ className = '', compact = false }: MockDataBadgeProps) {
  if (compact) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
        BENCHMARK MOCK
      </span>
    );
  }

  return (
    <div className={`flex items-center justify-between gap-3 px-3 py-2 rounded border border-zinc-800 bg-zinc-950 text-xs text-zinc-400 ${className}`}>
      <div className="flex items-center gap-2">
        <AlertCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
        <span>
          <strong className="text-zinc-200 font-medium">Simulation Mode:</strong> Displaying benchmark mock data layer. Smart contract event subscriptions are configured for Reactive Kopli testnet.
        </span>
      </div>
      <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider shrink-0">
        Deterministic Mock Data
      </span>
    </div>
  );
}

