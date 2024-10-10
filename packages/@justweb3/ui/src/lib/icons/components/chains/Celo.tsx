import type { SVGProps } from 'react';
export default function Celo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 2500 2500"
      {...props}
    >
      <circle
        cx={1250}
        cy={1250}
        r={1250}
        style={{
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          fill: '#fcff52',
        }}
      />
      <path
        d="M1949.3 546.2H550.7v1407.7h1398.7v-491.4h-232.1c-80 179.3-260.1 304.1-466.2 304.1-284.1 0-514.2-233.6-514.2-517.5 0-284 230.1-515.6 514.2-515.6 210.1 0 390.2 128.9 470.2 312.1h228.1V546.2z"
        style={{
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        }}
      />
    </svg>
  );
}
