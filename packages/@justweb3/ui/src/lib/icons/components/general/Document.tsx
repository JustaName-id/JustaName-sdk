import type { SVGProps } from 'react';
export default function Document(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 25"
      {...props}
    >
      <mask
        id="document_svg__a"
        width={24}
        height={25}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="#D9D9D9" d="M0 .5h24v24H0z" />
      </mask>
      <g mask="url(#document_svg__a)">
        <path
          fill="var(--justweb3-primary-color)"
          d="M6 22.5q-.824 0-1.412-.587A1.93 1.93 0 0 1 4 20.5v-16q0-.824.588-1.412A1.93 1.93 0 0 1 6 2.5h8l6 6v12q0 .824-.587 1.413A1.93 1.93 0 0 1 18 22.5zm7-13h5l-5-5z"
        />
      </g>
    </svg>
  );
}
