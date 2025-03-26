import { Client, DecodedMessage } from '@xmtp/browser-sdk';
import { useEffect, useRef, useCallback } from 'react';
import { useConversations } from '../useConversations';

type ConversationInfo = {
  conversationId: string;
  unreadCount: number;
  consent: 'allowed' | 'blocked' | 'requested';
  lastMessage: DecodedMessage;
};

interface UseStreamConversationsProps {
  conversationsInfo: ConversationInfo[];
  setConversationsInfo: React.Dispatch<
    React.SetStateAction<ConversationInfo[]>
  >;
  client: Client | undefined;
}

export const useStreamConversations = ({
  conversationsInfo,
  setConversationsInfo,
  client,
}: UseStreamConversationsProps) => {
  const { refetchConvos } = useConversations();
  const conversationStreamRef = useRef<any>(null);
  const isProcessingConversations = useRef<boolean>(false);
  const conversationsInfoRef = useRef<ConversationInfo[]>(conversationsInfo);
  const isSettingUpStream = useRef<boolean>(false);
  const prevClientRef = useRef<Client | undefined>(undefined);

  useEffect(() => {
    conversationsInfoRef.current = conversationsInfo;
  }, [conversationsInfo]);

  const addNewConversation = useCallback(
    async (convoId: string) => {
      setConversationsInfo((prevConversations) => {
        const exists = prevConversations.some(
          (c) => c.conversationId === convoId
        );
        if (exists) return prevConversations;
        return [
          {
            conversationId: convoId,
            unreadCount: 0,
            consent: 'requested' as 'allowed' | 'blocked' | 'requested',
            lastMessage: null as unknown as DecodedMessage,
          },
          ...prevConversations,
        ];
      });

      await refetchConvos();
    },
    [refetchConvos, setConversationsInfo]
  );

  useEffect(() => {
    if (
      !client ||
      client === prevClientRef.current ||
      isSettingUpStream.current
    ) {
      return;
    }

    prevClientRef.current = client;

    if (
      conversationStreamRef.current &&
      typeof conversationStreamRef.current.close === 'function'
    ) {
      conversationStreamRef.current.close();
      conversationStreamRef.current = null;
    }

    const setupConversationStream = async () => {
      try {
        if (isProcessingConversations.current || isSettingUpStream.current) {
          return;
        }

        isSettingUpStream.current = true;
        isProcessingConversations.current = true;

        const stream = await client.conversations.stream();
        conversationStreamRef.current = stream;

        for await (const convo of stream) {
          if (convo) {
            const currentConversationsInfo = conversationsInfoRef.current;
            const conversationExists = currentConversationsInfo.some(
              (c) => c.conversationId === convo.id
            );

            if (!conversationExists) {
              await addNewConversation(convo.id);
            }
          }
        }
      } catch (error) {
        console.error(
          '[useStreamConversations] Error in conversation stream:',
          error
        );
      } finally {
        isProcessingConversations.current = false;
        isSettingUpStream.current = false;
      }
    };

    setupConversationStream();

    return () => {
      if (
        conversationStreamRef.current &&
        typeof conversationStreamRef.current.close === 'function'
      ) {
        conversationStreamRef.current.close();
        conversationStreamRef.current = null;
      }
    };
  }, [client, addNewConversation]);

  return {
    isStreamActive: !!conversationStreamRef.current,
  };
};
