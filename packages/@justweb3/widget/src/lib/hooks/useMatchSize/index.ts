import { useEffect } from 'react';

interface UseMatchSizeOptions {
  matchWidth?: boolean;
  matchHeight?: boolean;
}

interface UseMatchSizeReturn {
  sourceWidth: number;
  sourceHeight: number;
  targetWidth: number;
  targetHeight: number;
}

export const useMatchSize = (
  sourceElement: HTMLElement | null,
  targetElement: HTMLElement | null,
  { matchWidth = false, matchHeight = true }: UseMatchSizeOptions = {}
) => {
  useEffect(() => {
    if (!sourceElement || !targetElement) return;

    const matchSize = () => {
      const rect = sourceElement.getBoundingClientRect();
      if (matchWidth) {
        targetElement.style.width = `${rect.width}px`;
      }
      if (matchHeight) {
        targetElement.style.height = `${rect.height}px`;
      }
    };

    matchSize();

    const resizeObserver = new ResizeObserver(() => {
      matchSize();
    });

    resizeObserver.observe(sourceElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [sourceElement, targetElement, matchWidth, matchHeight]);

  return {
    sourceWidth: sourceElement?.clientWidth ?? 0,
    sourceHeight: sourceElement?.clientHeight ?? 0,
    targetWidth: targetElement?.clientWidth ?? 0,
    targetHeight: targetElement?.clientHeight ?? 0,
  };
};

export default useMatchSize;
