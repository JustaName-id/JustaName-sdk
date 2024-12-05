import React, { useEffect } from 'react';
import {
  attachmentContentTypeConfig,
  CachedConversation,
  Client,
  ClientOptions,
  ContentTypeMetadata,
  reactionContentTypeConfig,
  replyContentTypeConfig,
  useClient,
  XMTPProvider,
} from '@xmtp/react-sdk';
import { ChatSheet } from '../../components/ChatSheet';
import { useEthersSigner } from '../../hooks';
import { useMountedAccount } from '@justaname.id/react';
import { loadKeys, storeKeys, wipeKeys } from '../../utils/xmtp';
import { AllMessageSheet } from '../../components/AllMessageSheet';

const contentTypeConfigs = [
  attachmentContentTypeConfig,
  reactionContentTypeConfig,
  replyContentTypeConfig,
];

interface JustWeb3XMTPContextProps {
  handleOpenChat: (address: string) => void;
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

  return (
    <XMTPProvider contentTypeConfigs={contentTypeConfigs}>
      <JustWeb3XMTPContext.Provider
        value={{
          handleOpenChat,
        }}
      >
        <Checks open={open} handleXmtpEnabled={handleXmtpEnabled} env={env} />
        {isXmtpEnabled && (
          <ChatSheet
            open={open}
            handleOpen={handleOpen}
            handleOpenChat={handleOpenChat}
            handleNewChat={() => handleOpenChat('')}
          />
        )}

        <AllMessageSheet
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

export const Checks: React.FC<ChecksProps> = ({
  open,
  handleXmtpEnabled,
  env,
}) => {
  const { client, initialize, isLoading } = useClient();
  const signer = useEthersSigner();
  const { address } = useMountedAccount();
  const [isInitializing, setIsInitializing] = React.useState(false);
  const [rejected, setRejected] = React.useState(false);
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

  // useEffect(() => {
  //   if (!address) {
  //     disconnect();
  //   }
  // }, [connectedEns?.ens, disconnect]);

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
