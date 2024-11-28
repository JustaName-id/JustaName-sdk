import { CachedMessage } from '@xmtp/react-sdk';

export type MessageWithReaction = CachedMessage & {
  reactionMessage?: CachedMessage;
};

export const filterReactionsMessages = (messages: CachedMessage[]) => {
  const messagesMap = new Map<string, MessageWithReaction>();
  for (const message of messages) {
    if (message.contentType === 'xmtp.org/reaction:1.0') {
      const referenceId = message.content.reference.toString();
      const reactionMessage = messagesMap.get(referenceId);
      if (reactionMessage) {
        const messageWithReaction: MessageWithReaction = {
          ...reactionMessage,
          reactionMessage: message,
        };
        messagesMap.set(reactionMessage.id, messageWithReaction);
      }
    } else {
      messagesMap.set(message.id, message);
    }
  }
  return Array.from(messagesMap.values());
};
