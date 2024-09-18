import React from 'react';

export interface CloseIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  width?: number;
  height?: number;
}

export const CloseIcon: React.FC<CloseIconProps> = ({ color, width = 24, height = 24, ...props }) => {
  return (
    <svg  width={width}
          height={height}
          viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
          {...props}
    >
      <mask id="mask0_416_861" style={{
        maskType: 'alpha',
      }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_416_861)">
        <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
              fill="var(--justaname-primary-color)" />
      </g>
    </svg>
  )
}