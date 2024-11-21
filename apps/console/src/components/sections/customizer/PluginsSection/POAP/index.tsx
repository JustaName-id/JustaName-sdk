import { Switch } from '../../../../ui/switch';
import { useContext } from 'react';
import { JustWeb3Context } from '@justweb3/widget';
import { POAPPlugin } from '@justweb3/poap-plugin';
import { getAnalyticsClient } from '../../../../../analytics';

export const POAP = () => {
  const { handleJustWeb3Config, config } = useContext(JustWeb3Context);

  const handlePOAPConfig = (enabled: boolean) => {
    const POAPPluginInstance = POAPPlugin();
    if (enabled) {
      handleJustWeb3Config({
        ...config,
        plugins: [
          ...(config?.plugins || []).filter(
            (plugin) => plugin.name !== POAPPluginInstance.name
          ),
          POAPPluginInstance,
        ],
      });
      getAnalyticsClient().track('POAP_ENABLED', {});
    } else {
      handleJustWeb3Config({
        ...config,
        plugins: (config?.plugins || []).filter(
          (plugin) => plugin.name !== POAPPluginInstance.name
        ),
      });
    }
  };

  return (
    <div className="flex flex-row items-center justify-between w-full py-[16px] pl-[26px]">
      <p className="text-base text-black font-bold leading-[125%] my-[5px]">
        POAP
      </p>
      <Switch
        checked={
          !!config?.plugins?.find((plugin) => plugin.name === 'POAPPlugin')
        }
        onClick={(e) => {
          e.stopPropagation();
        }}
        onCheckedChange={(checked) => {
          handlePOAPConfig(checked);
        }}
      />
    </div>
  );
};
