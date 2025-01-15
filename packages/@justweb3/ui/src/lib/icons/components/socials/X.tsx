import type { SVGProps } from 'react';
export default function X(props: SVGProps<SVGSVGElement>) {
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
        d="M14.026 3.5h2.146l-4.69 5.93L17 17.5h-4.32l-3.383-4.895L5.424 17.5H3.276l5.017-6.344L3 3.501h4.43l3.058 4.473zm-.753 12.579h1.189L6.784 4.847H5.507z"
      />
    </svg>
  );
}
