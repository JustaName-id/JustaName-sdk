import type { SVGProps } from 'react';
export default function LocationOn(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 10"
      {...props}
    >
      <mask
        id="location-on_svg__a"
        width={10}
        height={10}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path
          fill={props.fill || 'var(--justweb3-primary-color)'}
          d="M0 0h10v10H0z"
        />
      </mask>
      <g mask="url(#location-on_svg__a)">
        <path
          fill={props.fill || 'var(--justweb3-primary-color)'}
          d="M5 5q.344 0 .588-.245a.8.8 0 0 0 .245-.588.8.8 0 0 0-.245-.589A.8.8 0 0 0 5 3.333a.8.8 0 0 0-.589.245.8.8 0 0 0-.244.589q0 .343.244.588Q4.657 5 5 5m0 4.167Q3.323 7.74 2.495 6.516T1.667 4.25q0-1.563 1.005-2.49T5 .833t2.328.927 1.005 2.49q0 1.042-.828 2.266T5 9.166"
        />
      </g>
    </svg>
  );
}
