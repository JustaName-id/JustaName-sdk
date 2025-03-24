import { useMountedAccount } from '@justaname.id/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Conversation, DecodedMessage } from '@xmtp/browser-sdk';
import { useEffect, useRef } from 'react';

const fetchMessages = async (conversation: Conversation) => {
  const response = await conversation.messages();
  return response;
};

export const useMessages = (conversation: Conversation) => {
  const { address } = useMountedAccount();
  const queryClient = useQueryClient();
  const stopStreamRef = useRef<(() => void) | null>(null);

  const queryKey = ['MESSAGES', address, conversation?.id];

  const query = useQuery({
    queryKey,
    queryFn: () => fetchMessages(conversation),
    enabled: !!address && !!conversation,
  });

  useEffect(() => {
    if (!conversation || !address) return;

    const startStream = async () => {
      const onMessage = (
        error: Error | null,
        message: DecodedMessage | undefined
      ) => {
        if (message) {
          queryClient.setQueryData(
            queryKey,
            (oldData: DecodedMessage[] = []) => {
              if (!oldData.some((m) => m.id === message.id)) {
                return [...oldData, message];
              }
              return oldData;
            }
          );
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
  }, [conversation?.id, address, queryClient, queryKey]);

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
