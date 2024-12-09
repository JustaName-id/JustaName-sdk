import { XmtpEnvironment } from '../../plugins';
import { NotificationBadge } from '@justweb3/ui';
import { ChatIcon } from '../../icons/ChatIcon';
import { useJustWeb3XMTP } from '../../providers/JustWeb3XMTPProvider';
import { useMemo } from 'react';
import { Client, ClientOptions, useClient } from '@xmtp/react-sdk';
import { useEthersSigner } from '../../hooks';
import { useMountedAccount } from '@justaname.id/react';
import { loadKeys, storeKeys, wipeKeys } from '../../utils/xmtp';

export interface ChatMenuButtonProps {
  handleOpen: (open: boolean) => void;
  env: XmtpEnvironment;
}

export const JustWeb3ButtonRight: React.FC<ChatMenuButtonProps> = ({
  handleOpen,
  env,
}) => {
  const { conversationsInfo } = useJustWeb3XMTP();
  const totalUnreadCount = useMemo(() => {
    return conversationsInfo
      .filter((conversation) => conversation.consent === 'allowed')
      .reduce((acc, curr) => acc + curr.unreadCount, 0);
  }, [conversationsInfo]);
  const { initialize } = useClient();
  const { client } = useClient();
  const walletClient = useEthersSigner();
  const { address } = useMountedAccount();

  const handleChat = async () => {
    if (!client) {
      const signer = walletClient;
      try {
        if (!signer) {
          return;
        }
        const clientOptions: Partial<Omit<ClientOptions, 'codecs'>> = {
          appVersion: 'JustWeb3/1.0.0',
          env: env,
        };
        let keys = loadKeys(address ?? '', env);
        if (!keys) {
          keys = await Client.getKeys(signer, {
            env: env,
            skipContactPublishing: false,
            // persistConversations: false,
          });
          storeKeys(address ?? '', keys, env);
        }
        await initialize({
          keys,
          options: clientOptions,
          signer: signer,
        }).then(() => {
          handleOpen(true);
        });

        // handleClient(client)
      } catch (error) {
        console.error('Failed to initialize XMTP Client:', error);
        wipeKeys(address ?? '', env);
      }
    } else {
      handleOpen(true);
    }
  };

  return (
    <NotificationBadge
      count={totalUnreadCount}
      icon={
        <ChatIcon
          width={'23px'}
          height={'23px'}
          onClick={(e) => {
            e.stopPropagation();
            handleChat();
          }}
        />
      }
    />
  );
};
