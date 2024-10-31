import { Input } from '../../../ui/input';
import { ClaimSection } from '../ClaimSection';
import { SignSection } from '../SignSection';
import { JustWeb3Context, useDebounce } from '@justweb3/widget';
import { ColorSelector } from '../ColorSelector';
import { useContext, useEffect, useState } from 'react';
import { useJustWeb3Theme } from '@justweb3/ui';
import { Switch } from '../../../ui/switch';
import { useSwitchChain } from 'wagmi';
import { useMountedAccount } from '@justaname.id/react';
import { PluginsSection } from '../PluginsSection';

export const Customizer = () => {
  const { handleJustWeb3Config, config } = useContext(JustWeb3Context);
  const { changeTheme } = useJustWeb3Theme();
  const [logoUrl, setLogoUrl] = useState(config.logo ?? '');
  const { debouncedValue: logoUrlDebounced } = useDebounce(logoUrl, 1000);
  const { switchChainAsync } = useSwitchChain();
  const { chainId } = useMountedAccount();
  useEffect(() => {
    handleJustWeb3Config({
      ...config,
      logo: logoUrlDebounced,
    });
  }, [logoUrlDebounced]);

  return (
    <div className="flex flex-col gap-[5px] min-w-[350px] w-[350px] border-r-[1px] pointer-events-auto py-5 px-2.5 max-h-[calc(100vh-60px)] overflow-y-scroll">
      <div className="flex flex-col gap-2.5">
        <p className="text-base text-black font-bold leading-[125%] my-[5px]">
          Customize Interface
        </p>
        <div className="flex flex-row justify-between gap-2.5">
          <ColorSelector
            colors={['#FFFFFF', '#000000']}
            title="Background Color"
            onColorChange={(color: string) => {
              changeTheme('background', color);
              document.documentElement.style.setProperty('--background', color);
            }}
          />
          <ColorSelector
            colors={['#FEA801', '#C90018']}
            title="Accent Color"
            onColorChange={(color: string) => {
              changeTheme('primary', color);
              document.documentElement.style.setProperty('--primary', color);
              document.documentElement.style.setProperty(
                '--rk-colors-accentColor',
                color
              );
            }}
          />
        </div>
        <div className="flex flex-row justify-between items-center max-w-full py-2.5 px-[5px] gap-2">
          <p className="text-sm text-black font-medium leading-[100%] whitespace-nowrap">
            Add Logo
          </p>
          <Input
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            placeholder="Logo URL"
            className="pointer-events-auto"
          />
        </div>
      </div>

      <div className="w-full h-[1px] min-h-[1px] bg-[#CBD5E180]" />

      <div className="flex flex-row items-center justify-between w-full py-[5px]">
        <p className="text-base text-black font-bold leading-[125%] my-[5px]">
          Network
        </p>
        <div className="flex flex-row items-center gap-2.5">
          <p className="text-sm text-black font-medium leading-[100%] whitespace-nowrap">
            {chainId === 1 ? 'Mainnet' : 'Sepolia'}
          </p>
          <Switch
            checked={chainId === 1}
            onCheckedChange={() => {
              switchChainAsync({
                chainId: chainId === 1 ? 11155111 : 1,
              });
            }}
          />
        </div>
      </div>
      <div className="w-full h-[1px] min-h-[1px] bg-[#CBD5E180]" />
      <ClaimSection />
      <div className="w-full h-[1px] min-h-[1px] bg-[#CBD5E180]" />
      <SignSection />
      <div className="w-full h-[1px] min-h-[1px] bg-[#CBD5E180]" />
      <PluginsSection />
    </div>
  );
};
