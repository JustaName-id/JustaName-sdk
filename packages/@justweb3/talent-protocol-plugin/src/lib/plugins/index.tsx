import { JustaPlugin } from '@justweb3/widget';
import { TalentProtocolTab } from '../components/TalentProtocolTab';

export interface TalentProtocolPluginConfig {
  apiKey?: string;
  backendUrl?: string;
}

export const TalentProtocolPlugin = (
  config?: TalentProtocolPluginConfig
): JustaPlugin => ({
  name: 'TalentProtocolPlugin',
  components: {
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
