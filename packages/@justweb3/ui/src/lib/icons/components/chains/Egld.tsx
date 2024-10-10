import type { SVGProps } from 'react';
export default function Egld(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 2500 2500"
      {...props}
    >
      <path
        d="M0 0h2500v2500H0z"
        style={{
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        }}
      />
      <path
        d="m1313 1250 527-275-88-165-483 192c-11 5-27 5-38 0L748 810l-88 165 527 275-527 275 88 165 483-192c11-5 27-5 38 0l483 192 88-165z"
        style={{
          fill: '#23f7dd',
        }}
      />
    </svg>
  );
}
