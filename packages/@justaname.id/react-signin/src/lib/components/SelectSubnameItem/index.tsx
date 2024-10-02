import { ArrowIcon, Avatar, ClickableItem, Flex, LoadingSpinner } from '@justaname.id/react-ui';
import React, { useMemo } from 'react';
import { SubnameGetAllByAddressResponse } from '@justaname.id/sdk';
import { useEnsAvatar } from '@justaname.id/react';
export interface SelectSubnameItemProps {
  subname: SubnameGetAllByAddressResponse;
  selectedSubname: string;
  onClick: () => void;
}

export const SelectSubnameItem: React.FC<SelectSubnameItemProps> = ({ subname, selectedSubname, onClick }) => {
  const [hover, setHover] = React.useState(false);
  const { avatar } = useEnsAvatar({
    ens: subname.subname
  })
  const loading = useMemo(() => selectedSubname === subname.subname, [selectedSubname, subname.subname]);
  return (
    <ClickableItem name={subname.subname}
      onClick={onClick}
      left={  <Avatar
        src={avatar}
        initial={subname.subname[0]}
        size="28px"
        bgColor={avatar ? 'var(--justaname-foreground-color-4)' : 'var(--justaname-primary-color)'}
        borderColor={avatar ? 'var(--justaname-foreground-color-4)' : 'var(--justaname-primary-color)'}
        color="#ffffff"
      />}
      right={<Flex>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: (hover && !loading) ? 1 : 0
        }}>
          <ArrowIcon />
        </div>

        <div style={{
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: loading? 1 : 0,
          height: '30px',
          width: loading? '30px' : '0'
        }}>
          <LoadingSpinner color={'var(--justaname-primary-color)'} />
        </div>
      </Flex>}
      loading={loading}
      onHover={(hover) => setHover(hover)}
                   disabled={!loading && selectedSubname.length > 0}
    />
  )
}