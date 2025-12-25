'use client';

import React, { useState, useTransition, memo } from 'react';
import { cn, Button } from '@enterprise/ui';
import { useMeasureAction } from '@enterprise/hooks';
import { Rocket, Loader2 } from 'lucide-react';

/**
 * Render Control: Memoized Status Badge
 * Prevents re-renders of the status indicator when the parent's
 * loading state changes, as the badge itself is static.
 */
const StatusIndicator = memo(() => (
  <div className={cn('flex items-center gap-3')}>
    <div className={cn('relative flex h-2 w-2')}>
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
    </div>
    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
      Infrastructure Online
    </span>
  </div>
));

StatusIndicator.displayName = 'StatusIndicator';

export function DashboardHero() {
  const [isLaunching, setIsLaunching] = useState(false);

  // Concurrency: useTransition for non-blocking state updates
  const [isPending, startTransition] = useTransition();

  // Measurement: Web Vitals tracking for the launch action
  const measureLaunch = useMeasureAction('ServiceLaunch');

  const handleLaunch = measureLaunch(() => {
    // Wrap the state update in a transition to keep the UI thread fluid
    startTransition(() => {
      setIsLaunching(true);
    });

    // Simulating API call
    setTimeout(() => {
      startTransition(() => {
        setIsLaunching(false);
      });
      // In a real app, replace alert with a non-blocking toast
      console.info('Service Provisioned');
    }, 2000);
  });

  // Combine local state and transition state for the button UI
  const isLoading = isLaunching || isPending;

  return (
    <header className={cn('space-y-6 pt-8')}>
      <StatusIndicator />

      <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[0.9] text-[var(--color-text)]">
        Hello, Vibhakar. <br />
        <span className="bg-clip-text text-transparent opacity-90 bg-gradient-to-r from-[var(--color-primary)] to-blue-500">
          Overview & Insights.
        </span>
      </h1>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-5xl">
        <div className="max-w-xl text-lg leading-snug text-muted-foreground/60">
          <p>
            System health is at{' '}
            <span className="font-bold text-[var(--color-text)]">99.9%</span>.
            There are{' '}
            <span className="font-semibold underline decoration-2 underline-offset-4 text-[var(--color-text)] decoration-[var(--color-primary)]">
              4 active deployments
            </span>{' '}
            currently routing traffic.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          disabled={isLoading}
          onClick={handleLaunch}
          className={cn(
            'rounded-2xl font-bold px-10 h-14 transition-all flex items-center gap-3',
            'shadow-lg shadow-[var(--color-primary)]/20 active:scale-95',
            isLoading && 'opacity-80 cursor-not-allowed',
          )}
        >
          {isLoading ? (
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

      <div className="h-px w-full bg-gradient-to-r from-[var(--color-text)]/15 via-[var(--color-text)]/5 to-transparent" />
    </header>
  );
}
