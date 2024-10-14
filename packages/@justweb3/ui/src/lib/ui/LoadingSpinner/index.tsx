import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const SpinnerWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledSvg = styled.svg`
    width: 20px;
    height: 20px;
    animation: ${rotate} 1s linear infinite;
`;

export interface LoadingSpinnerProps {
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({color}) => {
  return (
    <SpinnerWrapper>
      <StyledSvg viewBox="0 0 50 50">
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
      </StyledSvg>
    </SpinnerWrapper>
  );
};