import type { SVGProps } from 'react';
export default function Bps(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      viewBox="0 0 244 227"
      {...props}
    >
      <path fill="url(#bps_svg__a)" d="M0 0h244v227H0z" />
      <defs>
        <pattern
          id="bps_svg__a"
          width={1}
          height={1}
          patternContentUnits="objectBoundingBox"
        >
          <use
            xlinkHref="#bps_svg__b"
            transform="matrix(.005 0 0 .00537 0 -.037)"
          />
        </pattern>
        <image
          xlinkHref="data:image/png;base64,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"
          id="bps_svg__b"
          width={200}
          height={200}
        />
      </defs>
    </svg>
  );
}
