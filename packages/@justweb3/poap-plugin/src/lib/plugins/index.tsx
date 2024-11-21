import { JustaPlugin } from '@justweb3/widget';
import { POAPTab } from '../components/POAPTab';

export interface POAPPluginConfig {
  apiKey?: string;
  backendUrl?: string;
}

export const POAPPlugin = (config?: POAPPluginConfig): JustaPlugin => ({
  name: 'POAPPlugin',
  components: {
    ProfileTab: (_pluginApi, _ens, _chainId, address) => {
      return {
        title: 'POAP',
        content: <POAPTab address={address} apiKey={config?.apiKey} backendUrl={config?.backendUrl} />,
      };
    },
  },
});
