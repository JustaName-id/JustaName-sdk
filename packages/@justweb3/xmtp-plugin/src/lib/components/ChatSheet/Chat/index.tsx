import React, { useEffect, useMemo, useState } from 'react';
import {
  useMountedAccount,
  usePrimaryName,
  useRecords,
} from '@justaname.id/react';
import { Flex } from '@justweb3/ui';
import {
  CachedConversation,
  ContentTypeMetadata,
  useCanMessage,
  useConsent,
  useMessages,
} from '@xmtp/react-sdk';
import { useJustWeb3 } from '@justweb3/widget';
import { ChatTextField } from './ChatTextField';
import { ChatMessagesList } from './ChatMessagesList';
import { LoadingMessagesList } from './LoadingMessagesList';
import { ChatRequestControls } from './ChatRequestControl';
import { ChatHeader } from './ChatHeader';
import { ChatReactionOverlay } from './ChatReactionOverlay';
import {
  filterReactionsMessages,
  MessageWithReaction,
} from '../../../utils/filterReactionsMessages';
import { useSendReactionMessage } from '../../../hooks';
import { groupMessagesByDate } from '../../../utils/groupMessageByDate';
import { typeLookup } from '../../../utils/attachments';
import { ContentTypeReadReceipt } from '@xmtp/content-type-read-receipt';
import { useReadReceipt } from '../../../hooks/useReadReceipt';

export interface ChatProps {
  conversation: CachedConversation<ContentTypeMetadata>;
  onBack: () => void;
}

