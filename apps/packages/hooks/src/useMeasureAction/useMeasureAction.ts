export function useMeasureAction(actionName: string) {
  return (callback: () => Promise<void> | void) => {
    return async () => {
      const start = performance.now();
      await callback();
      const end = performance.now();
      console.log(
        `[Web Vitals] ${actionName} duration: ${(end - start).toFixed(2)}ms`,
      );
      // You could send this to your analytics endpoint here
    };
  };
}
