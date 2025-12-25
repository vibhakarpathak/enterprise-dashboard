import React from 'react';

export interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  offsetY: number;
  startIndex: number;
  endIndex: number;
  onScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  renderItem: (item: T, index: number) => React.ReactElement;
  className?: string;
}
