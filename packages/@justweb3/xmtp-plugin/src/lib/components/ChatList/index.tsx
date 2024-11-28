import { CachedConversation, ContentTypeMetadata } from '@xmtp/react-sdk';
import { Flex } from '@justweb3/ui';
import React from 'react';
import { MessageItem } from '../MessageItem';

export interface ChatListProps {
  conversations: CachedConversation<ContentTypeMetadata>[];
  handleOpenChat: (
    conversation: CachedConversation<ContentTypeMetadata> | null
  ) => void;
}

export const ChatList: React.FC<ChatListProps> = ({
  conversations,
  handleOpenChat,
}) => {
  return (
    <Flex direction={'column'} gap={'10px'}>
      {conversations.map((conversation) => (
        <MessageItem
          conversation={conversation}
          onClick={() => handleOpenChat(conversation)}
          key={conversation.topic}
        />
      ))}
    </Flex>
  );
};
