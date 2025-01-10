import type { SVGProps } from 'react';
export default function Settings(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <mask
        id="settings_svg__a"
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
      <g mask="url(#settings_svg__a)">
        <path
          fill={props.fill || 'var(--justweb3-primary-color)'}
          d="m7.708 18.333-.333-2.666q-.27-.105-.51-.25a7 7 0 0 1-.47-.313l-2.478 1.042-2.292-3.958 2.146-1.625a2 2 0 0 1-.021-.282V9.72q0-.135.02-.281L1.626 7.813l2.292-3.959 2.479 1.042q.229-.166.479-.313.25-.145.5-.25l.333-2.666h4.584l.333 2.666q.27.105.51.25.24.147.47.313l2.478-1.042 2.292 3.959-2.146 1.625q.021.145.021.28v.563q0 .135-.042.282l2.146 1.625-2.291 3.958-2.459-1.042a6 6 0 0 1-.479.313q-.25.145-.5.25l-.333 2.666zm2.334-5.416a2.8 2.8 0 0 0 2.062-.854A2.8 2.8 0 0 0 12.958 10a2.8 2.8 0 0 0-.854-2.062 2.8 2.8 0 0 0-2.062-.855q-1.23 0-2.073.855A2.83 2.83 0 0 0 7.125 10q0 1.209.844 2.063.843.854 2.073.854"
        />
      </g>
    </svg>
  );
}
