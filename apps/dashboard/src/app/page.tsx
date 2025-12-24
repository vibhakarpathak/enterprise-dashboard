'use client';

import { useRef, useState } from 'react';

import { useGetRevenueWidgetQuery } from '@enterprise/api';
import {
  useDebounce,
  useStableCallback,
  useVirtualList,
} from '@enterprise/hooks';
import { Button, Card } from '@enterprise/ui';
import { ThemeToggle } from './components/ThemeToggle';

export default function Index() {
  const { data, isLoading } = useGetRevenueWidgetQuery();

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const ITEM_HEIGHT = 50;
  const CONTAINER_HEIGHT = 400;
  const TOTAL_ITEMS = 10000;

  const allItems = Array.from(
    { length: TOTAL_ITEMS },
    (_, i) => `Item ${i + 1}`,
  );

  const filteredItems = allItems.filter((item) =>
    item.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  const { startIndex, endIndex, offsetY } = useVirtualList({
    itemHeight: ITEM_HEIGHT,
    containerHeight: CONTAINER_HEIGHT,
    itemCount: filteredItems.length,
    scrollTop,
  });

  const handleScroll = useStableCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  });

  const visibleItems = filteredItems.slice(startIndex, endIndex + 1);

  return (
    <div className="min-h-screen bg-surface text-text selection:bg-primary/30 transition-colors duration-500">
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-surface/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              E
            </div>
            <span className="font-bold text-xl tracking-tight uppercase">
              Enterprise<span className="text-primary">OS</span>
            </span>
          </div>

          <div className="flex items-center h-full pt-1">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-8 lg:p-12 space-y-12">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
            System Active
          </div>
          <h1 className="text-5xl lg:text-6xl font-black tracking-tighter leading-none">
            Welcome back, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              Vibhakar Pathak
            </span>
          </h1>
          <p className="text-text/50 max-w-xl text-lg leading-relaxed">
            Everything is looking stable today. You have{' '}
            <span className="text-text font-semibold">2 pending updates</span>{' '}
            across your enterprise libraries.
          </p>
        </header>

        <Card>
          <Card.Header>Revenue</Card.Header>
          <Card.Body>
            {isLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            ) : (
              <>
                <p className="text-2xl font-bold text-text">
                  ₹{data?.value?.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-text opacity-70 flex items-center gap-1">
                  Trend:
                  <span
                    className={
                      data?.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }
                  >
                    {data?.trend === 'up' ? '↑' : '↓'} {data?.trend}
                  </span>
                </p>
              </>
            )}
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>Search & Virtual List</Card.Header>
          <Card.Body>
            <input
              
              className="border border-border p-sm w-full rounded-md bg-surface text-text"
              placeholder="Search 10,000 items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <p className="mt-sm text-sm text-text opacity-70">
              Showing visible range: {startIndex} - {endIndex} (Total filtered:{' '}
              {filteredItems.length})
            </p>
          </Card.Body>
        </Card>

        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="border border-border rounded-md overflow-auto bg-surface"
          style={{ height: CONTAINER_HEIGHT, position: 'relative' }}
        >
          <div
            style={{
              height: filteredItems.length * ITEM_HEIGHT,
              width: '100%',
            }}
          >
            <div style={{ transform: `translateY(${offsetY}px)` }}>
              {visibleItems.map((item, index) => (
                <div
                  key={startIndex + index}
                  className="border-b border-border px-md flex items-center text-text"
                  style={{ height: ITEM_HEIGHT }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <Card>
            <Card.Header>System Status</Card.Header>
            <Card.Body>
              <p className="text-sm text-muted mb-md">
                Your enterprise dashboard is connected to the UI package.
              </p>
              <Button variant="primary" size="md" >
                Refresh Analytics
              </Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>UI Component Library</Card.Header>
            <Card.Body>
              <div className="flex gap-sm">
                <Button variant="ghost" size="sm" >
                  View Docs
                </Button>
                <Button variant="primary" size="sm" >
                  Deploy Now
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Active Projects" value="12" sub="+2 this week" />
          <StatCard
            title="System Health"
            value="99.9%"
            sub="Stable"
            status="green"
          />
          <StatCard title="Total Deploys" value="248" sub="+18 today" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <section className="lg:col-span-8 bg-surface border border-border rounded-3xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Recent Activity</h2>
              <button
                
                className="text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
              >
                Full Logs →
              </button>
            </div>

            <div className="divide-y divide-border">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="py-5 flex items-start gap-5 group cursor-default"
                >
                  <div className="mt-1 w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                  <div className="flex-1">
                    <p className="font-semibold group-hover:text-primary transition-colors">
                      Updated @enterprise/hooks, @enterprise/tokens,
                      @enterprise/ui
                    </p>
                    <p className="text-sm text-text/40">
                      CI/CD Pipeline • 2 hours ago
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-text/30 bg-text/5 px-2 py-1 rounded uppercase">
                    Success
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="lg:col-span-4 space-y-4">
            <h2 className="text-2xl font-bold px-2">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-3">
              <QuickAction label="Create New App" color="bg-blue-500" />
              <QuickAction label="Generate Report" color="bg-purple-500" />
              <QuickAction label="Manage Team" color="bg-emerald-500" />
              <QuickAction label="Documentation" color="bg-orange-500" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  title,
  value,
  sub,
  status,
}: {
  title: string;
  value: string;
  sub: string;
  status?: 'green' | 'primary';
}) {
  return (
    <div className="relative overflow-hidden group bg-surface border border-border p-8 rounded-3xl hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mt-8 group-hover:bg-primary/10 transition-colors" />
      <p className="text-sm font-bold text-text/40 uppercase tracking-widest">
        {title}
      </p>
      <h3 className="text-4xl font-black mt-2">{value}</h3>
      <p
        className={`text-sm mt-4 font-medium ${status === 'green' ? 'text-emerald-500' : 'text-primary'}`}
      >
        {sub}
      </p>
    </div>
  );
}

function QuickAction({ label, color }: { label: string; color: string }) {
  return (
    <button
      
      className="w-full flex items-center justify-between p-5 bg-surface border border-border rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm hover:shadow-md group"
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-3 h-3 rounded-full ${color} shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
        />
        <span className="font-bold text-text/80">{label}</span>
      </div>
      <span className="text-text/20 group-hover:text-primary group-hover:translate-x-1 transition-all">
        →
      </span>
    </button>
  );
}
