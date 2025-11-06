'use client';

import { Earth, RefreshCw } from 'lucide-react';
import { LoginButton, useActiveAccount, liskSepolia } from 'panna-sdk';

export interface Tab {
  id: string;
  label: string;
}

interface BetterFutureHeaderProps {
  schedulerRunning?: boolean;
  tabs?: Tab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export default function BetterFutureHeader({
  schedulerRunning = false,
  tabs = [],
  activeTab,
  onTabChange,
}: BetterFutureHeaderProps) {
  const activeAccount = useActiveAccount();
  const isConnected = !!activeAccount;

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50 animate-slide-in-down">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
        {/* Logo and branding */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 bg-linear-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out">
            <Earth className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">BetterFuture</h1>
            <p className="text-xs text-muted-foreground">
              Decentralized Impact Platform
            </p>
          </div>
        </div>

        {tabs.length > 0 && (
          <div className="flex items-center gap-1 grow justify-center">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => onTabChange?.(tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer rounded-md ${
                  activeTab === tab.id
                    ? 'text-foreground bg-muted/40'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
                }`}
              >
                {tab.label}
              </div>
            ))}
          </div>
        )}

        {/* Right side actions */}
        <div className="flex items-center gap-4 shrink-0">
          {schedulerRunning && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30">
              <RefreshCw className="w-4 h-4 text-green-600 dark:text-green-400 animate-spin" />
              <span className="text-xs font-medium text-green-600 dark:text-green-400">
                Sync Active
              </span>
            </div>
          )}
          <LoginButton chain={liskSepolia} />
        </div>
      </div>
    </header>
  );
}
