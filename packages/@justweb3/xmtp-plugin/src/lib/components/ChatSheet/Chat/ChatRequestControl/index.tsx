import { Button, Flex, LoadingSpinner } from '@justweb3/ui';

interface ChatRequestControlsProps {
  isRequestChangeLoading: boolean;
  blockAddressHandler: (peerAddress: string) => void;
  peerAddress: string;
  handleAllowAddress: () => void;
}

export const ChatRequestControls: React.FC<ChatRequestControlsProps> = ({
  isRequestChangeLoading,
  blockAddressHandler,
  peerAddress,
  handleAllowAddress,
}) => {
  if (isRequestChangeLoading) {
    return (
      <Flex
        direction="row"
        align="center"
        justify="center"
        style={{ height: '50px' }}
      >
        <LoadingSpinner color="var(--justweb3-primary-color)" />
      </Flex>
    );
  }

  return (
    <Flex direction="row" gap="15px">
      <Button
        variant="secondary"
        style={{ width: '100%' }}
        onClick={() => blockAddressHandler(peerAddress)}
      >
        IGNORE
      </Button>
      <Button
        variant="primary"
        style={{ width: '100%' }}
        onClick={handleAllowAddress}
      >
        ACCEPT
      </Button>
    </Flex>
  );
};
