import { useMutation } from '@tanstack/react-query';
import { FullConversation } from '..';

export const _sendMessages = async (
  conversation: FullConversation,
  message: string
) => {
  await conversation.send(message);
};

export const useSendMessages = (conversation: FullConversation) => {
  return useMutation({
    mutationFn: (message: string) => {
      if (!conversation) throw new Error('Conversation not found');
      return _sendMessages(conversation, message);
    },
  });
};
