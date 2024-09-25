import React from 'react';

export interface SocialIconProps extends React.SVGProps<SVGSVGElement> {}


export const SocialIcon: React.FC<SocialIconProps> = (props) => {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id="mask0_1635_1393" style={{
        maskType: 'alpha'
      }} maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">
        <rect x="0.5" width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1635_1393)">
        <path
          d="M9.66675 17.4166L7.25008 15H3.83341V11.5833L1.41675 9.16664L3.83341 6.74997V3.33331H7.25008L9.66675 0.916641L12.0834 3.33331H15.5001V6.74997L17.9167 9.16664L15.5001 11.5833L17.8959 16.2916C17.9931 16.4722 18.0209 16.6493 17.9792 16.8229C17.9376 16.9965 17.8612 17.1389 17.7501 17.25C17.639 17.3611 17.4966 17.4375 17.323 17.4791C17.1494 17.5208 16.9723 17.493 16.7917 17.3958L12.0834 15L9.66675 17.4166Z"
          fill="var(--justaname-primary-color)" />
      </g>
    </svg>
  )
}