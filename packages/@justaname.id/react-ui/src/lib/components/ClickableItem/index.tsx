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
  contentStyle?: React.CSSProperties;
  clickable?: boolean;
}

const TruncatedText = styled(P)`
    font-size: 10px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const ListItemWrapper = styled.div<{ $disabled?: boolean, $loading?: boolean, $hover?: boolean }>`
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: ${(props) => (props.$disabled || props.$loading ? 'not-allowed' : 'pointer')};
    border-radius: 16px;
    opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
    border: 1px solid ${(props) => (props.$loading || props.$hover ? 'var(--justaname-primary-color)' : 'var(--justaname-foreground-color-4)')};
    background-color: 'var(--justaname-background-color)';
    transition: background-color 0.2s ease;
    max-width: 100%; 
`;

const Content = styled.div`
    flex-grow: 1;  
    flex-shrink: 1; 
    flex-basis: 0;  
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const ClickableItem: React.FC<ClickableListItemProps> = ({
                                                                  name,
                                                                  status,
                                                                  left,
                                                                  loading,
                                                                  right,
                                                                  onClick,
                                                                  onHover,
                                                                  clickable = true,
                                                                  disabled,
                                                                  style = {},
                                                                  contentStyle = {},
                                                                }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <ListItemWrapper
      onClick={() => {
        if (!loading && !disabled && clickable) {
          onClick && onClick();
        }
      }}
      onPointerEnter={() => {
        if (!loading && !disabled && clickable) {
          setHover(true);
          onHover && onHover(true);
        }
      }}
      onPointerLeave={() => {
        if (!loading && !disabled && clickable) {
          setHover(false);
          onHover && onHover(false);
        }
      }}
      $disabled={disabled}
      $loading={!!loading}
      $hover={hover && clickable}
      style={{
        ...style,
        cursor: !clickable ? 'default' : undefined,
      }}
    >
      {left && (
        <div style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
          {left}
        </div>
      )}
      <Content style={{
        ...contentStyle
      }}>
        <P
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            margin: 0,
          }}
        >
          {name}
        </P>
        {status && <TruncatedText>{status}</TruncatedText>}
      </Content>
      {right && (
        <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
          {right}
        </div>
      )}
    </ListItemWrapper>
  );
};

export default ClickableItem;