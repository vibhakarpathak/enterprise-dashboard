'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  useDebounce,
  useStableCallback,
  useVirtualList,
} from '@enterprise/hooks';
import { Card, VirtualList } from '@enterprise/ui';
import { ActivityItem } from '../components/ActivityItem';
import { ActivityHeader } from '../components/ActivityHeader';

export type ActivityStatus = 'Success' | 'Failed' | 'Pending';

export interface ActivityLog {
  id: string;
  title: string;
  description: string;
  status: ActivityStatus;
  timestamp?: string;
}

const ITEM_HEIGHT = 90;
const CONTAINER_HEIGHT = 600;

export function Activity() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [scrollTop, setScrollTop] = useState(0);
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Reusable refresh logic
  const refreshData = useStableCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/dashboard/activity');
      const data: ActivityLog[] = await res.json();
      setActivities(data);
    } catch (error) {
      console.error('Failed to fetch activity logs:', error);
    } finally {
      setIsLoading(false);
    }
  });

  // Initial mount load
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const filtered = useMemo(
    () =>
      activities.filter((a) =>
        a.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
      ),
    [activities, debouncedSearch],
  );

  const virtual = useVirtualList({
    itemHeight: ITEM_HEIGHT,
    containerHeight: CONTAINER_HEIGHT,
    itemCount: filtered.length,
    scrollTop,
    overscan: 5,
  });

  const handleScroll = useStableCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  });

  return (
    <Card className="lg:col-span-8 rounded-[2.5rem] p-10 bg-[var(--color-surface)] border-[var(--color-border)] min-h-[750px]">
      <ActivityHeader
        total={isLoading ? 0 : filtered.length}
        from={isLoading ? 0 : virtual.startIndex + 1}
        to={isLoading ? 0 : Math.min(filtered.length, virtual.endIndex + 1)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onRefresh={refreshData} // Now passes the function to handle clicks
      />

      {isLoading ? (
        <div className="space-y-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{ height: ITEM_HEIGHT }}
              className="border-b border-[var(--color-border)]/20 px-2 flex items-center"
            >
              <ActivityItem.Skeleton />
            </div>
          ))}
        </div>
      ) : (
        <VirtualList
          items={filtered}
          itemHeight={ITEM_HEIGHT}
          containerHeight={CONTAINER_HEIGHT}
          onScroll={handleScroll}
          {...virtual}
          renderItem={(item: ActivityLog) => (
            <div
              key={item.id}
              style={{ height: ITEM_HEIGHT }}
              className="border-b border-[var(--color-border)]/20 px-2 flex items-center"
            >
              <ActivityItem
                title={item.title}
                description={item.description}
                status={item.status}
              />
            </div>
          )}
        />
      )}
    </Card>
  );
}
