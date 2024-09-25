import React from 'react';
import styled from 'styled-components';
import { P } from '../../ui';

interface ClickableListItemProps {
  name: string;
  status?: string;
  left?: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  right?: React.ReactNode;
  onHover?: (hover: boolean) => void;
  style?: React.CSSProperties;
}

const ListItemWrapper = styled.div<{ $disabled?: boolean, $loading?: boolean, $hover?:boolean }>`
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: ${(props) => props.$disabled || props.$loading ? 'not-allowed' : 'pointer'};
    border-radius: 16px;
    opacity: ${(props) => props.$disabled ? 0.5 : 1};
    border: 1px solid ${(props) => (props.$loading || props.$hover)? 'var(--justaname-primary-color)' : 'var(--justaname-foreground-color-4)'};
    background-color: ${(props) => props.$disabled ? 'var(--justaname-foreground-color-4)' : 'var(--justaname-background-color)'};
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
                                                                  left,
                                                                  loading,
                                                                  right,
                                                                  onClick,
                                                                  onHover,
                                                                  disabled,
                                                                  style={}
}) => {
  const [hover, setHover] = React.useState(false);
  return (
    <ListItemWrapper
      onClick={
        () => {
          if (!loading && !disabled) {
            onClick && onClick();
          }
        }}
      onPointerEnter={() => {
        if (!loading && !disabled) {
          setHover(true);
          onHover && onHover(true);
        }
      }}
      onPointerLeave={() => {
        if (!loading && !disabled) {
          setHover(false);
          onHover && onHover(false);
        }
      }}
      $disabled={disabled}
      $loading={!!loading}
      $hover={hover}
      style={style}
    >
      {left && left}
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
      {right && right}
    </ListItemWrapper>
  );
};

export default ClickableItem;