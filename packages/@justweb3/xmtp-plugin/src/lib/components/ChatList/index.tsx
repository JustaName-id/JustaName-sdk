import { Flex } from '@justweb3/ui';
import { CachedConversation, ContentTypeMetadata } from '@xmtp/react-sdk';
import React from 'react';
import { MessageItem } from '../MessageItem';
import { usePrimaryNameBatch } from '@justaname.id/react';

export interface ChatListProps {
  conversations: CachedConversation<ContentTypeMetadata>[];
  handleOpenChat: (
    conversation: CachedConversation<ContentTypeMetadata> | null
  ) => void;
  blockedList?: boolean;
}

export const ChatList: React.FC<ChatListProps> = ({
  conversations,
  handleOpenChat,
  blockedList,
}) => {
  const { allPrimaryNames } = usePrimaryNameBatch({
    addresses: conversations.map((conversation) => conversation.peerAddress),
  });

  return (
    <Flex
      direction={'column'}
      gap={'10px'}
      style={{
        paddingTop: '10px',
      }}
    >
      {conversations.map((conversation) => (
        <MessageItem
          primaryName={allPrimaryNames?.[conversation.peerAddress]}
          conversation={conversation}
          onClick={() => handleOpenChat(conversation)}
          key={conversation.topic}
          blocked={blockedList}
        />
      ))}
    </Flex>
  );
};
