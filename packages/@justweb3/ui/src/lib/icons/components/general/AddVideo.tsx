import type { SVGProps } from 'react';
export default function AddVideo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 15 15"
      {...props}
    >
      <mask
        id="add-video_svg__a"
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
      <g mask="url(#add-video_svg__a)">
        <path
          fill={props.fill || 'var(--justweb3-primary-color)'}
          d="M5.625 10h1.25V8.125H8.75v-1.25H6.875V5h-1.25v1.875H3.75v1.25h1.875zM2.5 12.5q-.516 0-.883-.367a1.2 1.2 0 0 1-.367-.883v-7.5q0-.516.367-.883.368-.367.883-.367H10q.516 0 .883.367.367.368.367.883v2.813l2.5-2.5v6.875l-2.5-2.5v2.812q0 .516-.367.883A1.2 1.2 0 0 1 10 12.5z"
        />
      </g>
    </svg>
  );
}
