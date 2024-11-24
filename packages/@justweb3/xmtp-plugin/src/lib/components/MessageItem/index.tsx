import {
  attachmentContentTypeConfig,
  CachedConversation,
  ContentTypeMetadata,
  reactionContentTypeConfig,
  replyContentTypeConfig,
  useLastMessage,
} from '@xmtp/react-sdk';
import { useEnsAvatar, usePrimaryName, useRecords } from '@justaname.id/react';
import { Avatar, Flex, formatText, P, SPAN } from '@justweb3/ui';
import React, { useMemo } from 'react';

export interface MessageItemProps {
  conversation: CachedConversation<ContentTypeMetadata>;
}

export const MessageItem: React.FC<MessageItemProps> = ({ conversation }) => {
  const lastMessage = useLastMessage(conversation.topic);
  const { primaryName } = usePrimaryName({
    address: conversation.peerAddress as `0x${string}`,
  });
  const { records } = useRecords({
    ens: primaryName,
  });
  const { sanitizeEnsImage } = useEnsAvatar();

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
        border: '1px solid #E8E8E8',
        borderRadius: '5px',
        cursor: 'pointer',
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

      <Flex direction={'column'} gap={'5px'} style={{ marginLeft: '10px' }}>
        <P style={{ fontWeight: '700' }}>
          {primaryName || formatText(conversation.peerAddress, 4)}
        </P>
        <SPAN style={{ fontSize: '10px' }}>
          {lastContent || 'No preview available'}
        </SPAN>
      </Flex>
    </Flex>
  );
};
