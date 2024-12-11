import { useMutation } from '@tanstack/react-query';
import { ContentTypeId } from '@xmtp/content-type-primitives';
import { ContentTypeReaction, Reaction } from '@xmtp/content-type-reaction';
import {
  CachedConversation,
  DecodedMessage,
  SendOptions,
  useSendMessage,
} from '@xmtp/react-sdk';

export const sendReactionMessage = async (
  conversation: CachedConversation,
  action: 'added' | 'removed',
  content: string,
  referenceId: string,
  sendMessage: <T = string>(
    conversation: CachedConversation,
    content: T,
    contentType?: ContentTypeId,
    sendOptions?: Omit<SendOptions, 'contentType'>
  ) => Promise<DecodedMessage<any> | undefined>
) => {
  const reaction: Reaction = {
    reference: referenceId,
    action: action,
    content: content,
    schema: 'custom',
  };
  return await sendMessage(conversation, reaction, ContentTypeReaction);
};

type SendReactionMessageParams = {
  action: 'added' | 'removed';
  content: string;
  referenceId: string;
};

export const useSendReactionMessage = (conversation?: CachedConversation) => {
  const { sendMessage } = useSendMessage();

  return useMutation({
    mutationFn: ({
      action,
      referenceId,
      content,
    }: SendReactionMessageParams) => {
      if (!conversation) throw new Error('Conversation not found');
      return sendReactionMessage(
        conversation,
        action,
        content,
        referenceId,
        sendMessage
      );
    },
  });
};
