import React from 'react';
import { Input, MicIcon, SendIcon } from '@justweb3/ui';

interface MessageInputProps {
  replyMessage: boolean;
  disabled?: boolean;
  messageValue: string;
  setMessageValue: (value: string) => void;
  handleSendMessage: () => void;
  startRecording: () => void;
  start: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  replyMessage,
  disabled,
  messageValue,
  setMessageValue,
  handleSendMessage,
  startRecording,
  start,
}) => {
  return (
    <Input
      style={{
        height: 22,
        maxHeight: 22,
        paddingLeft: !replyMessage ? '10px' : '16px',
        paddingRight: '10px',
        borderRadius: replyMessage ? '25px' : '100px',
        borderTopLeftRadius: replyMessage ? 0 : '100px',
        borderTopRightRadius: replyMessage ? 0 : '100px',
        borderTop: replyMessage ? '0px' : '',
      }}
      autoFocus
      placeholder="Send message..."
      value={messageValue}
      left={
        !replyMessage && (
          <MicIcon
            width="24"
            height="24"
            style={{
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.5 : 1,
              pointerEvents: 'auto',
            }}
            onClick={() => {
              if (disabled) return;
              startRecording();
              start();
            }}
          />
        )
      }
      right={
        <SendIcon
          width={24}
          height={24}
          style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
          onClick={handleSendMessage}
        />
      }
      disabled={disabled}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSendMessage();
        }
      }}
      onChange={(e) => setMessageValue(e.target.value)}
    />
  );
};
