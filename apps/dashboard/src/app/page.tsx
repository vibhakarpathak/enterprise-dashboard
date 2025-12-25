'use client';

import { useMemo } from 'react';
import { Header } from './features/Header';
import { WelcomeSection } from './features/WelcomeSection';
import { RevenueCard } from './features/RevenueCard';
import { SearchAndVirtualList } from './features/SearchAndVirtualList';
import { ActionCards } from './features/ActionCards';
import { StatsGrid } from './features/StatsGrid';
import { ActivityAndQuickActions } from './features/ActivityAndQuickActions';

const TOTAL_ITEMS = 10000;

export default function DashboardPage() {
  const allItems = useMemo(() => {
    return Array.from({ length: TOTAL_ITEMS }, (_, i) => `Item ${i + 1}`);
  }, []);

  return (
    <div className="min-h-screen bg-surface text-text transition-colors duration-500">
      <Header />
      <main className="max-w-6xl mx-auto p-8 lg:p-12 space-y-12">
        <WelcomeSection />
        <RevenueCard />
        <SearchAndVirtualList items={allItems} />
        <ActionCards />
        <StatsGrid />
        <ActivityAndQuickActions />
      </main>
    </div>
  );
}
