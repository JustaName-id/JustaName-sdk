import type { SVGProps } from 'react';
export default function Reddit(props: SVGProps<SVGSVGElement>) {
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
        d="M9 11.332a.837.837 0 0 0-.832-.832.832.832 0 1 0 .832.832m2.672 1.896c-.36.36-1.128.488-1.672.488s-1.312-.128-1.672-.488a.21.21 0 0 0-.304 0 .21.21 0 0 0 0 .304c.568.568 1.656.616 1.976.616s1.408-.048 1.976-.616a.207.207 0 0 0 0-.304.22.22 0 0 0-.304 0m.16-2.728a.837.837 0 0 0-.832.832c0 .456.376.832.832.832a.831.831 0 1 0 0-1.664"
      />
      <path
        fill="var(--justweb3-primary-color)"
        d="M10 2.5c-4.416 0-8 3.584-8 8s3.584 8 8 8 8-3.584 8-8-3.584-8-8-8m4.64 9.064q.024.17.024.352c0 1.792-2.088 3.248-4.664 3.248s-4.664-1.456-4.664-3.248c0-.12.008-.24.024-.352a1.17 1.17 0 0 1-.688-1.064 1.164 1.164 0 0 1 1.976-.84c.808-.584 1.928-.952 3.168-.992l.592-2.792a.17.17 0 0 1 .088-.128.23.23 0 0 1 .16-.032l1.936.416a.832.832 0 1 1 .744 1.2.834.834 0 0 1-.832-.792l-1.736-.368-.528 2.496c1.224.04 2.32.416 3.12.992a1.164 1.164 0 1 1 1.28 1.904"
      />
    </svg>
  );
}
