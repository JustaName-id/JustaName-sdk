import React, { useEffect, useMemo } from 'react';
import {
  attachmentContentTypeConfig,
  CachedConversation,
  CachedMessage,
  Client,
  ClientOptions,
  ContentTypeConfiguration,
  ContentTypeMetadata,
  reactionContentTypeConfig,
  replyContentTypeConfig,
  useClient,
  useMessages,
  useStreamMessages,
  XMTPProvider,
} from '@xmtp/react-sdk';
import { InboxSheet } from '../../components/InboxSheet';
import { useEthersSigner } from '../../hooks';
import { useMountedAccount } from '@justaname.id/react';
import { loadKeys, storeKeys, wipeKeys } from '../../utils/xmtp';
import { readReceiptContentTypeConfig } from '../../content-types/readReceipt';
import { ContentTypeReadReceipt } from '@xmtp/content-type-read-receipt';
import { ChatSheet } from '../../components/ChatSheet';

const contentTypeConfigs: ContentTypeConfiguration[] = [
  attachmentContentTypeConfig,
  reactionContentTypeConfig,
  replyContentTypeConfig,
  readReceiptContentTypeConfig,
];

interface JustWeb3XMTPContextProps {
  handleOpenChat: (address: string) => void;
  conversationsInfo: {
    conversationId: string;
    unreadCount: number;
    consent: 'allowed' | 'blocked' | 'requested';
    lastMessage: CachedMessage<any, ContentTypeMetadata>;
  }[];
}

const JustWeb3XMTPContext = React.createContext<
  JustWeb3XMTPContextProps | undefined
