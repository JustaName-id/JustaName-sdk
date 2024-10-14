import type { SVGProps } from 'react';
export default function Linkedin(props: SVGProps<SVGSVGElement>) {
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
        d="M14.667 4.5A1.333 1.333 0 0 1 16 5.833v9.334a1.334 1.334 0 0 1-1.333 1.333H5.333A1.334 1.334 0 0 1 4 15.167V5.833A1.333 1.333 0 0 1 5.333 4.5zm-.334 10.333V11.3a2.173 2.173 0 0 0-2.173-2.173c-.567 0-1.227.346-1.547.866v-.74h-1.86v5.58h1.86v-3.286a.93.93 0 1 1 1.86 0v3.286zM6.587 8.207a1.12 1.12 0 0 0 1.12-1.12 1.124 1.124 0 1 0-1.12 1.12m.926 6.626v-5.58H5.667v5.58z"
      />
    </svg>
  );
}
