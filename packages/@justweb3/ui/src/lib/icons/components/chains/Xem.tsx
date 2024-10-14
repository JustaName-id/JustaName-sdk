import type { SVGProps } from 'react';
export default function Xem(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <g fill="none" fillRule="evenodd">
        <circle cx={16} cy={16} r={16} fill="#67B2E8" />
        <path
          fill="#FFF"
          d="M6.145 11.954A20 20 0 0 1 6 9.636a20 20 0 0 1 4.152-1.779 20.2 20.2 0 0 1 6.262-.853c.568.011 1.39.074 2.014.141a6 6 0 0 0-3.065 4.19c-.06.314-.093.64-.104.988-.016.536-.068.958-.18 1.353a4.53 4.53 0 0 1-8.469.672 1.5 1.5 0 0 1-.1-.3 20 20 0 0 1-.365-2.094m16.613 8.56q-.358.554-.752 1.085a5.9 5.9 0 0 0-.73-2.89 5.93 5.93 0 0 0-2.146-2.263l-.09-.055-.149-.09q-1.707-1.083-2.074-3.041A4.52 4.52 0 0 1 20.2 8.041q1.228-.297 2.437.083c.619.195 1.245.45 2.008.807.44.207.884.437 1.356.704a20 20 0 0 1-.452 4.148 20.2 20.2 0 0 1-2.79 6.731zm-3.037 3.673A20.5 20.5 0 0 1 16.001 27a16 16 0 0 1-1.017-.639 20.38 20.38 0 0 1-7.288-8.722 5.9 5.9 0 0 0 2.42.785 6.03 6.03 0 0 0 3.614-.773 4.6 4.6 0 0 1 1.706-.569 4.52 4.52 0 0 1 4.902 3.206c.335 1.121.237 2.222-.283 3.307-.044.092-.082.166-.172.343l-.044.087a.6.6 0 0 1-.118.162"
        />
      </g>
    </svg>
  );
}