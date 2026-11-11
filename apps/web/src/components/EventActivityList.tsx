import React from 'react';
import type { BlockchainEvent } from '@evolvex/shared';
import { ExternalLink } from 'lucide-react';

interface EventActivityListProps {
  events: BlockchainEvent[];
  maxItems?: number;
}

export function EventActivityList({ events, maxItems }: EventActivityListProps) {
  const displayEvents = maxItems ? events.slice(0, maxItems) : events;

  return (
    <div className="border border-zinc-800 rounded bg-[#0a0a0a] overflow-hidden">
      <div className="px-5 py-3 border-b border-zinc-800 flex items-center justify-between text-xs font-mono">
        <span className="text-zinc-300 uppercase tracking-wider font-semibold">
          Monitored Event Stream
        </span>
        <span className="text-zinc-500">
          Reactive Network Kopli & Sepolia
        </span>
      </div>

      <div className="divide-y divide-zinc-900">
        {displayEvents.map((event) => {
          const isReactive = event.chainId === 5318008;
          const chainLabel = isReactive ? 'Reactive Kopli' : 'Sepolia';

          return (
            <div
              key={event.id}
              className="p-4 hover:bg-zinc-900/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${
                      isReactive
                        ? 'border-zinc-700 bg-zinc-900 text-zinc-300'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-500'
                    }`}
                  >
                    {chainLabel}
                  </span>
                  <span className="font-mono text-zinc-200 font-medium">
                    {event.eventSignature.split('(')[0]}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-600">
                    Block #{event.blockNumber}
                  </span>
                </div>

                <div className="text-zinc-500 font-mono text-[11px] truncate max-w-xl">
                  Contract: {event.contractAddress} • Payload: {JSON.stringify(event.payload)}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                    event.status === 'PROCESSED'
                      ? 'text-zinc-300 bg-zinc-900 border border-zinc-800'
                      : event.status === 'ANALYZED'
                      ? 'text-zinc-400 bg-zinc-950 border border-zinc-900'
                      : 'text-zinc-500 bg-zinc-950 border border-zinc-900'
                  }`}
                >
                  {event.status}
                </span>

                <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                  {event.txHash.substring(0, 10)}...
                  <ExternalLink className="w-3 h-3 text-zinc-600" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

