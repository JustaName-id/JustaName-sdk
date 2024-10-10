import type { SVGProps } from 'react';
export default function Delete(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 14"
      {...props}
    >
      <path
        fill="red"
        d="m8.667 10.333 2.167-2.166L13 10.333l1.167-1.166L12 7l2.167-2.167L13 3.667l-2.166 2.166-2.167-2.166L7.5 4.833 9.667 7 7.5 9.167zm-2 3.334A1.65 1.65 0 0 1 5.334 13l-4.5-6 4.5-6q.228-.312.583-.49.354-.177.75-.177h9.167q.687 0 1.177.49T17.5 2v10q0 .687-.49 1.177-.491.49-1.177.49zM2.917 7l3.75 5h9.167V2H6.667z"
      />
    </svg>
  );
}
