import { useEffect, useRef } from 'react';

const usePrevious = <T>(value: T) => {
  const ref = useRef<T[]>([]);

  useEffect(() => {
    if (typeof value === 'number') {
      if (value !== -1) {
        ref.current.unshift(value);
      }
    } else if (Array.isArray(value)) {
      if (value.every((e) => e === '')) {
        while (ref.current.length) {
          ref.current.pop();
        }
      }
      ref.current.push(value);
    }
  }, [value]);

  return ref.current;
};

export default usePrevious;
