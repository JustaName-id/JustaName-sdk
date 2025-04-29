import { DecodedMessage } from '@xmtp/browser-sdk';
import { ContentTypeReaction } from '@xmtp/content-type-reaction';

export type MessageWithReaction = DecodedMessage & {
  reactionMessage?: DecodedMessage;
};

export const filterReactionsMessages = (messages: DecodedMessage[]) => {
  const messagesMap = new Map<string, MessageWithReaction>();
  for (const message of messages) {
    if (message.contentType.sameAs(ContentTypeReaction)) {
      const referenceId = message.content.reference.toString();
      const reactionMessage = messagesMap.get(referenceId);
      if (reactionMessage) {
        reactionMessage.reactionMessage = message;
        messagesMap.set(reactionMessage.id, reactionMessage);
      }
    } else {
      messagesMap.set(message.id, message);
    }
  }
  return Array.from(messagesMap.values());
};
