import React from 'react';
import { Button } from '@justweb3/ui';
import { EFPIcon } from '../../icons/EFPIcon';
import { useMountedAccount } from '@justaname.id/react';
import { useFollowState } from '../../hooks/useFollowState';

interface FollowButtonProps {
  ens: string;
}

export const FollowButton: React.FC<FollowButtonProps> = ({ ens }) => {
  const { address } = useMountedAccount();
  const { followState, isFollowStateLoading } = useFollowState({
    addressOrEns1: address,
    addressOrEns2: ens,
  });

  if (!address) {
    return (
      <a
        href={'https://ethfollow.xyz/' + ens}
        target={'_blank'}
        rel="noreferrer"
      >
        <Button leftIcon={<EFPIcon color={'white'} />} variant={'primary'}>
          Follow
        </Button>
      </a>
    );
  }

  if (isFollowStateLoading) {
    return (
      <Button
        leftIcon={<EFPIcon color={'white'} />}
        variant={'primary'}
        loading={true}
      >
        Follow
      </Button>
    );
  }

  return (
    <a href={'https://ethfollow.xyz/' + ens} target={'_blank'} rel="noreferrer">
      <Button leftIcon={<EFPIcon color={'white'} />} variant={'primary'}>
        {followState?.state.follow ? 'Following' : 'Follow'}
      </Button>
    </a>
  );
};
