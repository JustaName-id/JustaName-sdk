import type { SVGProps } from 'react';
export default function Attachment(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 21 20"
      {...props}
    >
      <mask
        id="attachment_svg__a"
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
      <g mask="url(#attachment_svg__a)">
        <path
          fill="#3280F4"
          d="M15.5 13.125q0 2.166-1.52 3.688-1.522 1.52-3.688 1.52t-3.688-1.52q-1.52-1.521-1.52-3.688V5.417q0-1.562 1.093-2.657 1.095-1.093 2.656-1.093 1.563 0 2.656 1.093 1.095 1.094 1.094 2.657v7.291q0 .959-.666 1.625a2.2 2.2 0 0 1-1.625.667q-.96 0-1.625-.667A2.2 2.2 0 0 1 8 12.708V5h1.667v7.708a.607.607 0 0 0 .625.625.607.607 0 0 0 .625-.625V5.417a2.1 2.1 0 0 0-.615-1.48 1.98 1.98 0 0 0-1.469-.604q-.875 0-1.479.604a2.01 2.01 0 0 0-.604 1.48v7.708q-.021 1.48 1.02 2.51 1.042 1.032 2.522 1.032 1.458 0 2.479-1.032 1.02-1.03 1.062-2.51V5H15.5z"
        />
      </g>
    </svg>
  );
}
