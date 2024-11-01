import React from 'react';
import styles from './Flex.module.css';
import clsx from 'clsx';

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  padding?: string;
  gap?: string;
  border?: string;
  borderRadius?: string;
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      direction = 'row',
      justify = 'flex-start',
      align = 'stretch',
      wrap = 'nowrap',
      padding,
      gap,
      border,
      borderRadius,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const classNames = clsx(
      styles.flex,
      styles[`direction-${direction}`],
      styles[`justify-${justify}`],
      styles[`align-${align}`],
      styles[`wrap-${wrap}`],
      className
    );

    const inlineStyles: React.CSSProperties = {
      padding,
      gap,
      border,
      borderRadius,
      ...style,
    };

    // Remove undefined properties
    Object.keys(inlineStyles).forEach(
      (key) =>
        inlineStyles[key as keyof React.CSSProperties] === undefined &&
        delete inlineStyles[key as keyof React.CSSProperties]
    );

    return (
      <div className={classNames} style={inlineStyles} ref={ref} {...props} />
    );
  }
);

Flex.displayName = 'Flex';

export default Flex;
