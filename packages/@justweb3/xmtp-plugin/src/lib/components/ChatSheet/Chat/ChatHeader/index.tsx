import {
  ArrowIcon,
  Avatar,
  BlockedAccountIcon,
  Flex,
  P,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TuneIcon,
} from '@justweb3/ui';
import { formatAddress } from '../../../../utils/formatAddress';
import { Records, useEnsAvatar } from '@justaname.id/react';

export interface ChatHeaderProps {
  primaryName: string | undefined;
  peerAddress: string;
  onBack: () => void;
  openEnsProfile: (ens: string) => void;
  records: Records | undefined;
  blockAddressHandler: (peerAddress: string) => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  primaryName,
  peerAddress,
  onBack,
  openEnsProfile,
  records,
  blockAddressHandler,
}) => {
  const { sanitizeEnsImage } = useEnsAvatar();

  return (
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
            style={{ transform: 'rotate(180deg) translateX(1px)' }}
          />
        </Flex>
        <Flex
          direction="row"
          align="center"
          gap="10px"
          style={{ flexGrow: 1, cursor: primaryName ? 'pointer' : 'default' }}
          onClick={() => {
            if (primaryName) openEnsProfile(primaryName);
          }}
        >
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
            size={30}
          />
          <Flex
            direction="column"
            justify="center"
            gap="4px"
            style={{ flex: 1 }}
          >
            <P style={{ fontSize: 12, fontWeight: 700, lineHeight: 1 }}>
              {primaryName || formatAddress(peerAddress)}
            </P>
            {primaryName && (
              <P style={{ fontSize: 10, fontWeight: 600, lineHeight: 1 }}>
                {formatAddress(peerAddress)}
              </P>
            )}
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="row" align="center" gap="15px">
        <Popover>
          <PopoverTrigger>
            <TuneIcon
              width={24}
              height={24}
              style={{ cursor: 'pointer', width: 'fit-content' }}
            />
          </PopoverTrigger>
          <PopoverContent
            side="left"
            style={{
              padding: '0px',
              width: '100%',
              borderRadius: '10px',
              backgroundColor: 'var(--justweb3-destructive-color)',
            }}
          >
            <Flex
              direction="column"
              style={{ gap: '10px', borderRadius: '10px' }}
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
                onClick={() => blockAddressHandler(peerAddress)}
              >
                <BlockedAccountIcon
                  width="22"
                  height="22"
                  style={{ cursor: 'pointer' }}
                  fill="var(--justweb3-background-color)"
                />
                <P
                  style={{
                    color: 'var(--justweb3-background-color)',
                    fontWeight: 500,
                  }}
                >
                  Block
                </P>
              </Flex>
            </Flex>
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  );
};
