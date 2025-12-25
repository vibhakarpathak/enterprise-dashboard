'use client';

import React, { useState } from 'react';
import { Input, Button, cn } from '@enterprise/ui';
import { RotateCw } from 'lucide-react';

interface ActivityHeaderProps {
  total: number;
  from: number;
  to: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onRefresh?: () => void | Promise<void>;
}

export function ActivityHeader({
  total,
  from,
  to,
  searchTerm,
  onSearchChange,
  onRefresh,
}: ActivityHeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (!onRefresh) return;

    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      // Ensure the spin is visible for at least 800ms for better UX
      setTimeout(() => setIsRefreshing(false), 800);
    }
  };

  const displayFrom = total === 0 ? 0 : from;
  const displayTo = total === 0 ? 0 : to;

  return (
    <header className={cn('space-y-6 md:space-y-8 mb-10')}>
      <div
        className={cn(
          'flex flex-col sm:flex-row sm:items-center justify-between gap-4',
        )}
      >
        <h2
          className={cn(
            'text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-text)]',
          )}
        >
          Recent Activity
        </h2>

        <Button
          variant="ghost"
          size="sm"
          disabled={isRefreshing}
          onClick={handleRefresh}
          className={cn(
            'w-fit rounded-xl gap-2 font-semibold border border-[var(--color-border)]',
            'hover:bg-[var(--color-text)]/[0.05] transition-all active:scale-95',
            isRefreshing && 'opacity-70',
          )}
        >
          <RotateCw
            className={cn(
              'w-4 h-4 transition-transform duration-700',
              isRefreshing && 'animate-spin',
            )}
          />
          <span className="hidden sm:inline">
            {isRefreshing ? 'Refreshing...' : 'Refresh Logs'}
          </span>
        </Button>
      </div>

      <div
        className={cn(
          'flex flex-col gap-8 lg:flex-row lg:justify-between lg:items-end',
        )}
      >
        <div
          className={cn(
            'flex items-center justify-between sm:justify-start gap-8 md:gap-12',
          )}
        >
          {/* Total Group */}
          <div className={cn('flex flex-col gap-1')}>
            <span
              className={cn(
                'text-[10px] md:text-xs text-muted-foreground/60 font-bold uppercase tracking-widest',
              )}
            >
              Total
            </span>
            <span
              className={cn(
                'text-xl md:text-2xl font-black text-[var(--color-text)]',
              )}
            >
              {total.toLocaleString()}
            </span>
          </div>

          {/* Thin Theme-Aware Divider */}
          <div
            className={cn(
              'h-8 w-px shrink-0 self-center bg-[var(--color-text)] opacity-100',
            )}
          />

          {/* Showing Group */}
          <div className={cn('flex flex-col gap-1')}>
            <span
              className={cn(
                'text-[10px] md:text-xs text-muted-foreground/60 font-bold uppercase tracking-widest',
              )}
            >
              Showing
            </span>
            <div
              className={cn(
                'flex items-baseline gap-1.5 whitespace-nowrap text-xl md:text-2xl font-black text-[var(--color-primary)]',
              )}
            >
              <span>{displayFrom}</span>
              <span
                className={cn(
                  'text-[10px] md:text-xs font-bold text-muted-foreground/30 uppercase tracking-tighter',
                )}
              >
                to
              </span>
              <span>{displayTo}</span>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className={cn('relative w-full lg:w-80')}>
          <Input
            placeholder="Search logs..."
            className={cn(
              'w-full bg-[var(--color-surface)] h-12 rounded-xl border-[var(--color-border)]',
              'focus:ring-2 focus:ring-[var(--color-primary)]/20',
            )}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}
