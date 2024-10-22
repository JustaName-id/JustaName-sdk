import { FC } from 'react';
import { ChainId } from '@justaname.id/sdk';
import { useJustWeb3 } from '../../providers';
import { useEnsAvatar } from '@justaname.id/react';
import { Avatar, ClickableItem } from '@justweb3/ui';

export interface JustEnsCardProps {
  ens: string;
  chainId?: ChainId;
}

export const JustEnsCard: FC<JustEnsCardProps> = ({ ens, chainId = 1 }) => {
  const { openEnsProfile } = useJustWeb3();
  console.log(openEnsProfile);
  const { avatar } = useEnsAvatar({
    ens,
    chainId,
  });
  return (
    <ClickableItem
      name={ens}
      left={<Avatar src={avatar} />}
      onClick={() => {
        openEnsProfile(ens, chainId);
      }}
    />
  );
};
