import styled from 'styled-components';
import React from 'react';

interface StyledFlexProps {
  $direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  $justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  $align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  $wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  $padding?: string;
  $gap?: string;
  $border?: string;
  $borderRadius?: string;
}

const StyledFlex = styled.div<StyledFlexProps>`
  display: flex;
  flex-direction: ${({ $direction = 'row' }) => $direction};
  justify-content: ${({ $justify = 'flex-start' }) => $justify};
  align-items: ${({ $align = 'stretch' }) => $align};
  flex-wrap: ${({ $wrap = 'nowrap' }) => $wrap};
  gap: ${({ $gap = '0' }) => $gap};
  padding: ${({ $padding = '' }) => $padding};
  border: ${({ $border = '' }) => $border};
  border-radius: ${({ $borderRadius = '0px' }) => $borderRadius};
`;

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  padding?: string;
  gap?: string;
  border?: string;
  borderRadius?: string;
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      direction = 'row',
      justify = 'flex-start',
      align = 'stretch',
      wrap = 'nowrap',
      padding = '',
      gap = '0',
      border = '',
      borderRadius = '0px',
      ...props
    },
    ref
  ) => {
    return (
      <StyledFlex
        $direction={direction}
        $justify={justify}
        $align={align}
        $wrap={wrap}
        $padding={padding}
        $gap={gap}
        $border={border}
        $borderRadius={borderRadius}
        ref={ref}
        {...props}
      />
    );
  }
);

Flex.displayName = 'Flex';

export default Flex;
