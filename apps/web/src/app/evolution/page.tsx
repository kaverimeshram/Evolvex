import React from 'react';
import {
  MOCK_EVOLUTION_NODES,
  MOCK_STRATEGIES,
} from '../../lib/mockData';
import { EvolutionTree } from '../../components/EvolutionTree';
import { MockDataBadge } from '../../components/MockDataBadge';
import { GitBranch, Dna, GitCommit } from 'lucide-react';

export default function EvolutionPage() {
  return (
    <div className="space-y-8">
      <MockDataBadge />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-zinc-300" />
            Strategy Lineage & Evolution Graph
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Tracking algorithmic generations, mutation pathways, and parametric fitness progression
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
          <span className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800">
            Total Lineage Nodes: {MOCK_EVOLUTION_NODES.length}
          </span>
        </div>
      </div>

      {/* Main Evolution Tree Visualization */}
      <EvolutionTree
        nodes={MOCK_EVOLUTION_NODES}
        strategies={MOCK_STRATEGIES}
      />

      {/* Detailed Strategy Parameter Genome Table */}
      <div className="p-5 rounded border border-zinc-800 bg-[#0a0a0a] space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h3 className="text-xs uppercase tracking-wider font-mono text-zinc-300 font-semibold flex items-center gap-2">
            <Dna className="w-4 h-4 text-zinc-400" />
            Strategy Genome Parameter Matrix
          </h3>
          <span className="text-[10px] font-mono text-zinc-500">
            Current Active Roster
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-[11px] font-mono text-zinc-500 uppercase">
                <th className="py-2.5 px-3">Strategy</th>
                <th className="py-2.5 px-3">Gen</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Rebalance %</th>
                <th className="py-2.5 px-3">Max Slippage</th>
                <th className="py-2.5 px-3">Gas Ceiling</th>
                <th className="py-2.5 px-3">Stop Loss</th>
                <th className="py-2.5 px-3">Fitness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 font-mono text-zinc-300">
              {MOCK_STRATEGIES.map((strat) => (
                <tr key={strat.id} className="hover:bg-zinc-900/30">
                  <td className="py-3 px-3 font-semibold text-zinc-100 flex items-center gap-2">
                    <GitCommit className="w-3.5 h-3.5 text-zinc-500" />
                    {strat.name}
                  </td>
                  <td className="py-3 px-3 text-zinc-400">{strat.generation}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] ${
                        strat.status === 'ACTIVE'
                          ? 'border border-zinc-700 bg-zinc-900 text-zinc-200'
                          : 'border border-zinc-900 bg-zinc-950 text-zinc-500'
                      }`}
                    >
                      {strat.status}
                    </span>
                  </td>
                  <td className="py-3 px-3">{strat.parameters.rebalanceThresholdPct}%</td>
                  <td className="py-3 px-3">{strat.parameters.maxSlippageBps} bps</td>
                  <td className="py-3 px-3">{strat.parameters.gasCeilingGwei} Gwei</td>
                  <td className="py-3 px-3">{strat.parameters.stopLossBps} bps</td>
                  <td className="py-3 px-3 font-bold text-zinc-100">{strat.fitnessScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

