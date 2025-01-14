import { useMutation } from '@tanstack/react-query';
import { Conversation } from '@xmtp/browser-sdk';
import { ContentTypeReaction, Reaction } from '@xmtp/content-type-reaction';

export const sendReactionMessage = async (
  conversation: Conversation,
  action: 'added' | 'removed',
  content: string,
  referenceId: string,
) => {
  const reaction: Reaction = {
    reference: referenceId,
    action: action,
    content: content,
    schema: 'custom',
  };
  return await conversation.send(
    reaction,
    ContentTypeReaction,
  ) 
};

type SendReactionMessageParams = {
  action: 'added' | 'removed';
  content: string;
  referenceId: string;
};

export const useSendReactionMessage = (conversation?: Conversation) => {
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
      );
    },
  });
};
