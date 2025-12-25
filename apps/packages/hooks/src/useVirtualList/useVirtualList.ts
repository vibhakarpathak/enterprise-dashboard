import { useMemo } from "react";

interface VirtualListConfig {
  itemHeight: number;
  containerHeight: number;
  itemCount: number;
  scrollTop: number;
  overscan?: number;
}

export function useVirtualList({
  itemHeight,
  containerHeight,
  itemCount,
  scrollTop,
  overscan = 5,
}: VirtualListConfig) {
  return useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const visibleCount = Math.ceil(containerHeight / itemHeight) + 2 * overscan;
    const endIndex = Math.min(itemCount - 1, startIndex + visibleCount);

    const offsetY = startIndex * itemHeight;

    return { startIndex, endIndex, offsetY };
  }, [itemHeight, containerHeight, itemCount, scrollTop, overscan]);
}
