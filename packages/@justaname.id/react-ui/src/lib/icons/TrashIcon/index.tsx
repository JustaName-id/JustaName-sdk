
import React from 'react';

export interface TrashIconProps extends React.SVGProps<SVGSVGElement> {}


export const TrashIcon: React.FC<TrashIconProps> = (props) => {
  return (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id="mask0_1948_3779" style={{
        maskType: "alpha"
      }} maskUnits="userSpaceOnUse"
       x="0" y="0" width="20" height="21">
        <rect y="0.315918" width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1948_3779)">
        <path
          d="M7.83337 14.0659L10 11.8993L12.1667 14.0659L13.3334 12.8993L11.1667 10.7326L13.3334 8.56592L12.1667 7.39925L10 9.56592L7.83337 7.39925L6.66671 8.56592L8.83337 10.7326L6.66671 12.8993L7.83337 14.0659ZM5.83337 17.8159C5.37504 17.8159 4.98268 17.6527 4.65629 17.3263C4.3299 16.9999 4.16671 16.6076 4.16671 16.1493V5.31592H3.33337V3.64925H7.50004V2.81592H12.5V3.64925H16.6667V5.31592H15.8334V16.1493C15.8334 16.6076 15.6702 16.9999 15.3438 17.3263C15.0174 17.6527 14.625 17.8159 14.1667 17.8159H5.83337ZM14.1667 5.31592H5.83337V16.1493H14.1667V5.31592Z"
          fill="#FF0000" />
      </g>
    </svg>
  )
}