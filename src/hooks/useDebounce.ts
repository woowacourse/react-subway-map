import { useRef } from 'react';

const useDebounce = (callback: Function, delay: number) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>();

  const debounce = (...args: any[]) => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => callback(...args), delay);
  };

  return debounce;
};

export default useDebounce;
