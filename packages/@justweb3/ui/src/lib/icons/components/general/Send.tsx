import type { SVGProps } from 'react';
export default function Send(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 15 16"
      {...props}
    >
      <mask
        id="send_svg__a"
        width={15}
        height={16}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="#D9D9D9" d="M0 .5h15v15H0z" />
      </mask>
      <g mask="url(#send_svg__a)">
        <path
          fill={props.fill || 'var(--justweb3-primary-color)'}
          d="M1.875 13V9.25l5-1.25-5-1.25V3L13.75 8z"
        />
      </g>
    </svg>
  );
}
