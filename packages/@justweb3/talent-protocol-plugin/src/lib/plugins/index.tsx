import { JustaPlugin } from '@justweb3/widget';
import { TalentProtocolTab } from '../components/TalentProtocolTab';
import { TalentProtocolBadge } from '../components/TalentProtocolBadge';

export interface TalentProtocolPluginConfig {
  apiKey?: string;
  backendUrl?: string;
}

export const TalentProtocolPlugin = (
  config?: TalentProtocolPluginConfig
): JustaPlugin => ({
  name: 'TalentProtocolPlugin',
  components: {
    Badge: (_pluginApi, _ens, _chainId, address) => {
      return (
        <TalentProtocolBadge
          address={address}
          apiKey={config?.apiKey}
          backendUrl={config?.backendUrl}
        />
      );
    },
    ProfileTab: (_pluginApi, _ens, _chainId, address) => {
      return {
        title: 'Talent Protocol',
        content: (
          <TalentProtocolTab
            address={address}
            apiKey={config?.apiKey}
            backendUrl={config?.backendUrl}
          />
        ),
      };
    },
  },
});
