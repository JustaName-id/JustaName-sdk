import { Client, DecodedMessage } from '@xmtp/browser-sdk';
import { ContentTypeReadReceipt } from '@xmtp/content-type-read-receipt';
import { useEffect, useRef, useCallback } from 'react';

type ConversationInfo = {
  conversationId: string;
  unreadCount: number;
  consent: 'allowed' | 'blocked' | 'requested';
  lastMessage: DecodedMessage;
};

interface UseStreamMessagesProps {
  conversationsInfo: ConversationInfo[];
  setConversationsInfo: React.Dispatch<
    React.SetStateAction<ConversationInfo[]>
  >;
  client: Client | undefined;
}

export const useStreamMessages = ({
  conversationsInfo,
  setConversationsInfo,
  client,
}: UseStreamMessagesProps) => {
  const streamRef = useRef<any>(null);
  const isProcessingMessages = useRef<boolean>(false);
  const conversationsInfoRef = useRef<ConversationInfo[]>(conversationsInfo);
  const isSettingUpStream = useRef<boolean>(false);
  const prevClientRef = useRef<Client | undefined>(undefined);

  useEffect(() => {
    conversationsInfoRef.current = conversationsInfo;
  }, [conversationsInfo]);

  const updateConversationWithMessage = useCallback(
    (message: DecodedMessage) => {
      if (message.contentType.sameAs(ContentTypeReadReceipt)) {
        return;
      }

      const conversationId = message.conversationId;
      const currentConversationsInfo = conversationsInfoRef.current;
      const conversationInfo = currentConversationsInfo.find(
        (info) => info.conversationId === conversationId
      );

      if (conversationInfo?.lastMessage?.id === message.id) {
        return;
      }

      if (conversationInfo?.lastMessage?.sentAtNs && message.sentAtNs) {
        const existingTimestamp = BigInt(conversationInfo.lastMessage.sentAtNs);
        const newTimestamp = BigInt(message.sentAtNs);
        if (existingTimestamp > newTimestamp) {
          return;
        }
      }

      const unreadCount = conversationInfo
        ? conversationInfo.unreadCount + 1
        : 1;

      setConversationsInfo((prev) => {
        const index = prev.findIndex(
          (item) => item.conversationId === conversationId
        );
        const newState = [...prev];

        if (index === -1) {
          return [
            {
              conversationId,
              unreadCount,
              lastMessage: message,
              consent: 'requested',
            },
            ...prev,
          ];
        } else {
          const updatedInfo = {
            ...newState[index],
            unreadCount,
            lastMessage: message,
            consent: newState[index].consent,
          };

          newState.splice(index, 1);

          return [updatedInfo, ...newState];
        }
      });
    },
    [setConversationsInfo]
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

    if (streamRef.current && typeof streamRef.current.close === 'function') {
      streamRef.current.close();
      streamRef.current = null;
    }

    const setupMessageStream = async () => {
      try {
        if (isProcessingMessages.current || isSettingUpStream.current) {
          return;
        }

        isSettingUpStream.current = true;
        isProcessingMessages.current = true;

        const stream = await client.conversations.streamAllMessages();
        streamRef.current = stream;

        for await (const message of stream) {
          if (message) {
            updateConversationWithMessage(message);
          }
        }
      } catch (error) {
        console.error('[useStreamMessages] Error processing messages:', error);
      } finally {
        isProcessingMessages.current = false;
        isSettingUpStream.current = false;
      }
    };

    setupMessageStream();

    return () => {
      if (streamRef.current && typeof streamRef.current.close === 'function') {
        streamRef.current.close();
        streamRef.current = null;
      }
    };
  }, [client, updateConversationWithMessage]);

  return {
    isStreamActive: !!streamRef.current,
  };
};
