import React, { useEffect } from 'react';
import {
  attachmentContentTypeConfig,
  CachedConversation,
  ContentTypeMetadata,
  reactionContentTypeConfig,
  replyContentTypeConfig,
  useClient,
  XMTPProvider,
} from '@xmtp/react-sdk';
import { useJustWeb3 } from '@justweb3/widget';
import { ChatSheet } from '../../components/ChatSheet';
import { MessageSheet } from '../../components/MessageSheet';
import { NewMessageSheet } from '../../components/NewMessageSheet';

const contentTypeConfigs = [
  attachmentContentTypeConfig,
  reactionContentTypeConfig,
  replyContentTypeConfig,
];

interface JustWeb3XMTPContextProps { }

const JustWeb3XMTPContext = React.createContext<
  JustWeb3XMTPContextProps | undefined
>(undefined);

export interface JustWeb3XMTPProviderProps {
  children: React.ReactNode;
  open?: boolean;
  handleOpen?: (open: boolean) => void;
}

export const JustWeb3XMTPProvider: React.FC<JustWeb3XMTPProviderProps> = ({
  children,
  open,
  handleOpen,
}) => {
  const [isXmtpEnabled, setIsXmtpEnabled] = React.useState(false);
  const [isNewChat, setIsNewChat] = React.useState(false);
  const [conversation, setConversation] =
    React.useState<CachedConversation<ContentTypeMetadata> | null>(null);
  const handleXmtpEnabled = (enabled: boolean) => {
    setIsXmtpEnabled(enabled);
  };

  const handleOpenNewChat = (open: boolean) => {
    setIsNewChat(open);
  };

  const handleOpenChat = (
    conversation: CachedConversation<ContentTypeMetadata> | null
  ) => {
    setConversation(conversation);
  };

  const handleNewChat = () => {
    setIsNewChat(true);
  }

  return (
    <XMTPProvider contentTypeConfigs={contentTypeConfigs}>
      <JustWeb3XMTPContext.Provider value={undefined}>
        <Checks open={open} handleXmtpEnabled={handleXmtpEnabled} />
        <MessageSheet
          handleOpenChat={handleOpenChat}
          openChat={!!conversation}
          conversation={conversation}
        />
        <NewMessageSheet
          openNewChat={isNewChat}
          handleOpenNewChat={handleOpenNewChat}
          onChatStarted={handleOpenChat}
        />
        {isXmtpEnabled && (
          <ChatSheet
            open={open}
            handleOpen={handleOpen}
            handleOpenChat={handleOpenChat}
            handleNewChat={handleNewChat}
          />
        )}
        {children}
      </JustWeb3XMTPContext.Provider>
    </XMTPProvider>
  );
};

interface ChecksProps {
  open?: boolean;
  handleXmtpEnabled: (enabled: boolean) => void;
}

export const Checks: React.FC<ChecksProps> = ({ open, handleXmtpEnabled }) => {
  const { connectedEns } = useJustWeb3();
  const { disconnect, client } = useClient();

  useEffect(() => {
    handleXmtpEnabled(!!client);
  }, [client, handleXmtpEnabled]);

  useEffect(() => {
    if (!connectedEns?.ens) {
      disconnect();
    }
  }, [connectedEns?.ens, disconnect]);

  return null;
};
