import { useMutation } from '@tanstack/react-query';
import { ContentTypeId } from '@xmtp/content-type-primitives';
import {
  CachedConversation,
  DecodedMessage,
  SendOptions,
  useSendMessage,
} from '@xmtp/react-sdk';

export const _sendMessages = async (
  conversation: CachedConversation,
  message: string,
  sendMessage: <T = string>(
    conversation: CachedConversation,
    content: T,
    contentType?: ContentTypeId,
    sendOptions?: Omit<SendOptions, 'contentType'>
  ) => Promise<DecodedMessage<any> | undefined>,
  contentType?: SendOptions
) => {
  await sendMessage(conversation, message, undefined, contentType);
};

export const useSendMessages = (conversation?: CachedConversation) => {
  const { sendMessage } = useSendMessage();

  return useMutation({
    mutationFn: (message: string, contentType?: SendOptions) => {
      if (!conversation) throw new Error('Conversation not found');
      return _sendMessages(conversation, message, sendMessage, contentType);
    },
  });
};
