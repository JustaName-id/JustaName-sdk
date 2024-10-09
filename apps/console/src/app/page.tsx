"use client"

import { JustSignInButton, JustSignInProvider, JustSignInProviderConfig } from "@justaname.id/react-signin";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Customizer } from "../components/customizer";
import { useState, useEffect } from "react";
import { ChainId } from "@justaname.id/sdk";

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
    allowedEns: 'all'
  });

  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [janConfig]);

  return (
    <div className="flex flex-row justify-between w-full h-full relative">
      <Customizer config={janConfig} onConfigChange={setJanConfig} />
      <div className="w-fit h-fit max-w-[100vw] ml-[300px]">
        <JustSignInProvider key={key} config={janConfig}>
          <JustSignInButton>
            <ConnectButton />
          </JustSignInButton>
        </JustSignInProvider>
      </div>
    </div>
  );
}
