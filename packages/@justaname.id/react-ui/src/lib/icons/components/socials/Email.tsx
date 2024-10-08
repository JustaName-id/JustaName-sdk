import type { SVGProps } from 'react';
export default function Email(props: SVGProps<SVGSVGElement>) {
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
        d="M17.5 6.528a2 2 0 0 0-2-2h-11a2 2 0 0 0-2 2v7.944a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2zm-1.5.634a.63.63 0 0 1-.299.538l-4.645 2.89a2 2 0 0 1-2.112 0L4.299 7.7a.634.634 0 0 1 .67-1.076l3.975 2.472a2 2 0 0 0 2.112 0l3.975-2.472a.634.634 0 0 1 .969.538"
      />
    </svg>
  );
}
