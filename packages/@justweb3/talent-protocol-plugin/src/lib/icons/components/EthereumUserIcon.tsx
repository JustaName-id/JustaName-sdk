import type { SVGProps } from 'react';
export default function EthereumUserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden="true"
      color="#fff"
      viewBox="0 0 13 20"
      {...props}
    >
      <path
        fill="var(--justweb3-primary-color)"
        d="m6.367 13.815 6.14-3.629L6.366 0 .228 10.186z"
      />
      <path
        fill="var(--justweb3-primary-color)"
        d="m6.367 20.001 6.142-8.65-6.142 3.625-6.139-3.624z"
      />
    </svg>
  );
}
