// Badge.tsx
import React, { useState } from 'react';
import styles from './Badge.module.css'; // Import the CSS module
import { CopiedIcon, CopyIcon } from '../../icons/components/general';
import clsx from 'clsx';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  withCopy?: boolean;
  value?: string;
  copyStyle?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  withCopy = true,
  value,
  copyStyle,
  className,
  ...props
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(value ?? '')
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className={clsx(styles.badge, className)} {...props}>
      {children}
      {withCopy &&
        (isCopied ? (
          <CopiedIcon width={15} height={15} style={copyStyle} />
        ) : (
          <CopyIcon
            width={15}
            height={15}
            style={{ cursor: 'pointer', ...copyStyle }}
            onClick={copyToClipboard}
          />
        ))}
    </div>
  );
};

export default Badge;
