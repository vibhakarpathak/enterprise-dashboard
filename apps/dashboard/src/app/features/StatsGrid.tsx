'use client';

import React, { useState, useEffect } from 'react';
import { StatCard } from '../components/StatCard';

interface StatData {
  title: string;
  value: string;
  sub: string;
  status?: 'green' | 'primary';
}

export function StatsGrid() {
  const [stats, setStats] = useState<StatData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      aria-busy={isLoading}
    >
      {isLoading ? (
        <>
          <span className="sr-only">Loading dashboard statistics...</span>
          {Array.from({ length: 3 }).map((_, i) => (
            <StatCard.Skeleton key={i} />
          ))}
        </>
      ) : (
        stats.map((stat, i) => <StatCard key={i} {...stat} />)
      )}
    </div>
  );
}
