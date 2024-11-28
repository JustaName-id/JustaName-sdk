import { useMutation } from '@tanstack/react-query';
import { ContentTypeId } from '@xmtp/content-type-primitives';
import type { Attachment } from '@xmtp/content-type-remote-attachment';
import { ContentTypeAttachment } from '@xmtp/content-type-remote-attachment';
import {
  CachedConversation,
  DecodedMessage,
  SendOptions,
  useSendMessage,
} from '@xmtp/react-sdk';

export const sendAttachment = async (
  conversation: CachedConversation,
  attachment: Attachment,
  sendMessage: <T = string>(
    conversation: CachedConversation,
    content: T,
    contentType?: ContentTypeId,
    sendOptions?: Omit<SendOptions, 'contentType'>
  ) => Promise<DecodedMessage<any> | undefined>
) => {
  try {
    await sendMessage(conversation, attachment, ContentTypeAttachment);
  } catch (e) {
    // const error = e as Error;
  }
};

export const useSendAttachment = (conversation?: CachedConversation) => {
  const { sendMessage } = useSendMessage();

  return useMutation({
    mutationFn: (attachment: Attachment) => {
      if (!conversation) throw new Error('Conversation not found');
      return sendAttachment(conversation, attachment, sendMessage);
    },
  });
};
