import type { SVGProps } from 'react';
export default function AddImage(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 15 15"
      {...props}
    >
      <mask
        id="add-image_svg__a"
        width={15}
        height={15}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="#D9D9D9" d="M0 0h15v15H0z" />
      </mask>
      <g mask="url(#add-image_svg__a)">
        <path
          fill={props.fill || 'var(--justweb3-primary-color)'}
          d="M3.125 13.125q-.516 0-.883-.367a1.2 1.2 0 0 1-.367-.883v-8.75q0-.516.367-.883.368-.367.883-.367H8.75V5H10v1.25h3.125v5.625q0 .516-.367.883a1.2 1.2 0 0 1-.883.367zm.625-2.5h7.5L8.906 7.5 7.031 10 5.625 8.125zm6.875-5v-1.25h-1.25v-1.25h1.25v-1.25h1.25v1.25h1.25v1.25h-1.25v1.25z"
        />
      </g>
    </svg>
  );
}
