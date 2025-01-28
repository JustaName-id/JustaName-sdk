import * as React from 'react'
import type { SVGProps } from 'react'
export default function ToastError(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            {...props}
        >
            <mask
                id="toast-error_svg__a"
                width={24}
                height={24}
                x={0}
                y={0}
                maskUnits="userSpaceOnUse"
                style={{
                    maskType: 'alpha',
                }}
            >
                <path fill="#D9D9D9" d="M0 0h24v24H0z" />
            </mask>
            <g mask="url(#toast-error_svg__a)">
                <path
                    fill="red"
                    d="M2 22V4q0-.824.587-1.412A1.93 1.93 0 0 1 4 2h16q.824 0 1.413.587Q22 3.176 22 4v12q0 .824-.587 1.413A1.93 1.93 0 0 1 20 18H6zm7.4-8 2.6-2.6 2.6 2.6 1.4-1.4-2.6-2.6L16 7.4 14.6 6 12 8.6 9.4 6 8 7.4l2.6 2.6L8 12.6z"
                />
            </g>
        </svg>
    )
}
