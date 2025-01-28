import * as React from 'react'
import type { SVGProps } from 'react'
export default function AssignmentTurnedIn(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 25"
            {...props}
        >
            <mask
                id="assignment-turned-in_svg__a"
                width={24}
                height={25}
                x={0}
                y={0}
                maskUnits="userSpaceOnUse"
                style={{
                    maskType: 'alpha',
                }}
            >
                <path fill="#D9D9D9" d="M0 .5h24v24H0z" />
            </mask>
            <g mask="url(#assignment-turned-in_svg__a)">
                <path
                    fill="#FFB2EF"
                    d="m10.6 16.55 7.05-7.05-1.4-1.4-5.65 5.65-2.85-2.85-1.4 1.4zM5 21.5q-.824 0-1.412-.587A1.93 1.93 0 0 1 3 19.5v-14q0-.824.587-1.412A1.93 1.93 0 0 1 5 3.5h4.2q.326-.9 1.088-1.45A2.86 2.86 0 0 1 12 1.5q.95 0 1.713.55.762.55 1.087 1.45H19q.824 0 1.413.588Q21 4.675 21 5.5v14q0 .824-.587 1.413A1.93 1.93 0 0 1 19 21.5zm7-16.75a.73.73 0 0 0 .75-.75.73.73 0 0 0-.75-.75.73.73 0 0 0-.75.75.73.73 0 0 0 .75.75"
                />
            </g>
        </svg>
    )
}
