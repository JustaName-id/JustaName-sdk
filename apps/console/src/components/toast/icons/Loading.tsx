import * as React from 'react'
import type { SVGProps } from 'react'
export default function Loading(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 25"
            {...props}
        >
            <mask
                id="loading_svg__a"
                width={24}
                height={25}
                x={0}
                y={0}
                maskUnits="userSpaceOnUse"
                style={{
                    maskType: 'alpha',
                }}
            >
                <path fill="#3280F4" d="M0 .5h24v24H0z" />
            </mask>
            <g mask="url(#loading_svg__a)">
                <path
                    fill="#3280F4"
                    d="M12 22.5a9.7 9.7 0 0 1-3.875-.788 10.1 10.1 0 0 1-3.187-2.15 10.1 10.1 0 0 1-2.15-3.187A9.7 9.7 0 0 1 2 12.5q0-2.075.788-3.887a10.2 10.2 0 0 1 2.15-3.175 10.1 10.1 0 0 1 3.187-2.15A9.7 9.7 0 0 1 12 2.5q.424 0 .713.288.287.287.287.712 0 .424-.287.713A.97.97 0 0 1 12 4.5q-3.325 0-5.662 2.338Q4 9.175 4 12.5t2.338 5.663T12 20.5t5.663-2.337T20 12.5q0-.424.288-.713A.97.97 0 0 1 21 11.5q.424 0 .712.287.288.288.288.713a9.7 9.7 0 0 1-.788 3.875 10.1 10.1 0 0 1-2.15 3.188 10.2 10.2 0 0 1-3.175 2.15A9.65 9.65 0 0 1 12 22.5"
                />
            </g>
        </svg>
    )
}
