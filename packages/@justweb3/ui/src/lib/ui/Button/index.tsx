import React from 'react';
import styles from './Button.module.css';
import { LoadingSpinner } from '../LoadingSpinner';
import clsx from 'clsx';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'destructive-outline'
  | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  loading?: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      asChild = false,
      loading = false,
      children,
      disabled = false,
      rightIcon,
      leftIcon,
      ...props
    },
    ref
  ) => {
    const buttonClassNames = clsx(
      styles.button,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      {
        [styles.disabled]: loading || disabled,
      },
      className
    );

    const contentClassNames = clsx(styles.buttonContent, {
      [styles.loading]: loading,
    });

    // Determine the spinner color based on variant
    const spinnerColor =
      variant === 'primary'
        ? 'var(--justweb3-foreground-color-4)'
        : variant === 'destructive-outline'
        ? 'var(--justweb3-destructive-color)'
        : variant === 'destructive'
        ? 'var(--justweb3-foreground-color-4)'
        : 'var(--justweb3-primary-color)';

    return (
      <button
        className={buttonClassNames}
        disabled={loading || disabled}
        ref={ref}
        {...props}
      >
        <span className={contentClassNames}>
          {leftIcon && !loading && leftIcon}
          {children}
          {rightIcon && !loading && rightIcon}
        </span>
        {loading && (
          <div className={styles.spinnerWrapper}>
            <LoadingSpinner color={spinnerColor} />
          </div>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
