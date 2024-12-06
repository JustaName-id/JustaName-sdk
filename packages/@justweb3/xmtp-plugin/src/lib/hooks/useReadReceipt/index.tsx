import { useMutation } from '@tanstack/react-query';
import { CachedConversation, useSendMessage } from '@xmtp/react-sdk';
import { ContentTypeReadReceipt } from '@xmtp/content-type-read-receipt';

export const useReadReceipt = (conversation?: CachedConversation) => {
  const { sendMessage } = useSendMessage();

  return useMutation({
    mutationFn: () => {
      if (!conversation) throw new Error('Conversation not found');
      return sendMessage(conversation, {}, ContentTypeReadReceipt);
    },
  });
};
