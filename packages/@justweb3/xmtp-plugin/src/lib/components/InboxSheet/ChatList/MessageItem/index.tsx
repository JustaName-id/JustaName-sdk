import { useEnsAvatar, useRecords } from '@justaname.id/react';
import { Avatar, Button, Flex, formatText, P, SPAN } from '@justweb3/ui';
import { ConsentState, DecodedMessage } from '@xmtp/browser-sdk';
import { ContentTypeReaction } from '@xmtp/content-type-reaction';
import { ContentTypeAttachment } from '@xmtp/content-type-remote-attachment';
import { ContentTypeReply } from '@xmtp/content-type-reply';
import React, { useMemo } from 'react';
import { FullConversation, useAddressInboxId } from '../../../../hooks';
import { formatChatDate } from '../../../../utils/formatChatDate';

export interface MessageItemProps {
  conversation: FullConversation;
  onClick?: () => void;
  blocked?: boolean;
  primaryName?: string | null;
  conversationInfo?: {
    conversationId: string;
    unreadCount: number;
    consent: 'allowed' | 'blocked' | 'requested';
    lastMessage: DecodedMessage;
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
  const { inboxId } = useAddressInboxId(conversation.peerAddress);

  // const unreadMessages = useMemo(() => {
  //   if (!lastMessage) return false;
  //   return lastMessage.contentType !== ContentTypeReadReceipt.toString();
  // }, [lastMessage]);

  const allowUser = async () => {
    await conversation.updateConsentState(ConsentState.Allowed)
  };

  const ignoreUser = async () => {
    await conversation.updateConsentState(ConsentState.Denied)
  };

  const lastContent = useMemo(() => {
    const lastMessage = conversationInfo?.lastMessage;
    if (!lastMessage) return '';

    if (typeof lastMessage.content === 'string') {
      return lastMessage.content;
    }

    if (
      lastMessage.contentType.sameAs(ContentTypeAttachment)
    ) {
      return lastMessage.content.filename;
    }

    if (
      lastMessage.contentType.sameAs(ContentTypeReaction)
    ) {
      return lastMessage.fallback;
    }

    if (
      lastMessage.contentType.sameAs(ContentTypeReply)
    ) {
      return 'replied "' + lastMessage.content.content + '"';
    }

    return lastMessage.fallback;
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
            ? conversationInfo?.lastMessage.senderInboxId !==
              inboxId
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
              style={{
                height: '10px',
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
                style={{
                  height: '10px',
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
              {conversationInfo?.lastMessage?.sentAtNs
                ? formatChatDate(conversationInfo?.lastMessage.sentAtNs)
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

