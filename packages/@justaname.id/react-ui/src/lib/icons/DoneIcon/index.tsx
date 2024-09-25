import React, { FC } from 'react';

export interface DoneIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
}

export const DoneIcon: FC<DoneIconProps> = ({ width = 20, height = 20, ...props }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
         {...props}
    >
      <mask id="mask0_416_932" style={{
        maskType: 'alpha',
      }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_416_932)">
        <path
          d="M7.95817 13.3335L3.229 8.60433L4.4165 7.41683L7.95817 10.9585L15.5832 3.3335L16.7707 4.521L7.95817 13.3335ZM4.1665 16.6668V15.0002H15.8332V16.6668H4.1665Z"
          fill="#06CB6C" />
      </g>
    </svg>
  );
};

export default DoneIcon;