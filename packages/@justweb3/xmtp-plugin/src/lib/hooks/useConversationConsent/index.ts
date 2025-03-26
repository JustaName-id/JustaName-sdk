import { useQuery } from '@tanstack/react-query';
import { ConsentState } from '@xmtp/browser-sdk';
import { useCallback, useEffect, useState } from 'react';
import { FullConversation } from '..';

export const useConversationConsent = (conversation: FullConversation) => {
  const [isRequest, setIsRequest] = useState(false);

  const { data: consentState, refetch: refetchConsentState } = useQuery({
    queryKey: ['conversation', conversation.id, 'consent'],
    queryFn: async () => {
      try {
        const convoConsentState = await conversation.consentState();
        return convoConsentState;
      } catch (error) {
        console.error('Error checking consent state:', error);
        return null;
      }
    },
    enabled: !!conversation.id,
  });

  useEffect(() => {
    if (consentState !== undefined) {
      setIsRequest(consentState === ConsentState.Unknown);
    }
  }, [consentState]);

  const checkConsentState = useCallback(async () => {
    try {
      const result = await refetchConsentState();
      return result.data;
    } catch (error) {
      console.error('Error checking consent state:', error);
      return null;
    }
  }, [refetchConsentState]);

  const handleReadMessagesIfAllowed = useCallback(
    async (readReceiptFn: () => Promise<string>) => {
      try {
        const currentConsentState =
          consentState || (await conversation.consentState());
        if (currentConsentState === ConsentState.Allowed) {
          await readReceiptFn();
        }
        return currentConsentState;
      } catch (error) {
        console.error('Error sending read receipt:', error);
        return null;
      }
    },
    [conversation, consentState]
  );

  return {
    isRequest,
    consentState,
    checkConsentState,
    handleReadMessagesIfAllowed,
    setIsRequest,
  };
};
