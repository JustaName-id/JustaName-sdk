import type { SVGProps } from 'react';
export default function Vet(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <g fill="none" fillRule="evenodd">
        <circle cx={16} cy={16} r={16} fill="#15BDFF" />
        <path
          fill="#FFF"
          fillRule="nonzero"
          d="M14.738 24.734 7.04 9.046a.38.38 0 0 1 .34-.546h2.668c.143 0 .277.08.34.206l5.622 11.381c.5 1.02 1.951 1.02 2.452 0l5.604-11.372a.38.38 0 0 1 .34-.206h.332c.197 0 .322.206.233.376l-7.78 15.85c-.501 1.02-1.951 1.02-2.453 0z"
        />
      </g>
    </svg>
  );
}
