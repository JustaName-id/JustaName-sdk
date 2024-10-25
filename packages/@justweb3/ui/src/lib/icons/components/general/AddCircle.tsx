import type { SVGProps } from 'react';
export default function AddCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 21 20"
      {...props}
    >
      <mask
        id="add-circle_svg__a"
        width={21}
        height={20}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="#D9D9D9" d="M.5 0h20v20H.5z" />
      </mask>
      <g mask="url(#add-circle_svg__a)">
        <path
          fill="var(--justweb3-primary-color)"
          d="M9.929 10.571H6.5V9.43h3.429V6h1.142v3.429H14.5v1.142h-3.429V14H9.93z"
        />
        <circle
          cx={10.5}
          cy={10}
          r={8.5}
          stroke="var(--justweb3-primary-color)"
        />
      </g>
    </svg>
  );
}
