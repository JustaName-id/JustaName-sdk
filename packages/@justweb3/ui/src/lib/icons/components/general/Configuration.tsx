import type { SVGProps } from 'react';
export default function Configuration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <mask
        id="configuration_svg__a"
        width={20}
        height={20}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="#D9D9D9" d="M0 0h20v20H0z" />
      </mask>
      <g mask="url(#configuration_svg__a)">
        <path
          fill={props.fill || 'var(--justweb3-primary-color)'}
          d="M9.167 18.104 3.333 14.75a1.624 1.624 0 0 1-.833-1.437V6.688a1.62 1.62 0 0 1 .833-1.438l5.834-3.354q.395-.23.833-.23t.833.23l5.834 3.354q.395.23.614.604.219.375.219.834v6.625a1.62 1.62 0 0 1-.833 1.437l-5.834 3.354q-.396.23-.833.23-.438 0-.833-.23m0-7.625v5.709l.833.479.833-.48V10.48l5-2.896v-.875l-.896-.52L10 9.042 5.063 6.188l-.896.52v.875z"
        />
      </g>
    </svg>
  );
}
