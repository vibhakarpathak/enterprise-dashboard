import { renderHook } from '@testing-library/react';
import { useStableCallback } from './useStableCallback';

describe('useStableCallback', () => {
  it('should return the same function reference across renders', () => {
    const callback = (): string => 'first';
    const { result, rerender } = renderHook(
      ({ cb }) => useStableCallback(cb),
      { initialProps: { cb: callback } }
    );

    const firstReference = result.current;

    rerender({ cb: (): string => 'second' });

    expect(result.current).toBe(firstReference);
    expect(typeof result.current).toBe('function');
  });

  it('should always execute the latest callback version', () => {
    const { result, rerender } = renderHook(
      ({ count }) => useStableCallback((): number => count),
      { initialProps: { count: 1 } }
    );

    const firstCall = result.current;
    if (firstCall) {
      expect(firstCall()).toBe(1);
    } else {
      throw new Error('Callback should be defined');
    }

    rerender({ count: 2 });

    const secondCall = result.current;
    if (secondCall) {
      expect(secondCall()).toBe(2);
    } else {
      throw new Error('Callback should be defined');
    }
  });

  it('should handle arguments correctly', () => {
    const fn = (a: number, b: number): number => a + b;
    const { result } = renderHook(() => useStableCallback(fn));

    const stableFn = result.current;
    if (stableFn) {
      expect(stableFn(5, 5)).toBe(10);
    }
  });

  it('should return undefined when the callback is undefined', () => {
    type CallbackType = (() => void) | undefined;
    
    const { result, rerender } = renderHook(
      ({ cb }: { cb: CallbackType }) => useStableCallback(cb),
      { initialProps: { cb: undefined as CallbackType } }
    );

    expect(result.current).toBeUndefined();

    rerender({ cb: (): void => { void 0; } });
    expect(typeof result.current).toBe('function');
  });

  it('should return undefined if changed from function to undefined', () => {
    type CallbackType = (() => void) | undefined;

    const { result, rerender } = renderHook(
      ({ cb }: { cb: CallbackType }) => useStableCallback(cb),
      { initialProps: { cb: ((): void => { void 0; }) as CallbackType } }
    );

    expect(typeof result.current).toBe('function');

    rerender({ cb: undefined });
    expect(result.current).toBeUndefined();
  });
});