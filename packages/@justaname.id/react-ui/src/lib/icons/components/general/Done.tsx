import type { SVGProps } from 'react';
export default function Done(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 21"
      {...props}
    >
      <mask
        id="done_svg__a"
        width={20}
        height={21}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="#D9D9D9" d="M0 .316h20v20H0z" />
      </mask>
      <g mask="url(#done_svg__a)">
        <path
          fill="#06CB6C"
          d="m7.167 19.066-1.584-2.667-3-.666.292-3.084-2.042-2.333 2.042-2.333-.292-3.084 3-.666 1.584-2.667L10 2.774l2.833-1.208 1.584 2.667 3 .666-.292 3.084 2.042 2.333-2.042 2.333.292 3.084-3 .666-1.584 2.667L10 17.858zm1.958-5.792 4.708-4.708-1.166-1.208-3.542 3.541-1.792-1.75-1.166 1.167z"
        />
      </g>
    </svg>
  );
}
