'use client';
import { JustWeb3Button } from '@justweb3/widget';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Split from '@uiw/react-split';
import { CodeSection } from '../components/sections/code/CodeSection';
import { Customizer } from '../components/sections/customizer/Customizer';
import { ConsoleProvider } from '../providers/ConsoleProvider';

export default function Page() {
  return (
    <div className="flex flex-row justify-between w-full h-full relative">
      <ConsoleProvider>
        <Customizer />
        <Split style={{ width: '100%' }}>
          <div
            className={`flex-1 h-full relative bg-[url('/bg/widget-bg.png')] bg-repeat-x bg-cover flex justify-center items-center`}
          >
            <JustWeb3Button>
              <ConnectButton />
            </JustWeb3Button>
          </div>
          <CodeSection />
        </Split>
      </ConsoleProvider>
    </div>
  );
}
