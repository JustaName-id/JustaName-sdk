'use client';
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
  font-size: 10px;
  font-weight: 400;
  line-height: normal;

  &:hover {
    text-decoration: underline;
  }
`;

interface ExpandableTextProps {
  text: string;
  maxLength: number;
}

export const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  maxLength,
}) => {
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
        {isTruncated && text.length > maxLength && (
          <StyledButton onClick={toggleTruncated}>
            {readMoreLessText}
          </StyledButton>
        )}
      </P>
    </Flex>
  );
};

ExpandableText.displayName = 'ExpandableText';
