import type { SVGProps } from 'react';
export default function Logout(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <mask
        id="logout_svg__a"
        width={20}
        height={20}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="#D9D9D9" d="M0 0h20v20H0z" />
      </mask>
      <g mask="url(#logout_svg__a)">
        <path
          fill={props.fill || 'var(--justweb3-primary-color)'}
          d="M4.167 17.5q-.688 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177V4.167q0-.688.49-1.177.489-.49 1.177-.49H10v1.667H4.167v11.666H10V17.5zm9.166-3.333-1.146-1.209 2.126-2.125H7.5V9.167h6.813l-2.126-2.125 1.146-1.209L17.5 10z"
        />
      </g>
    </svg>
  );
}
