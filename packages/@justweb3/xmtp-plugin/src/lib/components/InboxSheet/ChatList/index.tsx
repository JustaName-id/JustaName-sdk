import { PrimaryNameRecord } from '@justaname.id/react';
import { Flex } from '@justweb3/ui';
import { DecodedMessage } from '@xmtp/browser-sdk';
import React from 'react';
import { FullConversation } from '../../../hooks';
import { MessageItem } from './MessageItem';

export interface ChatListProps {
  conversations: FullConversation[];
  handleOpenChat: (
    conversation: FullConversation
  ) => void;
  blockedList?: boolean;
  primaryNames: PrimaryNameRecord | undefined;
  conversationsInfo?: {
    conversationId: string;
    unreadCount: number;
    consent: 'allowed' | 'blocked' | 'requested';
    lastMessage: DecodedMessage;
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
          if (a.lastMessage?.sentAtNs && b.lastMessage?.sentAtNs) {
            // a.lastMessage.sentAt and b.lastMessage.sentA are Date objects
            return (
              Number(b.lastMessage.sentAtNs - a.lastMessage.sentAtNs)
            );
          }
          return 0;
        })
        .map((conv) => {
          const conversation = conversations.find(
            (item) => item.id === conv.conversationId
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
              key={conversation.id}
              blocked={blockedList}
            />
          );
        })}
    </Flex>
  );
};
