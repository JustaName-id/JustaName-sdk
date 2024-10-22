'use client';
import { JustWeb3Button, useJustWeb3 } from '@justweb3/widget';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Split from '@uiw/react-split';
import { CodeSection } from '../components/sections/code/CodeSection';
import { Customizer } from '../components/sections/customizer/Customizer';
import { ConsoleProvider } from '../providers/ConsoleProvider';
import { Avatar, ClickableItem } from '@justweb3/ui';
import { useEnsAvatar } from '@justaname.id/react';

export default function Page() {
  const { openEnsProfile } = useJustWeb3();

  const { avatar: brantlyAvatar } = useEnsAvatar({
    ens: 'brantly.eth',
    chainId: 1,
  });

  const { avatar: nickAvatar } = useEnsAvatar({
    ens: 'nick.eth',
    chainId: 1,
  });

  return (
    <div className="flex flex-row justify-between w-full h-full relative">
      <ConsoleProvider>
        <Customizer />
        <Split style={{ width: '100%' }}>
          <div
            className={`flex-1 h-full gap-3 flex-col relative bg-[url('/bg/widget-bg.png')] bg-repeat-x bg-cover flex justify-center items-center`}
          >
            <JustWeb3Button>
              <ConnectButton />
            </JustWeb3Button>

            <ClickableItem
              name={'nick.eth'}
              left={<Avatar src={nickAvatar} />}
              style={{
                width: '278px',
              }}
              onClick={() => {
                openEnsProfile('nick.eth', 1);
              }}
            />

            <ClickableItem
              name={'brantly.eth'}
              left={<Avatar src={brantlyAvatar} />}
              style={{
                width: '278px',
              }}
              onClick={() => {
                openEnsProfile('brantly.eth', 1);
              }}
            />
          </div>
          <CodeSection />
        </Split>
      </ConsoleProvider>
    </div>
  );
}
