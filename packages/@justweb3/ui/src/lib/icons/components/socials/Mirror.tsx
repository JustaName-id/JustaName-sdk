import type { SVGProps } from 'react';
export default function Mirror(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 21"
      {...props}
    >
      <path d="M0 .5h20v20H0z" />
      <path
        fill="var(--justweb3-primary-color)"
        d="M3.86 8.422a6.14 6.14 0 1 1 12.28 0v8.802c0 .825-.67 1.494-1.495 1.494h-9.29a1.494 1.494 0 0 1-1.495-1.494z"
      />
    </svg>
  );
}
