import {
  attachmentContentTypeConfig,
  CachedConversation,
  ContentTypeMetadata,
  reactionContentTypeConfig,
  replyContentTypeConfig,
  useConsent,
  useLastMessage,
  useStreamMessages,
} from '@xmtp/react-sdk';
import { useEnsAvatar, useRecords } from '@justaname.id/react';
import { Avatar, Button, Flex, formatText, P, SPAN } from '@justweb3/ui';
import React, { useMemo } from 'react';
import { formatChatDate } from '../../utils/formatChatDate';

export interface MessageItemProps {
  conversation: CachedConversation<ContentTypeMetadata>;
  onClick?: () => void;
  blocked?: boolean;
  primaryName?: string;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  conversation,
  onClick,
  blocked,
  primaryName,
}) => {
  const lastMessage = useLastMessage(conversation.topic);
  useStreamMessages(conversation);
  // const { primaryName } = usePrimaryName({
  //   address: conversation.peerAddress as `0x${string}`,
  // });
  const { records } = useRecords({
    ens: primaryName,
  });
  const { sanitizeEnsImage } = useEnsAvatar();

  const { allow, refreshConsentList } = useConsent();

  const allowUser = async () => {
    await refreshConsentList();
    await allow([conversation.peerAddress]);
    await refreshConsentList();
  };

  const lastContent = useMemo(() => {
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
      return lastMessage.contentFallback;
    }

    return lastMessage.contentFallback;
  }, [lastMessage]);

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
          maxWidth: blocked
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
          {lastMessage
            ? lastMessage.senderAddress !== conversation.peerAddress
              ? 'You: '
              : ''
            : ''}
          {lastMessage
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
        {blocked ? (
          <Button variant="secondary" onClick={allowUser} style={{}}>
            Unblock
          </Button>
        ) : (
          <SPAN style={{ fontSize: '10px' }}>
            {lastMessage?.sentAt ? formatChatDate(lastMessage.sentAt) : ''}
          </SPAN>
        )}
      </Flex>
    </Flex>
  );
};
