import React from 'react';
import styled from 'styled-components';
import { P } from '../../ui';

interface ClickableListItemProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
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

const ListItemWrapper = styled.div<{
  $disabled?: boolean;
  $loading?: boolean;
  $hover?: boolean;
}>`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: ${(props) =>
    props.$disabled || props.$loading ? 'not-allowed' : 'pointer'};
  border-radius: 100px;
  box-sizing: border-box;
  width: 300px;
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  border: 1px solid
    ${(props) =>
      props.$loading || props.$hover
        ? 'var(--justweb3-primary-color)'
        : 'var(--justweb3-foreground-color-4)'};
  background-color: var(--justweb3-background-color);
  transition: background-color 0.2s ease;
  max-width: 100%;
  height: fit-content;
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
  title,
  subtitle,
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
        gap: '10px',
        alignItems: title && subtitle ? 'stretch' : 'center',
      }}
    >
      {left && (
        <div style={{ display: 'flex', alignItems: 'center' }}>{left}</div>
      )}
      <Content
        style={{
          ...contentStyle,
          placeContent: 'space-around',
        }}
      >
        {typeof title === 'string' ? (
          <P
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              margin: 0,
            }}
          >
            {title}
          </P>
        ) : (
          title
        )}
        {subtitle && typeof subtitle === 'string' ? (
          <TruncatedText>{subtitle}</TruncatedText>
        ) : (
          subtitle
        )}
      </Content>
      {right && (
        <div
          style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}
        >
          {right}
        </div>
      )}
    </ListItemWrapper>
  );
};

export default ClickableItem;
