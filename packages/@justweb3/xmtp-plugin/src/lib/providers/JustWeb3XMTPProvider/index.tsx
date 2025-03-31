import { useMountedAccount } from '@justaname.id/react';
import { ConsentState, Conversation, DecodedMessage, Client } from '@xmtp/browser-sdk';
import { ContentTypeReadReceipt } from '@xmtp/content-type-read-receipt';
import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import { ChatSheet } from '../../components/ChatSheet';
import { InboxSheet } from '../../components/InboxSheet';
import { XMTPProvider } from '../../contexts/XMTPContext';
import { FullConversation, useConversationConsent, useEthersSigner, useMessages, useStreamConversations, useStreamMessages, useXMTPClient } from '../../hooks';
import { useXMTPContext } from '../../hooks/useXMTPContext';

interface JustWeb3XMTPContextProps {
  handleOpenChat: (address: string) => void;
  conversationsInfo: {
    conversationId: string;
    unreadCount: number;
    consent: 'allowed' | 'blocked' | 'requested';
    lastMessage: DecodedMessage;
  }[];
  setConversationsInfo: (conversationsInfo: {
    conversationId: string;
    unreadCount: number;
    consent: 'allowed' | 'blocked' | 'requested';
    lastMessage: DecodedMessage;
  }[]) => void;
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
  const [clientState, setClientState] = React.useState<Client | undefined>(undefined);


  useStreamConversations({
    conversationsInfo,
    setConversationsInfo,
    client: clientState,
  });

  useStreamMessages({
    conversationsInfo,
    setConversationsInfo,
    client: clientState,
  });

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

      const existingInfo = prev[index];
      let shouldUpdate = true;

      if (existingInfo.lastMessage && lastMessage &&
        existingInfo.lastMessage.sentAtNs && lastMessage.sentAtNs) {
        shouldUpdate = BigInt(lastMessage.sentAtNs) >= BigInt(existingInfo.lastMessage.sentAtNs);

      }

      if (shouldUpdate) {

        const newState = [...prev];
        newState[index] = { ...newState[index], unreadCount, lastMessage, consent };
        return newState;
      }

      return prev;
    });
  };

  const contextValue = useMemo(
    () => ({
      handleOpenChat,
      conversationsInfo,
      setConversationsInfo,
      env,
    }),
    [conversationsInfo, env]
  );

  return (
    <XMTPProvider env={env} client={clientState}>
      <JustWeb3XMTPContext.Provider value={contextValue}>
        <Checks
          open={open}
          handleXmtpEnabled={handleXmtpEnabled}
          env={env}
          onClientUpdate={setClientState}
        />
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
  onClientUpdate: (client: Client | undefined) => void;
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

export const GetConversationInfo: React.FC<GetConversationInfoProps> = React.memo(({
  conversation,
  handleConversationInfo,
  unreadCount,
  lastMessage,
  consent,
}) => {
  const { messages } = useMessages(conversation, { disableStream: true });
  const { client } = useXMTPContext();
  const { consentState } = useConversationConsent(conversation as FullConversation);
  const lastUpdateRef = useRef(Date.now());
  const processingUpdateRef = useRef(false);

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

  const checkConsentEqual = useCallback((consent: 'allowed' | 'blocked' | 'requested', consentState: ConsentState | null | undefined) => {
    if (consent === 'allowed') return consentState === ConsentState.Allowed;
    if (consent === 'blocked') return consentState === ConsentState.Denied;
    return consentState === ConsentState.Unknown;
  }, []);

  const convertConsentStateToConsent = useCallback((consentState: ConsentState | null | undefined) => {
    if (consentState === ConsentState.Allowed) return 'allowed';
    if (consentState === ConsentState.Denied) return 'blocked';
    return 'requested';
  }, []);

  // Effect runs whenever lastMessage from props changes to update our ref timestamp
  useEffect(() => {
    if (lastMessage) {
      lastUpdateRef.current = Date.now();
    }
  }, [lastMessage?.id]);

  // Only update when necessary and prevent excessive updates
  useEffect(() => {
    if (processingUpdateRef.current) {
      return;
    }

    if (unreadCount === _unreadCount &&
      (!_lastMessage || _lastMessage?.id === lastMessage?.id) &&
      checkConsentEqual(consent, consentState)) {
      return;
    }

    if (lastMessage && !_lastMessage) {
      return;
    }

    if (lastMessage && _lastMessage &&
      lastMessage.sentAtNs && _lastMessage.sentAtNs &&
      lastMessage.sentAtNs > _lastMessage.sentAtNs) {
      return;
    }

    const messageChanged = !lastMessage || !_lastMessage || _lastMessage?.id !== lastMessage?.id;
    const countChanged = unreadCount !== _unreadCount;
    const consentChanged = !checkConsentEqual(consent, consentState);

    if (!messageChanged && !consentChanged && countChanged && lastMessage) {
      return;
    }

    processingUpdateRef.current = true;

    setTimeout(() => {
      handleConversationInfo(
        conversation.id,
        _unreadCount,
        _lastMessage,
        convertConsentStateToConsent(consentState)
      );
      processingUpdateRef.current = false;
    }, 0);

  }, [
    conversation.id,
    handleConversationInfo,
    _unreadCount,
    unreadCount,
    _lastMessage,
    lastMessage,
    consentState,
    consent,
    checkConsentEqual,
    convertConsentStateToConsent,
  ]);

  return null;
}, (prevProps, nextProps) => {
  if (prevProps.conversation.id !== nextProps.conversation.id) {
    return false;
  }

  if (prevProps.consent !== nextProps.consent) {
    return false;
  }

  if (prevProps.unreadCount !== nextProps.unreadCount) {
    return false;
  }

  if (prevProps.lastMessage?.id !== nextProps.lastMessage?.id) {
    return false;
  }

  return true;
});

export const Checks: React.FC<ChecksProps> = ({
  open,
  handleXmtpEnabled,
  env,
  onClientUpdate,
}) => {
  const { isInitializing, initializeXmtp, rejected } = useXMTPClient();
  const { client, setClient } = useXMTPContext();
  const { address } = useMountedAccount();
  const signer = useEthersSigner();
  const clientInitializing = useRef(false);

  useEffect(() => {
    if (!client || !address || isInitializing || !signer) return;

    const reinitialize = async () => {
      if (await checkIfSameAccount()) return;
      console.log("reinitializing")
      client.close();
      handleXmtpEnabled(false);
      setClient(undefined);
      onClientUpdate(undefined);
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
    if (isInitializing || rejected || !signer || clientInitializing.current) return;

    clientInitializing.current = true;
    initializeXmtp({ signer }).finally(() => {
      clientInitializing.current = false;
    });
  }, [
    address,
    initializeXmtp,
    isInitializing,
    rejected,
    signer,
  ]);

  useEffect(() => {
    if (client === undefined) return;

    handleXmtpEnabled(!!client);
    setClient(client);
    onClientUpdate(client);

  }, [client, handleXmtpEnabled, onClientUpdate, setClient]);

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
