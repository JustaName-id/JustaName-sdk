import type { SVGProps } from 'react';
export default function Download(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 21"
      {...props}
    >
      <g clipPath="url(#download_svg__a)">
        <mask
          id="download_svg__b"
          width={20}
          height={21}
          x={0}
          y={0}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: 'alpha',
          }}
        >
          <path fill="#D9D9D9" d="M20 .5H0v20h20z" />
        </mask>
        <g mask="url(#download_svg__b)">
          <path
            fill="var(--justweb3-primary-color)"
            d="M3.333 18.833v-1.666h13.334v1.666zM10 15.5 4.167 8H7.5V2.167h5V8h3.333z"
          />
        </g>
      </g>
      <defs>
        <clipPath id="download_svg__a">
          <path d="M0 .5h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
