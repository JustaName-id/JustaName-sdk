import { useCallback, useRef, useState } from 'react';

interface UseSplitOptions {
  initialLeft?: number; // initial percentage of left pane (0 to 100)
  onDragging?: (leftWidth: number, rightWidth: number) => void;
  onDragEnd?: (leftWidth: number, rightWidth: number) => void;
  maxRightWidthPercentage?: number;
}

export function useSplit({
  initialLeft = 50,
  onDragging,
  onDragEnd,
  maxRightWidthPercentage
}: UseSplitOptions = {}) {
  const [leftWidth, setLeftWidth] = useState(initialLeft);
  const rightWidth = 100 - leftWidth;

  const containerRef = useRef<HTMLElement | null>(null);
  const startXRef = useRef<number>(0);
  const startLeftWidthRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDraggingRef.current || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const deltaX = e.clientX - startXRef.current;
    const barWidth = 4;

    const minLeftWidth = 100 - (((containerRect.width * (maxRightWidthPercentage ?? 0.2)) + barWidth) / containerRect.width) * 100;
    const effectiveMinLeft = Math.max(0, minLeftWidth);

    const newLeftWidth = Math.min(
      Math.max(
        startLeftWidthRef.current + (deltaX / containerRect.width) * 100,
        effectiveMinLeft
      ),
      100 - (barWidth / containerRect.width) * 100 // Ensure room for divider
    );

      setLeftWidth(newLeftWidth);
      onDragging && onDragging(newLeftWidth, 100 - newLeftWidth);
    },
    [onDragging, maxRightWidthPercentage]
  );

  const onMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    onDragEnd && onDragEnd(leftWidth, rightWidth);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }, [onDragEnd, leftWidth, rightWidth, onMouseMove]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      startLeftWidthRef.current = leftWidth;

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [leftWidth, onMouseUp, onMouseMove]
  );

  const getBarProps = useCallback(
    (props: Record<string, any> = {}) => {
      return {
        ...props,
        onMouseDown: onMouseDown,
        ref: (node: HTMLElement | null) => {
          if (node && !containerRef.current) {
            // The container is inferred as the parent element of this bar
            // Or you can manually pass a container ref into the hook
            containerRef.current = node.parentElement ?? null;
          }
        },
      };
    },
    [onMouseDown]
  );

  return { leftWidth, rightWidth, getBarProps };
}
