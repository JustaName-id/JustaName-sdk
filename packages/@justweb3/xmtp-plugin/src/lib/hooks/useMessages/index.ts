'use client';
import { useMountedAccount } from '@justaname.id/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Conversation, DecodedMessage } from '@xmtp/browser-sdk';
import { useEffect, useRef, useMemo } from 'react';

const fetchMessages = async (conversation: Conversation) => {
  await conversation.sync();
  const response = await conversation.messages();
  return response;
};

interface UseMessagesOptions {
  disableStream?: boolean;
}

export const useMessages = (
  conversation: Conversation,
  options?: UseMessagesOptions
) => {
  const { address } = useMountedAccount();
  const queryClient = useQueryClient();
  const stopStreamRef = useRef<(() => void) | null>(null);
  const lastMessageUpdateRef = useRef<string | null>(null);

  const queryKey = useMemo(
    () => ['MESSAGES', address, conversation?.id],
    [address, conversation?.id]
  );

  const query = useQuery({
    queryKey,
    queryFn: () => fetchMessages(conversation),
    enabled: !!address && !!conversation,
    staleTime: 5000,
  });

  useEffect(() => {
    if (!conversation || !address || options?.disableStream) {
      if (stopStreamRef.current) {
        stopStreamRef.current();
        stopStreamRef.current = null;
      }
      return;
    }

    if (stopStreamRef.current) return;

    const startStream = async () => {
      const onMessage = (
        error: Error | null,
        message: DecodedMessage | undefined
      ) => {
        if (message) {
          if (lastMessageUpdateRef.current === message.id) {
            return;
          }

          lastMessageUpdateRef.current = message.id;

          queryClient.setQueryData(
            queryKey,
            (oldData: DecodedMessage[] = []) => {
              if (!oldData.some((m) => m.id === message.id)) {
                return [...oldData, message];
              }
              return oldData;
            }
          );

          setTimeout(() => {
            queryClient.invalidateQueries({ queryKey });
          }, 100);
        }
      };

      const stream = await conversation.stream(onMessage);

      if (stream) {
        stopStreamRef.current = () => {
          void stream.return(undefined);
        };
      }
    };

    void startStream();

    return () => {
      if (stopStreamRef.current) {
        stopStreamRef.current();
        stopStreamRef.current = null;
      }
    };
  }, [
    conversation?.id,
    address,
    queryClient,
    options?.disableStream,
    queryKey,
  ]);

  const syncMessages = async () => {
    if (!conversation) return;

    try {
      await conversation.sync();
      await queryClient.invalidateQueries({ queryKey });
    } catch (error) {
      console.error('Error syncing messages:', error);
    }
  };

  return {
    messages: query.data ?? [],
    messagesLoading: query.isLoading,
    syncMessages,
  };
};
