import React from 'react';
import styles from './Skeleton.module.css';

const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`${styles.skeleton} ${className}`}
    {...props}
  />
));

Skeleton.displayName = 'Skeleton';

export { Skeleton };
