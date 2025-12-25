'use client';

import { useRef, useState } from 'react';
import { Card } from '@enterprise/ui';
import {
  useDebounce,
  useStableCallback,
  useVirtualList,
} from '@enterprise/hooks';

const ITEM_HEIGHT = 50;
const CONTAINER_HEIGHT = 400;

interface SearchAndVirtualListProps {
  items: string[];
}

export function SearchAndVirtualList({ items }: SearchAndVirtualListProps) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <>
      <Card>
        <Card.Header>Search & Virtual List</Card.Header>
        <Card.Body>
          <label htmlFor="search-input" className="sr-only">
            Search items
          </label>
          <input
            id="search-input"
            type="text"
            className="border border-border p-sm w-full rounded-md bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search 10,000 items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <p className="mt-sm text-sm text-text opacity-70">
            Showing {startIndex}-{endIndex} (
            {filteredItems.length.toLocaleString()} filtered)
          </p>
        </Card.Body>
      </Card>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="border border-border rounded-md overflow-auto bg-surface"
        style={{ height: CONTAINER_HEIGHT }}
      >
        <div
          style={{
            height: `${filteredItems.length * ITEM_HEIGHT}px`,
            position: 'relative',
          }}
        >
          <div style={{ transform: `translateY(${offsetY}px)` }}>
            {visibleItems.map((item, index) => (
              <div
                key={startIndex + index}
                className="border-b border-border px-md flex items-center h-[50px] absolute w-full"
                style={{ top: `${(startIndex + index) * ITEM_HEIGHT}px` }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
