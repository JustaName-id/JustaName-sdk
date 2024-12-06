import { Flex, P } from '@justweb3/ui';
import { CachedConversation, ContentTypeMetadata } from '@xmtp/react-sdk';
import { DateDivider } from './DateDivider';
import { EmojiSelector } from './EmojiSelector';
import { MessageCard } from './MessageCard';
import { MessageWithReaction } from '../../../../utils/filterReactionsMessages';

interface ChatMessagesListProps {
  canMessage: boolean;
  groupedMessages: { [date: string]: MessageWithReaction[] };
  conversation: CachedConversation<ContentTypeMetadata>;
  setReplyMessage: (msg: MessageWithReaction | null) => void;
  setReactionMessage: (msg: MessageWithReaction | null) => void;
  reactionMessage: MessageWithReaction | null;
  handleEmojiSelect: (emoji: string) => void;
  computeHeight: string;
}

export const ChatMessagesList: React.FC<ChatMessagesListProps> = ({
  canMessage,
  groupedMessages,
  conversation,
  setReplyMessage,
  setReactionMessage,
  reactionMessage,
  handleEmojiSelect,
  computeHeight,
}) => {
  if (!canMessage) {
    return (
      <Flex
        style={{ flex: 1, minHeight: computeHeight, maxHeight: computeHeight }}
      >
        <P>Cannot message {conversation.peerAddress}</P>
      </Flex>
    );
  }

  return (
    <Flex
      style={{ flex: 1, minHeight: computeHeight, maxHeight: computeHeight }}
    >
      <Flex
        direction="column"
        className="justweb3scrollbar"
        gap="10px"
        style={{
          padding: '10px 0px',
          paddingTop: '0px',
          overflowY: 'scroll',
          height: '100%',
          width: '100%',
          flexShrink: 1,
        }}
      >
        {groupedMessages &&
          Object.keys(groupedMessages).map((date, index) => (
            <Flex direction="column" gap="10px" key={index}>
              <DateDivider date={date} />
              {groupedMessages[date].map((message) => (
                <MessageCard
                  key={`message-${message.id}`}
                  conversation={conversation}
                  onReply={setReplyMessage}
                  message={message}
                  peerAddress={conversation.peerAddress}
                  onReaction={(msg) => {
                    setReactionMessage(msg);
                    const element = document.getElementById(msg.id);
                    if (!element) return;
                    const replica = element.cloneNode(true) as HTMLElement;
                    replica.id = `${msg.id}-replica`;
                    replica.style.position = 'absolute';
                    replica.style.bottom = '310px';
                    replica.style.minHeight = '20px';
                    replica.style.left = '4.2vw';
                    replica.style.zIndex = '90';
                    element.parentElement?.appendChild(replica);
                    replica.classList.add('replica-animate');
                  }}
                />
              ))}
            </Flex>
          ))}

        {reactionMessage && (
          <div
            style={{
              zIndex: 99,
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: `30px`,
            }}
          >
            <EmojiSelector onEmojiSelect={handleEmojiSelect} />
          </div>
        )}
      </Flex>
    </Flex>
  );
};
