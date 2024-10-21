import React from 'react';
import styled, { css } from 'styled-components';
import { LoadingSpinner } from '../LoadingSpinner';

type ButtonVariant = 'primary' | 'secondary' | 'destructive-outline' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  loading?: boolean;
  rightIcon?: React.ReactNode;
}

interface StyledButtonProps {
  variant: ButtonVariant;
  size: ButtonSize;
}

interface StyledButtonProps {
  variant: ButtonVariant;
  size: ButtonSize;
}

const StyledButton = styled.button<StyledButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    border: none;
    font-weight: 900;
    font-family: var(--justaname-font-family), serif;
    letter-spacing: 0;
    font-size: 12px;
    line-height: 1;
    transition: all 0.2s ease;
    cursor: pointer;
    position: relative; // Added this line

    ${props => props.variant === 'primary' && css`
        background-color: var(--justaname-primary-color);
        color: var(--justaname-primary-color-foreground);

        &:hover {
            background-color: var(--justaname-primary-color-dark);
        }
    `}

    ${props => props.variant === 'secondary' && css`
        background-color: var(--justaname-background-color);
        color: var(--justaname-primary-color);
        border: 1px solid var(--justaname-primary-color);
        
        &:hover {
            background-color: var(--justaname-background-color);
            color: var(--justaname-primary-color-dark);
            border: 1px solid var(--justaname-primary-color-dark);
        }
    `}
    
    ${props => props.variant === 'destructive-outline' && css`
        background-color: var(--justaname-background-color);
        color: var(--justaname-destructive-color);
        border: 1px solid var(--justaname-destructive-color);
        
        &:hover {
            background-color: var(--justaname-background-color);
            color: var(--justaname-destructive-color-dark);
            border: 1px solid var(--justaname-destructive-color-dark);
        }
    `}
    
    ${props => props.variant === 'destructive' && css`
        background-color: var(--justaname-destructive-color);
        color: var(--justaname-destructive-color-foreground);
        
        &:hover {
            background-color: var(--justaname-destructive-color-dark);
        }
    `}
    
    ${props => props.disabled && css`
        opacity: 0.5;
        cursor: not-allowed;
    `}

    ${props => props.size === 'sm' && css`
        height: 34px;
        padding: 0 12px;
    `}

    ${props => props.size === 'md' && css`
        height: 42px;
        padding: 0 12px;
    `}

    ${props => props.size === 'lg' && css`
        height: 50px;
        font-size: 14px;
        padding: 0 12px;
    `}
`;

const ButtonContent = styled.span<{ $loading: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
    gap: 6px;
  opacity: ${props => props.$loading ? 0 : 1};
  visibility: ${props => props.$loading ? 'hidden' : 'visible'};
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
                                                                   className,
                                                                   variant = 'primary',
                                                                   size = 'sm',
                                                                   asChild = false,
                                                                   loading = false,
                                                                   children,
                                                                   disabled = false,
                                                                   rightIcon,
                                                                   ...props
                                                                 }, ref) => {

  return (
    <StyledButton
      as={'button'}
      className={className}
      variant={variant}
      size={size}
      ref={ref}
      disabled={loading || disabled}
      {...props}
    >
      <ButtonContent $loading={loading}>
        {
          children
        }
        {
          (rightIcon && !loading ) && rightIcon
        }
      </ButtonContent>
      {loading && (
        <SpinnerWrapper>
          <LoadingSpinner
            color={variant === 'primary' ?
              'var(--justaname-foreground-color-4)' :
                variant === "destructive-outline" ?
                  'var(--justaname-destructive-color)' :
                    variant === "destructive" ?
                      'var(--justaname-foreground-color-4)' :
                        'var(--justaname-primary-color)'}
          />
        </SpinnerWrapper>
      )}
    </StyledButton>
  );
});

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };