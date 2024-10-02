import type { SVGProps } from 'react';
export default function Wallet(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <mask
        id="wallet_svg__a"
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
      <g mask="url(#wallet_svg__a)">
        <path
          fill="var(--justaname-primary-color)"
          d="M5 16.667a3.2 3.2 0 0 1-2.354-.98 3.2 3.2 0 0 1-.98-2.354V6.667q0-1.376.98-2.354A3.2 3.2 0 0 1 5 3.333h10a3.2 3.2 0 0 1 2.354.98 3.2 3.2 0 0 1 .98 2.354v6.666a3.2 3.2 0 0 1-.98 2.355 3.2 3.2 0 0 1-2.354.979zm0-10h10q.458 0 .875.104t.792.333v-.437q0-.688-.49-1.177A1.6 1.6 0 0 0 15 5H5q-.687 0-1.177.49-.49.489-.49 1.177v.437q.375-.23.792-.333.417-.105.875-.104M3.458 9.375l9.271 2.25q.188.042.375 0a.9.9 0 0 0 .354-.167l2.896-2.416a1.8 1.8 0 0 0-.583-.51A1.55 1.55 0 0 0 15 8.332H5q-.541 0-.948.282-.406.28-.594.76"
        />
      </g>
    </svg>
  );
}
