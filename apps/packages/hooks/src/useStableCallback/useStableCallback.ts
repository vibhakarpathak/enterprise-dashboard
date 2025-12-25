import { useRef, useCallback } from "react";

export function useStableCallback<T extends ((...args: never[]) => unknown) | undefined>(
  callback: T
): T {
  const ref = useRef<T>(callback);

  ref.current = callback;

  type InferArgs = T extends (...args: infer P) => unknown ? P : never[];

  const stableFn = useCallback(((...args: InferArgs) => {
    return ref.current?.(...args);
  }) as Exclude<T, undefined>, []);

  return (callback === undefined ? undefined : stableFn) as T;
}