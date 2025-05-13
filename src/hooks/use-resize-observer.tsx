import { useEffect, useRef, type RefObject } from "react";

export const useResizeObserver = (
  ref: RefObject<HTMLElement | null>,
  callback: (entry: ResizeObserverEntry) => void
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        callbackRef.current(entries[0]);
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref]);
};
