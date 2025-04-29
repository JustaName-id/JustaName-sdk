import { useMutation } from '@tanstack/react-query';
import type { Attachment } from '@xmtp/content-type-remote-attachment';
import { ContentTypeAttachment } from '@xmtp/content-type-remote-attachment';
import { FullConversation } from '../useConversations';

export const sendAttachment = async (
  conversation: FullConversation,
  attachment: Attachment,
) => {
  try {
    await conversation.send(attachment, ContentTypeAttachment);
  } catch (e) {
    // const error = e as Error;
  }
};

export const useSendAttachment = (conversation?: FullConversation) => {

  return useMutation({
    mutationFn: (attachment: Attachment) => {
      if (!conversation) throw new Error('Conversation not found');
      return sendAttachment(conversation, attachment);
    },
  });
};
