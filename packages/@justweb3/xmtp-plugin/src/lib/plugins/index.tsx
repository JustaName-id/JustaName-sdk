import { JustaPlugin } from '@justweb3/widget';
import { JustWeb3XMTPProvider } from '../providers/JustWeb3XMTPProvider';
import { ChatButton } from '../components/ChatButton';

export const XMTPPlugin: JustaPlugin = {
  name: 'XMTPPlugin',
  components: {
    Provider: (pluginApi, children) => {
      return (
        <JustWeb3XMTPProvider
          open={pluginApi.getState('xmtpOpen')}
          handleOpen={(open) => pluginApi.setState('xmtpOpen', open)}
        >
          {children}
        </JustWeb3XMTPProvider>
      );
    },
    SignInMenu: (pluginApi) => {
      return (
        <ChatButton
          handleOpen={(open) => pluginApi.setState('xmtpOpen', open)}
        />
      );
    },
  },
};
