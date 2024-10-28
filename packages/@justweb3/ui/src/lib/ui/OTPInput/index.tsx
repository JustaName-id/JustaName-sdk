'use client';

import * as React from 'react';
import {
  OTPInput as OTPInputLib,
  OTPInputContext as OTPInputContextLib,
} from 'input-otp';
import styles from './OTPInput.module.css';
import clsx from 'clsx'; // Import the CSS module

type OTPInputProps = React.ComponentPropsWithoutRef<typeof OTPInputLib> & {
  containerClassName?: string;
};

type OTPInputGroupProps = React.ComponentPropsWithoutRef<'div'>;

type OTPInputSlotProps = React.ComponentPropsWithoutRef<'div'> & {
  index: number;
};

type OTPInputSeparatorProps = React.ComponentPropsWithoutRef<'div'>;

const OTPInput = React.forwardRef<HTMLInputElement, OTPInputProps>(
  ({ className, containerClassName, ...props }, ref) => (
    <div className={clsx(styles.otpInputContainer, containerClassName)}>
      <OTPInputLib
        ref={ref}
        className={`${styles.otpInput} ${className || ''}`}
        {...props}
      />
    </div>
  )
);
OTPInput.displayName = 'OTPInput';

const OTPInputGroup = React.forwardRef<HTMLDivElement, OTPInputGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(styles.otpInputGroup, className)}
      // className={`${styles.otpInputGroup} ${className || ''}`}
      {...props}
    />
  )
);
OTPInputGroup.displayName = 'OTPInputGroup';

const OTPInputSlot = React.forwardRef<HTMLDivElement, OTPInputSlotProps>(
  ({ index, className, ...props }, ref) => {
    const OTPInputContext = React.useContext(OTPInputContextLib);
    const { char, hasFakeCaret, isActive } = OTPInputContext.slots[index];

    return (
      <div
        ref={ref}
        className={clsx(
          styles.otpInputSlot,
          isActive && styles.otpInputSlotActive,
          className
        )}
        // className={`${styles.otpInputSlot} ${
        //   isActive ? styles.otpInputSlotActive : ''
        // } ${className || ''}`}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          <div className={styles.caretWrapper}>
            <div className={styles.caret} />
          </div>
        )}
      </div>
    );
  }
);
OTPInputSlot.displayName = 'OTPInputSlot';

const OTPInputSeparator = React.forwardRef<
  HTMLDivElement,
  OTPInputSeparatorProps
>((props, ref) => (
  <div ref={ref} role="separator" {...props}>
    <div
      style={{
        width: '5px',
        height: '2px',
        backgroundColor: 'var(--justweb3-primary-color)',
      }}
    />
  </div>
));
OTPInputSeparator.displayName = 'OTPInputSeparator';

export { OTPInput, OTPInputGroup, OTPInputSlot, OTPInputSeparator };
