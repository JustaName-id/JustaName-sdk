import { CachedConversation, ContentTypeMetadata } from '@xmtp/react-sdk';
import { Flex } from '@justweb3/ui';
import { MessageItem } from '../MessageItem';

export interface ChatListProps {
  conversations: CachedConversation<ContentTypeMetadata>[];
}

export const ChatList: React.FC<ChatListProps> = ({ conversations }) => {
  return (
    <Flex direction={'column'} gap={'10px'}>
      {conversations.map((conversation) => (
        <MessageItem key={conversation.topic} conversation={conversation} />
      ))}
    </Flex>
  );
};
