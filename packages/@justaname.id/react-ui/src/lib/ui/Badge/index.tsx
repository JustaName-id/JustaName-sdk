import React from 'react';
import styled, { css } from 'styled-components';

type BadgeVariant = 'default';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

const badgeVariants = {
  default: css`
    background-color: hsla(0, 0%, 95%, 1);
    color: rgba(0, 0, 0, 0.50);
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
    padding: 5px;
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