import { useRecords } from '@justaname.id/react';
import { Flex, LoadingSpinner, P } from '@justweb3/ui';
import { ProfileSection } from '@justweb3/widget';
import { FC, useMemo } from 'react';
import { useVerifications } from '../../hooks';
import { VerificationCard } from '../VerificationCard';
import { isVerificationDisplayable } from '../../utils';

export interface DentityTabProps {
  ens: string;
}

export const DentitySection: FC<DentityTabProps> = ({ ens }) => {
  const { records } = useRecords({
    ens: ens,
  });

  const verificationsTextRecord = useMemo(() => {
    if (!records) return undefined;
    return records.records.texts.find((text) => text.key === 'verifications');
  }, [records]);

  const validDentityUrl = useMemo(() => {
    if (!verificationsTextRecord?.value) {
      return undefined;
    }
    try {
      const parsedValue = JSON.parse(verificationsTextRecord.value);
      if (Array.isArray(parsedValue)) {
        for (const item of parsedValue) {
          if (typeof item === 'string' && item.includes('oidc.dentity.com')) {
            return item;
          }
        }
      }
      return undefined;
    } catch (error) {
      return undefined;
    }
  }, [verificationsTextRecord]);

  const { verifications, isVerificationsLoading } = useVerifications({
    url: validDentityUrl,
  });

  if (validDentityUrl) {
    return (
      <Flex
        gap={'10px'}
        direction={'column'}
        style={{
          maxHeight: '100%',
          height: '100%',
        }}
      >
        {isVerificationsLoading ? (
          <Flex
            style={{
              height: '50px',
              minHeight: '50px',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <LoadingSpinner color={'var(--justweb3-primary-color)'} />
          </Flex>
        ) : verifications && verifications.length > 0 ? (
          <ProfileSection title={'Dentity'} items={[
            // <ProfileBtn ens={ens} />,
            ...verifications
              .filter(verification => isVerificationDisplayable(verification, records))
              .map((verification) => (
                <VerificationCard
                  key={verification.type.toLocaleString()}
                  verification={verification}
                  records={records}
                />
              ))
          ]} />
        ) : (
          <Flex
            style={{
              padding: '10px',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50%',
              textAlign: 'center',
            }}
          >
            <P>No verifications found</P>
          </Flex>
        )}
      </Flex>
    );
  } else {
    return <ProfileSection title={'Dentity'} items={[<P>Ens not verified with Dentity</P>]} />
  }
};
