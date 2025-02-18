import { JustaPlugin } from '@justweb3/widget';
import { ChatMenuButton } from '../components/ChatMenuButton';
import { JustWeb3ButtonRight } from '../components/JustWeb3ButtonRight';
import { ProfileChatButton } from '../components/ProfileChatButton';
import { JustWeb3XMTPProvider } from '../providers/JustWeb3XMTPProvider';

export type XmtpEnvironment = 'local' | 'production' | 'dev';

export const XMTPPlugin = (env: XmtpEnvironment): JustaPlugin => {
  return {
    name: 'XMTPPlugin',
    components: {
      JustWeb3ButtonRight: (pluginApi) => {
        return (
          <JustWeb3ButtonRight
            handleOpen={(open) => pluginApi.setState('xmtpOpen', open)}
            env={env}
          />
        );
      },
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
        return (
          <ProfileChatButton
            ens={ens}
            env={env}
            chainId={chainId}
            address={address}
          />
        );
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
    hooks: {
      onWalletDisconnected: (pluginApi) => {
        pluginApi.setState('xmtpOpen', false);
      },
      onEnsSignOut: (pluginApi) => {
        pluginApi.setState('xmtpOpen', false);
      },
    },
  };
};
