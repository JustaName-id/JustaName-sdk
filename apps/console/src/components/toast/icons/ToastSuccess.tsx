import * as React from 'react'
import type { SVGProps } from 'react'
export default function ToastSuccess(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 30 31"
            {...props}
        >
            <mask
                id="toast-success_svg__a"
                width={30}
                height={31}
                x={0}
                y={0}
                maskUnits="userSpaceOnUse"
                style={{
                    maskType: 'alpha',
                }}
            >
                <path fill="#D9D9D9" d="M0 .316h30v30H0z" />
            </mask>
            <g mask="url(#toast-success_svg__a)">
                <path
                    fill="#06CB6C"
                    d="m15 29.066-9-6.75a2.4 2.4 0 0 1-.734-.875A2.5 2.5 0 0 1 5 20.316v-15q0-1.031.734-1.766A2.4 2.4 0 0 1 7.5 2.816h15q1.032 0 1.766.734T25 5.316v15q0 .593-.266 1.125a2.4 2.4 0 0 1-.734.875zm-1.312-10 7.062-7.063L19 10.191l-5.312 5.312-2.626-2.625-1.812 1.75z"
                />
            </g>
        </svg>
    )
}
