import React from 'react';
import type { EvolutionNode, Strategy } from '@evolvex/shared';
import { GitCommit, ArrowRight, Dna } from 'lucide-react';

interface EvolutionTreeProps {
  nodes: EvolutionNode[];
  strategies: Strategy[];
}

export function EvolutionTree({ nodes, strategies }: EvolutionTreeProps) {
  // Group nodes by generation
  const generations = nodes.reduce((acc, node) => {
    if (!acc[node.generation]) {
      acc[node.generation] = [];
    }
    acc[node.generation].push(node);
    return acc;
  }, {} as Record<number, EvolutionNode[]>);

  const genKeys = Object.keys(generations)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="p-5 rounded border border-zinc-800 bg-[#0a0a0a] space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div>
          <h3 className="text-xs uppercase tracking-wider font-mono text-zinc-300 font-semibold flex items-center gap-2">
            <Dna className="w-4 h-4 text-zinc-400" />
            Strategy Lineage & Evolutionary Tree
          </h3>
          <p className="text-[11px] text-zinc-500">
            Hierarchical generations with recorded genome parameter mutations
          </p>
        </div>
        <div className="text-xs font-mono text-zinc-500">
          Total Generations: {genKeys.length}
        </div>
      </div>

      <div className="space-y-6">
        {genKeys.map((gen) => {
          const genNodes = generations[gen] || [];
          return (
            <div key={gen} className="relative">
              <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-700" />
                Generation {gen} {gen === 0 ? '(Genesis Pool)' : `(Iterative Mutations)`}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {genNodes.map((node) => {
                  const strat = strategies.find((s) => s.id === node.strategyId);

                  return (
                    <div
                      key={node.id}
                      className={`p-4 rounded border text-xs space-y-2.5 transition-colors ${
                        node.status === 'ACTIVE'
                          ? 'border-zinc-700 bg-zinc-950'
                          : 'border-zinc-900 bg-[#070707] opacity-80'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GitCommit className="w-3.5 h-3.5 text-zinc-400" />
                          <span className="font-semibold text-zinc-200">
                            {strat?.name || node.strategyId}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-zinc-800 bg-zinc-900 text-zinc-300">
                          Fitness: {node.fitnessScore.toFixed(1)}
                        </span>
                      </div>

                      <div className="text-zinc-500 text-[11px]">
                        Mutation Type:{' '}
                        <span className="font-mono text-zinc-400">
                          {node.mutationType}
                        </span>
                      </div>

                      {/* Changes / Parameter diffs */}
                      <div className="p-2.5 rounded bg-[#050505] border border-zinc-900 font-mono text-[11px] space-y-1">
                        <div className="text-[10px] uppercase text-zinc-500 tracking-wider">
                          Parameter Delta:
                        </div>
                        {Object.entries(node.changes).map(([key, change]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between text-zinc-400"
                          >
                            <span className="text-zinc-500">{key}:</span>
                            <span className="flex items-center gap-1.5 text-zinc-300">
                              <span className="text-zinc-600 line-through">
                                {String(change.from)}
                              </span>
                              <ArrowRight className="w-2.5 h-2.5 text-zinc-600" />
                              <span className="text-zinc-100 font-semibold">
                                {String(change.to)}
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-600 pt-1">
                        <span>Node: {node.id}</span>
                        <span>Parent: {node.parentNodeId || 'Root'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

