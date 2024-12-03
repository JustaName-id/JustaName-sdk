import { Flex } from '@justweb3/ui';
import { CachedConversation, ContentTypeMetadata } from '@xmtp/react-sdk';
import React from 'react';
import { MessageItem } from '../MessageItem';

export interface ChatListProps {
  conversations: CachedConversation<ContentTypeMetadata>[];
  handleOpenChat: (
    conversation: CachedConversation<ContentTypeMetadata> | null
  ) => void;
  blockedList?: boolean
}

export const ChatList: React.FC<ChatListProps> = ({
  conversations,
  handleOpenChat,
  blockedList
}) => {
  return (
    <Flex direction={'column'} gap={'10px'} style={{
      paddingTop: '10px'
    }}>
      {conversations.map((conversation) => (
        <MessageItem
          conversation={conversation}
          onClick={() => handleOpenChat(conversation)}
          key={conversation.topic}
          blocked={blockedList}
        />
      ))}
    </Flex>
  );
};
