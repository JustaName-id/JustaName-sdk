import React from 'react';
import styles from './LoadingSpinner.module.css'; // Import the CSS module

export interface LoadingSpinnerProps {
  color?: string;
  size?: number;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  color,
  size = 20,
}) => {
  return (
    <div className={styles.spinnerWrapper}>
      <svg
        className={styles.styledSvg}
        viewBox="0 0 50 50"
        width={size}
        height={size}
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={color || 'var(--justweb3-foreground-color-4)'}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="80, 200"
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
