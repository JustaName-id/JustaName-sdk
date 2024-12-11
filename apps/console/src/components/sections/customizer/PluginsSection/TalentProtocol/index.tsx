import { Switch } from '../../../../ui/switch';
import { useContext } from 'react';
import { JustWeb3Context } from '@justweb3/widget';
import { TalentProtocolPlugin } from '@justweb3/talent-protocol-plugin';

export const TalentProtocol = () => {
  const { handleJustWeb3Config, config } = useContext(JustWeb3Context);

  const handleTalentProtocolConfig = (enabled: boolean) => {
    const TalentProtocolPluginInstance = TalentProtocolPlugin();
    if (enabled) {
      handleJustWeb3Config({
        ...config,
        plugins: [
          ...(config?.plugins || []).filter(
            (plugin) => plugin.name !== TalentProtocolPluginInstance.name
          ),
          TalentProtocolPluginInstance,
        ],
      });
    } else {
      handleJustWeb3Config({
        ...config,
        plugins: (config?.plugins || []).filter(
          (plugin) => plugin.name !== TalentProtocolPluginInstance.name
        ),
      });
    }
  };

  return (
    <div className="flex flex-row items-center justify-between w-full py-[16px] pl-[26px]">
      <p className="text-base text-black font-bold leading-[125%] my-[5px]">
        Talent Protocol
      </p>
      <Switch
        checked={
          !!config?.plugins?.find(
            (plugin) => plugin.name === 'TalentProtocolPlugin'
          )
        }
        onClick={(e) => {
          e.stopPropagation();
        }}
        onCheckedChange={(checked) => {
          handleTalentProtocolConfig(checked);
        }}
      />
    </div>
  );
};
