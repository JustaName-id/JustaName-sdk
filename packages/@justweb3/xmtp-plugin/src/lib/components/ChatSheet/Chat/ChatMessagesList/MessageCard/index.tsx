import { useMountedAccount, usePrimaryName } from '@justaname.id/react';
import {
  DocumentIcon,
  DownloadIcon,
  Flex,
  P,
  ReactionIcon,
  ReplyIcon,
} from '@justweb3/ui';
import { CachedConversation, DecodedMessage } from '@xmtp/react-sdk';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSendReactionMessage } from '../../../../../hooks';
import { typeLookup } from '../../../../../utils/attachments';
import { calculateFileSize } from '../../../../../utils/calculateFileSize';
import { findEmojiByName } from '../../../../../utils/emojis';
import { MessageWithReaction } from '../../../../../utils/filterReactionsMessages';
import { formatAddress } from '../../../../../utils/formatAddress';
import { formatMessageSentTime } from '../../../../../utils/messageTimeFormat';
import VoiceNotePreview from '../../VoiceNotePreview';
import { VideoPlayerPreview } from '../../VideoPlayerPreview';

interface MessageCardProps {
  message: MessageWithReaction;
  conversation: CachedConversation;
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
  const { address } = useMountedAccount();
  const [hovered, setHovered] = useState<boolean>(false);
  const [repliedMessage, setRepliedMessage] =
    React.useState<DecodedMessage | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const { mutateAsync: sendReaction } = useSendReactionMessage(conversation);

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
    if (!isText && message.content.mimeType)
      return message.content.mimeType.split('/')?.[1] || '';
  }, [isText, message.content.mimeType]);

  const isImage = message.content && message.content.data;
  const isReply =
    message.content && message.contentType === 'xmtp.org/reply:1.0';
  const isReceiver = message.senderAddress === peerAddress;
  const isVoice = message.content.mimeType === 'audio/wav';

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
    return repliedMessage.content.mimeType === 'audio/wav';
  }, [repliedMessage]);

  const isReplyText = useMemo(() => {
    if (!repliedMessage) return false;
    return typeof repliedMessage.content === 'string';
  }, [repliedMessage]);

  const isReplyReply = useMemo(() => {
    if (!repliedMessage) return false;
    return !!repliedMessage.content.reference;
  }, [repliedMessage]);

  const replyAttachmentExtention = useMemo(() => {
    if (!isReplyText && !!repliedMessage && !isReplyReply)
      return repliedMessage.content.mimeType.split('/')?.[1] || '';
  }, [isReplyReply, isReplyText, repliedMessage]);

  useEffect(() => {
    if (!isReply || !!repliedMessage) return;
    const repliedMsg = getMessageDataById(message.content.reference);
    setRepliedMessage(repliedMsg);
  }, [isReply, message.content.reference, repliedMessage]);

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
            senderAddress: message.senderAddress,
            content:
              typeLookup[attachmentExtention] === 'image' ||
                typeLookup[attachmentExtention] === 'video'
                ? {
                  data: message.content.data,
                  mimeType: message.content.mimeType,
                  filename: message.content.filename,
                  url: URL.createObjectURL(
                    new Blob([message.content.data], {
                      type: message.content.mimeType,
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
                        {repliedMessage?.senderAddress === address
                          ? 'YOU'
                          : primaryName ??
                          formatAddress(repliedMessage?.senderAddress ?? '')}
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
                          {isReplyReply
                            ? repliedMessage.content.content
                            : repliedMessage.content}
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
                          src={repliedMessage.content.url}
                          alt={repliedMessage.content.filename}
                          style={{
                            maxWidth: '100px',
                            border: '0.5px solid #E0E0E0',
                            borderRadius: '5px',
                          }}
                        />
                      ) : typeLookup[replyAttachmentExtention] === 'video' ? (
                        <VideoPlayerPreview
                          disabled
                          url={repliedMessage.content.url}
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
                            {repliedMessage.content.filename}
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
                      {message.content.content}
                    </P>
                  </div>
                </Flex>
              </Flex>
            ) : isText ? (
              <Flex direction="row" align="center" gap="4px">
                <MeasureAndHyphenateText
                  text={message.content}
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
                            new Blob([message.content.data], {
                              type: message.content.mimeType,
                            })
                          )}
                          alt={message.content.filename}
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
                            new Blob([message.content.data], {
                              type: message.content.mimeType,
                            })
                          )}
                          download={message.content.filename}
                        >
                          <DownloadIcon width="29" height="29" />
                        </a>
                      </div>
                    ) : typeLookup[attachmentExtention] === 'video' ? (
                      <VideoPlayerPreview
                        fileName={message.content.filename}
                        url={URL.createObjectURL(
                          new Blob([message.content.data], {
                            type: message.content.mimeType,
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
                            {message.content.filename}
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
                              message.content.data?.byteLength ?? 0
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
                  if (message.reactionMessage.senderAddress !== address) return;
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
                {findEmojiByName(message.reactionMessage.content.content)}
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

          {message.senderAddress !== address && (
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
        {formatMessageSentTime(message.sentAt)}
      </P>
    </Flex>
  );
};

export default MessageCard;
