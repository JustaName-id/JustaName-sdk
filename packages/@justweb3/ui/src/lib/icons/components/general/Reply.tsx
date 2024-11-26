import type { SVGProps } from 'react';
export default function Reply(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 21"
      {...props}
    >
      <mask
        id="reply_svg__a"
        width={20}
        height={21}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="var(--justweb3-primary-color)" d="M0 .5h20v20H0z" />
      </mask>
      <g mask="url(#reply_svg__a)">
        <path
          fill="var(--justweb3-primary-color)"
          d="m12.5 16.333-1.167-1.187 2.98-2.98H6.25q-1.563 0-2.656-1.093Q2.5 9.978 2.5 8.417T3.594 5.76Q4.687 4.667 6.25 4.667h.417v1.666H6.25q-.874 0-1.48.604a2.01 2.01 0 0 0-.603 1.48q0 .874.604 1.479.604.604 1.479.604h8.063l-2.98-3L12.5 6.333l5 5z"
        />
      </g>
    </svg>
  );
}
