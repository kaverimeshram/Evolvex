import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon?: LucideIcon;
  trend?: string;
  trendPositive?: boolean;
}

export function StatCard({
  label,
  value,
  subValue,
  icon: Icon,
  trend,
  trendPositive,
}: StatCardProps) {
  return (
    <div className="p-5 rounded border border-zinc-800 bg-[#0a0a0a] flex flex-col justify-between">
      <div className="flex items-center justify-between text-zinc-400 mb-3">
        <span className="text-xs uppercase tracking-wider font-mono text-zinc-500">
          {label}
        </span>
        {Icon && <Icon className="w-4 h-4 text-zinc-500" />}
      </div>

      <div>
        <div className="text-2xl font-bold font-mono tracking-tight text-zinc-100">
          {value}
        </div>
        {(subValue || trend) && (
          <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
            {trend && (
              <span
                className={`font-mono font-medium ${
                  trendPositive ? 'text-emerald-400' : 'text-zinc-400'
                }`}
              >
                {trend}
              </span>
            )}
            {subValue && <span>{subValue}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

