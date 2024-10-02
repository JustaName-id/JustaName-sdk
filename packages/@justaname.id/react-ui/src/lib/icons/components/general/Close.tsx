import type { SVGProps } from 'react';
export default function Close(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 24"
      {...props}
    >
      <mask
        id="close_svg__a"
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
      <g mask="url(#close_svg__a)">
        <path
          fill="var(--justaname-primary-color)"
          d="m6.9 19-1.4-1.4 5.6-5.6-5.6-5.6L6.9 5l5.6 5.6L18.1 5l1.4 1.4-5.6 5.6 5.6 5.6-1.4 1.4-5.6-5.6z"
        />
      </g>
    </svg>
  );
}
