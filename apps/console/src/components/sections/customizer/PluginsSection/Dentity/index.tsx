import { Switch } from '../../../../ui/switch';
import { useContext } from 'react';
import { JustWeb3Context } from '@justweb3/widget';
import { DentityPlugin } from '@justweb3/dentity-plugin';
import { getAnalyticsClient } from '../../../../../analytics';

export const Dentity = () => {
  const { handleJustWeb3Config, config } = useContext(JustWeb3Context);

  const handleDentityConfig = (enabled: boolean) => {
    if (enabled) {
      handleJustWeb3Config({
        ...config,
        plugins: [
          ...(config?.plugins || []).filter(
            (plugin) => plugin.name !== DentityPlugin.name
          ),
          DentityPlugin,
        ],
      });
      getAnalyticsClient().track('DENTITY_ENABLED', {});
    } else {
      handleJustWeb3Config({
        ...config,
        plugins: (config?.plugins || []).filter(
          (plugin) => plugin.name !== DentityPlugin.name
        ),
      });
      getAnalyticsClient().track('DENTITY_DISABLED', {});
    }
  };

  return (
    <div className="flex flex-row items-center justify-between w-full py-[16px] pl-[26px]">
      <p className="text-base text-black font-bold leading-[125%] my-[5px]">
        Dentity
      </p>
      <Switch
        checked={
          !!config?.plugins?.find((plugin) => plugin.name === 'DentityPlugin')
        }
        onClick={(e) => {
          e.stopPropagation();
        }}
        onCheckedChange={(checked) => {
          handleDentityConfig(checked);
        }}
      />
    </div>
  );
};
