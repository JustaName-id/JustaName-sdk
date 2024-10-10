"use client"

import { JustWeb3Button } from "@justweb3/widget";
import { ChainId } from "@justaname.id/sdk";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { CodeSection } from "../components/codeSection";
import { Customizer } from "../components/customizer";

export default function Index() {

  return (
    <div className="flex flex-row justify-between w-full h-full relative">
      <Customizer />
      <div className={`w-full h-full max-w-[100vw] relative bg-[url('/bg/widget-bg.png')] bg-repeat-x bg-cover flex justify-center items-center`}>
        <JustWeb3Button>
          <ConnectButton />
        </JustWeb3Button>
        {/* <Image src={"/bg/widget-bg.png"} width={500} height={100} className="h-[600px] z-[-100] w-[calc(100vw-600px)] absolute left-0 top-0 bottom-0 right-0" alt="widget-bg" /> */}
      </div>
      <CodeSection config={janConfig} />
    </div>
  );
}
