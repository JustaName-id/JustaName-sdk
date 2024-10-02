import type { SVGProps } from 'react';
export default function Rune(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 253.3 290.5"
      {...props}
    >
      <linearGradient
        id="rune_svg__a"
        x1={-321.725}
        x2={-320.725}
        y1={644.281}
        y2={644.281}
        gradientTransform="matrix(253.26 0 0 -290.5 81479.977 187309)"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset={0}
          style={{
            stopColor: '#0cf',
          }}
        />
        <stop
          offset={1}
          style={{
            stopColor: '#3f9',
          }}
        />
      </linearGradient>
      <path
        d="m0 290.5 202.8-85.4-64.2-65.1zM74.5 75l64.2 65L253.3 0z"
        style={{
          fill: 'url(#rune_svg__a)',
        }}
      />
    </svg>
  );
}
