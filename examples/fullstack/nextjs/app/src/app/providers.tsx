'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { State, WagmiProvider } from 'wagmi'
import { JustaNameProvider } from '@justaname.id/react'

import { config } from '../wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { justanameConfig } from '../justaname'

export function Providers(props: {
    children: ReactNode
    initialState?: State
}) {
    const [queryClient] = useState(() => new QueryClient())
    return (
        <WagmiProvider config={config} initialState={props.initialState}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <JustaNameProvider chainId={justanameConfig.chainId}>
                        {props.children}
                    </JustaNameProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}