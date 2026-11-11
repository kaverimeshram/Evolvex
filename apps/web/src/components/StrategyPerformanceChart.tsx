'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { MOCK_PERFORMANCE_HISTORY } from '../lib/mockData';

export function StrategyPerformanceChart() {
  return (
    <div className="p-5 rounded border border-zinc-800 bg-[#0a0a0a]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs uppercase tracking-wider font-mono text-zinc-400 font-semibold">
            Strategy Fitness Progression
          </h3>
          <p className="text-[11px] text-zinc-500">
            Generational improvement vs Static Baseline (Sharpe-weighted fitness index)
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-zinc-200">
            <span className="w-2.5 h-0.5 bg-zinc-100" />
            Evolved Strategy
          </span>
          <span className="flex items-center gap-1.5 text-zinc-500">
            <span className="w-2.5 h-0.5 bg-zinc-600" />
            Genesis Baseline
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={MOCK_PERFORMANCE_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="#181818" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="timestamp"
              stroke="#52525b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#27272a' }}
            />
            <YAxis
              stroke="#52525b"
              fontSize={11}
              domain={[75, 95]}
              tickLine={false}
              axisLine={{ stroke: '#27272a' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#050505',
                border: '1px solid #27272a',
                borderRadius: '4px',
                fontSize: '11px',
                fontFamily: 'monospace',
                color: '#ededed',
              }}
            />
            <Legend wrapperStyle={{ display: 'none' }} />
            <Line
              type="monotone"
              dataKey="evolvedFitness"
              name="Evolved Strategy"
              stroke="#ffffff"
              strokeWidth={2}
              dot={{ stroke: '#ffffff', strokeWidth: 1, r: 3, fill: '#050505' }}
              activeDot={{ r: 5, fill: '#ffffff' }}
            />
            <Line
              type="monotone"
              dataKey="genesisFitness"
              name="Genesis Baseline"
              stroke="#52525b"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

