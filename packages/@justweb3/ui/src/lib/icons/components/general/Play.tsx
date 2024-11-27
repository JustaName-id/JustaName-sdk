import type { SVGProps } from 'react';
export default function Play(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 25"
      {...props}
    >
      <mask
        id="play_svg__a"
        width={24}
        height={25}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="#D9D9D9" d="M0 .5h24v24H0z" />
      </mask>
      <g mask="url(#play_svg__a)">
        <path
          fill={props.fill || 'var(--justweb3-primary-color)'}
          d="M8 19.5v-14l11 7z"
        />
      </g>
    </svg>
  );
}
