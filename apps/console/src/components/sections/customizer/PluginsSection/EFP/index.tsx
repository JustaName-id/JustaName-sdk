import { AccordionItem, AccordionTrigger } from '../../../../ui/accordion';
import { Switch } from '../../../../ui/switch';
import { useContext } from 'react';
import { JustWeb3Context } from '@justweb3/widget';
import { EFPPlugin } from 'justweb3-efp-plugin';

export const EFP = () => {
  const { handleJustWeb3Config, config } = useContext(JustWeb3Context);

  const handleEFPConfig = (enabled: boolean) => {
    if (enabled) {
      handleJustWeb3Config({
        ...config,
        plugins: [
          ...(config?.plugins || []).filter(
            (plugin) => plugin.name !== EFPPlugin.name
          ),
          EFPPlugin,
        ],
      });
    } else {
      handleJustWeb3Config({
        ...config,
        plugins: (config?.plugins || []).filter(
          (plugin) => plugin.name !== EFPPlugin.name
        ),
      });
    }
  };

  return (
    <AccordionItem value="efp">
      <AccordionTrigger>
        <div className="flex flex-row items-center justify-between w-full py-[5px]">
          <p className="text-base text-black font-bold leading-[125%] my-[5px]">
            EFP
          </p>
          <Switch
            checked={
              !!config?.plugins?.find((plugin) => plugin.name === 'EFPPlugin')
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
            onCheckedChange={(checked) => {
              handleEFPConfig(checked);
            }}
          />
        </div>
      </AccordionTrigger>
    </AccordionItem>
  );
};
