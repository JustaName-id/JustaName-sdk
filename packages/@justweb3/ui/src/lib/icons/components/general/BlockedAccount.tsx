import type { SVGProps } from 'react';
export default function BlockedAccount(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 25"
      {...props}
    >
      <mask
        id="blocked-account_svg__a"
        width={24}
        height={25}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path
          fill={props.fill || 'var(--justweb3-primary-color)'}
          d="M0 .5h24v24H0z"
        />
      </mask>
      <g mask="url(#blocked-account_svg__a)">
        <path
          fill={props.fill || 'var(--justweb3-primary-color)'}
          d="M15.2 11.45 10.55 6.8q.35-.15.712-.225A3.6 3.6 0 0 1 12 6.5q1.475 0 2.488 1.013T15.5 10a3.6 3.6 0 0 1-.3 1.45M5.85 17.6q1.275-.975 2.85-1.538A9.7 9.7 0 0 1 12 15.5q.45 0 .863.037.412.038.862.113l-2.2-2.2a3.38 3.38 0 0 1-2.013-.987 3.38 3.38 0 0 1-.987-2.013L5.675 7.6A7.855 7.855 0 0 0 4 12.5q0 1.474.487 2.775.488 1.3 1.363 2.325m12.45-.2a8.2 8.2 0 0 0 1.25-2.262Q20 13.9 20 12.5q0-3.325-2.337-5.662Q15.325 4.5 12 4.5q-1.4 0-2.637.45T7.1 6.2zM12 22.5a9.7 9.7 0 0 1-3.875-.788 10.1 10.1 0 0 1-3.187-2.15 10.1 10.1 0 0 1-2.15-3.187A9.7 9.7 0 0 1 2 12.5q0-2.075.788-3.887a10.2 10.2 0 0 1 2.15-3.175 10.1 10.1 0 0 1 3.187-2.15A9.7 9.7 0 0 1 12 2.5q2.076 0 3.887.788a10.2 10.2 0 0 1 3.175 2.15 10.2 10.2 0 0 1 2.15 3.175A9.65 9.65 0 0 1 22 12.5a9.7 9.7 0 0 1-.788 3.875 10.1 10.1 0 0 1-2.15 3.188 10.2 10.2 0 0 1-3.175 2.15A9.65 9.65 0 0 1 12 22.5"
        />
      </g>
    </svg>
  );
}
