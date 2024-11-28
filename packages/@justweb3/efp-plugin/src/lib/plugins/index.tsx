import { JustaPlugin } from '@justweb3/widget';
import { FollowButton } from '../components';
import { EFPTab } from '../components/EFPTab';

export const EFPPlugin: JustaPlugin = {
  name: 'EFPPlugin',
  components: {
    ProfileTab: (pluginApi, ens, chainId, address) => {
      if (chainId !== 1) {
        return undefined;
      }

      return {
        title: 'EFP',
        content: <EFPTab ens={ens} address={address} />,
      };
    },
    ProfileHeader: (pluginApi, ens, chainId, address) => {
      if (chainId !== 1) {
        return null;
      }

      return <FollowButton ens={ens} address={address} />;
    },
  },
};
