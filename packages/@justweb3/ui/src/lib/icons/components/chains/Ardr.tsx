import type { SVGProps } from 'react';
export default function Ardr(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <g fill="none" fillRule="evenodd">
        <circle cx={16} cy={16} r={16} fill="#3C87C7" />
        <path
          fill="#FFF"
          d="m15.883 17.19 1.769 2.312L12.5 23zM16 6l2.727 4.474L11.455 23H6zm0 9.842 3.636-2.684L26 23h-4.545z"
        />
      </g>
    </svg>
  );
}
