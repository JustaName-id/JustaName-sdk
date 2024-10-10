import type { SVGProps } from 'react';
export default function Arrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <mask
        id="arrow_svg__a"
        width={16}
        height={16}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="#D9D9D9" d="M.5.5h15v15H.5z" />
      </mask>
      <g mask="url(#arrow_svg__a)">
        <path
          fill="var(--justweb3-primary-color)"
          d="m5.516 14.25-1.11-1.11L9.546 8l-5.14-5.14 1.11-1.11L11.766 8z"
        />
      </g>
    </svg>
  );
}
