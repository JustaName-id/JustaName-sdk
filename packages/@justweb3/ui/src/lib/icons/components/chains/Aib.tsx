import type { SVGProps } from 'react';
export default function Aib(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1732 2000" {...props}>
      <defs>
        <linearGradient
          id="aib_svg__a"
          x1={1687.08}
          x2={320.4}
          y1={320.67}
          y2={1687.36}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#60c6f2" />
          <stop offset={0.32} stopColor="#60c6f2" />
          <stop offset={0.66} stopColor="#1e4281" />
          <stop offset={1} stopColor="#1e4281" />
        </linearGradient>
      </defs>
      <path
        fill="url(#aib_svg__a)"
        d="M134 500v1000l866 500 866-500V500L1000 0Zm917.36-297.14 600.88 346.93-300.45 173.5Zm-703.6 346.95 584.81-337.65-292.42 506.47Zm422.31 243.84 224.59-389 227.24 393.64L1000 926.4Zm656.74 59.54 289.18-167v667.86ZM284 686.23l281.16 162.32L284 1335.53zm411 237.32 230 132.75v248.41H475Zm380 132.75 221.88-128.1 217.38 376.5H1075Zm0 398.42h569.41L1075 1783.49Zm-719.42 0H925v328.77Z"
        transform="translate(-134)"
      />
    </svg>
  );
}
