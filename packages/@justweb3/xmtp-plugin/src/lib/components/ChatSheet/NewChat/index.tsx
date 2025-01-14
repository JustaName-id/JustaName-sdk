
import {
  usePrimaryName,
  useRecords
} from '@justaname.id/react';
import {
  ArrowIcon,
  CloseIcon,
  Flex,
  Input,
  LoadingSpinner,
  P,
  VerificationsIcon,
} from '@justweb3/ui';
import { useDebounce } from '@justweb3/widget';
import { ConsentState } from '@xmtp/browser-sdk';
import React, { useEffect, useMemo } from 'react';
import { FullConversation, useCanMessage, useXMTPClient } from '../../../hooks';
import { NewChatTextField } from './NewChatTextField';

interface NewChatProps {
  onChatStarted: (conversation: FullConversation) => void;
  onBack: () => void;
  selectedAddress?: string;
}

export const NewChat: React.FC<NewChatProps> = ({
  onChatStarted,
  onBack,
  selectedAddress,
}) => {
  // States
  const [newAddress, setNewAddress] = React.useState<string>(
    selectedAddress ?? ''
  );
  const [canMessage, setCanMessage] = React.useState<boolean>(false);
  //Queries
  const { client } = useXMTPClient();
  const { canMessageFn: xmtpCanMessage, canMessageLoading } = useCanMessage();
  const {
    debouncedValue: debouncedAddress,
    isDebouncing: isDebouncingAddress,
  } = useDebounce<string>(newAddress, 500);

  const isAddressName = useMemo(() => {
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    return (
      !ethAddressRegex.test(debouncedAddress) && debouncedAddress.length > 0
    );
  }, [debouncedAddress]);

  const { records, isRecordsLoading, isRecordsFetching } = useRecords({
    ens: debouncedAddress,
    enabled: isAddressName,
  });

  const {
    primaryName: name,
    isPrimaryNameLoading,
    isPrimaryNameFetching,
  } = usePrimaryName({
    address: debouncedAddress as `0x${string}`,
    enabled: !isAddressName,
  });

  useEffect(() => {
    if (isPrimaryNameLoading || isPrimaryNameFetching) {
      return;
    }

    if (name) {
      setNewAddress(name);
      return;
    }
  }, [name, isPrimaryNameLoading, isPrimaryNameFetching]);
  const resolvedAddress = useMemo(() => {
    const ethAddress = records?.sanitizedRecords?.ethAddress?.value;
    if (ethAddress && ethAddress !== client?.accountAddress) {
      return ethAddress;
    }
    return;
  }, [client?.accountAddress, records?.sanitizedRecords?.ethAddress?.value]);

  const handleCanMessage = async () => {
    if (!client) return;
    try {
      if (isAddressName) {
        if (resolvedAddress) {
          const res = await xmtpCanMessage(resolvedAddress as `0x${string}`);
          setCanMessage(!!res);
        } else {
          // Resolved address is not available yet; do nothing
          return;
        }
      } else if (
        debouncedAddress.length === 42 &&
        client.accountAddress !== debouncedAddress
      ) {
        const res = await xmtpCanMessage(debouncedAddress as `0x${string}`);
        setCanMessage(!!res);
      } else {
        setCanMessage(false);
      }
    } catch (e) {
      console.log('error', e);
      setCanMessage(false);
    }
  };

  const handleNewChat = async (message: string) => {
    if (!client) return;
    const peerAddress =
      isAddressName && !!resolvedAddress ? resolvedAddress : debouncedAddress;
    try {
      const conv = await client.conversations.newDm(peerAddress);
      conv.send(message);
      await conv.updateConsentState(ConsentState.Allowed);
      const peerInboxId = await conv.dmPeerInboxId();
      const convoMembers = await conv.members();
      const peerAdd = convoMembers.find((member) => member.inboxId === peerInboxId)?.accountAddresses[0];
      const consent = await conv.consentState();
      const newConvo = { ...conv, peerAddress: peerAdd, consent } as FullConversation;
      onChatStarted(newConvo);
      onBack();
    } catch (error) {
      const e = error as Error;
      console.log('error creating chat', e);
    }
  };

  const checkIfConversationExists = async (peerAddress: string) => {
    const inboxId = await client?.findInboxIdByAddress(peerAddress);
    if (!inboxId) return;
    const convoExists = await client?.conversations.getDmByInboxId(inboxId);
    if (convoExists) {
      const peerInboxId = await convoExists.dmPeerInboxId();
      const convoMembers = await convoExists.members();
      const peerAdd = convoMembers.find((member) => member.inboxId === peerInboxId)?.accountAddresses[0];
      const consent = await convoExists.consentState();
      const newConvo = { ...convoExists, peerAddress: peerAdd, consent } as FullConversation;
      onChatStarted(newConvo);
    }
  };

  useEffect(() => {
    if (debouncedAddress.length === 0) {
      setCanMessage(false);
      return;
    }
    if (isAddressName) {
      if (!isRecordsLoading && resolvedAddress) {
        handleCanMessage();
      }
    } else {
      if (!canMessageLoading && !isPrimaryNameLoading) {
        handleCanMessage();
      }
    }
  }, [
    debouncedAddress,
    canMessageLoading,
    isPrimaryNameLoading,
    isRecordsLoading,
    resolvedAddress,
    isAddressName,
    handleCanMessage,
  ]);

  useEffect(() => {
    const checkConversation = async () => {
      if (canMessage) {
        await checkIfConversationExists(
          isAddressName && resolvedAddress ? resolvedAddress : debouncedAddress
        );
      }
    };

    checkConversation();
  }, [
    canMessage,
    resolvedAddress,
    debouncedAddress,
    checkIfConversationExists,
    isAddressName,
  ]);

  const isSearchLoading = useMemo(() => {
    return (
      // (isAddressName && isPrimaryNameLoading && debouncedAddress.length > 4) ||
      // isLoading
      isDebouncingAddress || isRecordsFetching || isPrimaryNameFetching
    );
  }, [isDebouncingAddress, isRecordsFetching, isPrimaryNameFetching]);
  // }, [isAddressName, isPrimaryNameLoading, debouncedAddress.length, isLoading]);

  useEffect(() => {
    if (isRecordsLoading || isPrimaryNameLoading) {
      return;
    }

    if (name) {
      setNewAddress(name);
      return;
    }
  }, [name, isRecordsLoading, isPrimaryNameLoading]);

  return (
    <Flex
      direction="column"
      gap="20px"
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <Flex
        direction="row"
        align="center"
        gap="10px"
        justify="space-between"
        style={{
          padding: '10px 1.5rem',
        }}
      >
        <Flex
          align="center"
          justify="center"
          style={{
            borderRadius: '50%',
            width: 24,
            height: 24,
            cursor: 'pointer',
            backgroundColor: 'var(--justweb3-foreground-color-4)',
          }}
          onClick={onBack}
        >
          <ArrowIcon
            height={15}
            width={15}
            style={{
              transform: 'rotate(180deg) translateX(1px)',
            }}
          />
        </Flex>
        <Input
          value={newAddress}
          left={
            <Flex direction="row" gap="5px">
              <P
                style={{
                  fontWeight: 700,
                }}
              >
                To
              </P>
              {isSearchLoading ? (
                <LoadingSpinner color={'var(--justweb3-primary-color)'} />
              ) : debouncedAddress.length > 0 ? (
                <VerificationsIcon
                  fill={
                    canMessage ? '#00c311' : 'var(--justweb3-destructive-color)'
                  }
                  width={20}
                  height={20}
                />
              ) : null}
            </Flex>
          }
          right={
            isSearchLoading ? (
              <LoadingSpinner color={'var(--justweb3-primary-color)'} />
            ) : (
              <Flex direction="row" gap="5px">
                <Flex
                  align="center"
                  justify="center"
                  style={{
                    borderRadius: '50%',
                    width: 24,
                    height: 24,
                    cursor: 'pointer',
                    backgroundColor: 'var(--justweb3-foreground-color-4)',
                  }}
                  onClick={() => {
                    setNewAddress('');
                  }}
                >
                  <CloseIcon height={15} width={15} />
                </Flex>
              </Flex>
            )
          }
          placeholder={'ENS, Wallet Address...'}
          onChange={(e) => setNewAddress(e.target.value)}
          style={{
            flex: 1,
            height: 22,
            maxHeight: 22!,
            gap: 5,
          }}
        />
      </Flex>
      <Flex
        style={{
          marginTop: 'auto',
          padding: '0px 1.5rem',
        }}
      >
        <NewChatTextField
          disabled={!canMessage}
          onNewConvo={handleNewChat}
          style={{
            flexGrow: 1,
          }}
        />
      </Flex>
    </Flex>
  );
};

export default NewChat;
