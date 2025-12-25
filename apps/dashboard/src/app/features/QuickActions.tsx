'use client';

import React, { useState, useEffect } from 'react';
import { QuickAction } from '../components/QuickAction';

interface QuickActionData {
  label: string;
  color: string;
}

export function QuickActions() {
  const [actions, setActions] = useState<QuickActionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/quick-actions')
      .then((res) => res.json())
      .then((data: QuickActionData[]) => setActions(data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="lg:col-span-4 space-y-4">
      <h2 className="text-2xl font-bold px-2 text-[var(--color-text)]">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 gap-3">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <QuickAction.Skeleton key={i} />
            ))
          : actions.map((action) => (
              <QuickAction key={action.label} {...action} />
            ))}
      </div>
    </section>
  );
}
