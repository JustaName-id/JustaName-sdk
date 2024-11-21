import type { SVGProps } from 'react';
export default function CalendarClock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 10"
      {...props}
    >
      <mask
        id="calendar-clock_svg__a"
        width={10}
        height={10}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="var(--justweb3-primary-color)" d="M0 0h10v10H0z" />
      </mask>
      <g mask="url(#calendar-clock_svg__a)">
        <path
          fill="var(--justweb3-primary-color)"
          d="M2.083 9.167a.8.8 0 0 1-.588-.245.8.8 0 0 1-.245-.589V2.5q0-.344.245-.589a.8.8 0 0 1 .588-.244H2.5V.833h.833v.834h3.334V.833H7.5v.834h.417q.344 0 .588.244.245.246.245.589v1.948q0 .177-.12.297a.4.4 0 0 1-.297.12.4.4 0 0 1-.297-.12.4.4 0 0 1-.12-.297v-.281H2.084v4.166H4.5q.177 0 .297.12t.12.297-.12.297a.4.4 0 0 1-.297.12zm5.417.416a2 2 0 0 1-1.474-.61 2 2 0 0 1-.61-1.473q0-.864.61-1.474t1.474-.61 1.474.61q.61.61.61 1.474 0 .865-.61 1.474-.61.61-1.474.61m.698-1.094.292-.291-.782-.781V6.25h-.416v1.333z"
        />
      </g>
    </svg>
  );
}
