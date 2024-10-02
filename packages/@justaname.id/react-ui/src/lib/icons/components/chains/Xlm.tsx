import type { SVGProps } from 'react';
export default function Xlm(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <g fill="none">
        <circle cx={16} cy={16} r={16} fill="#000" />
        <path
          fill="#FFF"
          d="m23.13 9.292-2.4 1.224-11.598 5.907A6.909 6.909 0 0 1 19.35 9.498l1.374-.7.205-.105a8.439 8.439 0 0 0-13.371 7.472 1.535 1.535 0 0 1-.834 1.484l-.725.37v1.724l2.134-1.088.691-.353.681-.347 12.226-6.23 1.374-.699 2.84-1.447V7.856zm2.816 2.012L10.201 19.32l-1.374.7L6 21.463v1.723l2.808-1.43 2.401-1.224 11.61-5.916a6.909 6.909 0 0 1-10.229 6.93l-.085.045-1.49.76a8.439 8.439 0 0 0 13.372-7.475 1.54 1.54 0 0 1 .833-1.483l.726-.37v-1.718z"
        />
      </g>
    </svg>
  );
}
