"use client"

import { JustSignInButton, JustSignInProvider, JustSignInProviderConfig } from "@justaname.id/react-signin";
import { ChainId } from "@justaname.id/sdk";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
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

  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [janConfig]);

  return (
    <div className="flex flex-row justify-between w-full h-full relative">
      <Customizer config={janConfig} onConfigChange={setJanConfig} />
      <div className={`w-full h-full max-w-[100vw] relative bg-[url('/bg/widget-bg.png')] bg-repeat-x bg-cover flex justify-center items-center`}>
        <JustSignInProvider key={key} config={janConfig} >
          <JustSignInButton>
            <ConnectButton />
          </JustSignInButton>
        </JustSignInProvider>
        {/* <Image src={"/bg/widget-bg.png"} width={500} height={100} className="h-[600px] z-[-100] w-[calc(100vw-600px)] absolute left-0 top-0 bottom-0 right-0" alt="widget-bg" /> */}
      </div>
      <CodeSection config={janConfig} />
    </div>
  );
}
