import { XmtpEnvironment } from '../../plugins';
import { NotificationBadge } from '@justweb3/ui';
import { ChatIcon } from '../../icons/ChatIcon';
import { useJustWeb3XMTP } from '../../providers/JustWeb3XMTPProvider';
import { useMemo } from 'react';
import { useXMTPClient } from '../../hooks';

export interface ChatMenuButtonProps {
  handleOpen: (open: boolean) => void;
  env: XmtpEnvironment;
}

export const JustWeb3ButtonRight: React.FC<ChatMenuButtonProps> = ({
  handleOpen,
  env,
}) => {
  const { conversationsInfo } = useJustWeb3XMTP();
  const { initializeXmtp, client } = useXMTPClient();
  const totalUnreadCount = useMemo(() => {
    return conversationsInfo
      .filter((conversation) => conversation.consent === 'allowed')
      .reduce((acc, curr) => acc + curr.unreadCount, 0);
  }, [conversationsInfo]);
  const handleChat = async () => {
    if (!client) {
      initializeXmtp().then(() => {
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
