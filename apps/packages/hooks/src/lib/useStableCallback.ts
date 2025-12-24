import { useRef, useCallback } from "react";

export function useStableCallback<T extends (...args: never[]) => unknown>(
  callback: T
): T {
  const ref = useRef<T>(callback);
  
  ref.current = callback;

  return useCallback(((...args: Parameters<T>): ReturnType<T> => {
    return ref.current(...args) as ReturnType<T>;
  }) as T, []);
}
