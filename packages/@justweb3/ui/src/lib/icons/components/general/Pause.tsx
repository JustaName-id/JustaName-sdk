import type { SVGProps } from 'react';
export default function Pause(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 21"
      {...props}
    >
      <g clipPath="url(#pause_svg__a)">
        <mask
          id="pause_svg__b"
          width={20}
          height={21}
          x={0}
          y={0}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: 'alpha',
          }}
        >
          <path
            fill={props.fill || 'var(--justweb3-primary-color)'}
            d="M20 .5H0v20h20z"
          />
        </mask>
        <g mask="url(#pause_svg__b)">
          <path
            fill={props.fill || 'var(--justweb3-primary-color)'}
            d="M11.667 16.333V4.667H15v11.666zm-6.667 0V4.667h3.333v11.666z"
          />
        </g>
      </g>
      <defs>
        <clipPath id="pause_svg__a">
          <path d="M0 .5h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
