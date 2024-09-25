import React from 'react';

export interface CopyIconProps extends React.SVGProps<SVGSVGElement> {}

export const CopyIcon: React.FC<CopyIconProps> = (props) => {
  return (
    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id="mask0_1635_1872" style={{
        maskType: "alpha"
      }} maskUnits="userSpaceOnUse" x="0" y="0" width="10" height="11">
        <rect y="0.5" width="10" height="10" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1635_1872)">
        <path
          d="M3.75 8.00016C3.52083 8.00016 3.32465 7.91857 3.16146 7.75537C2.99826 7.59218 2.91667 7.396 2.91667 7.16683V2.16683C2.91667 1.93766 2.99826 1.74148 3.16146 1.57829C3.32465 1.41509 3.52083 1.3335 3.75 1.3335H7.5C7.72917 1.3335 7.92535 1.41509 8.08854 1.57829C8.25174 1.74148 8.33333 1.93766 8.33333 2.16683V7.16683C8.33333 7.396 8.25174 7.59218 8.08854 7.75537C7.92535 7.91857 7.72917 8.00016 7.5 8.00016H3.75ZM2.08333 9.66683C1.85417 9.66683 1.65799 9.58523 1.49479 9.42204C1.3316 9.25884 1.25 9.06266 1.25 8.8335V3.00016H2.08333V8.8335H6.66667V9.66683H2.08333Z"
          fill="var(--justaname-primary-color)" />
      </g>
    </svg>

  )
}