'use client';

import React from 'react';
import { cn } from '@enterprise/ui';

export function DashboardHero() {
  return (
    <header className="space-y-6 pt-8">
      <div className="flex items-center gap-3">
        <div className="relative flex h-2 w-2">
          <span
            className={cn(
              'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
              'bg-emerald-400',
            )}
          />
          <span
            className={cn(
              'relative inline-flex rounded-full h-2 w-2',
              'bg-emerald-500',
            )}
          />
        </div>
        <span
          className={cn(
            'text-xs font-bold uppercase tracking-[0.2em]',
            'text-[var(--color-primary)]',
          )}
        >
          Infrastructure Online
        </span>
      </div>

      <h1
        className={cn(
          'text-5xl lg:text-7xl font-black tracking-tight leading-[0.9]',
          'text-[var(--color-text)]',
        )}
      >
        Hello, Vibhakar. <br />
        <span
          className={cn(
            'bg-clip-text text-transparent opacity-90',
            'bg-gradient-to-r from-[var(--color-primary)] to-blue-500',
          )}
        >
          Overview & Insights.
        </span>
      </h1>

      <div
        className={cn(
          'max-w-2xl text-lg leading-snug',
          'text-muted-foreground/60',
        )}
      >
        <p>
          System health is at{' '}
          <span className={cn('font-bold', 'text-[var(--color-text)]')}>
            99.9%
          </span>
          . There are{' '}
          <span
            className={cn(
              'font-semibold underline decoration-2 underline-offset-4',
              'text-[var(--color-text)] decoration-[var(--color-primary)]',
            )}
          >
            4 active deployments
          </span>{' '}
          currently routing traffic across your nodes.
        </p>
      </div>

      <div
        className={cn(
          'h-px w-full',
          'bg-gradient-to-r from-[var(--color-border)] via-[var(--color-border)] to-transparent',
        )}
      />
    </header>
  );
}
