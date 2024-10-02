import type { SVGProps } from 'react';
export default function Stx(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <g fill="none">
        <circle cx={16} cy={16} r={16} fill="#5546FF" />
        <path
          fill="#FFF"
          d="m19.319 19.033 3.61 5.467h-2.697l-4.24-6.423-4.238 6.423H9.07l3.611-5.453H7.5v-2.07h17v2.056zm5.181-6.138v2.085h-17v-2.084h5.081L9.013 7.5h2.698l4.282 6.509L20.289 7.5h2.698l-3.568 5.395z"
        />
      </g>
    </svg>
  );
}
