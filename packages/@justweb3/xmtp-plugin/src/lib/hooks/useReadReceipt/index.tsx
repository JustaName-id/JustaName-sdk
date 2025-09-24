import { useMutation } from '@tanstack/react-query';
import { ContentTypeReadReceipt } from '@xmtp/content-type-read-receipt';
import { FullConversation } from '../useConversations';

export const useReadReceipt = (conversation?: FullConversation) => {

  return useMutation({
    mutationFn: () => {
      if (!conversation) throw new Error('Conversation not found');
      return conversation.send({}, ContentTypeReadReceipt);
    },
  });
};
