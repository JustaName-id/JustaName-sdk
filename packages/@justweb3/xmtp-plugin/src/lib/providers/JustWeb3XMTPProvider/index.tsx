import { useMountedAccount } from '@justaname.id/react';
import { ConsentState, Conversation, DecodedMessage } from '@xmtp/browser-sdk';
import React, { useEffect, useMemo } from 'react';
import { ChatSheet } from '../../components/ChatSheet';
import { InboxSheet } from '../../components/InboxSheet';
import { FullConversation, useConversationConsent, useEthersSigner, useMessages, useXMTPClient } from '../../hooks';
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

  const { streamedMessages, streamedConversations } = useXMTPContext();

  useEffect(() => {
    if (!streamedMessages.length || !streamedConversations.length || !conversations) return;

    streamedConversations.forEach(conversation => {
      const conversationId = conversation.id;
      const conversationInfo = conversationsInfo.find(info => info.conversationId === conversationId);

      if (!conversationInfo) {
        setConversationsInfo(prev => [...prev, {
          conversationId,
          unreadCount: 0,
          consent: 'requested',
          lastMessage: streamedMessages.find(message => message.conversationId === conversationId)?.content ?? ''
        }]);
      }
    });

    streamedMessages.forEach(message => {
      const conversationId = message.conversationId;
      const conversationInfo = conversationsInfo.find(info => info.conversationId === conversationId);

      let consent: 'allowed' | 'blocked' | 'requested' = 'requested';
      if (conversations.allowed.some(conv => conv.id === conversationId)) {
        consent = 'allowed';
      } else if (conversations.blocked.some(conv => conv.id === conversationId)) {
        consent = 'blocked';
      }

      if (message.contentType.sameAs(ContentTypeReadReceipt)) {
        return;
      }

      const unreadCount = conversationInfo ? conversationInfo.unreadCount + 1 : 1;

      handleConversationInfo(conversationId, unreadCount, message, consent);
    });
  }, [streamedMessages, conversations, streamedConversations, conversationsInfo]);

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
            consent={
              conversationsInfo.find((item) => item.conversationId === conversation.id)?.consent ?? 'allowed'
            }
            handleConversationInfo={(conversationId, unreadCount, lastMessage, consent) =>
              handleConversationInfo(conversationId, unreadCount, lastMessage, consent)
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
            consent={
              conversationsInfo.find((item) => item.conversationId === conversation.id)?.consent ?? 'blocked'
            }
            handleConversationInfo={(conversationId, unreadCount, lastMessage, consent) =>
              handleConversationInfo(conversationId, unreadCount, lastMessage, consent)
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
            consent={
              conversationsInfo.find((item) => item.conversationId === conversation.id)?.consent ?? 'requested'
            }
            handleConversationInfo={(conversationId, unreadCount, lastMessage, consent) =>
              handleConversationInfo(conversationId, unreadCount, lastMessage, consent)
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
    lastMessage: DecodedMessage,
    consent: 'allowed' | 'blocked' | 'requested'
  ) => void;
  unreadCount?: number;
  consent: 'allowed' | 'blocked' | 'requested';
  lastMessage?: DecodedMessage;
}

export const GetConversationInfo: React.FC<GetConversationInfoProps> = ({
  conversation,
  handleConversationInfo,
  unreadCount,
  lastMessage,
  consent,
}) => {
  const { messages } = useMessages(conversation);
  const { client } = useXMTPContext();
  const { consentState } = useConversationConsent(conversation as FullConversation);

  const _unreadCount = useMemo(() => {
    let count = 0;
    const _messages = [...messages].reverse();
    for (const message of _messages) {
      if (message.contentType.sameAs(ContentTypeReadReceipt)) {
        break;
      }

      if (message.senderInboxId !== client?.inboxId) {
        count++;
      }
    }

    return count;
  }, [messages, client?.inboxId]);

  const _lastMessage = useMemo(() => {
    const _messages = [...messages];
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

  const checkConsentEqual = (consent: 'allowed' | 'blocked' | 'requested', consentState: ConsentState | null | undefined) => {
    if (consent === 'allowed') return consentState === ConsentState.Allowed;
    if (consent === 'blocked') return consentState === ConsentState.Denied;
    return consentState === ConsentState.Unknown;
  }

  const convertConsentStateToConsent = (consentState: ConsentState | null | undefined) => {
    if (consentState === ConsentState.Allowed) return 'allowed';
    if (consentState === ConsentState.Denied) return 'blocked';
    return 'requested';
  }

  useEffect(() => {
    if (unreadCount === _unreadCount && _lastMessage?.id === lastMessage?.id && checkConsentEqual(consent, consentState)) {
      return;
    }

    handleConversationInfo(conversation.id, _unreadCount, _lastMessage, convertConsentStateToConsent(consentState));
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

    const reinitialize = async () => {
      if (await checkIfSameAccount()) return;
      client.close();
      await initializeXmtp({ signer });
    };

    reinitialize();
  }, [address, client, isInitializing, initializeXmtp, signer]);

  const checkIfSameAccount = async () => {
    if (!client || !address) return false;
    const clientIdentifier = await client.accountIdentifier();
    return clientIdentifier.identifier.toLowerCase() === address.toLowerCase();
  };

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
