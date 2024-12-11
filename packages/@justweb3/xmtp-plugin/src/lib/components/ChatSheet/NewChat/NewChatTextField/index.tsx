import React, { useState } from 'react';
import { Flex, Input, LoadingSpinner, SendIcon } from '@justweb3/ui';

interface NewChatTextFieldProps {
  disabled?: boolean;
  onNewConvo: (message: string) => void;
  style?: React.CSSProperties;
}

export const NewChatTextField: React.FC<NewChatTextFieldProps> = ({
  disabled,
  onNewConvo,
  style,
}) => {
  const [messageValue, setMessageValue] = useState<string>('');
  const [isNewMessageLoading, setIsNewMessageLoading] =
    useState<boolean>(false);

  const handleSendMessage = async () => {
    if (messageValue.trim().length === 0 || disabled) return;
    setIsNewMessageLoading(true);
    await onNewConvo(messageValue);
    setIsNewMessageLoading(false);
    setMessageValue('');
  };

  return (
    <Flex direction="column" gap="5px" style={{ ...style }}>
      {isNewMessageLoading ? (
        <Flex
          direction="row"
          align="center"
          justify="center"
          style={{ height: '50px' }}
        >
          <LoadingSpinner color="var(--justweb3-primary-color)" />
        </Flex>
      ) : (
        <Input
          placeholder="Send message..."
          value={messageValue}
          style={{
            height: 22,
            maxHeight: 22,
            paddingLeft: '16px',
            paddingRight: '10px',
            borderRadius: '100px',
          }}
          disabled={disabled}
          right={
            <SendIcon
              width={24}
              height={24}
              style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
              onClick={handleSendMessage}
            />
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
          onChange={(e) => setMessageValue(e.target.value)}
        />
      )}
    </Flex>
  );
};
