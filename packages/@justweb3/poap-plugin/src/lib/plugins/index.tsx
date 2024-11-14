import { JustaPlugin } from '@justweb3/widget';
import { POAPTab } from '../components/POAPTab';

export const POAPPlugin: JustaPlugin = {
  name: 'POAPPlugin',
  components: {
    ProfileTab: (_pluginApi, _ens, _chainId, address) => {
      return {
        title: 'POAP',
        content: <POAPTab address={address} />,
      };
    },
  },
};
