"use client";
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode } from 'react'
import {  WagmiProvider } from 'wagmi'
import { JustaNameProvider} from '@justaname.id/react'
import { ChainId } from '@justaname.id/sdk'
import { getDefaultConfig, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { argentWallet, ledgerWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';
import { arbitrum, base, mainnet, optimism, polygon, sepolia, zora } from 'wagmi/chains';

export function Providers(props: {
    children: ReactNode
}) {
    const { wallets } = getDefaultWallets();


    const config = getDefaultConfig({
        appName: 'RainbowKit demo',
        projectId: 'YOUR_PROJECT_ID',
        wallets: [
            ...wallets,
            {
                groupName: 'Other',
                wallets: [argentWallet, trustWallet, ledgerWallet],
            },
        ],
        chains: [
            mainnet,
            polygon,
            optimism,
            arbitrum,
            base,
            zora,
            ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
        ],
        ssr: true,
    });

    const queryClient = new QueryClient();

    const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID as string) as ChainId
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <JustaNameProvider chainId={chainId}>
                        {props.children}
                    </JustaNameProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}