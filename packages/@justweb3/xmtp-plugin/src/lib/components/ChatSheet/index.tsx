'use client';
import { Sheet, SheetContent, SheetTitle } from '@justweb3/ui';
import { useMemo } from 'react';
import { FullConversation } from '../../hooks';
import { Chat } from './Chat';
import { NewChat } from './NewChat';

export interface ChatSheetProps {
  // peerAddress?: string | null;
  peer: FullConversation | string | null;
  openChat: boolean;
  closeChat: () => void;
  onChangePeer: (
    peer: FullConversation | string
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
        aria-describedby={undefined}
        style={{ width: '100%', paddingLeft: 0, paddingRight: 0 }}
      >
        <SheetTitle>
          {isPeerConversation ? 'Messages' : 'New Conversation'}
        </SheetTitle>

        {peer !== null &&
          (isPeerConversation ? (
            <Chat
              conversation={peer as FullConversation}
              peerAddress={typeof peer === "string" ? peer : peer.peerAddress}
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
