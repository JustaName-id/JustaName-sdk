import type { SVGProps } from 'react';
export default function Banner(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 17 16"
      {...props}
    >
      <path
        fill={props.fill || 'var(--justweb3-primary-color)'}
        fillRule="evenodd"
        d="M2.115 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm1 2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}
