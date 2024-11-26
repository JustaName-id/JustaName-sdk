import type { SVGProps } from 'react';
export default function Mic(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 15 16"
      {...props}
    >
      <mask
        id="mic_svg__a"
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
      <g mask="url(#mic_svg__a)">
        <path
          fill="var(--justweb3-primary-color)"
          d="M7.5 9.25q-.781 0-1.328-.547a1.8 1.8 0 0 1-.547-1.328v-3.75q0-.781.547-1.328A1.8 1.8 0 0 1 7.5 1.75q.781 0 1.328.547.547.546.547 1.328v3.75q0 .781-.547 1.328A1.8 1.8 0 0 1 7.5 9.25m-.625 4.375v-1.922a4.17 4.17 0 0 1-2.687-1.453 4.27 4.27 0 0 1-1.063-2.875h1.25q0 1.298.914 2.21.914.915 2.211.915 1.298 0 2.21-.914.915-.914.915-2.211h1.25a4.27 4.27 0 0 1-1.062 2.875 4.17 4.17 0 0 1-2.688 1.453v1.922z"
        />
      </g>
    </svg>
  );
}
