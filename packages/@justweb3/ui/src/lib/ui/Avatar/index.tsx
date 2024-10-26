import React from 'react';
import JustSomeone from '../../icons/components/logo/JustSomeone';
import styles from './Avatar.module.css';
import clsx from 'clsx'; // Import CSS module

interface AvatarProps {
  src?: string;
  alt?: string;
  initial?: string;
  size?: number;
  borderSize?: string;
  borderColor?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 32,
  borderSize = '2px',
  borderColor = 'var(--justweb3-foreground-color-4)',
  style,
  className,
}) => {
  const boxShadowSize = size > 32 ? '10px' : '5px';

  return (
    <div
      className={clsx(styles.avatarWrapper, className)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        border: `${borderSize} solid ${borderColor}`,
        boxShadow: `0px 0px ${boxShadowSize} 0px rgba(0, 0, 0, 0.25)`,
        ...style,
      }}
    >
      {src ? (
        <img className={styles.avatarImage} src={src} alt={alt || 'Avatar'} />
      ) : (
        <JustSomeone width={size} />
      )}
    </div>
  );
};

export default Avatar;
