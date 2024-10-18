"use client";
import React, { useState } from 'react';
import { Flex } from '../../common';
import { P } from '../../ui';
import styled from 'styled-components';

const StyledButton = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
  margin-left: 0.5rem; 
  color: var(--justweb3-primary-color); 
  text-decoration: none;
  font-size: 0.875rem; 
  font-weight: 600; 

  &:hover {
    text-decoration: underline;
  }
`;

interface ExpandibleTextProps {
    text: string;
    maxLength: number;
}

export const ExpandibleText: React.FC<ExpandibleTextProps> = ({ text, maxLength }) => {
    const [isTruncated, setIsTruncated] = useState(true);

    const toggleTruncated = () => {
        setIsTruncated(!isTruncated);
    };

    const resultString = isTruncated ? text.slice(0, maxLength) : text;
    const readMoreLessText = isTruncated ? 'Read More' : 'Read Less';

    return (
        <Flex justify={'flex-start'} gap={'10px'} align={'center'}>
            <P>
                {resultString}
                {isTruncated && text.length > maxLength && '... '}
                {
                    isTruncated && text.length > maxLength && (
                        <StyledButton onClick={toggleTruncated}>
                            {readMoreLessText}
                        </StyledButton>
                    )
                }
            </P>
        </Flex>
    );
};

ExpandibleText.displayName = 'ExpandibleText';
