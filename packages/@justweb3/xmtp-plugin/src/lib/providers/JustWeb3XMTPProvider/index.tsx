import { useMountedAccount } from '@justaname.id/react';
import { Conversation, DecodedMessage } from '@xmtp/browser-sdk';
import React, { useEffect, useMemo } from 'react';
import { ChatSheet } from '../../components/ChatSheet';
import { InboxSheet } from '../../components/InboxSheet';
import { FullConversation, useEthersSigner, useMessages, useXMTPClient } from '../../hooks';
import { XMTPProvider } from '../../contexts/XMTPContext';
import { useXMTPContext } from '../../hooks/useXMTPContext';
import { ContentTypeReadReceipt } from '@xmtp/content-type-read-receipt';

interface JustWeb3XMTPContextProps {
  handleOpenChat: (address: string) => void;
  conversationsInfo: {
    conversationId: string;
    unreadCount: number;
    consent: 'allowed' | 'blocked' | 'requested';
    lastMessage: DecodedMessage;
  }[];
  env: 'local' | 'production' | 'dev';
}

const JustWeb3XMTPContext = React.createContext<JustWeb3XMTPContextProps | undefined>(undefined);

export interface JustWeb3XMTPProviderProps {
  children: React.ReactNode;
  open?: boolean;
  handleOpen?: (open: boolean) => void;
  env: 'local' | 'production' | 'dev';
}

export const JustWeb3XMTPProvider: React.FC<JustWeb3XMTPProviderProps> = ({
  children,
  open,
  handleOpen,
  env,
}) => {
  const [isXmtpEnabled, setIsXmtpEnabled] = React.useState(false);
  const [conversation, setConversation] = React.useState<FullConversation | null>(null);
  const [conversations, setConversations] = React.useState<{
    allowed: Conversation[];
    blocked: Conversation[];
    requested: Conversation[];
  }>({
    allowed: [],
    blocked: [],
    requested: [],
  });
  const [conversationsInfo, setConversationsInfo] = React.useState<{
    conversationId: string;
    unreadCount: number;
    consent: 'allowed' | 'blocked' | 'requested';
    lastMessage: DecodedMessage;
  }[]>([]);
  const [peerAddress, setPeerAddress] = React.useState<string | null>(null);

  const handleXmtpEnabled = (enabled: boolean) => {
    if (enabled === isXmtpEnabled) return;
    setIsXmtpEnabled(enabled);

    if (!enabled) {
      setConversationsInfo([]);
      setConversation(null);
      setConversations({
        allowed: [],
        blocked: [],
        requested: [],
      });
      setPeerAddress(null);
    }
  };

  const handleOpenChat = (peer: string | FullConversation) => {
    if (typeof peer === 'string') {
      setPeerAddress(peer);
    } else {
      setConversation(peer);
    }
  };

  const handleConversationInfo = (
    conversationId: string,
    unreadCount: number,
    lastMessage: DecodedMessage,
    consent: 'allowed' | 'blocked' | 'requested'
  ) => {
    setConversationsInfo((prev) => {
      const index = prev.findIndex((item) => item.conversationId === conversationId);
      if (index === -1) {
        return [...prev, { conversationId, unreadCount, lastMessage, consent }];
      }
      const newState = [...prev];
      newState[index] = { ...newState[index], unreadCount, lastMessage, consent };
      return newState;
    });
  };

  const contextValue = useMemo(
    () => ({
      handleOpenChat,
      conversationsInfo,
      env,
    }),
    [conversationsInfo, env]
  );

  return (
    <XMTPProvider env={env}>
      <JustWeb3XMTPContext.Provider value={contextValue}>
        <Checks open={open} handleXmtpEnabled={handleXmtpEnabled} env={env} />
        {isXmtpEnabled && (
          <InboxSheet
            open={open}
            handleOpen={handleOpen}
            handleOpenChat={handleOpenChat}
            handleNewChat={() => handleOpenChat('')}
            allConversations={conversations}
            onConversationsUpdated={setConversations}
            conversationsInfo={conversationsInfo}
          />
        )}

        {conversations.allowed.map((conversation) => (
          <GetConversationInfo
            key={conversation.id}
            conversation={conversation}
            unreadCount={
              conversationsInfo.find((item) => item.conversationId === conversation.id)?.unreadCount
            }
            lastMessage={
              conversationsInfo.find((item) => item.conversationId === conversation.id)?.lastMessage
            }
            handleConversationInfo={(conversationId, unreadCount, lastMessage) =>
              handleConversationInfo(conversationId, unreadCount, lastMessage, 'allowed')
            }
          />
        ))}
        {conversations.blocked.map((conversation) => (
          <GetConversationInfo
            key={conversation.id}
            conversation={conversation}
            unreadCount={
              conversationsInfo.find((item) => item.conversationId === conversation.id)?.unreadCount
            }
            lastMessage={
              conversationsInfo.find((item) => item.conversationId === conversation.id)?.lastMessage
            }
            handleConversationInfo={(conversationId, unreadCount, lastMessage) =>
              handleConversationInfo(conversationId, unreadCount, lastMessage, 'blocked')
            }
          />
        ))}
        {conversations.requested.map((conversation) => (
          <GetConversationInfo
            key={conversation.id}
            conversation={conversation}
            unreadCount={
              conversationsInfo.find((item) => item.conversationId === conversation.id)?.unreadCount
            }
            lastMessage={
              conversationsInfo.find((item) => item.conversationId === conversation.id)?.lastMessage
            }
            handleConversationInfo={(conversationId, unreadCount, lastMessage) =>
              handleConversationInfo(conversationId, unreadCount, lastMessage, 'requested')
            }
          />
        ))}

        <ChatSheet
          openChat={peerAddress !== null || conversation !== null}
          closeChat={() => {
            setPeerAddress(null);
            setConversation(null);
          }}
          onChangePeer={handleOpenChat}
          peer={conversation ?? peerAddress ?? null}
        />
        {children}
      </JustWeb3XMTPContext.Provider>
    </XMTPProvider>
  );
};

