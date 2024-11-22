import type { SVGProps } from 'react';
export default function BaseLearnIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden="true"
      color="#fff"
      viewBox="0 0 65 64"
      {...props}
    >
      <g clipPath="url(#BaseLearnIcon_svg__a)">
        <path
          fill="var(--justweb3-primary-color)"
          d="M31.916 63.443c17.55 0 31.777-14.202 31.777-31.721C63.693 14.202 49.466 0 31.916 0 15.266 0 1.606 12.784.25 29.055h42.002v5.333H.25C1.607 50.66 15.266 63.443 31.916 63.443"
        />
      </g>
      <defs>
        <clipPath id="BaseLearnIcon_svg__a">
          <path fill="var(--justweb3-primary-color)" d="M.25 0h64v64h-64z" />
        </clipPath>
      </defs>
    </svg>
  );
}
