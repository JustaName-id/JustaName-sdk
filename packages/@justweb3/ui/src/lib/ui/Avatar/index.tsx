import React, { useState } from 'react';
import JustSomeone from '../../icons/components/logo/JustSomeone';
import styles from './Avatar.module.css';
import clsx from 'clsx';

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
  const [isImageError, setIsImageError] = useState(false); // State to track if image fails to load

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
        padding: src && !isImageError ? '0' : '2px 1px 1px 1px',
        ...style,
      }}
    >
      {src && !isImageError ? (
        <img
          className={styles.avatarImage}
          src={src}
          alt={alt || 'Avatar'}
          onError={() => setIsImageError(true)} // Set error state when image fails to load
        />
      ) : (
        <JustSomeone width={size} />
      )}
    </div>
  );
};

export default Avatar;
