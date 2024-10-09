import type { SVGProps } from 'react';
export default function Medium(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 21"
      {...props}
    >
      <path d="M0 .5h20v20H0z" />
      <path
        fill="var(--justaname-primary-color)"
        d="M6.89 6.45c2.223 0 4.024 1.813 4.024 4.05s-1.801 4.05-4.023 4.05-4.023-1.813-4.023-4.05S4.669 6.45 6.89 6.45m6.425.237c1.111 0 2.012 1.707 2.012 3.813s-.9 3.813-2.011 3.813-2.012-1.707-2.012-3.813.9-3.813 2.011-3.813m3.11.397c.39 0 .707 1.53.707 3.416s-.317 3.416-.707 3.416c-.391 0-.708-1.53-.708-3.416 0-1.887.317-3.416.708-3.416"
      />
    </svg>
  );
}
