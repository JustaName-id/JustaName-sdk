import type { SVGProps } from 'react';
export default function Hbar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2500 2500" {...props}>
      <g data-name="Layer 2">
        <g data-name="Layer 1">
          <path d="M1250 0C559.64 0 0 559.64 0 1250s559.64 1250 1250 1250 1250-559.64 1250-1250S1940.36 0 1250 0" />
          <path
            d="M1758.12 1790.62h-158.74v-337.49H900.62v337.49H741.87V696.25h158.75v329.37h698.76V696.25h158.75Zm-850-463.75h698.75V1152.5H908.12Z"
            style={{
              fill: '#fff',
            }}
          />
        </g>
      </g>
    </svg>
  );
}
