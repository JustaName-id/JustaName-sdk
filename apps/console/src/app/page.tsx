"use client"

import { JustWeb3Button } from "@justweb3/widget";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Customizer } from "../components/customizer";


export default function Index() {

  return (
    <div className="flex flex-row justify-between w-full h-full relative">
      <Customizer />
      <div className="w-fit h-fit max-w-[100vw] ml-[300px]">
        <JustWeb3Button>
          <ConnectButton />
        </JustWeb3Button>
      </div>
    </div>
  );
}
