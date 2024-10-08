import React from 'react';
import styled from 'styled-components';

const StyledDivider = styled.hr`
    display: flex;
    align-items: center;
    width: 100%;
    border: 0;
    border-bottom: 1px solid var(--justaname-foreground-color-4);
    margin: 10px 0;
`;

export const Divider: React.FC = () => {
    return (
        <StyledDivider />
    );
}

export default Divider;