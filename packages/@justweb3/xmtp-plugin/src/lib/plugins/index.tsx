import { JustaPlugin } from '@justweb3/widget';
import { JustWeb3XMTPProvider } from '../providers/JustWeb3XMTPProvider';
import { ChatMenuButton } from '../components/ChatMenuButton';
import { ProfileChatButton } from '../components/ProfileChatButton';

export type XmtpEnvironment = 'local' | 'production' | 'dev';

export const XMTPPlugin = (env: XmtpEnvironment): JustaPlugin => {
  return {
    name: 'XMTPPlugin',
    components: {
      Provider: (pluginApi, children) => {
        return (
          <JustWeb3XMTPProvider
            open={pluginApi.getState('xmtpOpen')}
            handleOpen={(open) => pluginApi.setState('xmtpOpen', open)}
            env={env}
          >
            {children}
          </JustWeb3XMTPProvider>
        );
      },
      ProfileHeader: (pluginApi, ens, chainId, address) => {
        return <ProfileChatButton ens={ens} env={env} chainId={chainId} />;
      },
      SignInMenu: (pluginApi) => {
        return (
          <ChatMenuButton
            handleOpen={(open) => pluginApi.setState('xmtpOpen', open)}
            env={env}
          />
        );
      },
    },
  };
};
