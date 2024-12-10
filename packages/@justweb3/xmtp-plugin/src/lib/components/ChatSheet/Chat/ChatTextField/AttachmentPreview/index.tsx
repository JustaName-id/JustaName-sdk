// ChatTextField/AttachmentPreview.tsx
import React from 'react';
import {
  Button,
  DocumentIcon,
  Flex,
  P,
  SendIcon,
  StopIcon,
} from '@justweb3/ui';
import { VideoPlayerPreview } from '../../VideoPlayerPreview';
import { VoiceNoteRecording } from './../VoiceNoteRecording';
import { typeLookup } from '../../../../../utils/attachments';
import { Attachment } from '@xmtp/content-type-remote-attachment';

export interface AttachmentPreviewProps {
  attachment: Attachment | undefined;
  attachmentPreview: string | undefined;
  disabled?: boolean;
  onCancelAttachment: () => void;
  onSendAttachment: () => void;
  recording: boolean;
  recordingValue: string | null;
  stopRecording: () => void;
  pause: () => void;
  reset: () => void;
}

export const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({
  attachment,
  attachmentPreview,
  disabled,
  onCancelAttachment,
  onSendAttachment,
  recording,
  recordingValue,
  stopRecording,
  pause,
  reset,
}) => {
  const attachmentExtention = attachment?.mimeType.split('/')?.[1] || '';

  if (attachmentPreview) {
    return (
      <Flex
        direction="row"
        gap="10px"
        align="center"
        justify="space-between"
        style={{
          padding: '10px 15px',
          borderRadius: '100px',
          background: 'white',
          height: 22,
          maxHeight: 22,
          border: '1px solid grey',
          boxSizing: 'content-box',
          paddingLeft: attachment?.mimeType === 'audio/wav' ? '5px' : '15px',
          // position: 'relative',
        }}
      >
        {attachment?.mimeType !== 'audio/wav' && (
          <div
            style={{
              position: 'absolute',
              left: '0px',
              right: '0px',
              bottom: '0px',
              top: '0px',
              backdropFilter: 'blur(8px)',
            }}
          />
        )}
        {attachment?.mimeType === 'audio/wav' ? (
          <VoiceNoteRecording
            audioUrl={attachmentPreview}
            onCancel={onCancelAttachment}
          />
        ) : (
          <Flex
            direction="column"
            align="center"
            gap="10px"
            style={{
              position: 'absolute',
              left: '12px',
              zIndex: 5,
              padding: '10px 0px',
              right: '12px',
              bottom: '20px',
              borderRadius: '10px',
            }}
          >
            {typeLookup[attachmentExtention] === 'image' ? (
              <img
                src={attachmentPreview || ''}
                alt={attachment?.filename}
                style={{ width: '350px', borderRadius: '5px' }}
              />
            ) : typeLookup[attachmentExtention] === 'video' ? (
              <VideoPlayerPreview
                url={attachmentPreview || ''}
                style={{ width: '350px' }}
              />
            ) : (
              <Flex
                direction="row"
                gap="5px"
                justify="center"
                align="center"
                style={{
                  padding: '4px 12px',
                  width: '250px',
                  marginBottom: '10px',
                }}
              >
                <DocumentIcon width="30" height="30" />
                <P
                  style={{
                    maxWidth: '180px',
                    fontSize: '14px',
                    fontWeight: 700,
                    textTransform: 'capitalize',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    color: 'var(--justweb3-primary-color)',
                  }}
                >
                  {attachment?.filename ?? 'Cannot preview'}
                </P>
              </Flex>
            )}
            <Flex
              direction="row"
              align="center"
              gap="10px"
              style={{ flex: 1, width: '100%', padding: '5px' }}
            >
              <Button
                variant="secondary"
                style={{ marginLeft: '10px', width: '100%' }}
                onClick={onCancelAttachment}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                style={{ marginRight: '10px', width: '100%' }}
                onClick={onSendAttachment}
              >
                Send
              </Button>
            </Flex>
          </Flex>
        )}
        <SendIcon
          style={{
            cursor: disabled ? 'not-allowed' : 'pointer',
            marginLeft: 'auto',
          }}
          width={24}
          height={24}
          onClick={() => {
            if (!disabled) onSendAttachment();
          }}
        />
      </Flex>
    );
  } else if (recording) {
    return (
      <Flex
        direction="row"
        align="center"
        gap="10px"
        justify="space-between"
        style={{
          padding: '10px 15px',
          borderRadius: '100px',
          border: '1px solid var(--justweb3-primary-color)',
          background: 'white',
        }}
      >
        <P
          style={{
            fontSize: '12px',
            letterSpacing: 0.7,
            color: 'var(--justweb3-primary-color)',
            fontWeight: 900,
          }}
        >
          {recordingValue}
        </P>
        <P
          style={{
            fontSize: '12px',
            letterSpacing: 0.7,
            color: 'var(--justweb3-primary-color)',
            fontWeight: 900,
            flex: 1,
          }}
        >
          RECORDING...
        </P>
        <StopIcon
          width="20"
          height="20"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            stopRecording();
            pause();
            reset();
          }}
        />
      </Flex>
    );
  }

  return null;
};
