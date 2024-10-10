import type { SVGProps } from 'react';
export default function Mapp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <mask
        id="mapp_svg__a"
        width={20}
        height={20}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="#D9D9D9" d="M0 0h20v20H0z" />
      </mask>
      <g mask="url(#mapp_svg__a)">
        <path
          fill="var(--justweb3-primary-color)"
          d="M9.167 16.23 5 13.832a1.63 1.63 0 0 1-.615-.614 1.64 1.64 0 0 1-.218-.823V7.604q0-.438.218-.823.219-.386.615-.614L9.167 3.77q.395-.23.833-.23t.833.23L15 6.167q.396.228.615.614t.218.823v4.792q0 .437-.218.823-.219.386-.615.614l-4.167 2.396a1.64 1.64 0 0 1-.833.23 1.64 1.64 0 0 1-.833-.23m-7.5-10.397v-2.5q0-.687.49-1.177.489-.49 1.176-.49h2.5v1.667h-2.5v2.5zm4.166 12.5h-2.5q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.176v-2.5h1.667v2.5h2.5zm8.334 0v-1.666h2.5v-2.5h1.666v2.5q0 .687-.49 1.177-.489.49-1.176.49zm2.5-12.5v-2.5h-2.5V1.667h2.5q.687 0 1.177.49.49.489.49 1.176v2.5zM6.708 7.104l-.875.5v.938l3.334 1.937v3.834l.833.479.833-.48V10.48l3.334-1.937v-.938l-.875-.5L10 9.042z"
        />
      </g>
    </svg>
  );
}
