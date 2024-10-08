import type { SVGProps } from 'react';
export default function Nrg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 120 120"
      {...props}
    >
      <rect width={120} height={120} fill="#fff" rx={50} />
      <path
        fill="#0D251D"
        fillRule="evenodd"
        d="M60 0c33.137 0 60 26.863 60 60s-26.863 60-60 60S0 93.137 0 60 26.863 0 60 0"
        clipRule="evenodd"
      />
      <path
        fill="#0BC98D"
        d="m33.32 67.858-7.832-7.827 34.526-34.526 7.83 7.831zM59.986 94.53l-7.828-7.832L86.68 52.176l7.831 7.828z"
      />
      <path
        fill="#0BC98D"
        d="M59.674 94.214 25.803 60.343l7.83-7.828 33.871 33.868zM73.129 54.285 52.184 33.336l7.83-7.83L80.96 46.453z"
      />
      <path
        fill="#0BC98D"
        d="M59.43 67.982 51.6 60.15l20.945-20.949 7.83 7.831z"
      />
    </svg>
  );
}
