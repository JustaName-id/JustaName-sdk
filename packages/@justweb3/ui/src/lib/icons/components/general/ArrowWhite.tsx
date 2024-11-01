import type { SVGProps } from 'react';
export default function ArrowWhite(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 11 12"
      {...props}
    >
      <mask
        id="arrow-white_svg__a"
        width={11}
        height={12}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="#D9D9D9" d="M0 .5h11v11H0z" />
      </mask>
      <g mask="url(#arrow-white_svg__a)">
        <path
          fill="#fff"
          d="m3.678 10.583-.813-.813L6.635 6l-3.77-3.77.813-.813L8.261 6z"
        />
      </g>
    </svg>
  );
}
