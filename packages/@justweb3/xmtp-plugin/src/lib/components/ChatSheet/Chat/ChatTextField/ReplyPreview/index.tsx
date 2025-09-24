// ChatTextField/ReplyPreview.tsx
import { CloseIcon, DocumentIcon, Flex, P } from '@justweb3/ui';
import React, { useMemo } from 'react';
import { AttachmentContent, ReplyContent } from '../../../../../../lib/types/messageContentTypes';
import { typeLookup } from '../../../../../utils/attachments';
import { MessageWithReaction } from '../../../../../utils/filterReactionsMessages';
import { formatAddress } from '../../../../../utils/formatAddress';
import { VideoPlayerPreview } from '../../VideoPlayerPreview';
import VoiceNotePreview from '../../VoiceNotePreview';

export interface ReplyPreviewProps {
  replyMessage: MessageWithReaction | null;
  onCancelReply: () => void;
  isSender: boolean;
  primaryName: string | null | undefined;
  navigateToRepliedMessage: () => void;
  peerAddress: string;
}

export const ReplyPreview: React.FC<ReplyPreviewProps> = ({
  replyMessage,
  onCancelReply,
  isSender,
  primaryName,
  navigateToRepliedMessage,
  peerAddress
}) => {
  const isReplyText = useMemo(() => {
    if (!replyMessage) return false;
    return typeof replyMessage.content === 'string';
  }, [replyMessage]);

  const isReplyReply = useMemo(() => {
    if (!replyMessage) return false;
    const content = replyMessage.content as Partial<ReplyContent>;
    return typeof content === 'object' && content !== null && !!content.reference;
  }, [replyMessage]);

  const isReplyVoice = useMemo(() => {
    if (!replyMessage) return false;
    const content = replyMessage.content as Partial<AttachmentContent>;
    return typeof content === 'object' && content !== null && content.mimeType === 'audio/wav';
  }, [replyMessage]);

  const replyAttachmentExtension = useMemo(() => {
    if (!replyMessage || isReplyText || isReplyReply) return '';
    const content = replyMessage.content as Partial<AttachmentContent>;
    if (typeof content === 'object' && content !== null && typeof content.mimeType === 'string') {
      return content.mimeType.split('/')?.[1] || '';
    }
    return '';
  }, [isReplyText, replyMessage, isReplyReply]);

  const isReplyVideoOrImage = useMemo(() => {
    return (
      typeLookup[replyAttachmentExtension] === 'image' ||
      typeLookup[replyAttachmentExtension] === 'video'
    );
  }, [replyAttachmentExtension]);

  if (!replyMessage) return null;

  return (
    <Flex
      direction="row"
      align="center"
      justify="space-between"
      style={{
        padding: '8px 12px',
        height: isReplyText
          ? '30px'
          : isReplyVoice
            ? '45px'
            : isReplyVideoOrImage
              ? '100px'
              : '30px',
        borderRadius: '5px',
        background: 'white',
        paddingLeft: '14px',
        border: '1px solid grey',
        borderBottom: 0,
        borderTopLeftRadius: '25px',
        borderTopRightRadius: '25px',
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        boxSizing: 'content-box',
      }}
    >
      <Flex
        direction="column"
        align="flex-start"
        gap="5px"
        style={{
          cursor: 'pointer',
          maxWidth: '90%',
          flex: 1,
          height: '100%',
        }}
        onClick={navigateToRepliedMessage}
      >
        <P
          style={{
            fontSize: '11px',
            fontWeight: 900,
            lineHeight: '100%',
            color: 'var(--justweb3-primary-color)',
          }}
        >
          {isSender
            ? 'YOU'
            : primaryName ?? formatAddress(peerAddress)}
        </P>
        {isReplyText || isReplyReply ? (
          <P
            style={{
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: '120%',
              maxWidth: '90%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: 'black',
            }}
          >
            {(() => {
              const content = replyMessage.content;
              if (isReplyReply) {
                const replyContent = content as ReplyContent;
                if (typeof replyContent.content === 'string') {
                  return replyContent.content;
                } else {
                  return (replyContent.content as AttachmentContent).filename;
                }
              }
              if (isReplyText) {
                return content as string;
              }
              return '';
            })()}
          </P>
        ) : isReplyVoice ? (
          <VoiceNotePreview
            disabled
            isReceiver={false}
            message={replyMessage}
            style={{
              padding: '0px',
              transform: 'scale(80%)',
              translate: '-x-6',
            }}
          />
        ) : typeLookup[replyAttachmentExtension] === 'image' ? (
          <img
            src={URL.createObjectURL(
              new Blob([(replyMessage.content as AttachmentContent).data], {
                type: (replyMessage.content as AttachmentContent).mimeType,
              })
            )}
            alt={(replyMessage.content as AttachmentContent).filename}
            style={{
              maxHeight: '75px',
              border: '0.5px solid var(--justweb3-border-unfocused)',
              borderRadius: '5px',
              margin: ' auto',
            }}
          />
        ) : typeLookup[replyAttachmentExtension] === 'video' ? (
          <VideoPlayerPreview
            disabled
            url={URL.createObjectURL(
              new Blob([(replyMessage.content as AttachmentContent).data], {
                type: (replyMessage.content as AttachmentContent).mimeType,
              })
            )}
            fileName={(replyMessage.content as AttachmentContent).filename}
            style={{ width: '150px', margin: '0 auto' }}
          />
        ) : (
          <Flex direction="row" align="center" justify="center" gap="4px">
            <DocumentIcon width="24" height="24" />
            <P
              style={{
                fontWeight: 600,
                fontSize: '14px',
                textDecoration: 'underline',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '180px',
                color: 'var(--justweb3-primary-color)',
              }}
            >
              {(replyMessage.content as AttachmentContent).filename}
            </P>
          </Flex>
        )}
      </Flex>
      <CloseIcon
        width="24"
        height="24"
        style={{ cursor: 'pointer' }}
        onClick={onCancelReply}
      />
    </Flex>
  );
};
