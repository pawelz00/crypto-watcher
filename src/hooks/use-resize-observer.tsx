import { useEffect, type RefObject } from "react";

export const useResizeObserver = (
  ref: RefObject<HTMLElement | null>,
  callback: (entry: ResizeObserverEntry) => void
) => {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        callback(entries[0]);
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, callback]);
};