interface ChecksProps {
  open?: boolean;
  handleXmtpEnabled: (enabled: boolean) => void;
  env: 'local' | 'production' | 'dev';
}

interface GetConversationInfoProps {
  conversation: Conversation;
  handleConversationInfo: (
    conversationId: string,
    unreadCount: number,
    lastMessage: DecodedMessage
  ) => void;
  unreadCount?: number;
  lastMessage?: DecodedMessage;
}

export const GetConversationInfo: React.FC<GetConversationInfoProps> = ({
  conversation,
  handleConversationInfo,
  unreadCount,
  lastMessage,
}) => {
  const { messages } = useMessages(conversation);

  const _unreadCount = useMemo(() => {
    let count = 0;
    const _messages = [...messages].reverse();
    for (const message of _messages) {
      if (message.contentType.sameAs(ContentTypeReadReceipt)) {
        break;
      }

      count++;
    }

    return count;
  }, [messages]);

  const _lastMessage = useMemo(() => {
    const _messages = [...messages];
    // let lastMessage = _messages[_messages.length - 1];
    let lastMessageIndex = _messages.length - 1;
    let lastMessage = _messages[lastMessageIndex];
    while (
      lastMessage?.contentType.sameAs(ContentTypeReadReceipt) &&
      lastMessageIndex > 0
    ) {
      lastMessageIndex--;
      lastMessage = _messages[lastMessageIndex];
    }

    return lastMessage;
  }, [messages]);

  useEffect(() => {
    if (unreadCount === _unreadCount && _lastMessage?.id === lastMessage?.id) {
      return;
    }

    handleConversationInfo(conversation.id, _unreadCount, _lastMessage);
  }, [
    conversation.id,
    handleConversationInfo,
    _unreadCount,
    unreadCount,
    _lastMessage,
    lastMessage?.id,
  ]);

  return null;
};

export const Checks: React.FC<ChecksProps> = ({
  open,
  handleXmtpEnabled,
  env,
}) => {
  const { isInitializing, initializeXmtp, rejected } = useXMTPClient();
  const { client } = useXMTPContext();
  const { address } = useMountedAccount();
  const signer = useEthersSigner();

  useEffect(() => {
    if (!client || !address || isInitializing || !signer) return;
    if (client.accountAddress.toLowerCase() === address.toLowerCase()) return;

    const reinitialize = async () => {
      client.close();
      await initializeXmtp({ signer });
    };

    reinitialize();
  }, [address, client, isInitializing, initializeXmtp, signer]);

  useEffect(() => {
    if (isInitializing || rejected || !signer) return;
    initializeXmtp({ signer });
  }, [
    address,
    client,
    initializeXmtp,
    isInitializing,
    rejected,
    signer,
  ]);

  useEffect(() => {
    handleXmtpEnabled(!!client);
  }, [client, handleXmtpEnabled]);

  return null;
};

export const useJustWeb3XMTP = () => {
  const context = React.useContext(JustWeb3XMTPContext);
  if (context === undefined) {
    throw new Error(
      'useJustWeb3XMTP must be used within a JustWeb3XMTPProvider'
    );
  }
  return {
    ...context,
  };
};
