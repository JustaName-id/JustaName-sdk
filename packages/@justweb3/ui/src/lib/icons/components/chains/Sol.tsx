import type { SVGProps } from 'react';
export default function Sol(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <g fill="none">
        <circle cx={16} cy={16} r={16} fill="#66F9A1" />
        <path
          fill="#FFF"
          d="M9.925 19.687a.6.6 0 0 1 .415-.17h14.366a.29.29 0 0 1 .207.497l-2.838 2.815a.6.6 0 0 1-.415.171H7.294a.291.291 0 0 1-.207-.498zm0-10.517A.6.6 0 0 1 10.34 9h14.366c.261 0 .392.314.207.498l-2.838 2.815a.6.6 0 0 1-.415.17H7.294a.291.291 0 0 1-.207-.497zm12.15 5.225a.6.6 0 0 0-.415-.17H7.294a.291.291 0 0 0-.207.498l2.838 2.815c.11.109.26.17.415.17h14.366a.291.291 0 0 0 .207-.498z"
        />
      </g>
    </svg>
  );
}
