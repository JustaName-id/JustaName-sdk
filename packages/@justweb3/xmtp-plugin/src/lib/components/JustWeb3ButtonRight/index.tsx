import { XmtpEnvironment } from '../../plugins';
import { NotificationBadge } from '@justweb3/ui';
import { ChatIcon } from '../../icons/ChatIcon';
import { useJustWeb3XMTP } from '../../providers/JustWeb3XMTPProvider';
import { useMemo } from 'react';
import { useEthersSigner, useXMTPClient } from '../../hooks';
import { useXMTPContext } from '../../hooks/useXMTPContext';

export interface ChatMenuButtonProps {
  handleOpen: (open: boolean) => void;
  env: XmtpEnvironment;
}

export const JustWeb3ButtonRight: React.FC<ChatMenuButtonProps> = ({
  handleOpen,
  env,
}) => {
  const { conversationsInfo } = useJustWeb3XMTP();
  const { initializeXmtp } = useXMTPClient();
  const { client } = useXMTPContext();
  const signer = useEthersSigner();
  const totalUnreadCount = useMemo(() => {
    return conversationsInfo
      .filter((conversation) => conversation.consent === 'allowed')
      .reduce((acc, curr) => acc + curr.unreadCount, 0);
  }, [conversationsInfo]);
  const handleChat = async () => {
    if (!client && !!signer) {
      initializeXmtp({ signer }).then(() => {
        handleOpen(true);
      });
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
