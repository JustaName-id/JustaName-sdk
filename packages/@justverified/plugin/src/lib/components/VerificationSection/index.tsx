import { FC } from 'react';
import { Credentials } from '../../types';
import { ChainId } from '@justaname.id/sdk';
import { useVerifyRecords } from '../../hooks/useVerifyRecords';
import { VerificationCard } from '../VerificationCard';
import { ProfileSection } from '@justweb3/widget';
import { P } from '@justweb3/ui';

interface VerificationSectionProps {
  ens: string;
  credentials: Credentials[];
  chainId: ChainId;
  mApp: string;
  verificationBackendUrl: string;
}

export const VerificationSection: FC<VerificationSectionProps> = ({
  ens,
  credentials,
  chainId,
  mApp,
  verificationBackendUrl,
                                                                  }) => {

  const { verifiedRecords, isVerifiedRecordsLoading } =
    useVerifyRecords({
      credentials,
      ens,
      verificationBackendUrl,
      mApp,
      chainId,
    });

  if(isVerifiedRecordsLoading || !verifiedRecords) {
    return <ProfileSection title={'Verifications'} items={[<P>Loading...</P>]} />;
  }

  if(Object.keys(verifiedRecords).every((key) => !verifiedRecords[key as Credentials])) {
    return <ProfileSection title={'Verifications'} items={[<P>No verifications found</P>]} />;
  }

  return <ProfileSection title={'Verifications'} items={


  Object.keys(verifiedRecords)
    .filter((key) => !!verifiedRecords[key as Credentials])
    .map((credential) =>

      <VerificationCard
        ens={ens}
        credential={credential as Credentials}
        credentials={credentials}
        chainId={chainId}
        mApp={mApp}
        verificationBackendUrl={verificationBackendUrl}
      />
    )
  } />;

}