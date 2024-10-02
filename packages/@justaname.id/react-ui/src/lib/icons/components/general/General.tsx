import type { SVGProps } from 'react';
export default function General(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 21 20"
      {...props}
    >
      <mask
        id="general_svg__a"
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
      <g mask="url(#general_svg__a)">
        <path
          fill="var(--justaname-primary-color)"
          d="M3.833 19.167V17.5h13.334v1.667zm0-16.667V.833h13.334V2.5zm6.667 8.333a2.4 2.4 0 0 0 1.77-.729q.73-.729.73-1.77 0-1.042-.73-1.771a2.4 2.4 0 0 0-1.77-.73 2.4 2.4 0 0 0-1.77.73A2.4 2.4 0 0 0 8 8.333q0 1.042.73 1.771a2.4 2.4 0 0 0 1.77.73m-6.667 5.834q-.687 0-1.177-.49A1.6 1.6 0 0 1 2.166 15V5q0-.687.49-1.177.491-.49 1.177-.49h13.334q.687 0 1.177.49T18.834 5v10q0 .687-.49 1.177t-1.177.49zM5.292 15h10.416a6.76 6.76 0 0 0-2.27-1.833Q12.103 12.5 10.5 12.5q-1.605 0-2.937.667A6.76 6.76 0 0 0 5.292 15"
        />
      </g>
    </svg>
  );
}
