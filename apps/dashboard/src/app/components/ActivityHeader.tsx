'use client';

import React, { memo, useState } from 'react';
import { Input, Button, cn } from '@enterprise/ui';
import { useMeasureAction } from '@enterprise/hooks';
import { RotateCw } from 'lucide-react';
interface ActivityHeaderProps {
  total: number;
  from: number;
  to: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onRefresh?: () => Promise<void>;
}

interface StatGroupProps {
  label: string;
  value: string | number;
  subValue?: string;
  isPrimary?: boolean;
}

const StatGroup = memo(({ label, value, subValue, isPrimary }: StatGroupProps) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
      {label}
    </span>
    <div
      className={cn(
        'flex items-baseline gap-1.5 text-2xl font-black',
        isPrimary ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)]',
      )}
    >
      <span>{value}</span>
      {subValue && (
        <span className="text-xs font-bold uppercase text-muted-foreground/30">{subValue}</span>
      )}
    </div>
  </div>
));

StatGroup.displayName = 'StatGroup';

export const ActivityHeader = memo(
  ({ total, from, to, searchTerm, onSearchChange, onRefresh }: ActivityHeaderProps) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const measureRefresh = useMeasureAction('ActivityRefresh');

    const handleRefresh = measureRefresh(async () => {
      if (!onRefresh) return;
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setTimeout(() => setIsRefreshing(false), 500);
      }
    });

    return (
      <header className="space-y-8 mb-10">
        <div className="flex justify-between items-center">
          <h2 className="text-5xl font-bold">Recent Activity</h2>

          <Button
            size="sm"
            variant="ghost"
            disabled={isRefreshing}
            onClick={handleRefresh}
            className="gap-2"
          >
            <RotateCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
            Refresh Logs
          </Button>
        </div>

        <div className="flex justify-between items-end gap-10">
          <div className="flex gap-12">
            <StatGroup label="Total" value={total.toLocaleString()} />
            <StatGroup label="Showing" value={from} subValue={`to ${to}`} isPrimary />
          </div>

          <Input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search logs..."
            className="w-80 h-12 rounded-xl"
          />
        </div>
      </header>
    );
  },
);

ActivityHeader.displayName = 'ActivityHeader';
