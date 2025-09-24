import type { SVGProps } from 'react';
export default function SwitchAccount(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 10"
      {...props}
    >
      <mask
        id="switch-account_svg__a"
        width={10}
        height={10}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill="#D9D9D9" d="M0 0h10v10H0z" />
      </mask>
      <g mask="url(#switch-account_svg__a)">
        <path
          fill={props.fill || 'var(--justweb3-primary-color)'}
          d="M5.833 4.583q.522 0 .886-.364t.364-.886q0-.52-.364-.885a1.2 1.2 0 0 0-.886-.365q-.52 0-.885.365a1.2 1.2 0 0 0-.365.885q0 .522.365.886t.885.364m-2.5 1.98a3.2 3.2 0 0 1 1.125-.85 3.3 3.3 0 0 1 1.375-.296 3.3 3.3 0 0 1 1.375.297q.657.295 1.125.849V1.667h-5zm0 .937a.8.8 0 0 1-.588-.245.8.8 0 0 1-.245-.588v-5q0-.345.245-.589a.8.8 0 0 1 .588-.245h5q.345 0 .589.245.245.245.245.589v5q0 .343-.245.588a.8.8 0 0 1-.589.245zM1.667 9.167a.8.8 0 0 1-.589-.245.8.8 0 0 1-.245-.589V2.5h.834v5.833H7.5v.834zM5.833 3.75a.4.4 0 0 1-.297-.12.4.4 0 0 1-.12-.297q0-.177.12-.297t.297-.12.297.12.12.297-.12.297a.4.4 0 0 1-.297.12M4.458 6.667h2.75a2.3 2.3 0 0 0-.656-.313 2.54 2.54 0 0 0-1.437 0q-.355.105-.657.313"
        />
      </g>
    </svg>
  );
}
