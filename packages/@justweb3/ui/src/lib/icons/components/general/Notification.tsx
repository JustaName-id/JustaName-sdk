import type { SVGProps } from 'react';
export default function Notification(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 21"
      {...props}
    >
      <mask
        id="notification_svg__a"
        width={20}
        height={21}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="#D9D9D9" d="M0 .5h20v20H0z" />
      </mask>
      <g mask="url(#notification_svg__a)">
        <path
          fill={props.fill || 'var(--justweb3-primary-color)'}
          d="M3.333 16.333v-1.666H5V8.833A4.88 4.88 0 0 1 6.042 5.76 4.8 4.8 0 0 1 8.75 4v-.583q0-.522.365-.886.364-.364.885-.364.52 0 .885.364.366.364.365.886V4a4.8 4.8 0 0 1 2.708 1.76A4.88 4.88 0 0 1 15 8.833v5.834h1.667v1.666zm6.667 2.5q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.176h3.334q0 .687-.49 1.177t-1.177.49"
        />
      </g>
    </svg>
  );
}
