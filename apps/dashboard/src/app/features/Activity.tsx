'use client';

import React, { useEffect, useRef, useState, useTransition } from 'react';
import { useStableCallback, useVirtualList } from '@enterprise/hooks';
import { Card, VirtualList, cn } from '@enterprise/ui';
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

interface WorkerInitMessage {
  type: 'INIT';
  activities: ActivityLog[];
}

interface WorkerSearchMessage {
  type: 'SEARCH';
  term: string;
  id: number;
}

interface WorkerResultMessage {
  type: 'RESULT';
  results: ActivityLog[];
  totalCount: number;
  id: number;
}

type WorkerIncomingMessage = WorkerResultMessage;

const ITEM_HEIGHT = 90;
const CONTAINER_HEIGHT = 600;
const SEARCH_DEBOUNCE_MS = 200;

export function Activity() {
  const [, setActivities] = useState<ActivityLog[]>([]);
  const [filtered, setFiltered] = useState<ActivityLog[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  const workerRef = useRef<Worker | null>(null);
  const requestIdRef = useRef(0);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const worker = new Worker('/workers/filter.worker.js');

    workerRef.current = worker;

    worker.onmessage = (event: MessageEvent<WorkerIncomingMessage>) => {
      const { type, id, results, totalCount } = event.data;

      if (type !== 'RESULT' || id < requestIdRef.current) {
        return;
      }

      startTransition(() => {
        setFiltered(results);
        setTotalCount(totalCount);
        setIsProcessing(false);
      });
    };

    return () => {
      worker.terminate();
    };
  }, []);

  const refreshData = useStableCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/dashboard/activity');
      const data: ActivityLog[] = await response.json();

      setActivities(data);

      const initMessage: WorkerInitMessage = {
        type: 'INIT',
        activities: data,
      };

      workerRef.current?.postMessage(initMessage);

      requestIdRef.current += 1;

      const searchMessage: WorkerSearchMessage = {
        type: 'SEARCH',
        term: '',
        id: requestIdRef.current,
      };

      workerRef.current?.postMessage(searchMessage);
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    if (!workerRef.current || isLoading) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsProcessing(true);
      requestIdRef.current += 1;

      const message: WorkerSearchMessage = {
        type: 'SEARCH',
        term: searchTerm,
        id: requestIdRef.current,
      };

      workerRef.current?.postMessage(message);
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchTerm, isLoading]);

  const virtual = useVirtualList({
    itemHeight: ITEM_HEIGHT,
    containerHeight: CONTAINER_HEIGHT,
    itemCount: filtered.length,
    scrollTop,
    overscan: 3,
  });

  const handleScroll = useStableCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(event.currentTarget.scrollTop);
    },
  );

  const isStale = isPending || isProcessing;

  return (
    <Card
      className={cn(
        'lg:col-span-8 rounded-[2.5rem] p-10 min-h-[750px] transition-all duration-300',
        isStale && 'opacity-60',
      )}
    >
      <ActivityHeader
        total={isLoading ? 0 : totalCount}
        from={isLoading || filtered.length === 0 ? 0 : virtual.startIndex + 1}
        to={isLoading ? 0 : Math.min(totalCount, virtual.endIndex + 1)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onRefresh={refreshData}
      />

      {isLoading ? (
        <div>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              style={{ height: ITEM_HEIGHT }}
              className="border-b px-2 flex items-center"
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
              className="border-b px-2 flex items-center"
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
