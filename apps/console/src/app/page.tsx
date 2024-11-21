'use client';
import { useMountedAccount } from '@justaname.id/react';
import { JustEnsCard, JustWeb3Button, useJustWeb3 } from '@justweb3/widget';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Split from '@uiw/react-split';
import { useEffect } from 'react';
import { useAccountEffect } from 'wagmi';
import { getAnalyticsClient } from '../analytics';
import { SectionSlider } from '../components/reusable/SectionSlider';
import { CodeSection } from '../components/sections/code/CodeSection';
import { Customizer } from '../components/sections/customizer/Customizer';
import { ConsoleProvider } from '../providers/ConsoleProvider';

export default function Page() {
  const { isConnected, address } = useMountedAccount()
  const { connectedEns, isLoggedIn } = useJustWeb3();

  const handleEnsClick = (ens: string) => {
    getAnalyticsClient().track('PROFILE_VIEWED', {
      ens,
    });
  };

  useAccountEffect({
    onDisconnect: () => {
      getAnalyticsClient().reset()
    }
  })
  useEffect(() => {
    if (isConnected && address) {
      getAnalyticsClient().identify(address)
    }

  }, [isConnected, address])

  useEffect(() => {
    if (isLoggedIn && connectedEns) {
      getAnalyticsClient().track('SUBNAME_CONNECTED', {
        subname: connectedEns.ens,
        chainId: connectedEns.chainId,
      });
      getAnalyticsClient().people_set({
        ...connectedEns,
      })
    }
  }, [isLoggedIn, connectedEns])
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
          <Split
            style={{ maxWidth: '100%', overflow: 'hidden', width: '100%' }}
          >
            <div
              className={`flex-1 h-full gap-3 flex-col relative bg-[url('/bg/widget-bg.png')] bg-repeat-x bg-cover flex justify-center items-center`}
            >
              <JustWeb3Button>
                <ConnectButton />
              </JustWeb3Button>

              <div onClick={() => handleEnsClick('justhadi.eth')} >
                <JustEnsCard addressOrEns={'justhadi.eth'} />
              </div>
              <div onClick={() => handleEnsClick('mely.eth')}>
                <JustEnsCard addressOrEns={'mely.eth'} />
              </div>
              <div onClick={() => handleEnsClick('nick.eth')}>
                <JustEnsCard addressOrEns={'nick.eth'} />
              </div>
              <div onClick={() => handleEnsClick('vitalik.eth')}>
                <JustEnsCard addressOrEns={'vitalik.eth'} />
              </div>
              <div onClick={() => handleEnsClick('brantly.eth')}>
                <JustEnsCard addressOrEns={'brantly.eth'} />
              </div>
              <div onClick={() => handleEnsClick('dr3a.eth')}>
                <JustEnsCard addressOrEns={'dr3a.eth'} />
              </div>
            </div>
            <CodeSection />
          </Split>
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
            <div onClick={() => handleEnsClick('justhadi.eth')} >
              <JustEnsCard addressOrEns={'justhadi.eth'} />
            </div>
            <div onClick={() => handleEnsClick('mely.eth')}>
              <JustEnsCard addressOrEns={'mely.eth'} />
            </div>
            <div onClick={() => handleEnsClick('nick.eth')}>
              <JustEnsCard addressOrEns={'nick.eth'} />
            </div>
            <div onClick={() => handleEnsClick('vitalik.eth')}>
              <JustEnsCard addressOrEns={'vitalik.eth'} />
            </div>
            <div onClick={() => handleEnsClick('brantly.eth')}>
              <JustEnsCard addressOrEns={'brantly.eth'} />
            </div>
            <div onClick={() => handleEnsClick('dr3a.eth')}>
              <JustEnsCard addressOrEns={'dr3a.eth'} />
            </div>
          </div>
        </div>
      </ConsoleProvider>
    </div>
  );
}
