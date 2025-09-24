import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface SplitProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDragEnd'> {
  style?: React.CSSProperties;
  className?: string;
  /**
   * Drag width/height change callback function,
   * the width or height is determined according to the mode parameter
   */
  onDragging?: (preSize: number, nextSize: number, paneNumber: number) => void;
  /** Callback function for dragging end */
  onDragEnd?: (preSize: number, nextSize: number, paneNumber: number) => void;
  /** Support custom drag and drop toolbar */
  renderBar?: (props: React.HTMLAttributes<HTMLDivElement>) => JSX.Element;
  /** Set the drag and drop toolbar as a line style. */
  lineBar?: boolean;
  /** Set the dragged toolbar, whether it is visible or not */
  visible?: boolean | number[];
  /**
   * @deprecated Use `visible` instead
   */
  visiable?: boolean | number[];
  /**
   * Set the drag and drop toolbar, disable
   */
  disable?: boolean | number[];
  /**
   * type, optional `horizontal` or `vertical`
   */
  mode?: 'horizontal' | 'vertical';
}

export const Split: React.FC<SplitProps> = ({
  className,
  children,
  mode = 'horizontal',
  visible,
  visiable = visible ?? true,
  renderBar,
  lineBar = false,
  disable,
  onDragging,
  onDragEnd,
  ...other
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const moveRef = useRef(false);
  const paneNumberRef = useRef<number>(0);
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const boxWidthRef = useRef<number>(0);
  const boxHeightRef = useRef<number>(0);
  const preWidthRef = useRef<number>(0);
  const nextWidthRef = useRef<number>(0);
  const preHeightRef = useRef<number>(0);
  const nextHeightRef = useRef<number>(0);

  const preSizeRef = useRef<number>(0);
  const nextSizeRef = useRef<number>(0);

  const removeEvent = useCallback(() => {
    window.removeEventListener('mousemove', onDraggingHandler);
    window.removeEventListener('mouseup', onDragEndHandler);
  }, []);

  useEffect(() => {
    return () => {
      removeEvent();
    };
  }, [removeEvent]);

  const onDragEndHandler = useCallback(() => {
    moveRef.current = false;
    setDragging(false);
    onDragEnd &&
      onDragEnd(preSizeRef.current, nextSizeRef.current, paneNumberRef.current);
    removeEvent();
  }, [onDragEnd, removeEvent]);

  const onDraggingHandler = useCallback(
    (env: MouseEvent) => {
      if (!moveRef.current) return;
      if (!dragging) setDragging(true);

      const w = wrapperRef.current;
      if (!w || !targetRef.current) return;

      const x = env.clientX - startXRef.current;
      const y = env.clientY - startYRef.current;
      const nextTarget = targetRef.current
        .nextElementSibling as HTMLDivElement | null;
      const prevTarget = targetRef.current
        .previousElementSibling as HTMLDivElement | null;

      preSizeRef.current = 0;
      nextSizeRef.current = 0;

      if (mode === 'horizontal') {
        const preWidth = preWidthRef.current;
        const nextWidth = nextWidthRef.current;
        const boxWidth = boxWidthRef.current;

        const newPreWidth = preWidth + x > -1 ? preWidth + x : 0;
        const newNextWidth = nextWidth - x > -1 ? nextWidth - x : 0;
        if (newPreWidth === 0 || newNextWidth === 0) return;

        const prePerc = Math.min((newPreWidth / boxWidth) * 100, 100);
        const nextPerc = Math.min((newNextWidth / boxWidth) * 100, 100);

        if (prevTarget && nextTarget) {
          prevTarget.style.width = `${prePerc}%`;
          nextTarget.style.width = `${nextPerc}%`;
        }

        preSizeRef.current = prePerc;
        nextSizeRef.current = nextPerc;
      } else if (mode === 'vertical') {
        const preHeight = preHeightRef.current;
        const nextHeight = nextHeightRef.current;
        const boxHeight = boxHeightRef.current;

        const newPreHeight = preHeight + y > -1 ? preHeight + y : 0;
        const newNextHeight = nextHeight - y > -1 ? nextHeight - y : 0;
        if (newPreHeight === 0 || newNextHeight === 0) return;

        const prePerc = Math.min((newPreHeight / boxHeight) * 100, 100);
        const nextPerc = Math.min((newNextHeight / boxHeight) * 100, 100);

        if (prevTarget && nextTarget) {
          prevTarget.style.height = `${prePerc}%`;
          nextTarget.style.height = `${nextPerc}%`;
        }

        preSizeRef.current = prePerc;
        nextSizeRef.current = nextPerc;
      }

      onDragging &&
        onDragging(
          preSizeRef.current,
          nextSizeRef.current,
          paneNumberRef.current
        );
    },
    [onDragging, dragging, mode]
  );

  const onMouseDown = useCallback(
    (paneNumber: number, env: React.MouseEvent<HTMLDivElement>) => {
      if (!wrapperRef.current) return;

      paneNumberRef.current = paneNumber;
      startXRef.current = env.clientX;
      startYRef.current = env.clientY;
      moveRef.current = true;
      targetRef.current = (env.target as HTMLDivElement)
        .parentNode as HTMLDivElement;

      const w = wrapperRef.current;
      boxWidthRef.current = w.clientWidth;
      boxHeightRef.current = w.clientHeight;

      const prevTarget = targetRef.current
        .previousElementSibling as HTMLDivElement | null;
      const nextTarget = targetRef.current
        .nextElementSibling as HTMLDivElement | null;

      if (prevTarget) {
        preWidthRef.current = prevTarget.clientWidth;
        preHeightRef.current = prevTarget.clientHeight;
      }
      if (nextTarget) {
        nextWidthRef.current = nextTarget.clientWidth;
        nextHeightRef.current = nextTarget.clientHeight;
      }

      window.addEventListener('mousemove', onDraggingHandler);
      window.addEventListener('mouseup', onDragEndHandler);
      setDragging(true);
    },
    [onDraggingHandler, onDragEndHandler]
  );

  const childArray = React.Children.toArray(children);

  const isVisible = visiable ?? true;

  const containerClasses = [
    'relative',
    'h-full',
    'w-full',
    'overflow-hidden',
    mode === 'horizontal' ? 'flex flex-row' : 'flex flex-col',
    dragging ? 'opacity-95' : '',
    className || '',
  ].join(' ');

  return (
    <div ref={wrapperRef} className={containerClasses} {...other}>
      {childArray.map((element: any, idx: number) => {
        const paneProps = {
          className: `relative flex-shrink-0 flex-grow-0 transition-all duration-300 ${
            element.props.className || ''
          }`,
          style: { ...element.props.style, flex: '0 0 auto' },
        };

        // Determine if bar is visible
        const visibleBar =
          isVisible === true ||
          (Array.isArray(isVisible) && isVisible.includes(idx + 1));

        // Determine if bar is disabled
        const isDisabled =
          disable === true ||
          (Array.isArray(disable) && disable.includes(idx + 1));

        // Tailwind classes for the bar:
        // We'll use a minimal style. Adjust as needed.
        const barBaseClasses = [
          'z-10 relative flex justify-center items-center',
          'user-select-none bg-gray-100 hover:bg-blue-50',
          isDisabled ? 'pointer-events-none cursor-not-allowed' : '',
        ];
        if (mode === 'horizontal') {
          barBaseClasses.push('cursor-col-resize w-2');
          if (lineBar) {
            barBaseClasses.push('bg-transparent');
          }
        } else {
          barBaseClasses.push('cursor-row-resize h-2');
          if (lineBar) {
            barBaseClasses.push('bg-transparent');
          }
        }

        let BarCom = null;
        if (idx !== 0 && visibleBar) {
          const barProps: React.HTMLAttributes<HTMLDivElement> = {
            className: barBaseClasses.join(' '),
            onMouseDown: (e) => onMouseDown(idx + 1, e),
          };
          if (renderBar) {
            BarCom = renderBar(barProps);
          } else {
            BarCom = <div {...barProps} />;
          }
        }

        return (
          <React.Fragment key={idx}>
            {BarCom}
            {React.cloneElement(element, paneProps)}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Split;
