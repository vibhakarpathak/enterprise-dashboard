'use client';

import React from 'react';
import { cn } from '@enterprise/ui';

interface ActivityItemProps {
  title: string;
  description: string;
  status: 'Success' | 'Failed' | 'Pending';
}

export function ActivityItem({
  title,
  description,
  status,
}: ActivityItemProps) {
  const statusConfig = {
    Success: {
      dot: 'bg-emerald-500 shadow-emerald-500/40',
      textColor: 'text-emerald-500',
      text: 'SUCCESS',
    },
    Failed: {
      dot: 'bg-rose-500 shadow-rose-500/40',
      textColor: 'text-rose-500',
      text: 'FAILURE',
    },
    Pending: {
      dot: 'bg-amber-500 shadow-amber-500/40',
      textColor: 'text-amber-500',
      text: 'PENDING',
    },
  };

  const current = statusConfig[status];

  return (
    <div className="flex items-center gap-6 group cursor-default w-full py-2">
      <div
        className={cn(
          'shrink-0 w-2.5 h-2.5 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-125',
          current.dot,
        )}
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
          {title}
        </p>
        <p className="text-sm text-muted-foreground/50">{description}</p>
      </div>
      <span
        className={cn(
          'shrink-0 text-[10px] font-bold tracking-widest uppercase',
          current.textColor,
        )}
      >
        {current.text}
      </span>
    </div>
  );
}

ActivityItem.Skeleton = function ActivityItemSkeleton() {
  return (
    <div className="flex items-center gap-6 w-full py-2 group">
      <div className="shrink-0 w-2.5 h-2.5 rounded-full bg-[var(--color-text)] opacity-20 animate-pulse" />

      <div className="flex-1 space-y-3">
        <div
          className="h-4 bg-[var(--color-text)] opacity-[0.15] rounded-md w-1/3 animate-pulse"
          style={{ animationDelay: '0.1s' }}
        />
        <div
          className="h-3 bg-[var(--color-text)] opacity-[0.08] rounded-md w-1/2 animate-pulse"
          style={{ animationDelay: '0.2s' }}
        />
      </div>

      <div
        className="h-4 bg-[var(--color-text)] opacity-[0.12] rounded-full w-16 animate-pulse"
        style={{ animationDelay: '0.3s' }}
      />
    </div>
  );
};
