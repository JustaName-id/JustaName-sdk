import type { SVGProps } from 'react';
export default function Gno(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <g fill="none" fillRule="evenodd">
        <circle cx={16} cy={16} r={16} fill="#00A6C4" />
        <path
          fill="#FFF"
          fillRule="nonzero"
          d="m24.777 10.5.2.331a10.8 10.8 0 0 1 1.523 5.537C26.482 22.236 21.785 27 16 27h-.018c-5.785 0-10.5-4.801-10.482-10.669 0-1.968.544-3.881 1.541-5.537l.182-.312.961.975a3.8 3.8 0 0 0-.453.9 4.09 4.09 0 0 0 2.43 5.225 4.02 4.02 0 0 0 3.608-.46L16 19.403l2.557-2.594c.236.166.508.295.798.405 2.05.736 4.298-.35 5.023-2.41.435-1.214.236-2.483-.399-3.495zM9.363 12.652l3.01 3.035c-.363.295-.816.46-1.306.46-1.178 0-2.14-.975-2.14-2.17 0-.497.164-.957.436-1.325m10.5 2.851 2.974-3.016c.236.35.362.772.362 1.214 0 1.195-.96 2.17-2.14 2.17-.453 0-.852-.129-1.196-.368m-3.827 2.281-8.668-8.83.344-.367C9.852 6.287 12.772 5 15.91 5h.018c3.174 0 6.22 1.38 8.342 3.77l.327.369-8.56 8.645zm-7.254-8.83 7.254 7.377L23.2 9.102c-1.922-1.95-4.533-3.072-7.253-3.072h-.019c-2.702 0-5.222 1.03-7.145 2.925z"
        />
      </g>
    </svg>
  );
}