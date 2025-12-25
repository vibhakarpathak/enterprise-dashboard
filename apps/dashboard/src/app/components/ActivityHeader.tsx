import React from 'react';
import { Input, cn } from '@enterprise/ui';

interface ActivityHeaderProps {
  total: number;
  from: number;
  to: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function ActivityHeader({
  total,
  from,
  to,
  searchTerm,
  onSearchChange,
}: ActivityHeaderProps) {
  return (
    <>
      <h2
        className={cn(
          'text-5xl font-bold tracking-tight mb-8',
          'text-[var(--color-text)]',
        )}
      >
        Recent Activity
      </h2>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-6">
        <div className="flex items-center gap-8">
          {/* Total Activities */}
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground/60 font-medium whitespace-nowrap uppercase tracking-tight">
              Total activities:
            </span>
            <span className="text-2xl font-bold text-[var(--color-text)] whitespace-nowrap">
              {total.toLocaleString()}
            </span>
          </div>

          {/* Divider */}
          <div className="h-10 w-px bg-[var(--color-border)] opacity-30 shrink-0" />

          {/* Showing Range - Fixed for single line */}
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground/60 font-medium whitespace-nowrap uppercase tracking-tight">
              Showing
            </span>
            <div className="text-2xl font-bold text-[var(--color-primary)] whitespace-nowrap flex items-baseline gap-1.5">
              <span>{from.toLocaleString()}</span>
              <span className="text-muted-foreground/30 text-base font-medium uppercase tracking-widest">
                to
              </span>
              <span>{to.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Input
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
