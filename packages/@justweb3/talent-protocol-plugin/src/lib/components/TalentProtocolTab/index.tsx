import { Flex, H2, LoadingSpinner } from '@justweb3/ui';
import { FC, useEffect, useRef, useState } from 'react';
import { useTPCredentialsByAddress, useTPPassportByAddress } from '../../hooks';
import TalentProtocolCard from '../TalentProtocolCard';
import { getCredentialIcon } from '../../icons';

export interface TalentProtocolTabProps {
  address: string;
  apiKey?: string;
  backendUrl?: string;
}

const getScoreValue = (score: number) => {
  if (score >= 0 && score <= 24) {
    return 'Newbie';
  } else if (score >= 25 && score <= 49) {
    return 'Beginner';
  } else if (score >= 50 && score <= 74) {
    return 'Competent';
  } else if (score >= 75 && score <= 99) {
    return 'Proficient';
  } else {
    return 'Expert';
  }
};

export const TalentProtocolTab: FC<TalentProtocolTabProps> = ({
  address,
  apiKey,
  backendUrl,
}) => {
  const { tpPassport, isTPPassportLoading } = useTPPassportByAddress({
    address,
    apiKey,
    backendUrl,
  });

  const { tpCredentials, isTPCredentialsLoading } = useTPCredentialsByAddress({
    address,
    apiKey,
    backendUrl,
  });

  const credentialsRef = useRef<HTMLDivElement>(null);

  const [nbOfCardsPerCredentialRow, setNbOfCardsPerCredentialRow] = useState(0);
  useEffect(() => {
    const element = credentialsRef.current;

    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          const width = entry.contentRect.width;
          let nbOfCardsPerRowTemp = Math.floor(width / 335);
          if (nbOfCardsPerRowTemp < 1) {
            nbOfCardsPerRowTemp = 1;
          }
          setNbOfCardsPerCredentialRow(nbOfCardsPerRowTemp);
        }
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.unobserve(element); // Cleanup observer on unmount
    };
  }, [credentialsRef, isTPCredentialsLoading, isTPPassportLoading]);

  if (isTPCredentialsLoading || isTPPassportLoading) {
    return (
      <Flex
        style={{
          maxHeight: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <LoadingSpinner color={'var(--justweb3-primary-color)'} />
      </Flex>
    );
  }

  return (
    <Flex
      gap={'10px'}
      direction={'column'}
      style={{
        maxHeight: '100%',
        height: '100%',
      }}
    >
      <Flex
        gap={'10px'}
        wrap={'wrap'}
        style={{
          overflow: 'auto',
          maxHeight: '100%',
          overflowX: 'hidden',
        }}
        ref={credentialsRef}
      >
        {tpPassport && (
          <div
            style={{
              minWidth: '335px',
              flex: 1,
              width: '100%',
            }}
          >
            <TalentProtocolCard
              icon={
                <H2
                  style={{
                    fontSize: '44px',
                    fontWeight: 900,
                    lineHeight: '48px',
                    color: 'var(--justweb3-primary-color)',
                  }}
                >
                  {tpPassport.passport.score}
                </H2>
              }
              title={'Builder Score'}
              value={getScoreValue(tpPassport.passport.score)}
            />
          </div>
        )}
        {tpCredentials?.passport_credentials
          ?.filter((tpCredentials) => tpCredentials.score > 0)
          .map((tpCredential) => (
            <div
              key={tpCredential.type}
              style={{
                minWidth: '335px',
                flex: 1,
                width: '100%',
              }}
            >
              <TalentProtocolCard
                icon={getCredentialIcon(tpCredential.type)}
                title={tpCredential.name}
                value={tpCredential.value || ' '}
              />
            </div>
          ))}

        {tpCredentials &&
          tpCredentials?.passport_credentials &&
          tpCredentials?.passport_credentials.filter(
            (tpCredential) => tpCredential.score === 0
          ).length > 0 &&
          Array.from(
            {
              length:
                nbOfCardsPerCredentialRow -
                  (tpCredentials?.passport_credentials.filter(
                    (tpCredential) => tpCredential.score === 0
                  ).length %
                    nbOfCardsPerCredentialRow) ===
                nbOfCardsPerCredentialRow + 1
                  ? 0
                  : nbOfCardsPerCredentialRow -
                    (tpCredentials?.passport_credentials.filter(
                      (tpCredential) => tpCredential.score === 0
                    ).length %
                      nbOfCardsPerCredentialRow) +
                    1,
            },
            (_, i) => (
              <div
                key={`talent-protocol-credentials-${i}-${address}`}
                style={{
                  minWidth: '335px',
                  flex: 1,
                  width: '100%',
                }}
              >
                <div style={{ width: '100%', height: '100%' }} />
              </div>
            )
          )}
      </Flex>
    </Flex>
  );
};
