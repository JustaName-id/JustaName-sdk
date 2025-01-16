import type { SVGProps } from 'react';
export default function Instagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 21"
      {...props}
    >
      <path d="M0 .5h20v20H0z" />
      <path
        fill={props.fill || 'var(--justweb3-primary-color)'}
        fillRule="evenodd"
        d="M5.715 3A3.215 3.215 0 0 0 2.5 6.213v8.572A3.215 3.215 0 0 0 5.715 18h8.572a3.214 3.214 0 0 0 3.213-3.215V6.213A3.215 3.215 0 0 0 14.287 3zm9.496 3.218a.926.926 0 1 1-1.85 0 .926.926 0 0 1 1.85 0m-5.21 1.714a2.568 2.568 0 1 0 0 5.135 2.568 2.568 0 0 0 0-5.135m-3.803 2.567a3.802 3.802 0 1 1 7.605 0 3.802 3.802 0 0 1-7.605 0"
        clipRule="evenodd"
      />
    </svg>
  );
}
