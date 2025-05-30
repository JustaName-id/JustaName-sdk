import type { SVGProps } from 'react';
export default function Algo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <g fill="none">
        <circle cx={16} cy={16} r={16} fill="#000" />
        <path
          fill="#FFF"
          d="m10.25 22.916 2.303-3.986 2.301-3.972 2.288-3.986.38-.632.167.632.702 2.624-.786 1.362-2.301 3.972-2.288 3.986h2.75l2.302-3.986 1.193-2.063.562 2.063 1.066 3.986h2.47l-1.066-3.986-1.067-3.972-.28-1.025 1.712-2.961H20.16l-.085-.295-.87-3.256L19.093 7h-2.4l-.056.084-2.246 3.888-2.302 3.986-2.287 3.972L7.5 22.916z"
        />
      </g>
    </svg>
  );
}
