import type { SVGProps } from 'react';
export default function Pen(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 15"
      {...props}
    >
      <mask
        id="pen_svg__a"
        width={16}
        height={15}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="#D9D9D9" d="M.5 0h15v15H.5z" />
      </mask>
      <g mask="url(#pen_svg__a)">
        <path
          fill="#3280F4"
          d="M3.625 11.875h.89l6.11-6.11-.89-.89-6.11 6.11zm-1.25 1.25v-2.656l8.25-8.235q.188-.171.414-.265t.477-.094.484.094.406.281l.86.875q.188.172.273.406a1.35 1.35 0 0 1 0 .946q-.086.226-.273.414L5.03 13.125zm7.797-7.797-.438-.453.891.89z"
        />
      </g>
    </svg>
  );
}
