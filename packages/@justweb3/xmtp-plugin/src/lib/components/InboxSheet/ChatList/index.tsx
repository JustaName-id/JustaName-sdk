import { Flex } from '@justweb3/ui';
import {
  CachedConversation,
  CachedMessage,
  ContentTypeMetadata,
} from '@xmtp/react-sdk';
import React from 'react';
import { MessageItem } from './MessageItem';
import { usePrimaryNameBatch } from '@justaname.id/react';

export interface ChatListProps {
  conversations: CachedConversation<ContentTypeMetadata>[];
  handleOpenChat: (
    conversation: CachedConversation<ContentTypeMetadata>
  ) => void;
  blockedList?: boolean;
  conversationsInfo?: {
    conversationId: string;
    unreadCount: number;
    consent: 'allowed' | 'blocked' | 'requested';
    lastMessage: CachedMessage<any, ContentTypeMetadata>;
  }[];
}

export const ChatList: React.FC<ChatListProps> = ({
  conversations,
  handleOpenChat,
  blockedList,
  conversationsInfo,
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
          // unreadCount={
          //   conversationsInfo?.find(
          //     (item) => item.conversationId === conversation.topic
          //   )?.unreadCount
          // }
          //
          conversationInfo={conversationsInfo?.find(
            (item) => item.conversationId === conversation.topic
          )}
          onClick={() => handleOpenChat(conversation)}
          key={conversation.topic}
          blocked={blockedList}
        />
      ))}
    </Flex>
  );
};
