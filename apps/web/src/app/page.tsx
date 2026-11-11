import React from 'react';
import {
  MOCK_METRICS,
  MOCK_STRATEGIES,
  MOCK_EVENTS,
} from '../lib/mockData';
import { StatCard } from '../components/StatCard';
import { StrategyPerformanceChart } from '../components/StrategyPerformanceChart';
import { EventActivityList } from '../components/EventActivityList';
import { MockDataBadge } from '../components/MockDataBadge';
import { SimulateEventTrigger } from '../components/SimulateEventTrigger';
import { Cpu, Zap, Activity, ShieldCheck, ArrowUpRight, Github } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const activeStrategies = MOCK_STRATEGIES.filter((s) => s.status === 'ACTIVE');

  return (
    <div className="space-y-8">
      {/* Mock Data Banner */}
      <MockDataBadge />

      {/* Hero Welcome / Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
              Reactive Omni Buildathon 2026
            </span>
            <span className="text-[10px] font-mono text-zinc-500">
              AI proposes. Validation checks. Smart contracts enforce.
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-100">
            System Operations
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Autonomous Intelligence. Continuous Evolution. Powered by Reactive Network.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/kaverimeshram/Evolvex"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1.5"
          >
            <Github className="w-3.5 h-3.5 text-zinc-400" />
            <span>GitHub</span>
          </a>
          <Link
            href="/experiments"
            className="px-3.5 py-1.5 rounded bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-xs font-medium text-zinc-200 transition-colors flex items-center gap-1.5"
          >
            <span>Experiments</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </Link>
          <Link
            href="/evolution"
            className="px-3.5 py-1.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>Lineage Graph</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-700" />
          </Link>
        </div>
      </div>

      {/* Interactive Reactive Event Simulator */}
      <SimulateEventTrigger />

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="System Fitness Index"
          value={`${MOCK_METRICS.systemFitness}`}
          subValue="Sharpe-weighted composite"
          icon={Cpu}
          trend="+10.8%"
          trendPositive={true}
        />
        <StatCard
          label="Active Experiments"
          value={MOCK_METRICS.activeExperiments}
          subValue="2 running, 1 queued"
          icon={Activity}
          trend="Gen 2 Active"
          trendPositive={true}
        />
        <StatCard
          label="Reactive Events Processed"
          value={MOCK_METRICS.totalReactiveEvents}
          subValue="Kopli & Sepolia cross-chain"
          icon={Zap}
          trend="Sub-second callback"
          trendPositive={true}
        />
        <StatCard
          label="Est. Gas Efficiency Delta"
          value="482k Gwei"
          subValue="Saved via dynamic thresholds"
          icon={ShieldCheck}
          trend="-22.4% Gas"
          trendPositive={true}
        />
      </div>

      {/* Performance Chart & Active Strategies */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <StrategyPerformanceChart />
        </div>

        {/* Active Strategy Roster */}
        <div className="p-5 rounded border border-zinc-800 bg-[#0a0a0a] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <h3 className="text-xs uppercase tracking-wider font-mono text-zinc-300 font-semibold">
                Live Active Strategies
              </h3>
              <span className="text-[10px] font-mono text-zinc-500">
                {activeStrategies.length} Deployed
              </span>
            </div>

            <div className="space-y-3">
              {activeStrategies.map((strategy) => (
                <div
                  key={strategy.id}
                  className="p-3 rounded border border-zinc-900 bg-zinc-950 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-zinc-200">
                      {strategy.name}
                    </span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                      v{strategy.version}
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-500 line-clamp-2">
                    {strategy.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1">
                    <span>Fitness: {strategy.fitnessScore}</span>
                    <span>Risk: {strategy.riskScore} / 10</span>
                    <span>Gen {strategy.generation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-900 mt-4">
            <Link
              href="/evolution"
              className="text-xs text-zinc-400 hover:text-zinc-200 font-mono flex items-center justify-between"
            >
              <span>View full evolutionary genome</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Monitored Event Stream */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-wider font-mono text-zinc-400 font-semibold">
            Recent On-Chain Activity
          </h3>
          <Link
            href="/activity"
            className="text-xs font-mono text-zinc-500 hover:text-zinc-300"
          >
            View all &rarr;
          </Link>
        </div>
        <EventActivityList events={MOCK_EVENTS} maxItems={4} />
      </div>
    </div>
  );
}
