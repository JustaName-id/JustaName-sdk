import {
  ArrowIcon,
  Avatar,
  Badge,
  ClickableItem,
  Flex,
  LoadingSpinner,
  P,
} from '@justweb3/ui';
import React, { useMemo } from 'react';
import { Records, useEnsAvatar } from '@justaname.id/react';

export interface SelectSubnameItemProps {
  subname: Records;
  selectedSubname: string;
  onClick: () => void;
  isPrimary?: boolean;
}

export const SelectSubnameItem: React.FC<SelectSubnameItemProps> = ({
  subname,
  selectedSubname,
  onClick,
  isPrimary,
}) => {
  const [hover, setHover] = React.useState(false);
  const { avatar } = useEnsAvatar({
    ens: subname.ens,
  });
  const loading = useMemo(
    () => selectedSubname === subname.ens,
    [selectedSubname, subname.ens]
  );
  return (
    <ClickableItem
      title={subname.ens}
      onClick={onClick}
      style={{
        width: '100%',
      }}
      left={<Avatar src={avatar} initial={subname.ens[0]} />}
      right={
        <Flex>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: hover && !loading ? 1 : 0,
            }}
          >
            <ArrowIcon />
          </div>
          {isPrimary && (
            <Badge withCopy={false}>
              <P style={{
                fontWeight: 900,
                fontSize: 10,
                color: 'var(--justweb3-primary-color)',
              }}>Primary</P>
            </Badge>
          )}
          <div
            style={{
              display: 'flex',
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: loading ? 1 : 0,
              height: '30px',
              width: loading ? '30px' : '0',
            }}
          >
            <LoadingSpinner color={'var(--justweb3-primary-color)'} />
          </div>
        </Flex>
      }
      loading={loading}
      onHover={(hover) => setHover(hover)}
      disabled={!loading && selectedSubname.length > 0}
    />
  );
};
