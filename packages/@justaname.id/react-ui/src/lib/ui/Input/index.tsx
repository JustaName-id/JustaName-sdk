import React from 'react';
import styled from 'styled-components';

interface InputWrapperProps {
  $error?: boolean;
  $fullWidth?: boolean;
}

interface StyledInputProps {
  $error?: boolean;
}



const InputWrapper = styled.div<InputWrapperProps>`
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 16px;
    border: 1px solid ${props => props.$error ? 'var(--justaname-error-color)' : 'var(--justaname-primary-color)'};
    background-color: var(--justaname-background-color);
    padding: 10px;
    gap: 12px;
    width: ${props => props.$fullWidth ? '100%' : 'auto'};
`;

const StyledInput = styled.input<StyledInputProps>`
    display: flex;
    height: 30px;
    width: 100%;
    border: none;
    background-color: transparent;
    font-size: 12px;
    font-weight: 500;
    font-family: var(--justaname-font-family), serif;
    line-height: 20px;
    padding: 0;
    text-transform: capitalize;
    color: var(--justaname-foreground-color-2);
    transition: border-color 0.2s ease-in-out;

    &:focus {
        outline: none;
        border-color: ${props => props.$error ? 'var(--input-error-border-color)' : 'var(--justaname-border-color)'};
    }

    &::placeholder {
        color: var(--justaname-foreground-color-3);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const LeftElement = styled.div`
    font-family: var(--justaname-font-family),serif;
    align-items: center;
    pointer-events: none;
    font-size: 12px;
    font-weight: 900;
    line-height: 20px;
    color: var(--justaname-foreground-color-2);
`;

const RightElement = styled.div`
    font-family: var(--justaname-font-family),serif;
    align-items: center;
    pointer-events: none;
    font-size: 12px;
    font-weight: 900;
    line-height: 20px;
    color: var(--justaname-foreground-color-2);
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  fullWidth?: boolean;
  right?: React.ReactNode;
  left?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, left, error, right, fullWidth, ...props }, ref) => {
    return (
      <InputWrapper className={className} $error={error} $fullWidth={fullWidth} {...props}>
        {left && <LeftElement>{left}</LeftElement>}
        <StyledInput
          ref={ref}
          $error={error}
          {...props}
        />
        {right && <RightElement>{right}</RightElement>}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';
export default Input;