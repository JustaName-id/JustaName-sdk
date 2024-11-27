import { CachedConversation, ContentTypeMetadata } from '@xmtp/react-sdk';
import { Sheet, SheetContent, SheetTitle } from '@justweb3/ui';
import { Chat } from '../Chat';

export interface MessageSheetProps {
  conversation: CachedConversation<ContentTypeMetadata> | null;
  openChat: boolean;
  handleOpenChat: (
    conversation: CachedConversation<ContentTypeMetadata> | null
  ) => void;
}

export const MessageSheet: React.FC<MessageSheetProps> = ({
  conversation,
  handleOpenChat,
  openChat,
}) => {
  return (
    <Sheet
      open={openChat}
      onOpenChange={(open) => !open && handleOpenChat(null)}
    >
      <SheetContent side="right" overlay={false} style={{ width: '100%', paddingLeft: 0, paddingRight: 0 }}>
        <SheetTitle>Messages</SheetTitle>
        {conversation && <Chat conversation={conversation} onBack={() => handleOpenChat(null)} />}
      </SheetContent>
    </Sheet>
  );
};
