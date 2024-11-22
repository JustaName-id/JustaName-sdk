import { Flex, H2, P } from '@justweb3/ui';
import React from 'react';

interface TalentProtocolCardProps {
  icon: React.ReactNode;
  title: string;
  value?: string;
}

const TalentProtocolCard: React.FC<TalentProtocolCardProps> = ({
  icon,
  title,
  value,
}) => {
  return (
    <Flex
      direction={'column'}
      gap={'5px'}
      style={{
        padding: '10px 20px',
        borderRadius: '10px',
        border: '1px solid var(--justweb3-foreground-color-4)',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '60px',
          width: '66px',
          padding: '20px',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </div>

      <H2
        style={{
          fontSize: '18px',
          fontWeight: 300,
          lineHeight: '20px',
        }}
      >
        {title}
      </H2>
      <div style={{ height: '16px' }}>
        <P
          style={{
            fontSize: '14px',
            fontWeight: 700,
            lineHeight: '16px',
          }}
        >
          {value}
        </P>
      </div>
    </Flex>
  );
};

export default TalentProtocolCard;
