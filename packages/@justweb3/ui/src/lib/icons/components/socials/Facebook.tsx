import type { SVGProps } from 'react';
export default function Facebook(props: SVGProps<SVGSVGElement>) {
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
        d="M17.5 10.519C17.5 6.369 14.14 3 10 3s-7.5 3.368-7.5 7.519a7.52 7.52 0 0 0 6 7.368v-5.113H7V10.52h1.5v-1.88a2.63 2.63 0 0 1 2.625-2.631H13v2.255h-1.5a.753.753 0 0 0-.75.752v1.504H13v2.255h-2.25V18c3.787-.376 6.75-3.579 6.75-7.481"
      />
    </svg>
  );
}
