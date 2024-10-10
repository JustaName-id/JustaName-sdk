"use client"

import { JustSignInProviderConfig } from "@justaname.id/react-signin";
import { ChainId } from "@justaname.id/sdk";
import { JustWeb3Button } from "@justweb3/widget";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { CodeSection } from "../components/codeSection";
import { Customizer } from "../components/customizer";

export default function Index() {

  const [janConfig, setJanConfig] = useState<JustSignInProviderConfig>({
    config: {
      origin: process.env.NEXT_PUBLIC_ORIGIN ?? '',
      domain: process.env.NEXT_PUBLIC_DOMAIN ?? '',
      signInTtl: 1000 * 60 * 60 * 24,
    },
    backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    ensDomains: [
      {
        ensDomain: process.env.NEXT_PUBLIC_ENS_DOMAIN ?? '',
        chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID ?? '') as ChainId
      }
    ],
    openOnWalletConnect: true,
    allowedEns: 'all',
    disableOverlay: true

  });

  return (
    <div className="flex flex-row justify-between w-full h-full relative">
      <Customizer />
      <div className={`w-full h-full max-w-[100vw] relative bg-[url('/bg/widget-bg.png')] bg-repeat-x bg-cover flex justify-center items-center`}>
        <JustWeb3Button>
          <ConnectButton />
        </JustWeb3Button>
      </div>
      <CodeSection config={janConfig} />
    </div>
  );
}
