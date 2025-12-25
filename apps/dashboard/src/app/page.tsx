'use client';

import { Header } from './features/Header';
import { DashboardHero } from './features/DashboardHero';
import { StatsGrid } from './features/StatsGrid';
import { Activity } from './features/Activity';
import { QuickActions } from './features/QuickActions';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-surface text-text transition-colors duration-500">
      <Header />
      <main className="max-w-6xl mx-auto p-8 lg:p-12 space-y-12">
        <DashboardHero />
        <StatsGrid />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-2 transition-colors duration-300">
          <Activity />
          <QuickActions />
        </div>
      </main>
    </div>
  );
}
