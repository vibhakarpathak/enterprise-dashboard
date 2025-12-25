import { renderHook } from '@testing-library/react';
import { useVirtualList } from './useVirtualList';

describe('useVirtualList', () => {
  it('should calculate correct visible range at top', () => {
    const { result } = renderHook(() =>
      useVirtualList({
        itemHeight: 50,
        containerHeight: 400,
        itemCount: 100,
        scrollTop: 0,
      })
    );

    expect(result.current.startIndex).toBe(0);
    expect(result.current.endIndex).toBeGreaterThanOrEqual(12); // ~8 + overscan
    expect(result.current.offsetY).toBe(0);
  });

  it('should calculate correct range when scrolled', () => {
    const { result } = renderHook(() =>
      useVirtualList({
        itemHeight: 50,
        containerHeight: 400,
        itemCount: 100,
        scrollTop: 1000,
      })
    );

    const expectedStart = Math.floor(1000 / 50) - 5; // with overscan
    expect(result.current.startIndex).toBeGreaterThanOrEqual(expectedStart);
    expect(result.current.offsetY).toBe(result.current.startIndex * 50);
  });

  it('should clamp endIndex to itemCount - 1', () => {
    const { result } = renderHook(() =>
      useVirtualList({
        itemHeight: 50,
        containerHeight: 400,
        itemCount: 10,
        scrollTop: 1000,
      })
    );

    expect(result.current.endIndex).toBe(9);
  });
});
