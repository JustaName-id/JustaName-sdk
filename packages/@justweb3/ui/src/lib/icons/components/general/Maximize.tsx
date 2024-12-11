import type { SVGProps } from 'react';
export default function Maximize(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 24"
      {...props}
    >
      <mask
        id="maximize_svg__a"
        width={25}
        height={24}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="#D9D9D9" d="M.5 0h24v24H.5z" />
      </mask>
      <g mask="url(#maximize_svg__a)">
        <path
          fill={props.fill || 'var(--justweb3-primary-color)'}
          d="M6.171 18.379v-6.364h2.051v4.313h4.313v2.05zm6.294-10.607v-2.05h6.364v6.363h-2.051V7.772z"
        />
      </g>
    </svg>
  );
}
