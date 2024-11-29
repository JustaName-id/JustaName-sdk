import type { SVGProps } from 'react';
export default function Clip(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 11 11"
      {...props}
    >
      <mask
        id="clip_svg__a"
        width={11}
        height={11}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="#D9D9D9" d="M.5.5h10v10H.5z" />
      </mask>
      <g mask="url(#clip_svg__a)">
        <path
          fill={props.fill || 'var(--justweb3-primary-color)'}
          d="M4.25 8a.8.8 0 0 1-.589-.245.8.8 0 0 1-.244-.588v-5q0-.345.244-.589a.8.8 0 0 1 .589-.245H8q.344 0 .589.245.244.245.244.589v5q0 .343-.244.588A.8.8 0 0 1 8 8zM2.583 9.667a.8.8 0 0 1-.588-.245.8.8 0 0 1-.245-.588V3h.833v5.834h4.584v.833z"
        />
      </g>
    </svg>
  );
}
