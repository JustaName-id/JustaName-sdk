import type { SVGProps } from 'react';
export default function JustSomeone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 62 62"
      {...props}
    >
      <path
        fill="var(--justweb3-primary-color)"
        d="M53.927 23.844c3.886 13.169-3.46 27.048-16.41 31-12.948 3.952-26.595-3.52-30.48-16.688-3.887-13.169 3.46-27.048 16.408-31s26.596 3.52 30.481 16.688"
      />
      <g filter="url(#just-someone_svg__a)">
        <path
          fill="#000"
          fillRule="evenodd"
          d="M37.067 53.315c12.118-3.699 18.993-16.688 15.356-29.012S36.014 4.986 23.896 8.685 4.903 25.373 8.54 37.697s16.408 19.317 28.527 15.618m.45 1.529c12.95-3.952 20.296-17.831 16.41-31S36.393 3.204 23.444 7.156s-20.295 17.831-16.409 31 17.533 20.64 30.482 16.688"
          clipRule="evenodd"
        />
      </g>
      <path
        fill="#000"
        fillRule="evenodd"
        d="M49.457 46.731a24.3 24.3 0 0 1-8.407 4.52c-12.948 3.953-26.595-3.519-30.482-16.687a25.2 25.2 0 0 1 4.47-22.887C7.579 17.849 4.1 28.205 7.038 38.157c3.886 13.168 17.533 20.64 30.481 16.687a24.35 24.35 0 0 0 11.938-8.113"
        clipRule="evenodd"
      />
      <path
        fill="#FDF9FE"
        d="M62.004 21.337c0 9.58-7.731 17.346-17.269 17.346s-17.269-7.766-17.269-17.346 7.732-17.346 17.27-17.346 17.268 7.767 17.268 17.346"
      />
      <path
        fill="#000"
        fillRule="evenodd"
        d="M44.735 37.087c8.689 0 15.7-7.07 15.7-15.75s-7.011-15.75-15.7-15.75-15.7 7.07-15.7 15.75 7.011 15.75 15.7 15.75m0 1.596c9.538 0 17.27-7.766 17.27-17.346S54.271 3.991 44.734 3.991s-17.269 7.767-17.269 17.346 7.732 17.346 17.27 17.346"
        clipRule="evenodd"
      />
      <path
        fill="#000"
        stroke="#000"
        strokeWidth={4}
        d="M56.166 20.47c0 4.915-3.909 8.841-8.66 8.841s-8.66-3.926-8.66-8.841 3.909-8.841 8.66-8.841 8.66 3.926 8.66 8.84Z"
      />
      <path
        fill="#FDF9FE"
        d="M42.39 31.744c0 9.58-7.636 17.346-17.056 17.346S8.278 41.324 8.278 31.744s7.636-17.346 17.056-17.346S42.39 22.165 42.39 31.744"
      />
      <path
        fill="#000"
        fillRule="evenodd"
        d="M25.334 47.494c8.553 0 15.486-7.051 15.486-15.75s-6.933-15.75-15.486-15.75-15.486 7.052-15.486 15.75 6.933 15.75 15.486 15.75m0 1.596c9.42 0 17.056-7.766 17.056-17.346s-7.636-17.346-17.056-17.346S8.278 22.165 8.278 31.744 15.914 49.09 25.334 49.09"
        clipRule="evenodd"
      />
      <path
        fill="#000"
        stroke="#000"
        strokeWidth={4}
        d="M36.552 30.878c0 4.953-3.851 8.841-8.447 8.841s-8.447-3.888-8.447-8.841c0-4.954 3.851-8.841 8.447-8.841s8.447 3.887 8.447 8.84Z"
      />
      <defs>
        <filter
          id="just-someone_svg__a"
          width={48.969}
          height={49.802}
          x={5.997}
          y={6.099}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={10} dy={-10} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
          <feBlend in2="shape" result="effect1_innerShadow_1948_2798" />
        </filter>
      </defs>
    </svg>
  );
}
