import type { SVGProps } from 'react';
export default function PhotoCamera(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <mask
        id="photo-camera_svg__a"
        width={32}
        height={32}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="#D9D9D9" d="M0 0h32v32H0z" />
      </mask>
      <g mask="url(#photo-camera_svg__a)">
        <path
          fill="var(--justweb3-background-color)"
          d="M10.667 22.667h10.666v-.734q0-1.5-1.466-2.383-1.467-.883-3.867-.883t-3.867.883-1.466 2.383zM16 17.333q1.099 0 1.883-.783t.784-1.883q0-1.1-.784-1.884A2.57 2.57 0 0 0 16 12q-1.1 0-1.883.783a2.57 2.57 0 0 0-.784 1.884q0 1.099.784 1.883.783.783 1.883.783M5.333 28a2.57 2.57 0 0 1-1.883-.783 2.57 2.57 0 0 1-.784-1.884v-16q0-1.099.784-1.883a2.57 2.57 0 0 1 1.883-.783h4.2L12 4h8l2.467 2.667h4.2q1.099 0 1.883.783.783.783.783 1.883v16q0 1.1-.783 1.884a2.57 2.57 0 0 1-1.884.783zm0-2.667h21.334v-16h-5.4l-2.434-2.666h-5.666l-2.434 2.666h-5.4z"
        />
      </g>
    </svg>
  );
}
