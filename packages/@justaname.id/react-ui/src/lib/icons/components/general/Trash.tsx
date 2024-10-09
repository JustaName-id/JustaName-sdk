import type { SVGProps } from 'react';
export default function Trash(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 21 20"
      {...props}
    >
      <mask
        id="trash_svg__a"
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
      <g mask="url(#trash_svg__a)">
        <path
          fill="red"
          d="m8.334 13.75 2.166-2.167 2.167 2.167 1.167-1.167-2.167-2.166 2.167-2.167-1.167-1.167L10.5 9.25 8.334 7.083 7.167 8.25l2.167 2.167-2.167 2.166zm-2 3.75q-.688 0-1.178-.49a1.6 1.6 0 0 1-.49-1.177V5h-.833V3.333H8V2.5h5v.833h4.167V5h-.834v10.833q0 .688-.49 1.177-.488.49-1.176.49zM14.667 5H6.334v10.833h8.333z"
        />
      </g>
    </svg>
  );
}
