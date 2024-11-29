
import type { Attachment } from '@xmtp/content-type-remote-attachment';
import { CachedConversation, useClient } from '@xmtp/react-sdk';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { MessageWithReaction } from '../../utils/filterReactionsMessages';
import { useMountedAccount } from '@justaname.id/react';
import { useAttachmentChange, useRecordingTimer, useRecordVoice, useSendAttachment, useSendMessages, useSendReplyMessage } from '../../hooks';
import { AttachmentType, typeLookup } from '../../utils/attachments';
import { Button, CloseIcon, Flex, Input, LoadingSpinner, P, AddImageIcon, AddVideoIcon, AddFolderIcon, DocumentIcon, SendIcon, StopIcon, MicIcon } from '@justweb3/ui';
import { formatAddress } from '../../utils/formatAddress';
import VoiceMessageCard from '../VoiceMessageCard';
import { CustomPlayer } from '../CustomPlayer';
import CustomVoicePreview from '../CustomVoicePreview';


interface MessageTextFieldProps {
    newConvo?: boolean;
    disabled?: boolean;
    conversation?: CachedConversation;
    replyMessage?: MessageWithReaction | null;
    onCancelReply?: () => void;
    onNewConvo?: (message: string) => void;
}

const MessageTextField: React.FC<MessageTextFieldProps> = ({
    newConvo,
    disabled,
    replyMessage,
    onCancelReply,
    conversation,
    onNewConvo
}) => {
    const [messageValue, setMessageValue] = React.useState<string>("");
    const [attachment, setAttachment] = React.useState<Attachment | undefined>();
    const [attachmentPreview, setAttachmentPreview] = React.useState<string | undefined>();
    const [isNewMessageLoading, setIsNewMessageLoading] = React.useState<boolean>(false);
    // const [selectingAttachment, setSelectingAttachment] = React.useState<boolean>(false);
    const { client } = useClient();
    const { address } = useMountedAccount();
    const { mutateAsync: sendMessage } = useSendMessages(conversation);
    const { mutateAsync: sendReply } = useSendReplyMessage(conversation);
    const { mutateAsync: sendAttachment } = useSendAttachment(conversation);

    const attachmentExtention = useMemo(() => {
        return attachment?.mimeType.split("/")?.[1] || "";
    }, [attachment]);


    // Attachments
    const [acceptedTypes, setAcceptedTypes]: [
        string | string[] | undefined,
        Dispatch<SetStateAction<string | string[] | undefined>>,
    ] = useState();
    const inputFile = useRef<HTMLInputElement | null>(null);
    const { onAttachmentChange } = useAttachmentChange({
        setAttachment,
        setAttachmentPreview,
        onError: (error) => {
            // showToast("error", error);
        }
    });

    // Recording
    const { recording, startRecording, stopRecording } = useRecordVoice({
        setAttachment,
        setAttachmentPreview,
    })
    const { start, pause, reset, recordingValue } = useRecordingTimer({
        stopRecording,
        status: recording ? "recording" : "idle",
    });

    // Sending text message
    const handleSendMessage = async () => {
        if (messageValue.length === 0) return;
        if (!client) return;
        if (disabled) return;
        if (newConvo) {
            setIsNewMessageLoading(true);
            onNewConvo && onNewConvo(messageValue);
            setIsNewMessageLoading(false);
        } else {
            if (replyMessage) {
                sendReply({
                    message: messageValue,
                    referenceId: replyMessage.id,
                })
                onCancelReply && onCancelReply();
            } else {
                sendMessage(messageValue);
            }
        }
        setMessageValue('');
    }

    // Sending attachment
    const handleSendAttachment = async () => {
        if (!client) return;
        if (!attachment) return;
        if (disabled) return;
        if (newConvo) {
            onNewConvo && onNewConvo(messageValue);
        } else {
            sendAttachment(attachment);
        }
        setMessageValue('');
        setAttachment(undefined);
        setAttachmentPreview(undefined);
        // setSelectingAttachment(false);
    }

    const handleCancelAttachment = () => {
        setAttachment(undefined);
        setAttachmentPreview(undefined);
    }

    const onButtonClick = (contentType: AttachmentType) => {
        if (contentType === "application") {
            setAcceptedTypes("all");
        } else {
            const acceptedFileTypeList = Object.keys(typeLookup).reduce(
                (acc: string[], key: string) => {
                    if (typeLookup[key] === contentType) acc.push(`.${key}`);
                    return acc;
                },
                [],
            );
            setAcceptedTypes([...acceptedFileTypeList]);
        }
    };

    // Reply message
    const isSender = useMemo(() => { return address === replyMessage?.senderAddress }, [replyMessage, address]);
    const isReplyVoice = useMemo(() => {
        return replyMessage?.content.mimeType === "audio/wav";
    }, [replyMessage]);

    const isReplyText = useMemo(() => {
        if (!replyMessage) return false;
        return typeof replyMessage.content === "string"
    }, [replyMessage])

    const isReplyReply = useMemo(() => {
        if (!replyMessage) return false;
        return !!replyMessage.content.reference;
    }, [replyMessage]);

    const replyAttachmentExtention = useMemo(() => {
        if (!isReplyText && !!replyMessage && !isReplyReply)
            return replyMessage.content.mimeType.split("/")?.[1] || "";
    }, [isReplyText, replyMessage, isReplyReply]);

    const navigateToRepliedMessage = () => {
        if (!replyMessage) return;
        const element = document.getElementById(replyMessage.id.toString());
        if (element) {
            element.scrollIntoView({
                block: "end",
                behavior: "smooth"
            });
        }
    }

    useEffect(() => {
        if (acceptedTypes) {
            inputFile?.current?.click();
        }
    }, [acceptedTypes]);

    const isReplyVideoOrImage = useMemo(() => {
        return typeLookup[replyAttachmentExtention] === "image" || typeLookup[replyAttachmentExtention] === "video";
    }, [replyAttachmentExtention]);

    return (
        <Flex direction='column' gap='5px'>
            {!replyMessage}
            {!newConvo && (
                <Flex direction='row' align='center' gap='10px'>
                    <AddImageIcon width="24" height="24" onClick={() => onButtonClick("image")} style={{
                        cursor: 'pointer'
                    }} />
                    <AddVideoIcon width="24" height="24" onClick={() => onButtonClick("video")} style={{
                        cursor: 'pointer'
                    }} />
                    <AddFolderIcon width="24" height="24" onClick={() => onButtonClick("application")} style={{
                        cursor: 'pointer'
                    }} />
                    <input
                        type="file"
                        id="file"
                        ref={inputFile}
                        onChange={onAttachmentChange}
                        aria-label={"File picker"}
                        accept={
                            Array.isArray(acceptedTypes) ? acceptedTypes.join(",") : undefined
                        }
                        hidden
                    />
                </Flex>
            )}
            <div>
                {replyMessage && (
                    <Flex direction='row' align='center' justify='space-between' style={{
                        padding: '8px 12px',
                        height: isReplyText ? "30px" : isReplyVoice ? "60px" : isReplyVideoOrImage ? "60px" : "60px",
                        borderRadius: '5px',
                        // TODO: check background and border color
                        background: 'white',
                        border: '1px solid grey',
                        borderBottom: 0,
                        borderTopLeftRadius: "6px",
                        borderTopRightRadius: "6px",
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 0,
                    }} >
                        <Flex direction='column' align='flex-start' style={{
                            cursor: 'pointer',
                            maxWidth: '90%',
                            flex: 1
                        }}
                            onClick={navigateToRepliedMessage}
                        >
                            <P style={{
                                fontSize: "12px",
                                fontWeight: 900,
                                lineHeight: "100%",
                                textTransform: "uppercase",
                                color: "var(--justweb3-primary-color)"
                            }} >{isSender ? "YOU" : formatAddress(replyMessage.senderAddress)}</P>
                            {(isReplyText || isReplyReply) ? (
                                <P style={{
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    lineHeight: "120%",
                                    maxWidth: "90%",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    color: "black",
                                }} >{isReplyReply ? replyMessage.content.content : replyMessage.content}</P>
                            ) : (
                                isReplyVoice ?
                                    <VoiceMessageCard disabled isReceiver={false} message={replyMessage} style={{
                                        padding: '0px',
                                        transform: 'scale(80%)',
                                        translate: '-x-6'
                                    }} />
                                    :
                                    typeLookup[replyAttachmentExtention] === "image" ?
                                        <img src={URL.createObjectURL(new Blob([replyMessage.content.data], { type: replyMessage.content.mimeType }))} alt={replyMessage.content.filename} style={{
                                            maxWidth: "60px",
                                            // TODO: check border color
                                            border: "0.5px solid var(--justweb3-border-unfocused)",
                                            borderRadius: "5px",
                                            margin: '0 auto'
                                        }} />
                                        :
                                        typeLookup[replyAttachmentExtention] === "video" ?
                                            <CustomPlayer disabled url={URL.createObjectURL(new Blob([replyMessage.content.data], { type: replyMessage.content.mimeType }))} style={{
                                                width: '100px',
                                            }} />
                                            :
                                            <Flex direction='row' align='center' justify='center' gap='4px'>
                                                <DocumentIcon width="24" height="24" />
                                                <P style={{
                                                    fontWeight: 600,
                                                    fontSize: "14px",
                                                    textDecoration: 'underline',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    maxWidth: '180px',
                                                    color: "var(--justweb3-primary-color)"
                                                }}>{replyMessage.content.filename}</P>
                                            </Flex>
                            )}
                        </Flex>
                        <CloseIcon width="24" height="24" style={{
                            cursor: 'pointer',
                        }} onClick={onCancelReply} />
                    </Flex>
                )
                }
                {
                    attachmentPreview ? (
                        <Flex direction="row" gap="10px" align="center" justify='space-between' style={{
                            padding: '10px 15px',
                            borderRadius: '6px',
                            background: 'white',
                            // TODO: check border color
                            border: '1px solid grey'
                        }} >
                            {attachment?.mimeType === "audio/wav" ?
                                <CustomVoicePreview audioUrl={attachmentPreview} onCancel={handleCancelAttachment} />
                                :
                                <Flex direction='column' align='center' gap='10px' style={{
                                    position: 'absolute',
                                    left: '12px',
                                    zIndex: 5,
                                    padding: '10px 0px',
                                    right: '12px',
                                    bottom: '4px',
                                    borderRadius: '10px',
                                    background: 'white',
                                    border: '1px solid var(--justweb3-primary-color)',
                                }} >
                                    {typeLookup[attachmentExtention] === "image" ?
                                        <img
                                            src={attachmentPreview || ""}
                                            alt={attachment?.filename}
                                            style={{
                                                width: '220px',
                                                aspectRatio: '16/9',
                                                border: '1px solid var(--justweb3-primary-color)',
                                                borderRadius: '5px'
                                            }}
                                        />
                                        : typeLookup[attachmentExtention] === "video" ?
                                            <CustomPlayer url={attachmentPreview || ""} style={{
                                                width: '220px',
                                            }} />
                                            :
                                            <Flex direction='row' justify='center' align='center' style={{
                                                padding: '4px 12px',
                                                width: '100px'
                                            }}>
                                                <DocumentIcon width="24" height="24" />
                                                <P style={{
                                                    maxWidth: '180px',
                                                    fontSize: '14px',
                                                    fontWeight: 700,
                                                    textTransform: 'capitalize',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    color: "var(--justweb3-primary-color)"
                                                }} >{attachment?.filename ?? "Cannot preview"}</P>
                                            </Flex>
                                    }
                                    <Flex direction='row' align='center' gap='10px' style={{
                                        flex: 1,
                                        width: '100%'
                                    }} >
                                        <Button
                                            variant={"secondary"}
                                            style={{
                                                flex: '1 1 0%'
                                            }}
                                            onClick={handleCancelAttachment}
                                        >Cancel</Button>
                                        <Button
                                            variant={"primary"}
                                            style={{
                                                flex: '1 1 0%'
                                            }}
                                            onClick={handleSendAttachment}
                                        >Send</Button>
                                    </Flex>
                                </Flex>
                            }
                            <SendIcon style={{
                                cursor: disabled ? "not-allowed" : "pointer",
                                marginLeft: "auto"
                            }}
                                width={24} height={24}
                                onClick={() => {
                                    if (disabled) return;
                                    handleSendAttachment()
                                }}
                            />
                        </Flex>
                    ) : (
                        recording ? (
                            <Flex direction='row' align='center' gap='10px' justify='space-between' style={{
                                padding: '10px 15px',
                                borderRadius: '100px',
                                border: '1px solid var(--justweb3-primary-color)',
                                background: 'white'
                            }} >
                                <P style={{
                                    fontSize: '14px',
                                    letterSpacing: 0.7,
                                    color: "var(--justweb3-primary-color)",
                                    fontWeight: 900
                                }} >
                                    {recordingValue}
                                </P>
                                <P style={{
                                    fontSize: '14px',
                                    letterSpacing: 0.7,
                                    color: "var(--justweb3-primary-color)",
                                    fontWeight: 900,
                                    flex: 1
                                }} >RECORDING...</P>
                                <StopIcon width="24" height="24" style={{
                                    cursor: "pointer"
                                }} onClick={() => {
                                    stopRecording();
                                    pause();
                                    reset();
                                }} />
                            </Flex>
                        ) : (
                            isNewMessageLoading ?
                                <Flex direction='row' align='center' justify='center' style={{ height: '50px' }}>
                                    <LoadingSpinner color={'var(--justweb3-primary-color)'} />
                                </Flex>
                                :
                                <Input
                                    style={{
                                        height: 22,
                                        maxHeight: 22!,
                                        paddingLeft: (!replyMessage && !newConvo) ? "10px" : "16px",
                                        paddingRight: '10px',
                                        borderRadius: "6px",
                                        borderTopLeftRadius: replyMessage ? 0 : "6px",
                                        borderTopRightRadius: replyMessage ? 0 : "6px",
                                        // borderTop: replyMessage ? "0px" : "auto",
                                    }}
                                    placeholder={`Send message...`}
                                    value={messageValue}
                                    left={
                                        (!replyMessage && !newConvo) && (
                                            <MicIcon width="24" height="24" style={{
                                                cursor: disabled ? "not-allowed" : "pointer",
                                                opacity: disabled ? 0.5 : 1,
                                                pointerEvents: 'auto'
                                            }}
                                                onClick={() => {
                                                    if (disabled) return;
                                                    startRecording();
                                                    start();
                                                }} />
                                        )}
                                    right={
                                        <SendIcon width={24} height={24} style={{
                                            cursor: disabled ? "not-allowed" : "pointer"
                                        }}
                                            onClick={() => {
                                                if (disabled) return;
                                                handleSendMessage()
                                            }}
                                        />
                                    }
                                    disabled={disabled}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSendMessage();
                                        }
                                    }}
                                    onChange={(e) => setMessageValue(e.target.value)}
                                />
                        )
                    )
                }
            </div >
        </Flex >
    );
};

export default MessageTextField;
