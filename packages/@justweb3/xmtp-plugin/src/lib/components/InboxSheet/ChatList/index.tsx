import { PrimaryNameRecord } from '@justaname.id/react';
import { Flex } from '@justweb3/ui';
import { DecodedMessage } from '@xmtp/browser-sdk';
import React, { useEffect, useMemo, useState } from 'react';
import { FullConversation } from '../../../hooks';
import { useXMTPContext } from '../../../hooks/useXMTPContext';
import { MessageItem } from './MessageItem';
import { Conversation, Client, ConsentState } from '@xmtp/browser-sdk';

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

const processSingleConversation = async (
  convo: Conversation,
  client: Client,
  consent: 'allowed' | 'blocked' | 'requested'
): Promise<FullConversation> => {
  const convoMembers = await convo.members();
  const ownInboxId = client.inboxId;

  const peerMember = convoMembers.find(
    (member) => member.inboxId !== ownInboxId
  );

  let peerAddressString: string | undefined;
  if (peerMember) {
    const peerIdentifiers = peerMember.accountIdentifiers;
    peerAddressString = peerIdentifiers
      ?.filter((i) => i.identifierKind === 'Ethereum')
      .map((i) => i.identifier)[0];
  }

  const fullConvo = convo as unknown as FullConversation;
  fullConvo.peerAddress = peerAddressString || '';

  if (consent === 'allowed') fullConvo.consent = ConsentState.Allowed;
  else if (consent === 'blocked') fullConvo.consent = ConsentState.Denied;
  else fullConvo.consent = ConsentState.Unknown;

  return fullConvo;
};

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
      const relevantConversationsInfo = conversationsInfo.filter(info => consent === info.consent);

      const missingConvDetails = relevantConversationsInfo
        .filter(info => !conversations.find(c => c.id === info.conversationId))
        .map(info => ({ id: info.conversationId, consentState: info.consent }));

      const newMissingConversations: Record<string, FullConversation> = {};
      for (const detail of missingConvDetails) {
        const rawConversation = await client.conversations.getConversationById(detail.id);
        if (rawConversation) {
          const processedConversation = await processSingleConversation(rawConversation, client, detail.consentState);
          newMissingConversations[detail.id] = processedConversation;
        }
      }
      if (Object.keys(newMissingConversations).length > 0) {
        setMissingConversations(prev => ({ ...prev, ...newMissingConversations }));
      }
    };

    fetchMissingConversations();
  }, [conversationsInfo, conversations, client, consent]);


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
  }, [conversationsInfo, conversations, missingConversations]);

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
