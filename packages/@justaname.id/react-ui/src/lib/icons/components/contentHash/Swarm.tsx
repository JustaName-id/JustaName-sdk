import type { SVGProps } from 'react';
export default function Swarm(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 31" {...props}>
      <path
        d="m0 26.988 7.313 3.989 7.312-3.989v-7.96l-7.312-3.993L0 19.027ZM24.176.027l-3.863 2.11-.008.031v4.215l3.87 2.11.036.015 3.863-2.106v-4.25ZM31.363 19.027l-7.312-3.992-7.313 3.992v7.961l7.313 3.989 7.312-3.989Zm0 0"
        style={{
          stroke: 'none',
          fillRule: 'nonzero',
          fill: '#ff8a00',
          fillOpacity: 1,
        }}
      />
      <path
        d="m15.625 1.137-7.3 3.988v7.96l7.312 3.985 7.312-3.984V9.914l-3.562-1.941-.961-.52V2.762Zm0 0"
        style={{
          stroke: 'none',
          fillRule: 'nonzero',
          fill: '#ff8a00',
          fillOpacity: 1,
        }}
      />
    </svg>
  );
}
