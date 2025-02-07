import * as React from 'react'
import type { SVGProps } from 'react'
export default function ToastWarning(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            {...props}
        >
            <mask
                id="toast-warning_svg__a"
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
            <g mask="url(#toast-warning_svg__a)">
                <path
                    fill="#FEA801"
                    d="M12 17q.424 0 .713-.288A.97.97 0 0 0 13 16a.97.97 0 0 0-.287-.713A.97.97 0 0 0 12 15a.97.97 0 0 0-.713.287A.97.97 0 0 0 11 16q0 .424.287.712.288.288.713.288m-1-4h2V7h-2zm-6 8q-.824 0-1.412-.587A1.93 1.93 0 0 1 3 19V5q0-.824.587-1.412A1.93 1.93 0 0 1 5 3h4.2q.326-.9 1.088-1.45A2.86 2.86 0 0 1 12 1q.95 0 1.713.55.762.55 1.087 1.45H19q.824 0 1.413.587Q21 4.176 21 5v14q0 .824-.587 1.413A1.93 1.93 0 0 1 19 21zm7-16.75a.73.73 0 0 0 .75-.75.73.73 0 0 0-.75-.75.73.73 0 0 0-.75.75.73.73 0 0 0 .75.75"
                />
            </g>
        </svg>
    )
}
