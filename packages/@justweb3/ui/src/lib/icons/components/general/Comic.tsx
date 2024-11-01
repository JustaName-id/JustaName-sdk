import type { SVGProps } from 'react';
export default function Comic(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 21 20"
      {...props}
    >
      <mask
        id="comic_svg__a"
        width={21}
        height={20}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="#D9D9D9" d="M.5 0h20v20H.5z" />
      </mask>
      <g mask="url(#comic_svg__a)">
        <path
          fill="var(--justweb3-primary-color)"
          d="M9.667 17.417 7.25 15H3.833v-3.417L1.417 9.167 3.833 6.75V3.333H7.25L9.667.917l2.416 2.416H15.5V6.75l2.417 2.417-2.417 2.416 2.396 4.709q.146.27.083.53a.9.9 0 0 1-.229.428.9.9 0 0 1-.427.23.73.73 0 0 1-.531-.084L12.083 15z"
        />
      </g>
    </svg>
  );
}
