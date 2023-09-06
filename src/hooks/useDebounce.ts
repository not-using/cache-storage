import { useRef, useCallback, useEffect } from 'react';

export const useDebounce = () => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const debounce = useCallback((callbackFunction: () => void, delay: number) => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      callbackFunction();
      timer.current = null;
    }, delay);
  }, []);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  return debounce;
};
