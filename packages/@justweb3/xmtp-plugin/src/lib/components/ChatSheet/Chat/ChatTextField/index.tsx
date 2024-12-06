// ChatTextField/index.tsx
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  CachedConversation,
  ContentTypeMetadata,
  useClient,
} from '@xmtp/react-sdk';
import { useMountedAccount, usePrimaryName } from '@justaname.id/react';
import { Flex, P } from '@justweb3/ui';
import { AttachmentButtons } from './AttachmentButtons';
import { ReplyPreview } from './ReplyPreview';
import { AttachmentPreview } from './AttachmentPreview';
import { MessageInput } from './MessageInput';
import {
  useAttachmentChange,
  useRecordingTimer,
  useRecordVoice,
  useSendAttachment,
  useSendMessages,
  useSendReplyMessage,
} from '../../../../hooks';
import { AttachmentType, typeLookup } from '../../../../utils/attachments';
import type { Attachment } from '@xmtp/content-type-remote-attachment';
import { MessageWithReaction } from '../../../../utils/filterReactionsMessages';

export interface ChatTextFieldProps {
  isMessagesSenderOnly: boolean;
  replyMessage: MessageWithReaction | null;
  conversation: CachedConversation<ContentTypeMetadata>;
  peerAddress: string;
  onCancelReply: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const ChatTextField: React.FC<ChatTextFieldProps> = ({
  isMessagesSenderOnly,
  replyMessage,
  conversation,
  peerAddress,
  onCancelReply,
  disabled,
  style,
}) => {
  const [messageValue, setMessageValue] = useState<string>('');
  const [attachment, setAttachment] = useState<Attachment | undefined>();
  const [attachmentPreview, setAttachmentPreview] = useState<
    string | undefined
  >();
  const { client } = useClient();
  const { address } = useMountedAccount();
  const { mutateAsync: sendMessage } = useSendMessages(conversation);
  const { mutateAsync: sendReply } = useSendReplyMessage(conversation);
  const { mutateAsync: sendAttachment } = useSendAttachment(conversation);
  const { primaryName } = usePrimaryName({
    address: peerAddress as `0x${string}`,
  });

  const [acceptedTypes, setAcceptedTypes]: [
    string | string[] | undefined,
    Dispatch<SetStateAction<string | string[] | undefined>>
  ] = useState();
  const inputFile = useRef<HTMLInputElement | null>(null);

  const { onAttachmentChange } = useAttachmentChange({
    setAttachment,
    setAttachmentPreview,
  });

  const { recording, startRecording, stopRecording } = useRecordVoice({
    setAttachment,
    setAttachmentPreview,
  });
  const { start, pause, reset, recordingValue } = useRecordingTimer({
    stopRecording,
    status: recording ? 'recording' : 'idle',
  });

  const handleSendMessage = async () => {
    if (!client || disabled || messageValue.length === 0) return;

    if (replyMessage) {
      await sendReply({
        message: messageValue,
        referenceId: replyMessage.id,
      });
      onCancelReply && onCancelReply();
    } else {
      await sendMessage(messageValue);
    }

    setMessageValue('');
  };

  const handleSendAttachment = async () => {
    if (!client || !attachment || disabled) return;
    await sendAttachment(attachment);
    setMessageValue('');
    setAttachment(undefined);
    setAttachmentPreview(undefined);
  };

  const handleCancelAttachment = () => {
    setAttachment(undefined);
    setAttachmentPreview(undefined);
  };

  const onButtonClick = (contentType: AttachmentType) => {
    if (contentType === 'application') {
      setAcceptedTypes('all');
    } else {
      const acceptedFileTypeList = Object.keys(typeLookup).reduce(
        (acc: string[], key: string) => {
          if (typeLookup[key] === contentType) acc.push(`.${key}`);
          return acc;
        },
        []
      );
      setAcceptedTypes([...acceptedFileTypeList]);
    }
  };

  const isSender = useMemo(
    () => address === replyMessage?.senderAddress,
    [replyMessage, address]
  );

  const navigateToRepliedMessage = () => {
    if (!replyMessage) return;
    const element = document.getElementById(replyMessage.id.toString());
    if (element) {
      element.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (acceptedTypes) {
      inputFile?.current?.click();
    }
  }, [acceptedTypes]);

  return (
    <Flex direction="column" gap="2.5px" style={{ ...style }}>
      {isMessagesSenderOnly && (
        <Flex
          direction="column"
          gap="5px"
          style={{
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: 'var(--justweb3-foreground-color-4)',
          }}
        >
          <P
            style={{
              fontSize: '14px',
              fontWeight: 900,
              lineHeight: '100%',
              color: 'var(--justweb3-foreground-color-3)',
            }}
          >
            Message in user’s Requests
          </P>
          <P style={{ fontSize: '12px' }}>
            This user has not accepted your message request yet
          </P>
        </Flex>
      )}

      <Flex direction="column" gap="5px" style={{ ...style }}>
        <AttachmentButtons
          onButtonClick={onButtonClick}
          acceptedTypes={acceptedTypes}
          onAttachmentChange={onAttachmentChange}
          inputFileRef={inputFile}
        />

        <div>
          <ReplyPreview
            replyMessage={replyMessage}
            onCancelReply={onCancelReply}
            isSender={isSender}
            primaryName={primaryName}
            navigateToRepliedMessage={navigateToRepliedMessage}
          />

          <AttachmentPreview
            attachment={attachment}
            attachmentPreview={attachmentPreview}
            disabled={disabled}
            onCancelAttachment={handleCancelAttachment}
            onSendAttachment={handleSendAttachment}
            recording={recording}
            recordingValue={recordingValue}
            stopRecording={stopRecording}
            pause={pause}
            reset={reset}
          />

          {!attachmentPreview && !recording && (
            <MessageInput
              replyMessage={!!replyMessage}
              disabled={disabled}
              messageValue={messageValue}
              setMessageValue={setMessageValue}
              handleSendMessage={handleSendMessage}
              startRecording={startRecording}
              start={start}
            />
          )}
        </div>
      </Flex>
    </Flex>
  );
};
