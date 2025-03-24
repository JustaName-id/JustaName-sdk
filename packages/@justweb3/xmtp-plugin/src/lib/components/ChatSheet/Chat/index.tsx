import {
  useMountedAccount,
  usePrimaryName,
  useRecords,
} from '@justaname.id/react';
import { Flex } from '@justweb3/ui';
import { useJustWeb3 } from '@justweb3/widget';
import { ContentTypeReadReceipt } from '@xmtp/content-type-read-receipt';
import React, { useEffect, useMemo, useState } from 'react';
import { FullConversation, useCanMessage, useMessages, useSendReactionMessage } from '../../../hooks';
import { useConversationConsent } from '../../../hooks/useConversationConsent';
import { useConversationConsentMutations } from '../../../hooks/useConversationConsentMutations';
import { useReadReceipt } from '../../../hooks/useReadReceipt';
import { useXMTPContext } from '../../../hooks/useXMTPContext';
import { typeLookup } from '../../../utils/attachments';
import {
  filterReactionsMessages,
  MessageWithReaction,
} from '../../../utils/filterReactionsMessages';
import { groupMessagesByDate } from '../../../utils/groupMessageByDate';
import { ChatHeader } from './ChatHeader';
import { ChatMessagesList } from './ChatMessagesList';
import { ChatReactionOverlay } from './ChatReactionOverlay';
import { ChatRequestControls } from './ChatRequestControl';
import { ChatTextField } from './ChatTextField';
import { LoadingMessagesList } from './LoadingMessagesList';

export interface ChatProps {
  conversation: FullConversation;
  peerAddress: string;
  onBack: () => void;
}

export const Chat: React.FC<ChatProps> = ({ conversation, onBack }) => {
  const { openEnsProfile } = useJustWeb3();
  const [replyMessage, setReplyMessage] = useState<MessageWithReaction | null>(
    null
  );
  const [reactionMessage, setReactionMessage] =
    useState<MessageWithReaction | null>(null);

  const { mutateAsync: sendReaction } = useSendReactionMessage(conversation);
  const { primaryName } = usePrimaryName({
    address: conversation.peerAddress as `0x${string}`,
  });
  const { client } = useXMTPContext();
  const { records } = useRecords({ ens: primaryName });
  const { address } = useMountedAccount();
  const { messages, messagesLoading: isLoading } = useMessages(conversation);
  console.log('messages', messages);
  const { canMessage, canMessageLoading } = useCanMessage(conversation.peerAddress as `0x${string}`);
  const { mutateAsync: readReceipt, isPending: isReadReceiptSending } =
    useReadReceipt(conversation);

  const {
    isRequest,
    handleReadMessagesIfAllowed
  } = useConversationConsent(conversation);

  const {
    allowAddress,
    blockAddress,
    isLoading: isConsentChangeLoading
  } = useConversationConsentMutations({
    conversation,
    onBlockSuccess: () => {
      console.log('block success');
      onBack();
    }
  });

  useEffect(() => {
    if (isLoading || isReadReceiptSending) return;

    const lastMessage = messages[messages.length - 1];

    if (!lastMessage) return;

    if (lastMessage?.contentType.sameAs(ContentTypeReadReceipt)) {
      return;
    }

    if (lastMessage.senderInboxId === client?.inboxId) {
      return;
    }

    handleReadMessagesIfAllowed(readReceipt);

  }, [messages.length, isReadReceiptSending, isLoading, client?.inboxId, handleReadMessagesIfAllowed, readReceipt]);

  const filteredMessages = useMemo(() => {
    const withoutRead = messages?.filter(
      (message) => !message.contentType.sameAs(ContentTypeReadReceipt)
    );
    return filterReactionsMessages(withoutRead ?? []);
  }, [messages]);

  const groupedMessages = useMemo(() => {
    return groupMessagesByDate(filteredMessages ?? []);
  }, [filteredMessages]);

  const isMessagesSenderOnly = useMemo(() => {
    return filteredMessages.every(
      (message) => message.senderInboxId === client?.inboxId
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

  const blockAddressHandler = async () => {
    await blockAddress();
  };

  const handleAllowAddress = async () => {
    await allowAddress();
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
        {canMessageLoading || isLoading ? (
          <LoadingMessagesList computeHeight={computeHeight} />
        ) : (
          <ChatMessagesList
            canMessage={!!canMessage}
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
            isRequestChangeLoading={isConsentChangeLoading}
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
