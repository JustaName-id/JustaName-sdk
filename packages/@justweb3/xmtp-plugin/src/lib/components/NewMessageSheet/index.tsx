import { Sheet, SheetContent, SheetTitle } from '@justweb3/ui';
import { CachedConversation } from '@xmtp/react-sdk';
import NewConversation from '../NewConversation';

export interface MessageSheetProps {
  openNewChat: boolean;
  handleOpenNewChat: (open: boolean) => void;
  onChatStarted: (conversation: CachedConversation) => void;
  addressOrEns?: string;
}

export const NewMessageSheet: React.FC<MessageSheetProps> = ({
  handleOpenNewChat,
  openNewChat,
  onChatStarted,
  addressOrEns,
}) => {
  return (
    <Sheet
      open={openNewChat}
      onOpenChange={(open) => !open && handleOpenNewChat(false)}
    >
      <SheetContent
        side="right"
        overlay={false}
        style={{ width: '100%', paddingLeft: 0, paddingRight: 0 }}
      >
        <SheetTitle>New Conversation</SheetTitle>
        <NewConversation
          onChatStarted={onChatStarted}
          onBack={() => handleOpenNewChat(false)}
          selectedAddress={addressOrEns}
        />
      </SheetContent>
    </Sheet>
  );
};
