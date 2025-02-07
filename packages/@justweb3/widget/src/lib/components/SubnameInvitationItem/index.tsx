import {
  Records,
  useAcceptSubname,
  useEnsAvatar,
  useRejectSubname,
} from '@justaname.id/react';
import { Avatar, Button, ClickableItem, Flex } from '@justweb3/ui';
import React from 'react';

export interface SubnameInvitationItemProps {
  subname: Records;
  onInvitationChange: () => void;
}

export const SubnameInvitationItem: React.FC<SubnameInvitationItemProps> = ({
  subname,
  onInvitationChange,
}) => {
  const { acceptSubname, isAcceptSubnamePending } = useAcceptSubname();
  const { rejectSubname, isRejectSubnamePending } = useRejectSubname();
  const { avatar } = useEnsAvatar({
    ens: subname.ens,
  });
  return (
    <ClickableItem
      title={subname.ens}
      style={{
        width: '100%',
      }}
      clickable={false}
      left={<Avatar src={avatar} initial={subname.ens[0]} />}
      right={
        <Flex direction="row" gap="10px" align="center">
          <Button
            type="button"
            variant="primary"
            onClick={() =>
              acceptSubname({
                ens: subname.ens,
              }).then(onInvitationChange)
            }
            style={{ flexGrow: '0.5' }}
            disabled={isAcceptSubnamePending || isRejectSubnamePending}
          >
            Accept
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              rejectSubname({
                ens: subname.ens,
              }).then(onInvitationChange)
            }
            style={{ flexGrow: '0.5' }}
            disabled={isAcceptSubnamePending || isRejectSubnamePending}
          >
            Decline
          </Button>
        </Flex>
      }
      loading={isAcceptSubnamePending || isRejectSubnamePending}
    />
  );
};
