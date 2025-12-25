'use client';

import React, { useState } from 'react';
import { cn, Button } from '@enterprise/ui';
import { Rocket, Loader2 } from 'lucide-react';

export function DashboardHero() {
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunch = () => {
    setIsLaunching(true);

    // Simulating a service launch API call
    setTimeout(() => {
      setIsLaunching(false);
      alert('New service provisioning started successfully!');
    }, 2000);
  };

  return (
    <header className={cn('space-y-6 pt-8')}>
      <div className={cn('flex items-center gap-3')}>
        <div className={cn('relative flex h-2 w-2')}>
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
          'flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-5xl',
        )}
      >
        <div
          className={cn(
            'max-w-xl text-lg leading-snug text-muted-foreground/60',
          )}
        >
          <p>
            System health is at{' '}
            <span className={cn('font-bold text-[var(--color-text)]')}>
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
            currently routing traffic.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          disabled={isLaunching}
          onClick={handleLaunch}
          className={cn(
            'rounded-2xl font-bold px-10 h-14 transition-all flex items-center gap-3',
            'shadow-lg shadow-[var(--color-primary)]/20 active:scale-95',
            isLaunching && 'opacity-80 cursor-not-allowed',
          )}
        >
          {isLaunching ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Launching...
            </>
          ) : (
            <>
              <Rocket className="w-5 h-5" />
              Launch New Service
            </>
          )}
        </Button>
      </div>

      <div
        className={cn(
          'h-px w-full',
          'bg-gradient-to-r from-[var(--color-text)]/15 via-[var(--color-text)]/5 to-transparent',
        )}
      />
    </header>
  );
}
