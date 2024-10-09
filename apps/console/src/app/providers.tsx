"use client";
import { ChainId } from '@justaname.id/sdk';
import { getDefaultConfig, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { argentWallet, ledgerWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

interface ProviderProps {
    children: React.ReactNode
}
export const Providers: React.FC<ProviderProps> = (props) => {
    const { wallets } = getDefaultWallets();

    const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID as string) as ChainId

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
        chains: chainId === 1 ? [mainnet] : [sepolia],

        ssr: true,
    });

    const queryClient = new QueryClient();



    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {props.children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}