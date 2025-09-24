import { usePrimaryName } from '@justaname.id/react';
import {
  DocumentIcon,
  DownloadIcon,
  Flex,
  P,
  ReactionIcon,
  ReplyIcon,
} from '@justweb3/ui';
import { Conversation, DecodedMessage } from '@xmtp/browser-sdk';
import { ContentTypeReply } from '@xmtp/content-type-reply';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAddressInboxId, useSendReactionMessage } from '../../../../../hooks';
import { useXMTPContext } from '../../../../../hooks/useXMTPContext';
import { typeLookup } from '../../../../../utils/attachments';
import { calculateFileSize } from '../../../../../utils/calculateFileSize';
import { findEmojiByName } from '../../../../../utils/emojis';
import { MessageWithReaction } from '../../../../../utils/filterReactionsMessages';
import { formatAddress } from '../../../../../utils/formatAddress';
import { formatMessageSentTime } from '../../../../../utils/messageTimeFormat';
import { VideoPlayerPreview } from '../../VideoPlayerPreview';
import VoiceNotePreview from '../../VoiceNotePreview';
import {
  AttachmentContent,
  ReactionContent,
  ReplyContent,
} from '../../../../../types/messageContentTypes';

interface MessageCardProps {
  message: MessageWithReaction;
  conversation: Conversation;
  peerAddress: string;
  // onReply: (message: DecodedMessage) => void;
  // onReaction: (message: DecodedMessage) => void;
  onReply: (message: MessageWithReaction) => void;
  onReaction: (message: MessageWithReaction) => void;
}

const MeasureAndHyphenateText: React.FC<{
  text: string;
  maxWidth: number;
  isReceiver: boolean;
}> = ({ text, maxWidth, isReceiver }) => {
  const [processedText, setProcessedText] = useState('');

  useEffect(() => {
    // Function to measure text width
    const measureText = (text = '', font = '12px Inter') => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return 0;
      context.font = font;
      return context.measureText(text).width;
    };

    // Function to insert hyphens
    const insertHyphens = (text: string) => {
      const words = text.split(' ');
      let currentLine = '';
      let finalText = '';

      words.forEach((word) => {
        const testLine = currentLine + word + ' ';
        const testLineWidth = measureText(testLine);

        if (testLineWidth > maxWidth) {
          // If the word itself exceeds the width, handle hyphenation
          if (measureText(word) > maxWidth) {
            let remainingWord = word;
            while (measureText(remainingWord) > maxWidth) {
              for (let i = remainingWord.length; i > 0; i--) {
                const part = remainingWord.substring(0, i);
                if (measureText(currentLine + part + '-') <= maxWidth) {
                  finalText += currentLine + part + '-\n';
                  remainingWord = remainingWord.substring(i);
                  currentLine = '';
                  break;
                }
              }
            }
            currentLine = remainingWord + ' ';
          } else {
            // Move the current line to finalText and start a new line
            finalText += currentLine + '\n';
            currentLine = word + ' ';
          }
        } else {
          currentLine = testLine;
        }
      });

      finalText += currentLine.trim();
      return finalText;
    };

    // Process the text
    const processed = insertHyphens(text);
    setProcessedText(processed);
  }, [text, maxWidth]);

  return (
    <pre
      style={{
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        margin: 0,
        paddingLeft: '2px',
        fontFamily: 'var(--justweb3-font-family)',
        color: isReceiver
          ? 'var(--justweb3-foreground-color-2)'
          : 'var(--justweb3-foreground-color-4)',
      }}
    >
      {processedText}
    </pre>
  );
};