>(undefined);

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
  const [conversation, setConversation] =
    React.useState<CachedConversation<ContentTypeMetadata> | null>(null);
  const [conversations, setConversations] = React.useState<{
    allowed: CachedConversation<ContentTypeMetadata>[];
    blocked: CachedConversation<ContentTypeMetadata>[];
    requested: CachedConversation<ContentTypeMetadata>[];
  }>({
    allowed: [],
    blocked: [],
    requested: [],
  });
  const [conversationsInfo, setConversationsInfo] = React.useState<
    {
      conversationId: string;
      unreadCount: number;
      consent: 'allowed' | 'blocked' | 'requested';
      lastMessage: CachedMessage<any, ContentTypeMetadata>;
    }[]
  >([]);

  console.log(conversations);
  const handleXmtpEnabled = (enabled: boolean) => {
    setIsXmtpEnabled(enabled);
  };
  const [peerAddress, setPeerAddress] = React.useState<string | null>(null);

  const handleOpenChat = (
    peer: string | CachedConversation<ContentTypeMetadata>
  ) => {
    if (typeof peer === 'string') {
      setPeerAddress(peer);
    } else {
      setConversation(peer);
    }
  };

  const handleConversationInfo = (
    conversationId: string,
    unreadCount: number,
    lastMessage: CachedMessage<any, ContentTypeMetadata>,
    consent: 'allowed' | 'blocked' | 'requested'
  ) => {
    setConversationsInfo((prev) => {
      const index = prev.findIndex(
        (item) => item.conversationId === conversationId
      );
      if (index === -1) {
        return [
          ...prev,
          {
            conversationId,
            unreadCount,
            lastMessage,
            consent,
          },
        ];
      }
      prev[index].unreadCount = unreadCount;
      prev[index].lastMessage = lastMessage;
      return [...prev];
    });
  };

  console.log('Conversations Info:', conversationsInfo);

  return (
    <XMTPProvider contentTypeConfigs={contentTypeConfigs}>
      <JustWeb3XMTPContext.Provider
        value={{
          handleOpenChat,
          conversationsInfo,
        }}
      >
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
            key={conversation.topic}
            conversation={conversation}
            unreadCount={
              conversationsInfo.find(
                (item) => item.conversationId === conversation.topic
              )?.unreadCount
            }
            lastMessage={
              conversationsInfo.find(
                (item) => item.conversationId === conversation.topic
              )?.lastMessage
            }
            handleConversationInfo={(
              conversationId,
              unreadCount,
              lastMessage
            ) =>
              handleConversationInfo(
                conversationId,
                unreadCount,
                lastMessage,
                'allowed'
              )
            }
          />
        ))}
        {conversations.blocked.map((conversation) => (
          <GetConversationInfo
            key={conversation.topic}
            conversation={conversation}
            unreadCount={
              conversationsInfo.find(
                (item) => item.conversationId === conversation.topic
              )?.unreadCount
            }
            lastMessage={
              conversationsInfo.find(
                (item) => item.conversationId === conversation.topic
              )?.lastMessage
            }
            handleConversationInfo={(
              conversationId,
              unreadCount,
              lastMessage
            ) =>
              handleConversationInfo(
                conversationId,
                unreadCount,
                lastMessage,
                'blocked'
              )
            }
          />
        ))}
        {conversations.requested.map((conversation) => (
          <GetConversationInfo
            key={conversation.topic}
            conversation={conversation}
            unreadCount={
              conversationsInfo.find(
                (item) => item.conversationId === conversation.topic
              )?.unreadCount
            }
            lastMessage={
              conversationsInfo.find(
                (item) => item.conversationId === conversation.topic
              )?.lastMessage
            }
            handleConversationInfo={(
              conversationId,
              unreadCount,
              lastMessage
            ) =>
              handleConversationInfo(
                conversationId,
                unreadCount,
                lastMessage,
                'requested'
              )
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
  conversation: CachedConversation<ContentTypeMetadata>;
  handleConversationInfo: (
    conversationId: string,
    unreadCount: number,
    lastMessage: CachedMessage<any, ContentTypeMetadata>
  ) => void;
  unreadCount?: number;
  lastMessage?: CachedMessage<any, ContentTypeMetadata>;
}

export const GetConversationInfo: React.FC<GetConversationInfoProps> = ({
  conversation,
  handleConversationInfo,
  unreadCount,
  lastMessage,
}) => {
  const { messages } = useMessages(conversation);

  useStreamMessages(conversation);
  const _unreadCount = useMemo(() => {
    let count = 0;
    const _messages = [...messages].reverse();
    for (const message of _messages) {
      if (message.contentType === ContentTypeReadReceipt.toString()) {
        break;
      }

      count++;
    }

    return count;
  }, [messages]);

  const _lastMessage = useMemo(() => {
    const _messages = [...messages];
    let lastMessage = _messages[_messages.length - 1];
    if (lastMessage?.contentType === ContentTypeReadReceipt.toString()) {
      lastMessage = _messages[_messages.length - 2];
    }

    console.log('Last Message:', lastMessage);
    return lastMessage;
  }, [messages]);

  useEffect(() => {
    if (unreadCount === _unreadCount && _lastMessage?.id === lastMessage?.id) {
      return;
    }

    console.log(
      'Updating Conversation Info:',
      conversation.topic,
      _unreadCount,
      _lastMessage
    );
    handleConversationInfo(conversation.topic, _unreadCount, _lastMessage);
  }, [
    conversation.topic,
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
  const { client, initialize, isLoading, disconnect } = useClient();
  const signer = useEthersSigner();
  const { address } = useMountedAccount();
  const [isInitializing, setIsInitializing] = React.useState(false);
  const [rejected, setRejected] = React.useState(false);

  useEffect(() => {
    async function reinitializeXmtp() {
      if (client && address) {
        if (client?.address?.toLowerCase() !== address.toLowerCase()) {
          await disconnect();

          if (!signer) {
            return;
          }
          setIsInitializing(true);
          const clientOptions: Partial<Omit<ClientOptions, 'codecs'>> = {
            appVersion: 'JustWeb3/1.0.0/' + env + '/0',
            env: env,
          };
          let keys = loadKeys(address ?? '', env);
          console.log('Keys:', keys);
          if (!keys) {
            keys = await Client.getKeys(signer, {
              env: env,
              skipContactPublishing: false,
              // persistConversations: false,
            });
            storeKeys(address ?? '', keys, env);
          }

          await initialize({
            keys,
            options: clientOptions,
            signer: signer,
          });
        }
      }
    }
    reinitializeXmtp();
  }, [client, address, signer, env, initialize, disconnect]);

  useEffect(() => {
    async function initializeXmtp() {
      if (isInitializing || isLoading || rejected) return;
      try {
        if (client) {
          return;
        }

        if (!signer) {
          return;
        }
        setIsInitializing(true);
        const clientOptions: Partial<Omit<ClientOptions, 'codecs'>> = {
          appVersion: 'JustWeb3/1.0.0/' + env + '/0',
          env: env,
        };
        let keys = loadKeys(address ?? '', env);
        if (!keys) {
          keys = await Client.getKeys(signer, {
            env: env,
            skipContactPublishing: false,
            // persistConversations: false,
          });
          storeKeys(address ?? '', keys, env);
        }

        await initialize({
          keys,
          options: clientOptions,
          signer: signer,
        });

        // _client?.registerCodec(new ReadReceiptCodec());
        setIsInitializing(false);
      } catch (error) {
        console.error('Failed to initialize XMTP Client:', error);
        wipeKeys(address ?? '', env);
        setIsInitializing(false);
        setRejected(true);
      }
    }
    initializeXmtp();
  }, [
    address,
    client,
    env,
    handleXmtpEnabled,
    initialize,
    isInitializing,
    isLoading,
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
  return context;
};
