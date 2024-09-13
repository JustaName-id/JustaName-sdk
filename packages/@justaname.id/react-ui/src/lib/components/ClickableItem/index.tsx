import React from 'react';
import styled from 'styled-components';
import { Avatar, LoadingSpinner, P } from '../../ui';
import { ArrowIcon } from '../../icons';

interface ClickableListItemProps {
  name: string;
  status?: string;
  avatarSrc?: string;
  avatarInitial?: string;
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const ListItemWrapper = styled.div<{ disabled?: boolean, loading?: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: ${(props) => props.disabled || props.loading ? 'not-allowed' : 'pointer'};
  border-radius: 16px;
    opacity: ${(props) => props.disabled ? 0.5 : 1};
  border: 1px solid ${(props) => props.loading ? "var(--justaname-primary-color)" : 'var(--justaname-foreground-color-4)'};
    background-color: ${(props) => props.disabled ? 'var(--justaname-foreground-color-4)' : 'var(--justaname-background-color)'};
    transition: background-color 0.2s ease;
`;

const Content = styled.div`
  flex-grow: 1;
  margin-left: 16px;
    height: 30px;
    display: flex;
    flex-direction: column;
`;

export const ClickableItem: React.FC<ClickableListItemProps> = ({
                                                               name,
                                                               status,
                                                               avatarSrc,
                                                               avatarInitial,
                                                                loading,
                                                               onClick,
  disabled
                                                             }) => {
  const [hover, setHover] = React.useState(false);
  return(
    <ListItemWrapper
      onClick={
      () => {
        if(!loading && !disabled) {
          onClick && onClick();
        }
      }}
      onPointerEnter={() => {
      if(!loading && !disabled) {
        setHover(true);
      }}}
      onPointerLeave={() => {
      if(!loading && !disabled) {
        setHover(false);
      }}}
      disabled={disabled} loading={loading}
     >
      <Avatar
        src={avatarSrc}
        initial={avatarInitial || name.charAt(0)}
        size="28px"
        bgColor={avatarSrc ? 'var(--justaname-foreground-color-4)' : 'var(--justaname-primary-color)' }
        borderColor={avatarSrc ? 'var(--justaname-foreground-color-4)' : 'var(--justaname-primary-color)' }
        color="#ffffff"
      />
      <Content style={{
        justifyContent: status ? 'space-between' : 'center'
      }}>
        <P style={{
          fontSize: '14px',
          margin: 0
        }}>{name}</P>
        {status && <P style={{
          fontSize: '10px',
          fontWeight: '900',
          color: 'var(--justaname-primary-color)'
        }}>{status}</P>}
      </Content>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: (hover && !loading) ? 1 : 0,
      }}>
         <ArrowIcon />
      </div>

      <div style={{
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        opacity:  loading ? 1 : 0,
        height: '30px',
        width: loading ? '30px' : '0',
      }}>
        <LoadingSpinner color={'var(--justaname-primary-color)'} />
      </div>

    </ListItemWrapper>
  );
};

export default ClickableItem;