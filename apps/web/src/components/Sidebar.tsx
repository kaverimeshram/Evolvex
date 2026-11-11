'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FlaskConical,
  GitBranch,
  Activity,
  Settings,
  Cpu,
  Layers,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/experiments', label: 'Experiments', icon: FlaskConical },
  { href: '/evolution', label: 'Evolution Tree', icon: GitBranch },
  { href: '/activity', label: 'On-Chain Events', icon: Activity },
  { href: '/settings', label: 'Configuration', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-zinc-800 bg-[#050505] flex flex-col justify-between min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-zinc-800 gap-3">
          <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-100">
            <Cpu className="w-4 h-4 text-zinc-200" />
          </div>
          <div>
            <div className="font-semibold text-sm tracking-wider text-zinc-100 font-mono">
              EVOLVEX
            </div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-tight">
              Reactive Intelligence
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-zinc-500">
            Core Engine
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-zinc-900 text-zinc-100 border border-zinc-700 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-zinc-100' : 'text-zinc-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-zinc-900">
            <a
              href="https://github.com/kaverimeshram/Evolvex"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-mono"
            >
              <span>GitHub Repo</span>
              <span>↗</span>
            </a>
          </div>
        </nav>
      </div>

      {/* Network Footer Status */}
      <div className="p-4 border-t border-zinc-800 bg-[#080808]">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-zinc-400 flex items-center gap-1.5 font-mono text-[11px]">
            <Layers className="w-3.5 h-3.5 text-zinc-400" />
            Reactive Kopli
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500" title="Connected to Kopli RPC" />
        </div>
        <div className="text-[11px] font-mono text-zinc-500 truncate">
          ID: 5318008 • Subscriptions OK
        </div>
      </div>
    </aside>
  );
}

