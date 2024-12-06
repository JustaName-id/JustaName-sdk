// import { AccordionItem, AccordionTrigger } from '../../../../ui/accordion';
import { Switch } from '../../../../ui/switch';
import { useContext } from 'react';
import { JustWeb3Context } from '@justweb3/widget';
import { XMTPPlugin } from '@justweb3/xmtp-plugin';

export const XMTP = () => {
  const { handleJustWeb3Config, config } = useContext(JustWeb3Context);

  const handleEFPConfig = (enabled: boolean) => {
    if (enabled) {
      handleJustWeb3Config({
        ...config,
        plugins: [
          ...(config?.plugins || []).filter(
            (plugin) => plugin.name !== XMTPPlugin.name
          ),
          XMTPPlugin('production'),
        ],
      });
    } else {
      handleJustWeb3Config({
        ...config,
        plugins: (config?.plugins || []).filter(
          (plugin) => plugin.name !== XMTPPlugin.name
        ),
      });
    }
  };

  return (
    <div className="flex flex-row items-center justify-between w-full py-[16px] pl-[26px]">
      <p className="text-base text-black font-bold leading-[125%] my-[5px]">
        XMTP
      </p>
      <Switch
        checked={
          !!config?.plugins?.find((plugin) => plugin.name === XMTPPlugin.name)
        }
        onClick={(e) => {
          e.stopPropagation();
        }}
        onCheckedChange={(checked) => {
          handleEFPConfig(checked);
        }}
      />
    </div>
  );
};
