import {
  CachedConversation,
  ContentTypeMetadata,
  useMessages,
} from '@xmtp/react-sdk';

export interface ChatProps {
  conversation: CachedConversation<ContentTypeMetadata>;
}

export const Chat: React.FC<ChatProps> = ({ conversation }) => {
  const { messages } = useMessages(conversation);

  console.log(messages);
  return null;
};
