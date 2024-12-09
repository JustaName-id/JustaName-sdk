import {
  CachedConversation,
  toCachedConversation,
  useCanMessage,
  useClient,
  useConsent,
  useConversation,
  useStartConversation,
} from '@xmtp/react-sdk';
import React, { useEffect, useMemo } from 'react';
import { useDebounce } from '@justweb3/widget';
import {
  useMountedAccount,
  usePrimaryName,
  useRecords,
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
import { NewChatTextField } from './NewChatTextField';

interface NewChatProps {
  onChatStarted: (conversation: CachedConversation) => void;
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
  const { client } = useClient();
  const { startConversation } = useStartConversation();
  const { getCachedByPeerAddress } = useConversation();
  const { refreshConsentList, allow } = useConsent();
  const { address } = useMountedAccount();
  const { canMessage: xmtpCanMessage, isLoading } = useCanMessage();
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

  const resolvedAddress = useMemo(() => {
    return records?.sanitizedRecords?.ethAddress?.value;
  }, [records]);

  const handleCanMessage = async () => {
    if (!client) return;
    try {
      if (isAddressName) {
        if (resolvedAddress) {
          const res = await xmtpCanMessage(resolvedAddress);
          setCanMessage(res);
        } else {
          // Resolved address is not available yet; do nothing
          return;
        }
      } else if (debouncedAddress.length === 42) {
        const res = await xmtpCanMessage(debouncedAddress);
        setCanMessage(res);
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
      const conv = await startConversation(peerAddress, message ?? {});
      if (!conv.cachedConversation) {
        if (!conv.conversation) {
          return;
        } else {
          const cachedConvo = toCachedConversation(
            conv.conversation,
            address ?? ''
          );
          await allow([conv.conversation.peerAddress]);
          await refreshConsentList();
          onChatStarted(cachedConvo);
          onBack();
        }
      } else {
        await allow([conv.cachedConversation.peerAddress]);
        await refreshConsentList();
        onChatStarted(conv.cachedConversation);
        onBack();
      }
    } catch (error) {
      const e = error as Error;
      console.log('error creating chat', e);
    }
  };

  const checkIfConversationExists = async (peerAddress: string) => {
    const convoExists = await getCachedByPeerAddress(peerAddress);
    if (convoExists) {
      onChatStarted(convoExists);
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
      if (!isLoading && !isPrimaryNameLoading) {
        handleCanMessage();
      }
    }
  }, [
    debouncedAddress,
    isLoading,
    isPrimaryNameLoading,
    isRecordsLoading,
    resolvedAddress,
    isAddressName,
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
