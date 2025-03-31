import { Flex, P } from '@justweb3/ui';
import { DateDivider } from './DateDivider';
import { EmojiSelector } from './EmojiSelector';
import { MessageCard } from './MessageCard';
import { MessageWithReaction } from '../../../../utils/filterReactionsMessages';
import { useEffect, useState } from 'react';
import { FullConversation } from '../../../../hooks';

interface ChatMessagesListProps {
  canMessage: boolean;
  groupedMessages: { [date: string]: MessageWithReaction[] };
  conversation: FullConversation;
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
  const [ref, setRef] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (ref) {
      setTimeout(() => {
        const lastGroupChild = ref.lastElementChild as HTMLElement;

        const lastMessage = lastGroupChild?.lastElementChild as HTMLElement;

        lastMessage?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, [groupedMessages, ref]);

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
      style={{
        flex: 1,
        minHeight: computeHeight,
        maxHeight: computeHeight,
        overflowY: 'hidden',
      }}
    >
      <Flex
        direction="column"
        className="justweb3scrollbar"
        gap="10px"
        style={{
          overflowY: 'scroll',
          height: '100%',
          width: '100%',
          flexShrink: 1,
        }}
        ref={(el) => setRef(el)}
      >
        {groupedMessages &&
          Object.keys(groupedMessages).map((date, index) => (
            <Flex
              direction="column"
              gap="10px"
              key={index}
              style={{ marginTop: index === 0 ? '10px' : '0px' }}
            >
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
