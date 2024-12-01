import React from 'react';
import styles from './ClickableItem.module.css'; // Import the CSS module
import { P } from '../../ui';
import clsx from 'clsx';

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
  className?: string;
}

export const ClickableItem = React.forwardRef<
  HTMLDivElement,
  ClickableListItemProps
>(
  (
    {
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
      className,
    },
    ref
  ) => {
    const [hover, setHover] = React.useState(false);

    const wrapperClassNames = [
      styles.listItemWrapper,
      disabled ? styles.disabled : styles.enabled,
      loading ? styles.loading : '',
      hover && clickable ? styles.hover : styles.default,
    ].join(' ');

    return (
      <div
        ref={ref}
        className={clsx(wrapperClassNames, className)}
        onClick={(e) => {
          if (!loading && !disabled && clickable) {
            onClick && onClick();
          }
          e.stopPropagation();
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
        style={{
          ...style,
          cursor: !clickable ? 'default' : undefined,
          alignItems: title && subtitle ? 'stretch' : 'center',
        }}
      >
        {left && (
          <div style={{ display: 'flex', alignItems: 'center' }}>{left}</div>
        )}
        <div className={styles.content} style={contentStyle}>
          {typeof title === 'string' ? (
            <P style={{ fontSize: '14px', lineHeight: '20px', margin: 0 }}>
              {title}
            </P>
          ) : (
            title
          )}
          {subtitle && typeof subtitle === 'string' ? (
            <P className={styles.truncatedText}>{subtitle}</P>
          ) : (
            subtitle
          )}
        </div>
        {right && (
          <div
            style={{
              marginLeft: '10px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {right}
          </div>
        )}
      </div>
    );
  }
);

export default ClickableItem;
