'use client';

import React, { useState } from 'react';
import { MOCK_EVENTS } from '../../lib/mockData';
import { EventActivityList } from '../../components/EventActivityList';
import { MockDataBadge } from '../../components/MockDataBadge';
import { Activity, Radio, Filter, RefreshCw } from 'lucide-react';

export default function ActivityPage() {
  const [selectedChain, setSelectedChain] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const filteredEvents = MOCK_EVENTS.filter((e) => {
    if (selectedChain === 'REACTIVE' && e.chainId !== 5318008) return false;
    if (selectedChain === 'SEPOLIA' && e.chainId !== 11155111) return false;
    if (selectedStatus !== 'ALL' && e.status !== selectedStatus) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      <MockDataBadge />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-zinc-300" />
            On-Chain Event Activity
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Real-time feed of detected subscribed events, Reactive callbacks, and destination contract executions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {}}
            className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
            <span>Poll Stream</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded border border-zinc-800 bg-[#0a0a0a] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono">
          <Filter className="w-3.5 h-3.5 text-zinc-500" />
          <span className="text-zinc-500 uppercase">Network:</span>
          {['ALL', 'REACTIVE', 'SEPOLIA'].map((chain) => (
            <button
              key={chain}
              onClick={() => setSelectedChain(chain)}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                selectedChain === chain
                  ? 'bg-zinc-100 text-zinc-900 font-semibold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {chain === 'ALL' ? 'All Networks' : chain === 'REACTIVE' ? 'Reactive Kopli (5318008)' : 'Sepolia (11155111)'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-zinc-500 uppercase">Status:</span>
          {['ALL', 'PROCESSED', 'ANALYZED', 'PENDING'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                selectedStatus === status
                  ? 'bg-zinc-100 text-zinc-900 font-semibold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Stream List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span className="flex items-center gap-2">
            <Radio className="w-3 h-3 text-emerald-400 animate-none" />
            Displaying {filteredEvents.length} events
          </span>
          <span className="text-zinc-500">
            Source: Reactive Network event subscriber daemon
          </span>
        </div>

        <EventActivityList events={filteredEvents} />
      </div>
    </div>
  );
}

