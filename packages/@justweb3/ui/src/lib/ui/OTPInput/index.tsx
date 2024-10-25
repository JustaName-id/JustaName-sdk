'use client';

import * as React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { OTPInput, OTPInputContext } from 'input-otp';

type InputOTPProps = React.ComponentPropsWithoutRef<typeof OTPInput> & {
  containerClassName?: string;
};

type InputOTPGroupProps = React.ComponentPropsWithoutRef<'div'>;

type InputOTPSlotProps = React.ComponentPropsWithoutRef<'div'> & {
  index: number;
};

type InputOTPSeparatorProps = React.ComponentPropsWithoutRef<'div'>;

const StyledOTPInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Equivalent to gap-2 */
  width: 100%;
  > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }
  &:has(:disabled) {
    opacity: 0.5;
  }
`;

const StyledOTPInput = styled(OTPInput)`
  display: flex;
  &:disabled {
    cursor: not-allowed;
  }
`;

const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  ({ className, containerClassName, ...props }, ref) => (
    <StyledOTPInputContainer className={containerClassName}>
      <StyledOTPInput ref={ref} className={className} {...props} />
    </StyledOTPInputContainer>
  )
);
InputOTP.displayName = 'InputOTP';

const StyledInputOTPGroup = styled.div`
  display: flex;
  align-items: center;
`;

const InputOTPGroup = React.forwardRef<HTMLDivElement, InputOTPGroupProps>(
  ({ className, ...props }, ref) => (
    <StyledInputOTPGroup ref={ref} className={className} {...props} />
  )
);
InputOTPGroup.displayName = 'InputOTPGroup';

const blinkAnimation = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const StyledCaret = styled.div`
  height: 1rem;
  width: 1px;
  background-color: var(--justweb3-background-color);
  animation: ${blinkAnimation} 1s steps(1) infinite;
`;

const StyledCaretWrapper = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInputOTPSlot = styled.div<{ $isActive: boolean }>`
  position: relative;
  display: flex;
  height: 2.5rem; /* h-10 */
  width: 2.5rem; /* w-10 */
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--justweb3-foreground-color-4);
  border-right: 1px solid var(--justweb3-foreground-color-4);
  border-bottom: 1px solid var(--justweb3-foreground-color-4);
  font-size: 1.25rem; /* text-lg */
  transition: all 0.2s;

  &:first-child {
    border-left: 1px solid var(--justweb3-foreground-color-4);
    border-top-left-radius: 0.375rem; /* rounded-l-md */
    border-bottom-left-radius: 0.375rem;
  }

  &:last-child {
    border-top-right-radius: 0.375rem; /* rounded-r-md */
    border-bottom-right-radius: 0.375rem;
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      z-index: 10;
      box-shadow: 0 0 0 2px var(--justweb3-primary-color);
    `}
`;

const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

    return (
      <StyledInputOTPSlot
        ref={ref}
        $isActive={isActive}
        className={className}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          <StyledCaretWrapper>
            <StyledCaret />
          </StyledCaretWrapper>
        )}
      </StyledInputOTPSlot>
    );
  }
);
InputOTPSlot.displayName = 'InputOTPSlot';

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  InputOTPSeparatorProps
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
InputOTPSeparator.displayName = 'InputOTPSeparator';

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
