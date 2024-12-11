import type { SVGProps } from 'react';
export default function Minimize(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 25"
      {...props}
    >
      <mask
        id="minimize_svg__a"
        width={25}
        height={25}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="#D9D9D9" d="M.5.5h24v24H.5z" />
      </mask>
      <g mask="url(#minimize_svg__a)">
        <path
          fill={props.fill || 'var(--justweb3-primary-color)'}
          d="M4.651 15.965v-1.98h6.364v6.364h-1.98v-4.384zm9.334-4.95V4.651h1.98v4.384h4.384v1.98z"
        />
      </g>
    </svg>
  );
}
