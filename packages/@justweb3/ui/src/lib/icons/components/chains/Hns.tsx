import type { SVGProps } from 'react';
export default function Hns(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <g fill="none">
        <circle cx={16} cy={16} r={16} fill="#000" />
        <path
          fill="#FFF"
          d="m23.265 12.35-1.298-2.318 2.515.001a.23.23 0 0 1 .182.106l.49.81L26 12.35zm-4.652 14.04c-.06.11-.14.11-.166.11H17.42l-1.544-.001 3.995-7.212a.388.388 0 0 0-.334-.575l-6.81.009-1.354-2.358h9.925l.016-.002a.4.4 0 0 0 .114-.024l.025-.01a.38.38 0 0 0 .182-.166l1.635-3.039h2.7zm-3.402-.274-.323-.534c-.413-.685-.942-1.563-1.002-1.66-.02-.032-.03-.111.013-.188l2.344-4.246 2.641-.003zm-4.503-4.513L9.395 19.26l1.323-2.493 1.327 2.309-1.337 2.528zm-1.762.365h-1.43a.23.23 0 0 1-.18-.106l-.427-.707L6 19.65h2.734l1.298 2.318zm4.44-16.357c.06-.111.14-.111.165-.111h2.582l-4.006 7.212-.008.02a.4.4 0 0 0-.027.074l-.008.035-.004.043-.002.02q0 .007.002.013a.2.2 0 0 0 .004.042l.006.036.01.036a1 1 0 0 0 .03.067.3.3 0 0 0 .045.06.3.3 0 0 0 .053.05q.016.014.033.024l.012.009q.006.003.014.006.03.015.062.025l.023.007a.4.4 0 0 0 .087.011h.174l6.638-.009c.176.307.504.885.783 1.376l.532.935h-9.88l-.012.002a.38.38 0 0 0-.332.202L8.726 18.88H6.03c1.178-2.128 7.277-13.13 7.356-13.27zm3.407.282.24.397c.421.699 1.016 1.685 1.08 1.788.02.032.028.111-.014.188l-2.343 4.244-2.64.003zm4.497 4.502 1.313 2.345-1.339 2.488-.544-.957c-.368-.647-.636-1.119-.787-1.382.287-.525 1.041-1.915 1.357-2.494"
        />
      </g>
    </svg>
  );
}