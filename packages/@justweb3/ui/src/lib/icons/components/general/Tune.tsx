import type { SVGProps } from 'react';
export default function Tune(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 15 16"
      {...props}
    >
      <mask
        id="tune_svg__a"
        width={15}
        height={16}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="#D9D9D9" d="M0 .5h15v15H0z" />
      </mask>
      <g mask="url(#tune_svg__a)">
        <path
          fill="var(--justweb3-primary-color)"
          d="M7.5 13q-.516 0-.883-.367a1.2 1.2 0 0 1-.367-.883q0-.516.367-.883.368-.367.883-.367.516 0 .883.367.367.368.367.883 0 .516-.367.883Q8.015 13 7.5 13m0-3.75q-.516 0-.883-.367A1.2 1.2 0 0 1 6.25 8q0-.516.367-.883.368-.367.883-.367.516 0 .883.367.367.368.367.883 0 .516-.367.883-.368.367-.883.367m0-3.75q-.516 0-.883-.367a1.2 1.2 0 0 1-.367-.883q0-.516.367-.883Q6.985 3 7.5 3q.516 0 .883.367.367.368.367.883 0 .516-.367.883-.368.367-.883.367"
        />
      </g>
    </svg>
  );
}
