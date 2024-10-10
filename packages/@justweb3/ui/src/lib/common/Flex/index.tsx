import styled from 'styled-components';

interface FlexProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: string;
}

export const Flex = styled.div<FlexProps>`
    display: flex;
    flex-direction: ${({ direction = 'row' }) => direction};
    justify-content: ${({ justify = 'flex-start' }) => justify};
    align-items: ${({ align = 'stretch' }) => align};
    flex-wrap: ${({ wrap = 'nowrap' }) => wrap};
    gap: ${({ gap = '0' }) => gap};
`;

export default Flex;