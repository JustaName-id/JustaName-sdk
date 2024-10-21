import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { CopiedIcon, CopyIcon } from '../../icons/components/general';

type BadgeVariant = 'default';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  withCopy?: boolean;
  value?: string;
  copyStyle?: React.CSSProperties;
}

const badgeVariants = {
  default: css`
    background-color: var(--justweb3-foreground-color-4);
    color: hsl(from var(--justweb3-foreground-color-2) h s l / 0.5);
    font-family: var(--justweb3-font-family), serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 900;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  `,
};

const StyledBadge = styled.div<BadgeProps>`
  display: inline-flex;
  align-items: center;
  border-radius: 16px;
  width: fit-content;
  padding: 5px 10px;
  font-size: 10px;
  font-weight: 900;
  line-height: 1;
  white-space: nowrap;

  ${(props) => badgeVariants[props.variant || 'default']}
`;

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  withCopy = true,
  value,
  copyStyle,
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
    <StyledBadge variant={variant} {...props}>
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
    </StyledBadge>
  );
};
