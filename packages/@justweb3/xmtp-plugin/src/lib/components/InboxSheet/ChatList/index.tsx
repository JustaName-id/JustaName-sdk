import { Flex } from '@justweb3/ui';
import {
  CachedConversation,
  CachedMessage,
  ContentTypeMetadata,
} from '@xmtp/react-sdk';
import React from 'react';
import { MessageItem } from './MessageItem';
import { PrimaryNameRecord } from '@justaname.id/react';

export interface ChatListProps {
  conversations: CachedConversation<ContentTypeMetadata>[];
  handleOpenChat: (
    conversation: CachedConversation<ContentTypeMetadata>
  ) => void;
  blockedList?: boolean;
  primaryNames: PrimaryNameRecord | undefined;
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
  primaryNames,
}) => {
  return (
    <Flex direction={'column'} gap={'10px'}>
      {conversationsInfo
        ?.sort((a, b) => {
          if (a.lastMessage?.sentAt && b.lastMessage?.sentAt) {
            // a.lastMessage.sentAt and b.lastMessage.sentA are Date objects
            return (
              b.lastMessage.sentAt.getTime() - a.lastMessage.sentAt.getTime()
            );
          }
          return 0;
        })
        .map((conv) => {
          const conversation = conversations.find(
            (item) => item.topic === conv.conversationId
          );

          if (!conversation) return null;

          return (
            <MessageItem
              primaryName={primaryNames?.[conversation.peerAddress]}
              conversation={conversation}
              // unreadCount={
              //   conversationsInfo?.find(
              //     (item) => item.conversationId === conversation.topic
              //   )?.unreadCount
              // }
              //
              conversationInfo={conv}
              onClick={() => handleOpenChat(conversation)}
              key={conversation.topic}
              blocked={blockedList}
            />
          );
        })}
    </Flex>
  );
};
