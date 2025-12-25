'use client';

import React from 'react';
import { cn } from '@enterprise/ui';
interface QuickActionProps {
  label: string;
  color: string;
}
export function QuickAction({ label, color }: QuickActionProps) {
  return (
    <button
      type="button"
      className={cn(
        'w-full flex items-center justify-between p-5 rounded-2xl transition-all shadow-sm group',
        'bg-[var(--color-surface)] border border-[var(--color-border)]',
        'hover:scale-[1.02] hover:shadow-md active:scale-[0.98]',
      )}
      aria-label={`Quick action: ${label}`}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            'w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-shadow',
            'group-hover:shadow-[0_0_15px_currentColor]',
            color,
          )}
        />
        <span className="font-bold text-[var(--color-text)] opacity-80 group-hover:opacity-100 transition-opacity">
          {label}
        </span>
      </div>
      <span className="text-[var(--color-text)] opacity-20 group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all">
        →
      </span>
    </button>
  );
}

QuickAction.Skeleton = function QuickActionSkeleton() {
  return (
    <div
      className={cn(
        'w-full flex items-center justify-between p-5 rounded-2xl border',
        'bg-[var(--color-text)]/[0.04] border-[var(--color-border)]/40',
      )}
    >
      <div className="flex items-center gap-4 w-full">
        <div className="shrink-0 w-3 h-3 rounded-full bg-[var(--color-text)] opacity-20 animate-pulse" />

        <div
          className="h-4 bg-[var(--color-text)] opacity-[0.15] rounded-md w-1/2 animate-pulse"
          style={{ animationDelay: '0.1s' }}
        />
      </div>

      <div
        className="h-4 w-4 bg-[var(--color-text)] opacity-[0.12] rounded animate-pulse"
        style={{ animationDelay: '0.2s' }}
      />
    </div>
  );
};
