import type { SVGProps } from 'react';
export default function Base(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 30 30"
      {...props}
    >
      <g clipPath="url(#base_svg__a)">
        <path
          fill="#0052FF"
          fillRule="evenodd"
          d="M14.97 30C23.272 30 30 23.284 30 15S23.271 0 14.97 0C7.214 0 .83 5.864.026 13.393h19.775v2.946H0C.679 23.996 7.122 30 14.97 30"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="base_svg__a">
          <path fill="#fff" d="M0 0h30v30H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
