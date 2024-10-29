import { JustaPlugin } from '@justweb3/widget';
import { ArrowIcon, ClickableItem } from '@justweb3/ui';
import { EFPIcon } from '../icons/EFPIcon';
import { FollowButton } from '../components';
import { EFPTab } from '../components/EFPTab';

export const EFPPlugin: JustaPlugin = {
  name: 'EFPPlugin',
  components: {
    ProfileTab: (pluginApi, ens, chainId) => {
      if (chainId !== 1) {
        return undefined;
      }

      return {
        title: 'EFP',
        content: <EFPTab ens={ens} />,
      };
    },
    ProfileHeader: (pluginApi, ens, chainId, address) => {
      if (chainId !== 1) {
        return null;
      }

      return <FollowButton ens={ens} />;
    },
    SignInMenu: (pluginApi) => {
      if (pluginApi.chainId !== 1) {
        return null;
      }
      return (
        <ClickableItem
          title={'E.F.P'}
          left={<EFPIcon width={20} />}
          style={{
            width: '100%',
          }}
          onClick={() => {
            pluginApi.setState('efpOpen', true);
          }}
          right={<ArrowIcon width={20} />}
        />
      );
    },
  },
};
