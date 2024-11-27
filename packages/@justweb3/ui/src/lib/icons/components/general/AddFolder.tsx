import type { SVGProps } from 'react';
export default function AddFolder(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 15 15"
      {...props}
    >
      <mask
        id="add-folder_svg__a"
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
      <g mask="url(#add-folder_svg__a)">
        <path
          fill={props.fill || 'var(--justweb3-primary-color)'}
          d="M8.75 10H10V8.75h1.25V7.5H10V6.25H8.75V7.5H7.5v1.25h1.25zM2.5 12.5q-.516 0-.883-.367a1.2 1.2 0 0 1-.367-.883v-7.5q0-.516.367-.883.368-.367.883-.367h3.75L7.5 3.75h5q.516 0 .883.367.367.368.367.883v6.25q0 .516-.367.883a1.2 1.2 0 0 1-.883.367z"
        />
      </g>
    </svg>
  );
}
