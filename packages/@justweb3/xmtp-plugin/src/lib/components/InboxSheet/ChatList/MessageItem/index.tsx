import {
  attachmentContentTypeConfig,
  CachedConversation,
  CachedMessage,
  ContentTypeMetadata,
  reactionContentTypeConfig,
  replyContentTypeConfig,
  useConsent,
} from '@xmtp/react-sdk';
import { useEnsAvatar, useRecords } from '@justaname.id/react';
import { Avatar, Button, Flex, formatText, P, SPAN } from '@justweb3/ui';
import React, { useMemo } from 'react';
import { formatChatDate } from '../../../../utils/formatChatDate';

export interface MessageItemProps {
  conversation: CachedConversation<ContentTypeMetadata>;
  onClick?: () => void;
  blocked?: boolean;
  primaryName?: string | null;
  conversationInfo?: {
    conversationId: string;
    unreadCount: number;
    consent: 'allowed' | 'blocked' | 'requested';
    lastMessage: CachedMessage<any, ContentTypeMetadata>;
  };
}

const MessageItem: React.FC<MessageItemProps> = ({
  conversation,
  onClick,
  blocked,
  primaryName,
  conversationInfo,
}) => {
  const { records } = useRecords({
    ens: primaryName || undefined,
  });
  const { sanitizeEnsImage } = useEnsAvatar();

  // const unreadMessages = useMemo(() => {
  //   if (!lastMessage) return false;
  //   return lastMessage.contentType !== ContentTypeReadReceipt.toString();
  // }, [lastMessage]);

  const { allow, deny } = useConsent();

  const allowUser = async () => {
    await allow([conversation.peerAddress]);
  };

  const ignoreUser = async () => {
    await deny([conversation.peerAddress]);
  };

  const lastContent = useMemo(() => {
    const lastMessage = conversationInfo?.lastMessage;
    if (!lastMessage) return '';

    if (typeof lastMessage.content === 'string') {
      return lastMessage.content;
    }

    if (
      attachmentContentTypeConfig.contentTypes.includes(
        lastMessage?.contentType
      )
    ) {
      return lastMessage.content.filename;
    }

    if (
      reactionContentTypeConfig.contentTypes.includes(lastMessage?.contentType)
    ) {
      return lastMessage.contentFallback;
    }

    if (
      replyContentTypeConfig.contentTypes.includes(lastMessage?.contentType)
    ) {
      return 'replied "' + lastMessage.content.content + '"';
    }

    return lastMessage.contentFallback;
  }, [conversationInfo, conversationInfo?.lastMessage]);

  return (
    <Flex
      style={{
        padding: '10px',
        border: '1px solid var(--justweb3-foreground-color-4)',
        borderRadius: '5px',
        cursor: blocked ? 'auto' : 'pointer',
      }}
      onClick={() => {
        if (blocked) return;
        onClick && onClick();
      }}
    >
      <Avatar
        src={
          primaryName
            ? sanitizeEnsImage({
                name: primaryName,
                chainId: 1,
                image: records?.sanitizedRecords?.avatar,
              })
            : undefined
        }
      />

      <Flex
        direction={'column'}
        style={{
          marginLeft: '10px',
          maxWidth:
            conversationInfo?.consent === 'requested'
              ? 'calc(100% - 132px - 44px)'
              : conversationInfo?.consent === 'blocked'
              ? 'calc(100% - 120px)'
              : 'calc(100% - 50px - 32px - 10px)',
          justifyContent: 'space-between',
        }}
      >
        <P style={{ fontWeight: '700' }}>
          {primaryName || formatText(conversation.peerAddress, 4)}
        </P>
        <SPAN
          style={{
            fontSize: '10px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            lineHeight: '12px',
          }}
        >
          {conversationInfo?.lastMessage
            ? conversationInfo?.lastMessage.senderAddress !==
              conversation.peerAddress
              ? 'You: '
              : ''
            : ''}
          {conversationInfo?.lastMessage
            ? lastContent
              ? lastContent
              : 'No preview available'
            : ''}
        </SPAN>
      </Flex>

      <Flex
        direction={'column'}
        gap={'5px'}
        style={{
          marginLeft: 'auto',
          alignContent: 'space-between',
          textAlign: 'end',
        }}
      >
        {conversationInfo?.consent !== 'allowed' ? (
          <Flex gap={'5px'}>
            <Button
              variant="secondary"
              onClick={(event) => {
                event.stopPropagation();
                allowUser();
              }}
            >
              {conversationInfo?.consent === 'requested' ? 'Allow' : 'Unblock'}
            </Button>
            {conversationInfo?.consent === 'requested' && (
              <Button
                variant="destructive-outline"
                onClick={(event) => {
                  event.stopPropagation();
                  ignoreUser();
                }}
              >
                Ignore
              </Button>
            )}
          </Flex>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              placeContent: 'space-between',
              height: '100%',
            }}
          >
            <SPAN style={{ fontSize: '10px' }}>
              {conversationInfo?.lastMessage?.sentAt
                ? formatChatDate(conversationInfo?.lastMessage.sentAt)
                : ''}
            </SPAN>
            {!!conversationInfo?.unreadCount &&
              conversationInfo?.unreadCount > 0 && (
                <div
                  style={{
                    background: 'var(--justweb3-primary-color)',
                    padding: '5px',
                    borderRadius: '100px',
                    height: '8px',
                    minWidth: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxSizing: 'content-box',
                    width: 'fit-content',
                    marginLeft: 'auto',
                  }}
                >
                  <SPAN
                    style={{
                      fontSize: '10px',
                      color: 'var(--justweb3-background-color)',
                    }}
                  >
                    {conversationInfo?.unreadCount}
                  </SPAN>
                </div>
              )}
          </div>
        )}
      </Flex>
    </Flex>
  );
};

const MessageItemMemo = React.memo(MessageItem, (prevProps, nextProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
});

export { MessageItemMemo as MessageItem };
