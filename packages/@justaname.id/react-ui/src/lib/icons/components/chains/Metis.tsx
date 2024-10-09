import type { SVGProps } from 'react';
export default function Metis(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 2500 2500"
      {...props}
    >
      <circle
        cx={1250}
        cy={1250}
        r={1250}
        style={{
          fill: 'none',
        }}
      />
      <path
        d="M2500 1223C2485 544 1930 0 1250 0 560 0 0 560 0 1250c0 498 296 949 753 1147 61-91 107-192 138-297 25-64 52-126 81-187 36 11 74 17 113 17 105 0 205-42 278-116l4-4c-43-16-89-24-135-24-85 0-168 28-236 80q52.5-108 111-210c42 15 86 22 130 22 98 0 192-37 264-103l4-4c-48-20-100-31-152-31-77 0-152 23-216 65 39-64 78-126 120-185 32 9 66 13 99 13 110 0 215-46 289-128l3-4c-38-13-79-19-119-19-80 0-158 25-223 71 3-4 7-9 10-14 25-32 51-65 77-96 162-53 282-191 311-360l1-6h-1c-169 44-298 180-333 351-25 30-50 61-74 92 17-44 25-90 25-137 0-67-17-132-50-190l-3 4c-49 67-76 148-76 231 0 61 14 122 42 177-40 56-78 114-115 175 5-24 7-49 7-73 0-100-39-196-108-268l-2 5c-19 46-28 96-28 145 0 94 34 184 95 255-37 64-71 130-105 198 3-21 5-43 5-64 0-108-43-212-120-287l-2 5c-14 42-22 87-22 131 0 103 39 202 110 277-22 47-43 94-63 143-5-5-12-9-19-11-36-10-70-26-101-45-26-16-54-28-83-38-113-37-96-91-155-201-19-22-39-44-60-65-20-13-36-30-47-51-13-26-21-54-24-83-1-33-22-61-53-71-166-57-92-273-86-301-3-36-11-72-24-107-1-4-2-9-3-14-2-9-3-19-3-29 0-36 13-71 37-98 20-20 89-52 104-71s25-40 40-57c46-46 100-85 159-114 48-26 56-93 75-114 31-36 79-36 115-67 18-16 44-24 61-41 83-76 189-125 301-139 18-1 37-2 56-2 60 0 119 8 176 23 11 2 22 4 32 7 172 6 379 42 455 115 37 36 65 80 80 130 12 38 29 75 50 109l46 75c21 33 32 72 32 111 0 16-2 32-5 48-5 14-7 29-7 44 0 13 2 25 5 37 24 37 53 70 85 100q19.5 19.5 42 33c35 21 70 44 102 69v6c0 19-9 36-24 46-29 26-86 67-86 67 2 12 6 23 10 33 8 15 27 38 21 57-6 20-47 37-36 59 11 23 41 29 32 50-8 20-49 55-45 70s38 155-40 179c-96 19-193 30-291 32-32 2-61 20-76 48s-24 58-28 89c-28 111-66 220-112 325s-3 6-7 16c-10 21-17 43-19 66 7 17 17 32 29 45 10 11 24 18 40 18 5 0 11-1 16-2 506-176 845-654 845-1190v-22z"
        style={{
          fill: '#00dacc',
        }}
      />
    </svg>
  );
}