export const MessageCard: React.FC<MessageCardProps> = ({
  message,
  peerAddress,
  onReply,
  conversation,
  onReaction,
}) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [repliedMessage, setRepliedMessage] =
    React.useState<DecodedMessage | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const { mutateAsync: sendReaction } = useSendReactionMessage(conversation);
  const { inboxId } = useAddressInboxId(peerAddress);
  const { client } = useXMTPContext();

  const { primaryName } = usePrimaryName({
    address: peerAddress as `0x${string}`,
  });

  const isText = useMemo(() => {
    return typeof message.content === 'string';
  }, [message.content]);

  useEffect(() => {
    function handleMouseEnter() {
      setHovered(true);
    }
    function handleMouseLeave() {
      setHovered(false);
    }
    const divElement = divRef.current;
    if (divElement) {
      divElement.addEventListener('mouseenter', handleMouseEnter);
      divElement.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (divElement) {
        divElement.removeEventListener('mouseenter', handleMouseEnter);
        divElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const attachmentExtention = useMemo(() => {
    if (typeof message.content === 'object' && message.content !== null && 'mimeType' in message.content) {
      const content = message.content as Partial<AttachmentContent>;
      return content.mimeType?.split('/')?.[1] || '';
    }
    return '';
  }, [message.content]);

  const isImage = useMemo(() => {
    return typeof message.content === 'object' && message.content !== null && 'data' in message.content;
  }, [message.content]);

  const isReply = useMemo(() => {
    return message.contentType.sameAs(ContentTypeReply);
  }, [message.contentType])

  const isReceiver = message.senderInboxId === inboxId;

  const isVoice = useMemo(() => {
    if (typeof message.content === 'object' && message.content !== null && 'mimeType' in message.content) {
      const content = message.content as Partial<AttachmentContent>;
      return content.mimeType === 'audio/wav';
    }
    return false;
  }, [message.content]);

  const getMessageDataById = (messageId: string) => {
    const messageElement = document.getElementById(messageId);
    if (!messageElement) {
      return null;
    }

    const messageDataString = messageElement.getAttribute('data-message');
    if (!messageDataString) {
      return null;
    }
    try {
      const messageData = JSON.parse(messageDataString);
      return messageData;
    } catch (e) {
      console.error('Failed to parse message data:', e);
      return null;
    }
  };

  const handleEmojiSelect = (emoji: string, action: 'added' | 'removed') => {
    sendReaction({
      action: action,
      content: emoji,
      referenceId: message.id,
    });
  };

  const navigateToRepliedMessage = () => {
    if (!repliedMessage) return;
    const element = document.getElementById(repliedMessage.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const isReplyVoice = useMemo(() => {
    if (!repliedMessage) return false;
    if (typeof repliedMessage.content === 'object' && repliedMessage.content !== null && 'mimeType' in repliedMessage.content) {
      return (repliedMessage.content as Partial<AttachmentContent>).mimeType === 'audio/wav';
    }
    return false;
  }, [repliedMessage]);

  const isReplyText = useMemo(() => {
    if (!repliedMessage) return false;
    return typeof repliedMessage.content === 'string';
  }, [repliedMessage]);

  const isReplyReply = useMemo(() => {
    if (!repliedMessage) return false;
    return typeof repliedMessage.content === 'object' && repliedMessage.content !== null && 'reference' in repliedMessage.content;
  }, [repliedMessage]);

  const replyAttachmentExtention = useMemo(() => {
    if (!repliedMessage) return '';
    if (typeof repliedMessage.content === 'object' && repliedMessage.content !== null && 'mimeType' in repliedMessage.content && !isReplyReply) {
      const content = repliedMessage.content as Partial<AttachmentContent>;
      return content.mimeType?.split('/')?.[1] || '';
    }
    return '';
  }, [isReplyReply, repliedMessage]);

  useEffect(() => {
    if (!isReply || !!repliedMessage) return;
    if (typeof message.content === 'object' && message.content !== null && 'reference' in message.content) {
      const content = message.content as ReplyContent;
      const repliedMsg = getMessageDataById(content.reference);
      setRepliedMessage(repliedMsg);
    }
  }, [isReply, message.content, repliedMessage]);

  return (
    <Flex
      direction="column"
      gap="5px"
      style={{
        width: 'fit-content',
        padding: '5px 0px',
        alignItems: isReceiver ? 'flex-start' : 'flex-end',
        marginLeft: !isReceiver ? 'auto' : '0px',
        paddingLeft: isReceiver ? '0px' : 'auto',
      }}
      ref={divRef}
    >
      <Flex direction={isReceiver ? 'row' : 'row-reverse'} gap="4px">
        <Flex
          direction="column"
          style={{
            position: 'relative',
            minWidth: isReply ? '150px' : '50px',
            overflowWrap: 'break-word',
            maxWidth: !isImage ? '240px' : 'none',
            fontSize: '14px',
            padding: isReply ? '4px' : '5px',
            borderRadius: '14px',
            backgroundColor: isReceiver
              ? 'var(--justweb3-foreground-color-4)'
              : 'var(--justweb3-primary-color)',
            borderBottomLeftRadius: isReceiver ? '0px' : '14px',
            borderBottomRightRadius: !isReceiver ? '0px' : '14px',
          }}
          gap="5px"
          id={message.id}
          data-message={JSON.stringify({
            id: message.id,
            senderInboxId: message.senderInboxId,
            content:
              typeof message.content === 'object' && message.content !== null && 'mimeType' in message.content && (typeLookup[(message.content as AttachmentContent).mimeType.split('/')?.[1]] === 'image' || typeLookup[(message.content as AttachmentContent).mimeType.split('/')?.[1]] === 'video')
                ? {
                  data: (message.content as AttachmentContent).data,
                  mimeType: (message.content as AttachmentContent).mimeType,
                  filename: (message.content as AttachmentContent).filename,
                  url: URL.createObjectURL(
                    new Blob([(message.content as AttachmentContent).data], {
                      type: (message.content as AttachmentContent).mimeType,
                    })
                  ),
                }
                : message.content,
            contentType: message.contentType,
          })}
        >
          <>
            {repliedMessage && isReply ? (
              <Flex direction="row" gap="4px" align="flex-end">
                <Flex
                  direction="column"
                  gap="4px"
                  style={{
                    flex: 1,
                    padding: '4px',
                  }}
                >
                  <Flex
                    direction="column"
                    style={{
                      cursor: 'pointer',
                      overflowWrap: 'break-word',
                      maxWidth: !isImage ? '220px' : 'none',
                      fontSize: '14px',
                      lineHeight: '14px',
                      padding: '5px',
                      backgroundColor: isReceiver
                        ? 'var(--justweb3-primary-color)'
                        : 'var(--justweb3-foreground-color-4)',
                      borderRadius: '10px',
                      borderBottomLeftRadius: isReceiver ? '0px' : '10px',
                      borderBottomRightRadius: isReceiver ? '10px' : '0px',
                    }}
                    onClick={navigateToRepliedMessage}
                  >
                    <Flex direction="column" gap="3px">
                      <P
                        style={{
                          fontSize: '10px',
                          fontWeight: '700',
                          lineHeight: '100%',
                          color: isReceiver
                            ? 'var(--justweb3-foreground-color-4)'
                            : 'var(--justweb3-foreground-color-2)',
                        }}
                      >
                        {repliedMessage?.senderInboxId === client?.inboxId
                          ? 'YOU'
                          : primaryName ??
                          formatAddress(peerAddress ?? '')}
                      </P>

                      {isReplyText || isReplyReply ? (
                        <P
                          style={{
                            fontSize: '10px',
                            fontWeight: '400',
                            lineHeight: '150%',
                            maxWidth: '90%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: isReceiver
                              ? 'var(--justweb3-foreground-color-4)'
                              : 'var(--justweb3-foreground-color-2)',
                          }}
                        >
                          {
                            isReplyReply
                              ? (() => {
                                const nestedContent = (repliedMessage.content as ReplyContent).content;
                                return typeof nestedContent === 'string'
                                  ? nestedContent
                                  : (nestedContent as AttachmentContent).filename;
                              })()
                              : typeof repliedMessage.content === 'string'
                                ? repliedMessage.content
                                : ''
                          }
                        </P>
                      ) : isReplyVoice ? (
                        <VoiceNotePreview
                          isReceiver={!isReceiver}
                          disabled
                          message={repliedMessage}
                          style={{
                            padding: '0px',
                            margin: '0px',
                            scale: '80%',
                            flexShrink: 1,
                            transform: 'translateX(-6px)',
                          }}
                        />
                      ) : typeLookup[replyAttachmentExtention] === 'image' ? (
                        <img
                          src={(repliedMessage.content as AttachmentContent).url}
                          alt={(repliedMessage.content as AttachmentContent).filename}
                          style={{
                            maxWidth: '100px',
                            border: '0.5px solid #E0E0E0',
                            borderRadius: '5px',
                          }}
                        />
                      ) : typeLookup[replyAttachmentExtention] === 'video' ? (
                        <VideoPlayerPreview
                          disabled
                          url={(repliedMessage.content as AttachmentContent).url}
                          fileName={(repliedMessage.content as AttachmentContent).filename}
                          style={{
                            width: '120px',
                          }}
                        />
                      ) : (
                        <Flex direction="row" align="center" gap="4px">
                          <DocumentIcon
                            width="22"
                            height="22"
                            style={{
                              minWidth: '25px',
                            }}
                          />
                          <P
                            style={{
                              fontSize: '14px',
                              color: 'var(--justweb3-primary-color)',
                              textDecoration: 'underline',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              maxWidth: '150px',
                            }}
                          >
                            {(repliedMessage.content as AttachmentContent).filename}
                          </P>
                        </Flex>
                      )}
                    </Flex>
                  </Flex>
                  <div
                    style={{
                      padding: '6px 0px',
                    }}
                  >
                    <P
                      style={{
                        fontSize: '12px',
                        width: 'fit-content',
                        lineHeight: 1,
                        letterSpacing: 0.6,
                        color: isReceiver
                          ? 'var(--justweb3-foreground-color-2)'
                          : 'var(--justweb3-foreground-color-4)',
                        wordBreak: 'break-all',
                      }}
                    >
                      {
                        typeof message.content === 'object' && message.content !== null && 'content' in message.content
                          ? (() => {
                            const nestedContent = (message.content as ReplyContent).content;
                            return typeof nestedContent === 'string'
                              ? nestedContent
                              : (nestedContent as AttachmentContent).filename;
                          })()
                          : ''
                      }
                    </P>
                  </div>
                </Flex>
              </Flex>
            ) : isText ? (
              <Flex direction="row" align="center" gap="4px">
                <MeasureAndHyphenateText
                  text={typeof message.content === 'string' ? message.content : ''} // Ensure text is string
                  maxWidth={170}
                  isReceiver={isReceiver}
                />
              </Flex>
            ) : (
              <Flex direction="row" align="baseline" gap="4px">
                {isVoice ? (
                  <VoiceNotePreview isReceiver={isReceiver} message={message} />
                ) : (
                  <Flex direction="row" align="center" gap="10px">
                    {typeLookup[attachmentExtention] === 'image' ? (
                      <div
                        style={{
                          position: 'relative',
                        }}
                      >
                        <img
                          src={URL.createObjectURL(
                            new Blob([(message.content as AttachmentContent).data], {
                              type: (message.content as AttachmentContent).mimeType,
                            })
                          )}
                          alt={(message.content as AttachmentContent).filename}
                          style={{
                            maxWidth: '200px',
                            border: '0.5px solid #E0E0E0',
                            borderRadius: '5px',
                          }}
                        />
                        <a
                          style={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%) translateY(-50%)',
                            top: '50%',
                          }}
                          href={URL.createObjectURL(
                            new Blob([(message.content as AttachmentContent).data], {
                              type: (message.content as AttachmentContent).mimeType,
                            })
                          )}
                          download={(message.content as AttachmentContent).filename}
                        >
                          <DownloadIcon width="29" height="29" />
                        </a>
                      </div>
                    ) : typeLookup[attachmentExtention] === 'video' ? (
                      <VideoPlayerPreview
                        fileName={(message.content as AttachmentContent).filename}
                        url={URL.createObjectURL(
                          new Blob([(message.content as AttachmentContent).data], {
                            type: (message.content as AttachmentContent).mimeType,
                          })
                        )}
                        style={{
                          maxWidth: '220px',
                        }}
                      />
                    ) : (
                      <Flex direction="row" align="center" gap="10px">
                        <DocumentIcon
                          fill={
                            !isReceiver
                              ? 'var(--justweb3-foreground-color-4)'
                              : 'var(--justweb3-primary-color)'
                          }
                          width="30"
                          height="30"
                        />
                        <Flex direction="column">
                          <P
                            style={{
                              color: !isReceiver
                                ? 'var(--justweb3-foreground-color-4)'
                                : 'var(--justweb3-primary-color)',
                              fontWeight: '700',
                              fontSize: '10px',
                              maxWidth: '180px',
                            }}
                          >
                            {(message.content as AttachmentContent).filename}
                          </P>
                          <P
                            style={{
                              fontSize: '9px',
                              fontWeight: '700',
                              textTransform: 'uppercase',
                              color: !isReceiver
                                ? 'var(--justweb3-foreground-color-4)'
                                : 'var(--justweb3-foreground-color-2)',
                              opacity: '0.7',
                            }}
                          >
                            {calculateFileSize(
                              (message.content as AttachmentContent).data?.byteLength ?? 0
                            )}
                          </P>
                        </Flex>
                      </Flex>
                    )}
                  </Flex>
                )}
              </Flex>
            )}
            {message.reactionMessage && (
              <P
                onClick={() => {
                  if (!message.reactionMessage) return;
                  if (message.reactionMessage.senderInboxId !== client?.inboxId) return;
                  handleEmojiSelect('', 'removed');
                }}
                style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  bottom: '-0.5rem',
                  fontSize: '20px',
                  right: isReceiver ? '-12px' : 'auto',
                  left: isReceiver ? 'auto' : '-12px',
                }}
              >
                {findEmojiByName((message.reactionMessage?.content as ReactionContent)?.content)}
              </P>
            )}
          </>
        </Flex>

        <Flex
          direction={isReceiver ? 'row' : 'row-reverse'}
          align="center"
          gap="4px"
          style={{
            padding: '4px 0px',
            width: hovered ? 'auto' : '0px',
          }}
        >
          <ReplyIcon
            width="22"
            height="22"
            style={{
              cursor: 'pointer',
              width: 20,
              height: 20,
              transform: isReceiver ? 'scaleX(-1)' : 'scaleX(1)',
            }}
            onClick={() => onReply(message)}
          />

          {message.senderInboxId !== client?.inboxId && (
            <ReactionIcon
              width="22"
              height="22"
              style={{
                cursor: 'pointer',
              }}
              onClick={() => {
                onReaction(message);
              }}
            />
          )}
        </Flex>
      </Flex>
      <P
        style={{
          fontSize: '9px',
          fontWeight: '800',
          textTransform: 'uppercase',
          // color:'var(--justweb3-foreground-color-2)',
          opacity: '0.4',
          textAlign: !isReceiver ? 'start' : 'end',
        }}
      >
        {formatMessageSentTime(message.sentAtNs)}
      </P>
    </Flex>
  );
};

export default MessageCard;
