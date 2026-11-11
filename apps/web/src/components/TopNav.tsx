'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Radio } from 'lucide-react';

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  '/': {
    title: 'Autonomous Strategy Engine',
    subtitle: 'Continuous on-chain evaluation and evolutionary optimization',
  },
  '/experiments': {
    title: 'Strategy Experiments',
    subtitle: 'A/B trials, statistical significance, and mutation testing',
  },
  '/evolution': {
    title: 'Evolutionary Lineage Tree',
    subtitle: 'Generational hierarchy and parameter genome mutations',
  },
  '/activity': {
    title: 'On-Chain Reactive Activity',
    subtitle: 'Subscribed event detections, callbacks, and execution transactions',
  },
  '/settings': {
    title: 'System Configuration',
    subtitle: 'Contract parameters, Reactive endpoints, and risk constraints',
  },
};

export function TopNav() {
  const pathname = usePathname();
  const current = PAGE_TITLES[pathname] || {
    title: 'Dashboard',
    subtitle: 'Autonomous intelligence. Continuous evolution.',
  };

  return (
    <header className="h-16 border-b border-zinc-800 bg-[#050505] px-8 flex items-center justify-between sticky top-0 z-20">
      <div>
        <h1 className="text-sm font-semibold text-zinc-100 tracking-tight">
          {current.title}
        </h1>
        <p className="text-xs text-zinc-500 hidden sm:block">
          {current.subtitle}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Status Pill */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300">
          <Radio className="w-3 h-3 text-emerald-400 animate-none" />
          <span>REACTIVE LOOP: ACTIVE</span>
        </div>

        {/* Safety Guard Indicator */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden md:inline">RISK GUARD: ENFORCED</span>
        </div>
      </div>
    </header>
  );
}

