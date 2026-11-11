import React from 'react';
import type { ExperimentStatus } from '@evolvex/shared';

export function ExperimentStatusBadge({ status }: { status: ExperimentStatus }) {
  const configs: Record<ExperimentStatus, { label: string; textClass: string; borderClass: string; bgClass: string }> = {
    RUNNING: {
      label: 'RUNNING',
      textClass: 'text-emerald-400',
      borderClass: 'border-emerald-900',
      bgClass: 'bg-emerald-950/40',
    },
    COMPLETED: {
      label: 'COMPLETED',
      textClass: 'text-zinc-300',
      borderClass: 'border-zinc-700',
      bgClass: 'bg-zinc-900',
    },
    SCHEDULED: {
      label: 'SCHEDULED',
      textClass: 'text-amber-400',
      borderClass: 'border-amber-900',
      bgClass: 'bg-amber-950/40',
    },
    HALTED: {
      label: 'HALTED',
      textClass: 'text-rose-400',
      borderClass: 'border-rose-900',
      bgClass: 'bg-rose-950/40',
    },
    INCONCLUSIVE: {
      label: 'INCONCLUSIVE',
      textClass: 'text-zinc-500',
      borderClass: 'border-zinc-800',
      bgClass: 'bg-zinc-950',
    },
  };

  const c = configs[status] || configs.SCHEDULED;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${c.bgClass} ${c.borderClass} ${c.textClass}`}
    >
      {c.label}
    </span>
  );
}

