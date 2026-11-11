import React from 'react';
import {
  MOCK_EXPERIMENTS,
  MOCK_STRATEGIES,
  MOCK_RESULTS,
} from '../../lib/mockData';
import { ExperimentStatusBadge } from '../../components/ExperimentStatusBadge';
import { MockDataBadge } from '../../components/MockDataBadge';
import { FlaskConical, CheckCircle2, TrendingUp, Clock, Scale } from 'lucide-react';

export default function ExperimentsPage() {
  return (
    <div className="space-y-8">
      <MockDataBadge />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-zinc-300" />
            Strategy Experiments
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Empirical A/B trials comparing candidate mutations against baseline benchmarks
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
          <span className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800">
            Total Experiments: {MOCK_EXPERIMENTS.length}
          </span>
        </div>
      </div>

      {/* Experiment Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded border border-zinc-800 bg-[#0a0a0a] space-y-1">
          <div className="text-[11px] font-mono uppercase text-zinc-500">
            Active Running Trial
          </div>
          <div className="text-lg font-bold text-zinc-100 font-mono">
            exp-002: Reactive Callback
          </div>
          <div className="text-xs text-zinc-400 flex items-center gap-1.5 pt-1">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sample 48 / 100 observations</span>
          </div>
        </div>

        <div className="p-4 rounded border border-zinc-800 bg-[#0a0a0a] space-y-1">
          <div className="text-[11px] font-mono uppercase text-zinc-500">
            Statistical Significance
          </div>
          <div className="text-lg font-bold text-emerald-400 font-mono">
            p = 0.0032 (&lt; 0.05)
          </div>
          <div className="text-xs text-zinc-400 flex items-center gap-1.5 pt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Statistically confirmed improvement</span>
          </div>
        </div>

        <div className="p-4 rounded border border-zinc-800 bg-[#0a0a0a] space-y-1">
          <div className="text-[11px] font-mono uppercase text-zinc-500">
            Avg Yield Improvement
          </div>
          <div className="text-lg font-bold text-zinc-100 font-mono">
            +14.8%
          </div>
          <div className="text-xs text-zinc-400 flex items-center gap-1.5 pt-1">
            <TrendingUp className="w-3.5 h-3.5 text-zinc-400" />
            <span>Validated candidate promoted to active</span>
          </div>
        </div>
      </div>

      {/* Experiments Table */}
      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-wider font-mono text-zinc-400 font-semibold">
          Controlled Experiment Registry
        </h3>

        <div className="space-y-4">
          {MOCK_EXPERIMENTS.map((exp) => {
            const candidate = MOCK_STRATEGIES.find((s) => s.id === exp.candidateStrategyId);
            const baseline = MOCK_STRATEGIES.find((s) => s.id === exp.baselineStrategyId);
            const result = MOCK_RESULTS[exp.id];

            return (
              <div
                key={exp.id}
                className="p-5 rounded border border-zinc-800 bg-[#0a0a0a] space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-900 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-zinc-500">{exp.id}</span>
                      <h4 className="text-sm font-semibold text-zinc-100">{exp.name}</h4>
                    </div>
                    <p className="text-xs text-zinc-400 italic">
                      &quot;{exp.hypothesis}&quot;
                    </p>
                  </div>

                  <ExperimentStatusBadge status={exp.status} />
                </div>

                {/* Candidate vs Baseline comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 rounded bg-zinc-950 border border-zinc-900 space-y-1">
                    <div className="text-[10px] text-zinc-500 uppercase">
                      Candidate Strategy
                    </div>
                    <div className="font-semibold text-zinc-200">
                      {candidate?.name || exp.candidateStrategyId}
                    </div>
                    <div className="text-zinc-500 text-[11px]">
                      Rebalance Threshold: {candidate?.parameters.rebalanceThresholdPct}% • Max Slippage: {candidate?.parameters.maxSlippageBps} bps
                    </div>
                  </div>

                  <div className="p-3 rounded bg-zinc-950 border border-zinc-900 space-y-1">
                    <div className="text-[10px] text-zinc-500 uppercase">
                      Baseline Strategy
                    </div>
                    <div className="font-semibold text-zinc-400">
                      {baseline?.name || exp.baselineStrategyId}
                    </div>
                    <div className="text-zinc-500 text-[11px]">
                      Rebalance Threshold: {baseline?.parameters.rebalanceThresholdPct}% • Max Slippage: {baseline?.parameters.maxSlippageBps} bps
                    </div>
                  </div>
                </div>

                {/* Result Section if Completed */}
                {result && (
                  <div className="p-3.5 rounded bg-[#050505] border border-zinc-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-zinc-300 font-semibold font-mono">
                      <span className="flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-zinc-400" />
                        Trial Outcome & Significance Analysis
                      </span>
                      <span className="text-emerald-400">
                        Winner: {candidate?.name}
                      </span>
                    </div>

                    <p className="text-zinc-400 text-xs leading-relaxed">
                      {result.summary}
                    </p>

                    <div className="flex flex-wrap gap-4 text-[11px] font-mono text-zinc-500 pt-1">
                      <span>Improvement: <strong className="text-zinc-200">+{result.metricImprovementPct}%</strong></span>
                      <span>p-Value: <strong className="text-zinc-200">{result.pValue}</strong></span>
                      <span>Gas Delta: <strong className="text-zinc-200">-{result.gasEfficiencyDelta}%</strong></span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

