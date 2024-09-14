import React from 'react';

export interface ProfileIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}


export const ProfileIcon: React.FC<ProfileIconProps> = ({ color,...props }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_201_194"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill={color || '#D9D9D9'}/>
      </mask>
      <g mask="url(#mask0_201_194)">
        <path
          d="M4.875 14.25C5.58333 13.7083 6.375 13.2812 7.25 12.9687C8.125 12.6562 9.04167 12.5 10 12.5C10.9583 12.5 11.875 12.6562 12.75 12.9687C13.625 13.2812 14.4167 13.7083 15.125 14.25C15.6111 13.6806 15.9896 13.0347 16.2604 12.3125C16.5313 11.5903 16.6667 10.8194 16.6667 10C16.6667 8.15278 16.0174 6.57986 14.7188 5.28125C13.4201 3.98264 11.8472 3.33333 10 3.33333C8.15278 3.33333 6.57986 3.98264 5.28125 5.28125C3.98264 6.57986 3.33333 8.15278 3.33333 10C3.33333 10.8194 3.46875 11.5903 3.73958 12.3125C4.01042 13.0347 4.38889 13.6806 4.875 14.25ZM10 10.8333C9.18056 10.8333 8.48958 10.5521 7.92708 9.98958C7.36458 9.42708 7.08333 8.73611 7.08333 7.91666C7.08333 7.09722 7.36458 6.40625 7.92708 5.84375C8.48958 5.28125 9.18056 5 10 5C10.8194 5 11.5104 5.28125 12.0729 5.84375C12.6354 6.40625 12.9167 7.09722 12.9167 7.91666C12.9167 8.73611 12.6354 9.42708 12.0729 9.98958C11.5104 10.5521 10.8194 10.8333 10 10.8333ZM10 18.3333C8.84722 18.3333 7.76389 18.1146 6.75 17.6771C5.73611 17.2396 4.85417 16.6458 4.10417 15.8958C3.35417 15.1458 2.76042 14.2639 2.32292 13.25C1.88542 12.2361 1.66667 11.1528 1.66667 10C1.66667 8.84722 1.88542 7.76389 2.32292 6.75C2.76042 5.73611 3.35417 4.85416 4.10417 4.10416C4.85417 3.35416 5.73611 2.76041 6.75 2.32291C7.76389 1.88541 8.84722 1.66666 10 1.66666C11.1528 1.66666 12.2361 1.88541 13.25 2.32291C14.2639 2.76041 15.1458 3.35416 15.8958 4.10416C16.6458 4.85416 17.2396 5.73611 17.6771 6.75C18.1146 7.76389 18.3333 8.84722 18.3333 10C18.3333 11.1528 18.1146 12.2361 17.6771 13.25C17.2396 14.2639 16.6458 15.1458 15.8958 15.8958C15.1458 16.6458 14.2639 17.2396 13.25 17.6771C12.2361 18.1146 11.1528 18.3333 10 18.3333Z"
          fill={color || '#D9D9D9'} />
      </g>
    </svg>
  )
}