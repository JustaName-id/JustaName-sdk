import type { SVGProps } from 'react';
export default function Xmr(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <g fill="none" fillRule="evenodd">
        <circle cx={16} cy={16} r={16} fill="#F60" />
        <path
          fill="#FFF"
          fillRule="nonzero"
          d="M15.97 5.235c5.985 0 10.825 4.84 10.825 10.824a11 11 0 0 1-.558 3.432h-3.226v-9.094l-7.04 7.04-7.04-7.04v9.094H5.704a11 11 0 0 1-.557-3.432c0-5.984 4.84-10.824 10.824-10.824zM14.358 19.02 16 20.635l1.613-1.614 3.051-3.08v5.72h4.547a10.8 10.8 0 0 1-9.24 5.192c-3.902 0-7.334-2.082-9.24-5.192h4.546v-5.72l3.08 3.08z"
        />
      </g>
    </svg>
  );
}
