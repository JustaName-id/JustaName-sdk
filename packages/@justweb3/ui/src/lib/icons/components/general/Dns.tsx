import type { SVGProps } from 'react';
export default function Dns(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <mask
        id="dns_svg__a"
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
      <g mask="url(#dns_svg__a)">
        <path
          fill={props.fill || 'var(--justweb3-primary-color)'}
          d="M6.25 5q-.52 0-.885.365A1.2 1.2 0 0 0 5 6.25q0 .52.365.885t.885.365.885-.365Q7.5 6.77 7.5 6.25t-.365-.885A1.2 1.2 0 0 0 6.25 5m0 8.333q-.52 0-.885.365a1.2 1.2 0 0 0-.365.885q0 .522.365.886t.885.364.885-.364q.365-.364.365-.886 0-.52-.365-.885a1.2 1.2 0 0 0-.885-.365M3.333 2.5h13.334q.354 0 .593.24.24.24.24.593v5.834q0 .354-.24.593a.8.8 0 0 1-.593.24H3.333a.8.8 0 0 1-.593-.24.8.8 0 0 1-.24-.593V3.333q0-.354.24-.593.24-.24.593-.24m0 8.333h13.334q.354 0 .593.24.24.24.24.594V17.5q0 .354-.24.594a.8.8 0 0 1-.593.24H3.333a.8.8 0 0 1-.593-.24.8.8 0 0 1-.24-.594v-5.833q0-.354.24-.594t.593-.24"
        />
      </g>
    </svg>
  );
}
