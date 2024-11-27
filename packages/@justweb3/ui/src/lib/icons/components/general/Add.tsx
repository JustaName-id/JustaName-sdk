import type { SVGProps } from 'react';
export default function Add(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 25"
      {...props}
    >
      <mask
        id="add_svg__a"
        width={24}
        height={25}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path
          fill={props.fill || 'var(--justweb3-primary-color)'}
          d="M0 .5h24v24H0z"
        />
      </mask>
      <g mask="url(#add_svg__a)">
        <path
          fill={props.fill || 'var(--justweb3-primary-color)'}
          d="M11 13.5H5v-2h6v-6h2v6h6v2h-6v6h-2z"
        />
      </g>
    </svg>
  );
}
