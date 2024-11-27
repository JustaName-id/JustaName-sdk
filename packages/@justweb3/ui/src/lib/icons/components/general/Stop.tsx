import type { SVGProps } from 'react';
export default function Stop(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 21"
      {...props}
    >
      <g clipPath="url(#stop_svg__a)">
        <mask
          id="stop_svg__b"
          width={20}
          height={21}
          x={0}
          y={0}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: 'alpha',
          }}
        >
          <path fill="#D9D9D9" d="M20 .5H0v20h20z" />
        </mask>
        <g mask="url(#stop_svg__b)">
          <path
            fill={props.fill || 'var(--justweb3-primary-color)'}
            d="M6.667 13.833h6.666V7.167H6.667zm3.333 5a8.1 8.1 0 0 1-3.25-.656 8.4 8.4 0 0 1-2.646-1.781 8.4 8.4 0 0 1-1.781-2.646 8.1 8.1 0 0 1-.656-3.25q0-1.73.656-3.25a8.4 8.4 0 0 1 1.781-2.646A8.4 8.4 0 0 1 6.75 2.823 8.1 8.1 0 0 1 10 2.167q1.73 0 3.25.656a8.4 8.4 0 0 1 2.646 1.781 8.4 8.4 0 0 1 1.781 2.646 8.1 8.1 0 0 1 .656 3.25 8.1 8.1 0 0 1-.656 3.25 8.4 8.4 0 0 1-1.781 2.646 8.4 8.4 0 0 1-2.646 1.78 8.1 8.1 0 0 1-3.25.657"
          />
        </g>
      </g>
      <defs>
        <clipPath id="stop_svg__a">
          <path d="M0 .5h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
