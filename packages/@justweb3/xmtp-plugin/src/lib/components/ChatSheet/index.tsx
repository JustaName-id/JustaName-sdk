import { CachedConversation, ContentTypeMetadata } from '@xmtp/react-sdk';
import { Sheet, SheetContent, SheetTitle } from '@justweb3/ui';
import { Chat } from './Chat';
import { useMemo } from 'react';
import { NewChat } from './NewChat';

export interface ChatSheetProps {
  // peerAddress?: string | null;
  peer: CachedConversation<ContentTypeMetadata> | string | null;
  openChat: boolean;
  closeChat: () => void;
  onChangePeer: (
    peer: CachedConversation<ContentTypeMetadata> | string
  ) => void;
}

export const ChatSheet: React.FC<ChatSheetProps> = ({
  peer,
  closeChat,
  openChat,
  onChangePeer,
}) => {
  const isPeerConversation = useMemo(() => {
    return typeof peer !== 'string';
  }, [peer]);

  return (
    <Sheet open={openChat} onOpenChange={(open) => !open && closeChat()}>
      <SheetContent
        side="right"
        overlay={false}
        style={{ width: '100%', paddingLeft: 0, paddingRight: 0 }}
      >
        <SheetTitle>
          {isPeerConversation ? 'Messages' : 'New Conversation'}
        </SheetTitle>

        {peer !== null &&
          (isPeerConversation ? (
            <Chat
              conversation={peer as CachedConversation<ContentTypeMetadata>}
              onBack={closeChat}
            />
          ) : (
            <NewChat
              onBack={closeChat}
              selectedAddress={(peer as string) ?? undefined}
              onChatStarted={(conversation) => {
                onChangePeer(conversation);
              }}
            />
          ))}
      </SheetContent>
    </Sheet>
  );
};
