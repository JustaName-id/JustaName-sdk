import {
  useEnsAvatar,
  useMountedAccount,
  usePrimaryName,
  useRecords,
} from '@justaname.id/react';
import {
  ArrowIcon,
  Avatar,
  BlockedAccountIcon,
  Button,
  Flex,
  LoadingSpinner,
  P,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TuneIcon,
} from '@justweb3/ui';
import {
  CachedConversation,
  ContentTypeMetadata,
  useCanMessage,
  useConsent,
  useMessages,
  useStreamMessages
} from '@xmtp/react-sdk';
import React, { useEffect, useMemo } from 'react';
import { useSendReactionMessage } from '../../hooks';
import { typeLookup } from '../../utils/attachments';
import {
  filterReactionsMessages,
  MessageWithReaction,
} from '../../utils/filterReactionsMessages';
import { formatAddress } from '../../utils/formatAddress';
import { groupMessagesByDate } from '../../utils/groupMessageByDate';
import EmojiSelector from '../EmojiSelector';
import MessageCard from '../MessageCard';
import { MessageSkeletonCard } from '../MessageSkeletonCard';
import MessageTextField from '../MessageTextField';

export interface ChatProps {
  conversation: CachedConversation<ContentTypeMetadata>;
  onBack: () => void;
}

