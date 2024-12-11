import { useTPPassportByAddress } from '../../hooks';
import { Badge, Flex, SPAN } from '@justweb3/ui';
import TalentPassportLogoIcon from '../../icons/TalentPassportLogoIcon';

export interface TalentProtocolBadgeProps {
  address: string;
  apiKey?: string;
  backendUrl?: string;
}

export const TalentProtocolBadge: React.FC<TalentProtocolBadgeProps> = ({
  address,
  apiKey,
  backendUrl,
}) => {
  const { tpPassport, isTPPassportLoading } = useTPPassportByAddress({
    address,
    apiKey,
    backendUrl,
  });

  return (
    <Badge
      style={{
        background: '#826AEE',
        padding: '5px',
      }}
      withCopy={false}
    >
      <Flex gap={'3px'}>
        <TalentPassportLogoIcon height={10} color={'white'} />

        <SPAN
          style={{
            fontWeight: '900',
            fontSize: '10px',
            lineHeight: '10px',
            color: 'white',
          }}
        >
          {isTPPassportLoading
            ? 'Loading...'
            : tpPassport?.passport.score || '0'}
        </SPAN>
      </Flex>
    </Badge>
  );
};
