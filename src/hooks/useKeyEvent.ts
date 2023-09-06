import { useEffect } from 'react';

export const useKeyEvent = (listener: (e: KeyboardEvent) => void) => {
  useEffect(() => {
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, [listener]);
};
