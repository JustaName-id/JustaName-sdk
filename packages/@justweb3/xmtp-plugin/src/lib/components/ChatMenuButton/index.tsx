'use client';
import { ArrowIcon, ClickableItem, SPAN } from '@justweb3/ui';
import { XmtpEnvironment } from '../../plugins';
import { useJustWeb3XMTP } from '../../providers/JustWeb3XMTPProvider';
import { useMemo } from 'react';
import { useEthersSigner, useXMTPClient } from '../../hooks';
import { useXMTPContext } from '../../hooks/useXMTPContext';

export interface ChatMenuButtonProps {
  handleOpen: (open: boolean) => void;
  env: XmtpEnvironment;
}
export const ChatMenuButton: React.FC<ChatMenuButtonProps> = ({
  handleOpen,
  env,
}) => {
  const { conversationsInfo } = useJustWeb3XMTP();
  const totalUnreadCount = useMemo(() => {
    return conversationsInfo
      .filter((conversation) => conversation.consent === 'allowed')
      .reduce((acc, curr) => acc + curr.unreadCount, 0);
  }, [conversationsInfo]);
  const { initializeXmtp } = useXMTPClient();
  const { client } = useXMTPContext();
  const signer = useEthersSigner();

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
    <ClickableItem
      title={'Chat'}
      left={
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2.5C11.9884 2.49947 13.8956 3.28926 15.3021 4.69566C16.7086 6.10206 17.4992 8.00989 17.5 9.9995C17.4997 10.9847 17.3055 11.9603 16.9285 12.8704C16.5514 13.7806 15.9989 14.6075 15.3025 15.304C14.606 16.0005 13.7793 16.5529 12.8695 16.9297C11.9597 17.3065 10.9847 17.5003 10 17.5C8.694 17.5 7.09 17.1718 5.946 16.5524L3.156 17.475C3.06789 17.5039 2.97347 17.5078 2.8833 17.4861C2.79313 17.4644 2.71076 17.4181 2.6454 17.3523C2.58003 17.2865 2.53425 17.2037 2.51316 17.1134C2.49208 17.023 2.49652 16.9286 2.526 16.8406L3.452 14.0679C2.78 12.8942 2.5 11.3603 2.5 9.9995C2.5008 8.00989 3.29139 6.10206 4.69788 4.69566C6.10437 3.28926 8.01158 2.49947 10 2.5Z"
            fill="var(--justweb3-primary-color)"
          />
        </svg>
      }
      style={{
        width: '100%',
      }}
      onClick={handleChat}
      right={
        <>
          {totalUnreadCount > 0 && (
            <div
              style={{
                background: 'var(--justweb3-primary-color)',
                padding: '5px',
                borderRadius: '100px',
                height: '8px',
                minWidth: '8px',
                width: 'fit-content',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'content-box',
              }}
            >
              <SPAN
                style={{
                  fontSize: '10px',
                  color: 'var(--justweb3-background-color)',
                }}
              >
                {totalUnreadCount}
              </SPAN>
            </div>
          )}
          <ArrowIcon width={20} />
        </>
      }
    />
  );
};
