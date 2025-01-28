import * as React from 'react'
import type { SVGProps } from 'react'
export default function ToastInfo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            {...props}
        >
            <mask
                id="toast-info_svg__a"
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
            <g mask="url(#toast-info_svg__a)">
                <path
                    fill="#1C1B1F"
                    d="M12 7q.424 0 .713-.287A.97.97 0 0 0 13 6a.97.97 0 0 0-.287-.713A.97.97 0 0 0 12 5a.97.97 0 0 0-.713.287A.97.97 0 0 0 11 6q0 .424.287.713Q11.576 7 12 7m-1 8h2V9h-2zm-9 7V4q0-.824.587-1.412A1.93 1.93 0 0 1 4 2h16q.824 0 1.413.587Q22 3.176 22 4v12q0 .824-.587 1.413A1.93 1.93 0 0 1 20 18H6z"
                />
            </g>
        </svg>
    )
}
