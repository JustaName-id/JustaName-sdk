import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ConsentState } from '@xmtp/browser-sdk';
import { FullConversation, useConversations, useXMTPClient } from '..';

export interface UseConversationConsentMutationsProps {
  conversation: FullConversation;
  onAllowSuccess?: () => void;
  onBlockSuccess?: () => void;
}

export const useConversationConsentMutations = ({
  conversation,
  onAllowSuccess,
  onBlockSuccess,
}: UseConversationConsentMutationsProps) => {
  const queryClient = useQueryClient();
  const { refetchConvos } = useConversations();
  const { client } = useXMTPClient();

  const allowAddressMutation = useMutation({
    mutationFn: async () => {
      return await conversation.updateConsentState(ConsentState.Allowed);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['conversation', conversation.id],
      });
      if (onAllowSuccess) {
        onAllowSuccess();
      }
      client?.conversations.syncAll();
      refetchConvos();
    },
  });

  const blockAddressMutation = useMutation({
    mutationFn: async () => {
      return await conversation.updateConsentState(ConsentState.Denied);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['conversation', conversation.id],
      });
      if (onBlockSuccess) {
        console.log('block success mutation');
        onBlockSuccess();
      }
      client?.conversations.syncAll();
      refetchConvos();
    },
  });

  return {
    allowAddress: allowAddressMutation.mutateAsync,
    blockAddress: blockAddressMutation.mutateAsync,
    isAllowAddressLoading: allowAddressMutation.isPending,
    isBlockAddressLoading: blockAddressMutation.isPending,
    isLoading: allowAddressMutation.isPending || blockAddressMutation.isPending,
  };
};
