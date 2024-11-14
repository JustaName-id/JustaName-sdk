import { RefObject, useEffect } from 'react';

export const useInfiniteScroll = (
  ref: RefObject<HTMLDivElement>,
  callback: () => void,
  active: boolean,
  threshold = 50
) => {
  useEffect(() => {
    if (!active || !ref.current) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = ref.current!;
      if (scrollHeight - scrollTop - clientHeight <= threshold) {
        callback();
      }
    };

    ref.current.addEventListener('scroll', handleScroll);

    return () => {
      ref.current?.removeEventListener('scroll', handleScroll);
    };
  }, [ref, callback, active, threshold]);
};
