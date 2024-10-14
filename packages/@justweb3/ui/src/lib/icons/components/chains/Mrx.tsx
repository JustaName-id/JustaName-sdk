import type { SVGProps } from 'react';
export default function Mrx(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      style={{
        shapeRendering: 'geometricPrecision',
        textRendering: 'geometricPrecision',
        fillRule: 'evenodd',
        clipRule: 'evenodd',
      }}
      viewBox="0 0 827 827"
      {...props}
    >
      <path
        d="M414 827c228 0 413-185 413-413C827 185 642 0 414 0 185 0 0 185 0 414c0 228 185 413 414 413m0-752c87 0 167 34 227 89L412 306 185 164c60-55 140-89 229-89m236 96c63 62 102 148 102 243q0 51-15 99L600 288l50-31zm59 407c-57 103-168 174-295 174-128 0-239-71-296-174h28l149-246 76 47 4 213h83l-3-214 74-46 150 246zM90 511c-10-31-15-63-15-97 0-94 38-179 100-241v84l49 31z"
        style={{
          fill: '#fff',
        }}
      />
    </svg>
  );
}