export const Chat: React.FC<ChatProps> = ({ conversation, onBack }) => {
  const { openEnsProfile } = useJustWeb3();
  const [replyMessage, setReplyMessage] = useState<MessageWithReaction | null>(
    null
  );
  const [reactionMessage, setReactionMessage] =
    useState<MessageWithReaction | null>(null);
  const [isRequest, setIsRequest] = useState<boolean>(false);
  const [isRequestChangeLoading, setIsRequestChangeLoading] =
    useState<boolean>(false);

  const { entries, allow, deny } = useConsent();
  const { mutateAsync: sendReaction } = useSendReactionMessage(conversation);
  const { primaryName } = usePrimaryName({
    address: conversation.peerAddress as `0x${string}`,
  });
  const { records } = useRecords({ ens: primaryName });
  const { address } = useMountedAccount();
  const [canMessage, setCanMessage] = useState<boolean>(true);
  const { messages, isLoading } = useMessages(conversation);
  const { canMessage: canMessageFn, isLoading: isCanMessageLoading } =
    useCanMessage();
  const { mutateAsync: readReceipt, isPending: isReadReceiptSending } =
    useReadReceipt(conversation);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (!lastMessage || isReadReceiptSending) return;

    if (lastMessage?.contentType === ContentTypeReadReceipt.toString()) {
      return;
    }

    if (entries[conversation.peerAddress]?.permissionType === 'allowed') {
      readReceipt();
    }
  }, [
    messages,
    readReceipt,
    isReadReceiptSending,
    entries,
    conversation.peerAddress,
  ]);

  // Determine if user can message
  useEffect(() => {
    if (isCanMessageLoading) return;
    canMessageFn(conversation.peerAddress).then(setCanMessage);
  }, [isCanMessageLoading, conversation, canMessageFn]);

  // Check if conversation is in "request" state
  useEffect(() => {
    const convoConsentState = entries[conversation.peerAddress]?.permissionType;
    setIsRequest(
      convoConsentState === 'unknown' || convoConsentState === undefined
    );
  }, [entries, conversation.peerAddress]);

  const filteredMessages = useMemo(() => {
    const withoutRead = messages.filter(
      (message) => message.contentType !== 'xmtp.org/readReceipt:1.0'
    );
    return filterReactionsMessages(withoutRead);
  }, [messages]);

  const groupedMessages = useMemo(() => {
    return groupMessagesByDate(filteredMessages ?? []);
  }, [filteredMessages]);

  const isMessagesSenderOnly = useMemo(() => {
    return filteredMessages.every(
      (message) => message.senderAddress === address
    );
  }, [filteredMessages, address]);

  const isStringContent =
    typeof replyMessage?.content === 'string' ||
    typeof replyMessage?.content?.content === 'string';

  const mimeType = replyMessage?.content?.mimeType;
  const type = mimeType ? typeLookup[mimeType.split('/')?.[1]] : null;

  const computeHeight = useMemo(() => {
    const baseHeight = '100vh - 50px - 3rem - 1.5rem - 73px - 15px';
    const adjustments: string[] = [];

    if (isRequest) return 'calc(100vh - 50px - 3rem - 1.5rem - 15px - 34px)';
    if (replyMessage) {
      if (isStringContent) {
        adjustments.push('46px');
      } else if (mimeType === 'audio/wav') {
        adjustments.push('61px');
      } else if (type === 'video' || type === 'image') {
        adjustments.push('116px');
      } else {
        adjustments.push('47px');
      }
    }
    if (isMessagesSenderOnly) adjustments.push('59px');

    return ` calc(${baseHeight}${adjustments
      .map((val) => ` - ${val}`)
      .join('')}) `;
  }, [
    replyMessage,
    isMessagesSenderOnly,
    isStringContent,
    mimeType,
    type,
    isRequest,
  ]);

  // Handlers
  const blockAddressHandler = async (peerAddress: string) => {
    setIsRequestChangeLoading(true);
    // await refreshConsentList();
    await deny([peerAddress]);
    // await refreshConsentList();
    setIsRequestChangeLoading(false);
    onBack();
  };

  const handleAllowAddress = async () => {
    setIsRequestChangeLoading(true);
    // await refreshConsentList();
    await allow([conversation.peerAddress]);
    // await refreshConsentList();
    setIsRequest(false);
    setIsRequestChangeLoading(false);
  };

  const handleEmojiSelect = (emoji: string) => {
    if (!reactionMessage) return;
    sendReaction({
      action: 'added',
      content: emoji,
      referenceId: reactionMessage.id,
    });
    setReactionMessage(null);
    const replica = document.getElementById(`${reactionMessage?.id}-replica`);
    replica?.remove();
  };

  return (
    <Flex
      direction="column"
      gap="0px"
      style={{ height: '100%', width: '100%' }}
    >
      {/* Overlay for reaction */}
      <ChatReactionOverlay
        reactionMessage={reactionMessage}
        onOverlayClick={() => {
          setReactionMessage(null);
          const replica = document.getElementById(
            `${reactionMessage?.id}-replica`
          );
          replica?.remove();
        }}
      />

      <ChatHeader
        primaryName={primaryName}
        peerAddress={conversation.peerAddress}
        onBack={onBack}
        openEnsProfile={openEnsProfile}
        records={records}
        blockAddressHandler={blockAddressHandler}
      />

      <Flex
        direction="column"
        gap="15px"
        style={{
          height: '100%',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        }}
      >
        {isCanMessageLoading || isLoading ? (
          // {true ? (
          <LoadingMessagesList computeHeight={computeHeight} />
        ) : (
          <ChatMessagesList
            canMessage={canMessage}
            groupedMessages={groupedMessages}
            conversation={conversation}
            setReplyMessage={setReplyMessage}
            setReactionMessage={setReactionMessage}
            reactionMessage={reactionMessage}
            handleEmojiSelect={handleEmojiSelect}
            computeHeight={computeHeight}
          />
        )}

        {isRequest ? (
          <ChatRequestControls
            isRequestChangeLoading={isRequestChangeLoading}
            blockAddressHandler={blockAddressHandler}
            peerAddress={conversation.peerAddress}
            handleAllowAddress={handleAllowAddress}
          />
        ) : (
          <ChatTextField
            isMessagesSenderOnly={isMessagesSenderOnly}
            replyMessage={replyMessage}
            conversation={conversation}
            peerAddress={conversation.peerAddress}
            onCancelReply={() => setReplyMessage(null)}
          />
        )}
      </Flex>
    </Flex>
  );
};
