import type { SVGProps } from 'react';
export default function Nickname(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 21 21"
      {...props}
    >
      <mask
        id="nickname_svg__a"
        width={21}
        height={21}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="#D9D9D9" d="M.115.855h20v20h-20z" />
      </mask>
      <g mask="url(#nickname_svg__a)">
        <path
          fill="var(--justweb3-primary-color)"
          d="M11.782 11.688h4.166v-1.666h-4.166zm0-2.5h4.166V7.522h-4.166zm-7.5 5h6.666v-.458q0-.938-.916-1.49-.917-.552-2.417-.552t-2.417.552q-.915.552-.916 1.49zm3.333-3.333q.687 0 1.177-.49.49-.489.49-1.177 0-.687-.49-1.177a1.6 1.6 0 0 0-1.177-.49q-.687 0-1.177.49t-.49 1.177.49 1.177 1.177.49m-4.167 6.667q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177v-10q0-.687.49-1.177.491-.49 1.177-.49h13.334q.687 0 1.177.49t.49 1.177v10q0 .687-.49 1.177t-1.177.49z"
        />
      </g>
    </svg>
  );
}
