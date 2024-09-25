import React, { FC } from 'react';

export interface InfoIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
}

export const InfoIcon: FC<InfoIconProps> = ({ width = 20, height = 21, ...props}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 21"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 20.5C15.5228 20.5 20 16.0228 20 10.5C20 4.97715 15.5228 0.5 10 0.5C4.47715 0.5 0 4.97715 0 10.5C0 16.0228 4.47715 20.5 10 20.5ZM9.04761 9.54762H10.9524V14.7857H9.04761V9.54762ZM11.1905 6.92857C11.1905 7.58605 10.6575 8.11905 9.99999 8.11905C9.3425 8.11905 8.80951 7.58605 8.80951 6.92857C8.80951 6.27109 9.3425 5.7381 9.99999 5.7381C10.6575 5.7381 11.1905 6.27109 11.1905 6.92857Z"
        fill={'var(--justaname-primary-color)'}
      />
    </svg>
  );
};

export default InfoIcon;