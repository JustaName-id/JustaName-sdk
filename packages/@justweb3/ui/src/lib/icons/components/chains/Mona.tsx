import type { SVGProps } from 'react';
export default function Mona(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <g fill="none">
        <circle cx={16} cy={16} r={16} fill="#DEC799" />
        <path
          fill="#FFF"
          d="M23.53 13.414 22.105 7l-2.797 4.414a14.1 14.1 0 0 0-6.617 0L9.902 7l-1.43 6.414C6.937 14.642 6 16.247 6 18.009c0 3.86 4.476 6.989 9.997 6.989s9.997-3.13 9.997-6.989c-.001-1.762-.93-3.367-2.465-4.595zM10.442 16.35h-.666l1.627-1.876h1.184zm5.504 4.584-2.766-4.872.683-.39.617 1.085h3.021l.644-1.09.676.402zm5.613-4.584-2.146-1.876h1.192l1.625 1.876zm-5.6 3.015-1.033-1.82h2.108z"
        />
      </g>
    </svg>
  );
}