export const Chat: React.FC<ChatProps> = ({ conversation, onBack }) => {
  const [replyMessage, setReplyMessage] =
    React.useState<MessageWithReaction | null>(null);
  const [reactionMessage, setReactionMessage] =
    React.useState<MessageWithReaction | null>(null);
  const [isRequest, setIsRequest] = React.useState<boolean>(false);
  const [isRequestChangeLoading, setIsRequestChangeLoading] =
    React.useState<boolean>(false);
  const { entries, allow, refreshConsentList, deny } = useConsent();
  const { mutateAsync: sendReaction } = useSendReactionMessage(conversation);

  const { primaryName } = usePrimaryName({
    address: conversation.peerAddress as `0x${string}`,
  });
  const { records } = useRecords({
    ens: primaryName,
  });
  const { sanitizeEnsImage } = useEnsAvatar();

  const { address } = useMountedAccount();

  const [canMessage, setCanMessage] = React.useState<boolean>(true);

  const { messages, isLoading } = useMessages(conversation);

  // Queries

  const blockAddress = async (peerAddress: string) => {
    setIsRequestChangeLoading(true);
    await refreshConsentList();
    await deny([peerAddress]);
    await refreshConsentList();
    setIsRequestChangeLoading(false);
    onBack();
  };

  const { canMessage: canMessageFn, isLoading: isCanMessageLoading } =
    useCanMessage();

  useEffect(() => {
    if (isCanMessageLoading) return;
    canMessageFn(conversation.peerAddress).then((result) => {
      setCanMessage(result);
    });
  }, [isCanMessageLoading, conversation, canMessageFn]);

  useStreamMessages(conversation);

  // Memo
  const filteredMessages = useMemo(() => {
    const messagesWithoutRead = messages.filter(
      (message) => !(message.contentType === 'xmtp.org/readReceipt:1.0')
    );
    const res = filterReactionsMessages(messagesWithoutRead);
    return res;
  }, [messages]);

  const groupedMessages = useMemo(() => {
    return groupMessagesByDate(filteredMessages ?? []);
  }, [filteredMessages]);

  useEffect(() => {
    const convoConsentState = entries[conversation.peerAddress]?.permissionType;
    if (convoConsentState === 'unknown' || convoConsentState === undefined) {
      setIsRequest(true);
    } else {
      setIsRequest(false);
    }
  }, [entries, conversation.peerAddress]);

  const isMessagesSenderOnly = useMemo(() => {
    return filteredMessages.every(
      (message) => message.senderAddress === address
    );
  }, [filteredMessages, address]);

  const handleAllowAddress = async () => {
    setIsRequestChangeLoading(true);
    await refreshConsentList();
    await allow([conversation.peerAddress]);
    void refreshConsentList();
    // TODO: check if this is needed
    // onRequestAllowed();
    setIsRequestChangeLoading(false);
  };

  const handleEmojiSelect = (emoji: string) => {
    if (!reactionMessage) return;
    sendReaction({
      action: 'added',
      content: emoji,
      referenceId: reactionMessage.id,
    });
  };

  useEffect(() => {
    if (messages.length == 0) return;
    setTimeout(() => {
      const lastMessageId = messages[messages.length - 1]?.id;
      const element = document.getElementById(lastMessageId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);

    // await checkMessageIfRead();
  }, [messages, conversation]);

  return (
    <Flex
      direction={'column'}
      gap={'0px'}
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <div
        style={{
          zIndex: 89,
          position: 'absolute',
          top: '4px',
          left: '4px',
          right: '4px',
          bottom: '0px',
          width: '100%',
          minWidth: '412px',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',

          backdropFilter: reactionMessage ? 'blur(5px)' : 'none',
          pointerEvents: reactionMessage ? 'auto' : 'none',
        }}
        onClick={() => {
          setReactionMessage(null);
          const replica = document.getElementById(
            `${reactionMessage?.id}-replica`
          );
          replica?.remove();
        }}
      ></div>
      <Flex
        direction="row"
        align="center"
        gap="10px"
        justify="space-between"
        style={{
          padding: '10px 1.5rem',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Flex direction="row" align="center" gap="8px">
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
          <Flex direction="row" align="center" gap="10px">
            <Avatar
              src={
                primaryName
                  ? sanitizeEnsImage({
                    name: primaryName,
                    chainId: 1,
                    image: records?.sanitizedRecords?.avatar,
                  })
                  : undefined
              }
              style={{
                width: 30,
                height: 30,
              }}
            />
            <Flex
              direction="column"
              justify="center"
              gap="4px"
              style={{
                flex: 1,
              }}
            >
              <P
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {primaryName
                  ? primaryName
                  : formatAddress(conversation.peerAddress)}
              </P>
              {/* {(!!primaryName) && (
                <P style={{
                  fontSize: 10,
                  fontWeight: 900,
                  lineHeight: 1
                }} >{formatAddress(conversation.peerAddress)}</P>
              )} */}
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="row" align="center" gap="15px">
          <Popover>
            <PopoverTrigger>
              <TuneIcon
                width={24}
                height={24}
                style={{
                  cursor: 'pointer',
                  width: 'fit-content',
                }}
              />
            </PopoverTrigger>
            <PopoverContent
              style={{
                padding: '0px',
                width: '100%',
                borderRadius: '10px',
                // zIndex: 110,
                backgroundColor: 'white',
              }}
            >
              <Flex
                direction="column"
                style={{
                  padding: '8px',
                  gap: '10px',
                  borderRadius: '10px',
                }}
              >
                <Flex
                  direction="row"
                  align="center"
                  style={{
                    padding: '8px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    gap: '10px',
                  }}
                  onClick={() => blockAddress(conversation.peerAddress)}
                >
                  <P
                    style={{
                      color: 'var(--justweb3-primary-color)',
                      fontWeight: 500,
                    }}
                  >
                    Block
                  </P>
                  <BlockedAccountIcon
                    width="22"
                    height="22"
                    style={{
                      cursor: 'pointer',
                    }}
                  />
                </Flex>
              </Flex>
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>
      <Flex
        direction={'column'}
        gap={'15px'}
        style={{
          height: '100%',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        }}
      >
        {isCanMessageLoading || isLoading ? (
          <Flex
            direction="column"
            gap="5px"
            style={{
              flex: 1,
              padding: '10px 10px',
              minHeight: 'calc(100vh - 200px)',
              maxHeight: 'calc(100vh - 200px)',
            }}
          >
            {[...Array(8)].map((_, index) => (
              <MessageSkeletonCard
                key={`message-skeleton-${index}`}
                isReceiver={index % 2 === 0}
              />
            ))}
          </Flex>
        ) : (
          <Flex
            style={{
              flex: 1,
              minHeight: replyMessage
                ? typeof replyMessage.content === 'string' || typeof replyMessage.content.content === "string"
                  ? 'calc(100vh - 245px)'
                  : replyMessage.content?.mimeType === "audio/wav"
                    ? 'calc(100vh - 260px)'
                    : typeLookup[replyMessage.content?.mimeType.split("/")?.[1]] === "video" || typeLookup[replyMessage.content?.mimeType.split("/")?.[1]] === "image"
                      ? 'calc(100vh - 315px)'
                      : 'calc(100vh - 245px)'
                : isMessagesSenderOnly
                  ? 'calc(100vh - 248px)'
                  : 'calc(100vh - 200px)',
              maxHeight: replyMessage
                ? typeof replyMessage.content === 'string' || typeof replyMessage.content.content === "string"
                  ? 'calc(100vh - 245px)'
                  : replyMessage.content?.mimeType === "audio/wav"
                    ? 'calc(100vh - 260px)'
                    : typeLookup[replyMessage.content?.mimeType.split("/")?.[1]] === "video" || typeLookup[replyMessage.content?.mimeType.split("/")?.[1]] === "image"
                      ? 'calc(100vh - 315px)'
                      : 'calc(100vh - 245px)'
                : isMessagesSenderOnly
                  ? 'calc(100vh - 248px)'
                  : 'calc(100vh - 200px)',
            }}
          >
            {canMessage ? (
              <Flex
                direction="column"
                className={'justweb3scrollbar'}
                gap="10px"
                style={{
                  padding: '10px 0px',
                  paddingTop: '0px',
                  overflowY: 'scroll',
                  height: '100%',
                  width: '100%',
                  flexShrink: 1,
                }}
              >
                {groupedMessages &&
                  Object.keys(groupedMessages).map((date, index) => (
                    <Flex direction="column" gap="10px" key={index}>
                      <Flex direction="row" align='center' gap="20px" style={{
                        marginBottom: '8px',
                      }}>
                        <div style={{
                          width: '100%',
                          height: 1,
                          backgroundColor: "var(--justweb3-foreground-color-2)",
                          opacity: 0.35,
                        }} />
                        <P
                          style={{
                            textAlign: 'center',
                            padding: '5px 0px',
                            fontSize: '9px',
                            fontWeight: 900,
                            opacity: 0.35,
                            minWidth: 'fit-content',
                          }}
                        >
                          {date}
                        </P>
                        <div style={{
                          width: '100%',
                          height: 1,
                          backgroundColor: "var(--justweb3-foreground-color-2)",
                          opacity: 0.35,
                        }} />
                      </Flex>
                      {groupedMessages[date].map((message) => (
                        <MessageCard
                          conversation={conversation}
                          onReply={(msg) => setReplyMessage(msg)}
                          message={message}
                          peerAddress={conversation.peerAddress}
                          key={`message-${message.id}`}
                          onReaction={(message) => {
                            setReactionMessage(message);

                            const element = document.getElementById(
                              message.id.toString()
                            );
                            if (!element) return;
                            const replica = element?.cloneNode(
                              true
                            ) as HTMLElement;
                            replica.id = `${message.id}-replica`;
                            replica.style.position = 'absolute';
                            replica.style.bottom = '310px';
                            replica.style.minHeight = '20px';
                            replica.style.left = '4.2vw';
                            replica.style.zIndex = '90';
                            element?.parentElement?.appendChild(replica);
                            replica.classList.add('replica-animate');
                          }}
                        />
                      ))}
                    </Flex>
                  ))}
                {reactionMessage && (
                  <div
                    style={{
                      zIndex: 99,
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      bottom: `30px`,
                    }}
                  >
                    <EmojiSelector
                      onEmojiSelect={(emoji) => {
                        handleEmojiSelect(emoji);
                        setReactionMessage(null);
                        const replica = document.getElementById(
                          `${reactionMessage?.id}-replica`
                        );
                        replica?.remove();
                      }}
                    />
                  </div>
                )}
              </Flex>
            ) : (
              <div>
                <P>Cannot message {conversation.peerAddress}</P>
              </div>
            )}
          </Flex>
        )}

        {isRequest ? (
          isRequestChangeLoading ? (
            <Flex
              direction="row"
              align="center"
              justify="center"
              style={{ height: '50px' }}
            >
              <LoadingSpinner color={'var(--justweb3-primary-color)'} />
            </Flex>
          ) : (
            <Flex direction={'row'} gap={'15px'}>
              <Button
                variant={'secondary'}
                style={{
                  width: '100%',
                }}
                onClick={() => {
                  blockAddress(conversation.peerAddress);
                }}
              >
                IGNORE
              </Button>
              <Button
                variant={'primary'}
                style={{
                  width: '100%',
                }}
                onClick={handleAllowAddress}
              >
                ACCEPT
              </Button>
            </Flex>
          )
        ) : (
          <Flex
            direction={'column'}
            gap={'2.5px'}
            style={{
              flexGrow: 1,
            }}
          >
            {isMessagesSenderOnly && (
              <Flex
                direction="column"
                gap="10px"
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--justweb3-foreground-color-4)'
                }}
              >
                <P
                  style={{
                    fontSize: '14px',
                    fontWeight: 900,
                    lineHeight: '100%',
                    color: 'black'
                  }}
                >
                  Message in user’s Requests
                </P>
                <P style={{
                  fontSize: '12px'
                }}>This user has not accepted your message request yet</P>
              </Flex>
            )}
            <MessageTextField
              onCancelReply={() => setReplyMessage(null)}
              conversation={conversation}
              replyMessage={replyMessage}
              peerAddress={conversation.peerAddress}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
