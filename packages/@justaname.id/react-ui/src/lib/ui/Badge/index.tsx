import React from 'react';
import styled, { css } from 'styled-components';

type BadgeVariant = 'default';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

const badgeVariants = {
  default: css`
      background-color: var(--justaname-foreground-color-4);
      color: hsl(from var(--justaname-foreground-color-2) h s l / 0.5);       
      font-family: var(--justaname-font-family),serif;
        font-size: 14px;
    font-style: normal;
    font-weight: 900;
  `,
};

const StyledBadge = styled.div<BadgeProps>`
    display: inline-flex;
    align-items: center;
    border-radius: 9999px;
    width: fit-content;
    padding: 5px 10px;
    height: 12px;
    font-size: 10px;
    font-weight: 900;
    line-height: 1;
    white-space: nowrap;

  ${props => badgeVariants[props.variant || 'default']}
`;

export const Badge: React.FC<BadgeProps> = ({
                                              children,
                                              variant = 'default',
                                              ...props
                                            }) => {
  return (
    <StyledBadge variant={variant} {...props}>
      {children}
    </StyledBadge>
  );
};