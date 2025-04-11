import type { SVGProps } from 'react';
export default function MemberContacts(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 12 12"
      {...props}
    >
      <path
        stroke={props.fill || 'var(--justweb3-primary-color)'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.5}
        d="M3.125 1.125h5.75a1 1 0 0 1 1 1v7.75a1 1 0 0 1-1 1h-5.75a1 1 0 0 1-1-1v-7.75a1 1 0 0 1 1-1M6 3.319A1.34 1.34 0 1 0 6 6a1.34 1.34 0 0 0 0-2.681m0 3.169c-1.492 0-2.681.416-2.681.914v1.28H8.68v-1.28c0-.498-1.19-.915-2.681-.915"
      />
    </svg>
  );
}
