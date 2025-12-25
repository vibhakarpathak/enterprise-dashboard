import React from 'react';
import type { VirtualListProps } from './VirtualList.props';
import { cn } from '../../utils';

export function VirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  offsetY,
  startIndex,
  endIndex,
  onScroll,
  renderItem,
  className,
}: VirtualListProps<T>) {
  const visibleItems = items
    .slice(startIndex, endIndex + 1)
    .map((item, idx) => renderItem(item, startIndex + idx));

  return (
    <div
      onScroll={onScroll}
      className={cn('relative overflow-y-auto scrollbar-hide', className)}
      style={{ height: `${containerHeight}px` }}
    >
      <div
        style={{
          height: `${items.length * itemHeight}px`,
          position: 'relative',
        }}
      >
        <div
          className="absolute top-0 left-0 w-full"
          style={{ transform: `translateY(${offsetY}px)` }}
        >
          {visibleItems}
        </div>
      </div>
    </div>
  );
}
