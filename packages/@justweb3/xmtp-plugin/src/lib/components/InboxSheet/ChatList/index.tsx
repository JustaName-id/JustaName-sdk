import { PrimaryNameRecord } from '@justaname.id/react';
import { Flex } from '@justweb3/ui';
import { DecodedMessage } from '@xmtp/browser-sdk';
import React, { useEffect, useMemo, useState } from 'react';
import { FullConversation } from '../../../hooks';
import { useXMTPContext } from '../../../hooks/useXMTPContext';
import { MessageItem } from './MessageItem';

export interface ChatListProps {
  conversations: FullConversation[];
  handleOpenChat: (
    conversation: FullConversation
  ) => void;
  blockedList?: boolean;
  consent: 'allowed' | 'blocked' | 'requested';
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
  consent,
  primaryNames,
}) => {
  const { client } = useXMTPContext();

  const [missingConversations, setMissingConversations] = useState<Record<string, FullConversation>>({});

  useEffect(() => {
    const fetchMissingConversations = async () => {
      if (!conversationsInfo || !client) return;
      const consentedConvsersationsInfo = conversationsInfo.filter(info => consent === info.consent);

      const missingIds = consentedConvsersationsInfo.filter(info => !conversations.find(c => c.id === info.conversationId)).map(info => info.conversationId);

      const newConversations: Record<string, FullConversation> = {};
      for (const id of missingIds) {
        const conversation = await client.conversations.getConversationById(id);
        if (conversation) newConversations[id] = conversation as unknown as FullConversation;
      }
      setMissingConversations(prev => ({ ...prev, ...newConversations }));
    };

    fetchMissingConversations();
  }, [conversationsInfo, conversations, client]);

  const sortedConversations = useMemo(() => {
    if (!conversationsInfo || conversationsInfo.length === 0) {
      return [];
    }

    return [...conversationsInfo]
      .sort((a, b) => {
        const aTime = a.lastMessage?.sentAtNs ? Number(a.lastMessage.sentAtNs) : 0;
        const bTime = b.lastMessage?.sentAtNs ? Number(b.lastMessage.sentAtNs) : 0;
        return bTime - aTime;
      })
      .map((convInfo) => {
        const conversation = conversations.find(
          (item) => item.id === convInfo.conversationId
        ) || missingConversations[convInfo.conversationId];

        if (conversation) {
          return { conversation, convInfo };
        }
        return null;
      })
      .filter((item): item is { conversation: FullConversation; convInfo: typeof conversationsInfo[0] } =>
        item !== null
      );
  }, [conversationsInfo, conversations]);

  return (
    <Flex direction={'column'} gap={'10px'}>
      {sortedConversations.map(({ conversation, convInfo }) => (
        <MessageItem
          key={conversation.id}
          primaryName={primaryNames?.[conversation.peerAddress]}
          conversation={conversation}
          conversationInfo={convInfo}
          onClick={() => handleOpenChat(conversation)}
          blocked={blockedList}
        />
      ))}
    </Flex>
  );
};
