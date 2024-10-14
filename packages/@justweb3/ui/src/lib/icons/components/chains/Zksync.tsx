import type { SVGProps } from 'react';
export default function Zksync(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      id="zksync_svg__Layer_1"
      x={0}
      y={0}
      viewBox="0 0 400 400"
      {...props}
    >
      <style>{'.zksync_svg__st1{fill-rule:evenodd;clip-rule:evenodd}'}</style>
      <circle
        cx={200}
        cy={200}
        r={200}
        style={{
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          fill: '#fff',
        }}
      />
      <path
        d="m316 199-66.7-66.4v48.6l-66.2 48.7h66.2v35.5zM81 199l66.7 66.4v-48.3l66.2-49.1h-66.2v-35.5z"
        className="zksync_svg__st1"
      />
    </svg>
  );
}
