import { useMemo } from "react";

interface VirtualListConfig {
  itemHeight: number;
  containerHeight: number;
  itemCount: number;
  scrollTop: number;
}

export function useVirtualList({
  itemHeight,
  containerHeight,
  itemCount,
  scrollTop
}: VirtualListConfig) {
  return useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const endIndex = Math.min(
      itemCount - 1,
      startIndex + visibleCount
    );

    const offsetY = startIndex * itemHeight;

    return {
      startIndex,
      endIndex,
      offsetY
    };
  }, [itemHeight, containerHeight, itemCount, scrollTop]);
}
