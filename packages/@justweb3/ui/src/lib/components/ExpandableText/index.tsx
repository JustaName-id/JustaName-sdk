'use client';
import React, { useState } from 'react';
import { Flex } from '../../common';
import { P } from '../../ui';
import styles from './ExpandableText.module.css'; // Import the CSS module

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
    <Flex justify="flex-start" gap="10px" align="center">
      <P>
        {resultString}
        {isTruncated && text.length > maxLength && '... '}
        {isTruncated && text.length > maxLength && (
          <button onClick={toggleTruncated} className={styles.button}>
            {readMoreLessText}
          </button>
        )}
      </P>
    </Flex>
  );
};

ExpandableText.displayName = 'ExpandableText';
export default ExpandableText;
