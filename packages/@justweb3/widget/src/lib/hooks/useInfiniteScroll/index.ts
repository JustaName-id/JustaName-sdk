import { RefObject, useEffect } from 'react';

export const useInfiniteScroll = (
  ref: RefObject<HTMLDivElement>,
  callback: () => void,
  active: boolean,
  threshold = 50
) => {
  useEffect(() => {
    if (!active || !ref.current) return;

    const element = ref.current;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = element;
      if (scrollHeight - scrollTop - clientHeight <= threshold) {
        callback();
      }
    };

    element.addEventListener('scroll', handleScroll);

    // Function to check if content requires scrolling
    const checkContentSize = () => {
      const { scrollHeight, clientHeight } = element;
      if (scrollHeight <= clientHeight + threshold) {
        // If content doesn't require scrolling, fetch more data
        callback();
      }
    };

    // Observe content size changes
    const resizeObserver = new ResizeObserver(() => {
      checkContentSize();
    });

    resizeObserver.observe(element);

    // Initial check
    checkContentSize();

    return () => {
      element.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, [ref, callback, active, threshold]);
};
