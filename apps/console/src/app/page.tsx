'use client';
import { JustEnsCard, JustWeb3Button } from '@justweb3/widget';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CodeSection } from '../components/sections/code/CodeSection';
import { Customizer } from '../components/sections/customizer/Customizer';
import { ConsoleProvider } from '../providers/ConsoleProvider';
import { SectionSlider } from '../components/reusable/SectionSlider';
import { useSplit } from '../hooks/useSplit';

export default function Page() {
  const { leftWidth, rightWidth, getBarProps } = useSplit({
    initialLeft: 70,
  });

  return (
    <div className="flex flex-row justify-between max-mobile:max-w-[100vw] max-mobile:overflow-x-hidden w-full h-full relative">
      <ConsoleProvider>
        <div className="hidden mobile:block">
          <Customizer />
        </div>
        <div className="mobile:hidden">
          <SectionSlider
            trigger={
              <div className="py-[7px] px-2.5 bg-[#3280F4] font-xs font-black text-white border border-black rounded-[8px_8px_0px_0px] rotate-90">
                Customise
              </div>
            }
            side="left"
            title="Customizer"
          >
            <Customizer mobile />
          </SectionSlider>
        </div>

        <div className="max-mobile:hidden flex flex-1">
          <div
            className={`flex-1 h-full gap-3 flex-col relative bg-[url('/bg/widget-bg.png')] bg-repeat-x bg-cover flex justify-center items-center`}
            style={{
              width: `${leftWidth}%`,
              maxWidth: `${leftWidth}%`,
            }}
          >
            <JustWeb3Button>
              <ConnectButton />
            </JustWeb3Button>

            <JustEnsCard addressOrEns={'justhadi.eth'} />
            <JustEnsCard addressOrEns={'justghadi.eth'} />
            <JustEnsCard addressOrEns={'mely.eth'} />
            <JustEnsCard addressOrEns={'nick.eth'} />
            <JustEnsCard addressOrEns={'vitalik.eth'} />
            <JustEnsCard addressOrEns={'brantly.eth'} />
            <JustEnsCard addressOrEns={'dr3a.eth'} />
          </div>
          <div
            {...getBarProps()}
            className={`relative z-10 cursor-col-resize bg-gray-300 hover:bg-gray-400 transition-colors`}
            style={{
              width: '4px',
            }}
          />
          <div
            style={{
              width: `calc( ${rightWidth}% - 4px)`,
              maxWidth: `calc( ${rightWidth}% - 4px)`,
            }}
          >
            <CodeSection />
          </div>
        </div>
        <div className="mobile:hidden overflow-hidden w-full">
          <SectionSlider
            trigger={
              <div className="py-[7px] px-2.5 bg-[#FEA801] font-xs font-black text-white border border-black rounded-[8px_8px_0px_0px] translate-y-[10px] -rotate-90">
                Code Output
              </div>
            }
            side="right"
            title="Code"
          >
            <CodeSection mobile />
          </SectionSlider>
          <div
            className={`flex-1 h-full gap-3 w-full flex-col relative bg-[url('/bg/widget-bg.png')] bg-repeat-x bg-cover flex justify-center items-center`}
          >
            <div className="mb-10">
              <JustWeb3Button>
                <ConnectButton />
              </JustWeb3Button>
            </div>
            <JustEnsCard addressOrEns={'justhadi.eth'} />
            <JustEnsCard addressOrEns={'mely.eth'} />
            <JustEnsCard addressOrEns={'nick.eth'} />
            <JustEnsCard addressOrEns={'vitalik.eth'} />
            <JustEnsCard addressOrEns={'brantly.eth'} />
            <JustEnsCard addressOrEns={'dr3a.eth'} />
          </div>
        </div>
      </ConsoleProvider>
    </div>
  );
}
