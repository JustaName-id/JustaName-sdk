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
import React, { useCallback, useEffect, useMemo } from 'react';
import { FullConversation, useCanMessage } from '../../../hooks';
import { useClientAddress } from '../../../hooks/useClientAddress';
import { useXMTPContext } from '../../../hooks/useXMTPContext';
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
  const [isVerifying, setIsVerifying] = React.useState<boolean>(false);
  //Queries
  const { client } = useXMTPContext();
  const { clientAddress } = useClientAddress();
  const { canMessageFn: xmtpCanMessage } = useCanMessage();

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
    const ethAddress = records?.sanitizedRecords?.ethAddress?.value;
    if (ethAddress && ethAddress !== clientAddress) {
      return ethAddress;
    }
    return undefined;
  }, [clientAddress, records?.sanitizedRecords?.ethAddress?.value]);

  const handleCanMessage = useCallback(async () => {
    if (!client) return;
    setIsVerifying(true);
    try {
      if (isAddressName) {
        if (resolvedAddress) {
          const res = await xmtpCanMessage(resolvedAddress as `0x${string}`);
          setCanMessage(!!res);
        } else {
          setIsVerifying(false);
          return;
        }
      } else if (
        debouncedAddress.length === 42 &&
        clientAddress !== debouncedAddress
      ) {
        const res = await xmtpCanMessage(debouncedAddress as `0x${string}`);
        setCanMessage(!!res);
      } else {
        setCanMessage(false);
      }
    } catch (e) {
      console.log('error', e);
      setCanMessage(false);
    } finally {
      setIsVerifying(false);
    }
  }, [client, isAddressName, resolvedAddress, debouncedAddress, xmtpCanMessage, clientAddress]);

  const checkIfConversationExists = useCallback(async (peerAddress: string) => {
    if (!client) return;
    const inboxId = await client.findInboxIdByIdentifier({
      identifier: peerAddress,
      identifierKind: "Ethereum",
    });
    if (!inboxId) return;
    const convoExists = await client.conversations.getDmByInboxId(inboxId);
    if (convoExists) {
      const peerInboxId = await convoExists.peerInboxId();
      const convoMembers = await convoExists.members();
      const peerAdd = convoMembers.find((member) => member.inboxId === peerInboxId)?.accountIdentifiers;
      const addresses = peerAdd?.filter((i) => i.identifierKind === "Ethereum")
        .map((i) => i.identifier);
      const consent = await convoExists.consentState();
      const newConvo = convoExists as unknown as FullConversation;
      newConvo.peerAddress = addresses ? addresses[0] : '';
      newConvo.consent = consent;
      onChatStarted(newConvo);
    }
  }, [client, onChatStarted]);

  const handleNewChat = async (message: string) => {
    if (!client) return;
    const peerAddress =
      isAddressName && !!resolvedAddress ? resolvedAddress : debouncedAddress;
    try {
      const inboxId = await client.findInboxIdByIdentifier({
        identifier: peerAddress,
        identifierKind: "Ethereum",
      });
      if (!inboxId) return;
      const conv = await client.conversations.newDm(inboxId);
      conv.send(message);
      await conv.updateConsentState(ConsentState.Allowed);
      const peerInboxId = await conv.peerInboxId();
      const convoMembers = await conv.members();
      const peerAdd = convoMembers.find((member) => member.inboxId === peerInboxId)?.accountIdentifiers;
      const addresses = peerAdd?.filter((i) => i.identifierKind === "Ethereum")
        .map((i) => i.identifier);
      const consent = await conv.consentState();
      const newConvo = conv as unknown as FullConversation;
      newConvo.peerAddress = addresses ? addresses[0] : '';
      newConvo.consent = consent;
      onChatStarted(newConvo);
      onBack();
    } catch (error) {
      const e = error as Error;
      console.log('error creating chat', e);
    }
  };

  useEffect(() => {
    if (name && !isPrimaryNameLoading && !isPrimaryNameFetching) {
      setNewAddress(name);
    }
  }, [name, isPrimaryNameLoading, isPrimaryNameFetching]);

  const shouldCheckCanMessage = useMemo(() => {
    if (debouncedAddress.length === 0 || clientAddress === debouncedAddress) return false;

    if (isAddressName) {
      return !isRecordsLoading && resolvedAddress !== undefined;
    }
    else {
      return !isPrimaryNameLoading;
    }
  }, [
    debouncedAddress,
    clientAddress,
    isAddressName,
    isRecordsLoading,
    resolvedAddress,
    isPrimaryNameLoading,
  ]);

  useEffect(() => {
    if (debouncedAddress.length === 0) {
      setCanMessage(false);
      return;
    }

    if (shouldCheckCanMessage) {
      handleCanMessage();
    }
  }, [shouldCheckCanMessage, handleCanMessage]);

  useEffect(() => {
    if (canMessage && debouncedAddress) {
      const targetAddress = isAddressName && resolvedAddress ? resolvedAddress : debouncedAddress;
      checkIfConversationExists(targetAddress);
    }
  }, [canMessage, checkIfConversationExists]);

  const isSearchLoading = useMemo(() => {
    return isDebouncingAddress || isRecordsFetching || isPrimaryNameFetching || isVerifying;
  }, [isDebouncingAddress, isRecordsFetching, isPrimaryNameFetching, isVerifying]);

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
                <Flex direction="row" align="center" justify='flex-end'>
                  <LoadingSpinner color={'var(--justweb3-primary-color)'} />
                </Flex>
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
              <Flex direction="row" align="center" justify='flex-end'>
                <LoadingSpinner color={'var(--justweb3-primary-color)'} />
              </Flex>
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
            maxHeight: 22,
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