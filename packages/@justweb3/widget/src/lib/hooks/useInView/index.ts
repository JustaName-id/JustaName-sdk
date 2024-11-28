import { RefObject, useEffect, useState } from 'react';

export function useInView(
  ref: RefObject<Element>,
  containerRef?: RefObject<Element>,
  rootMargin = '100px'
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    const container = containerRef?.current || null;

    if (!element) return;

    let observer: IntersectionObserver | null = null;

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setInView(entry.isIntersecting);
        },
        {
          root: container,
          rootMargin,
        }
      );
      observer.observe(element);
    } else {
      // SSR or unsupported browser fallback
      setInView(false);
    }

    return () => {
      if (observer && element) {
        observer.unobserve(element);
        observer.disconnect();
      }
    };
  }, [ref, containerRef]);

  return inView;
}

export default useInView;
