'use client';
import React from 'react';
import { Flex } from '../../common';
import { A, Badge, P } from '../../ui';
import styles from './MetadataCard.module.css'; // Import CSS module

const socialLinks = [
  {
    name: 'Twitter',
    identifier: 'com.twitter',
    link(handle: string) {
      return handle.includes('twitter.com/')
        ? handle
        : `https://twitter.com/${handle.replace('@', '')}`;
    },
  },
  // Additional social links...
];

interface MetadataCardProps {
  variant: 'address' | 'other' | 'social' | 'contentHash';
  icon?: React.ReactNode;
  title: string;
  value: string;
  textExtraStyle?: React.CSSProperties;
}

export const MetadataCard: React.FC<MetadataCardProps> = ({
  title,
  value,
  variant,
  icon,
  textExtraStyle,
}) => {
  const formatText = (text: string, maxLength = 20) =>
    text.length > maxLength
      ? `${text.substring(0, maxLength / 2)}...${text.slice(-4)}`
      : text;

  const linkProps = {
    href:
      variant === 'social'
        ? socialLinks
            .find((social) => social.identifier === title)
            ?.link(value) || ''
        : value,
    target: '_blank',
    rel: 'noopener noreferrer',
    className: styles.link,
  };

  return (
    <Badge className={styles.badge} value={value}>
      <Flex className={styles.flexRow}>
        {(variant === 'address' ||
          variant === 'social' ||
          variant === 'contentHash') &&
          React.cloneElement(icon as React.ReactElement, {
            className: styles.icon,
          })}
        <Flex
          className={styles.flexColumn}
          style={{
            maxWidth:
              variant === 'other'
                ? 'calc(100%-24px-5px)'
                : 'calc(100%-2*24px-2*5px)',
          }}
        >
          {(variant === 'address' || variant === 'other') && (
            <P className={styles.textStyle}>
              {variant === 'address' && value ? formatText(value, 10) : title}
            </P>
          )}

          {variant === 'social' && (
            <A {...linkProps}>
              <P className={styles.textStyle}>{value}</P>
            </A>
          )}

          {variant === 'other' && value && (
            <P className={styles.textStyle}>{formatText(value)}</P>
          )}

          {variant === 'contentHash' && (
            <A {...linkProps}>
              <P className={styles.textStyle}>{formatText(value)}</P>
            </A>
          )}
        </Flex>
      </Flex>
    </Badge>
  );
};

MetadataCard.displayName = 'MetadataCard';
export default MetadataCard;
