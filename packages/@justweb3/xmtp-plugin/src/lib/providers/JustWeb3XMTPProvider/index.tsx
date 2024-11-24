import React, { useEffect } from 'react';
import {
  attachmentContentTypeConfig,
  reactionContentTypeConfig,
  replyContentTypeConfig,
  useClient,
  XMTPProvider,
} from '@xmtp/react-sdk';
import { useJustWeb3 } from '@justweb3/widget';
import { ChatSheet } from '../../components/ChatSheet';

const contentTypeConfigs = [
  attachmentContentTypeConfig,
  reactionContentTypeConfig,
  replyContentTypeConfig,
];

interface JustWeb3XMTPContextProps {}

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
  const handleXmtpEnabled = (enabled: boolean) => {
    setIsXmtpEnabled(enabled);
  };

  return (
    <XMTPProvider contentTypeConfigs={contentTypeConfigs}>
      <JustWeb3XMTPContext.Provider value={undefined}>
        <Checks open={open} handleXmtpEnabled={handleXmtpEnabled} />
        {isXmtpEnabled && <ChatSheet open={open} handleOpen={handleOpen} />}
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
