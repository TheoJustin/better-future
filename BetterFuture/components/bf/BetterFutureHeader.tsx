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
    <header
      className="border-b border-border sticky top-0 z-50 animate-slide-in-down"
      style={{ backgroundColor: '#4DA6FF' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
        <div className="flex items-center gap-3 shrink-0">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out"
            style={{ backgroundColor: '#FFFFFF' }}
          >
            <Earth className="w-6 h-6" style={{ color: '#4DA6FF' }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#FFFFFF' }}>
              BetterFuture
            </h1>
            <p className="text-xs" style={{ color: '#FFFFFF', opacity: 0.9 }}>
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
                className="px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer rounded-md"
                style={{
                  color:
                    activeTab === tab.id ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                  backgroundColor:
                    activeTab === tab.id
                      ? 'rgba(255,255,255,0.2)'
                      : 'transparent',
                }}
              >
                {tab.label}
              </div>
            ))}
          </div>
        )}

        {/* Right side actions */}
        <div className="flex items-center gap-4 shrink-0">
          {schedulerRunning && (
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border"
              style={{ backgroundColor: '#D4F4DD', borderColor: '#4CAF50' }}
            >
              <RefreshCw
                className="w-4 h-4 animate-spin"
                style={{ color: '#4CAF50' }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: '#4CAF50' }}
              >
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
