'use client';
import { Flex } from '../../common';
import { A, Badge, P } from '../../ui';
import React from 'react';

const socialLinks = [
  {
    name: 'Twitter',
    identifier: 'com.twitter',
    link(handle: string) {
      if (handle.includes('twitter.com/')) {
        return handle;
      }
      handle = handle.replace('@', '');
      return `https://twitter.com/${handle}`;
    },
  },
  {
    name: 'Facebook',
    identifier: 'com.facebook',
    link(handle: string) {
      if (handle.includes('facebook.com/')) {
        return handle;
      }
      return `https://facebook.com/${handle}`;
    },
  },
  {
    name: 'Instagram',
    identifier: 'com.instagram',
    link(handle: string) {
      if (handle.includes('instagram.com/')) {
        return handle;
      }
      return `https://instagram.com/${handle}`;
    },
  },
  {
    name: 'Reddit',
    identifier: 'com.reddit',
    link(handle: string) {
      if (handle.includes('reddit.com/')) {
        return handle;
      }
      return `https://reddit.com/${handle}`;
    },
  },
  {
    name: 'X',
    identifier: 'com.x',
    link(handle: string) {
      if (handle.includes('x.com/')) {
        return handle;
      }
      handle = handle.replace('@', '');
      return `https://x.com/${handle}`;
    },
  },
  {
    name: 'Github',
    identifier: 'com.github',
    link(handle: string) {
      if (handle.includes('github.com/')) {
        return handle;
      }
      return `https://github.com/${handle}`;
    },
  },
  {
    name: 'Email',
    identifier: 'email',
    link: (handle: string) => `mailto:${handle}`,
  },
  {
    name: 'Telegram',
    identifier: 'org.telegram',
    link: (handle: string) => {
      if (handle.includes('t.me/')) {
        return handle;
      }
      return `https://t.me/${handle}`;
    },
  },
] as const;

interface LinkCardProps {
  variant: 'address' | 'other' | 'social' | 'contentHash';
  icon?: React.ReactNode;
  title: string;
  value: string;
  textExtraStyle?: React.CSSProperties;
}

export const LinkCard: React.FC<LinkCardProps> = ({
  title,
  value,
  variant,
  icon,
  textExtraStyle,
}) => {
  const textStyle: React.CSSProperties = {
    color: 'black',
    fontSize: '10px',
    fontWeight: 800,
    maxWidth: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    lineHeight: '120%',
    margin: "0px",
    fontFamily: 'var(--justweb3-font-family)',
    ...textExtraStyle,
  };

  const formatText = (text: string, maxLength = 20) => {
    if (text.length > maxLength) {
      const start = text.substring(0, maxLength / 2);
      const end = text.slice(-4);
      return `${start}...${end}`;
    }
    return text;
  };

  const linkProps = {
    href:
      variant === 'social'
        ? socialLinks
          .find((social) => social.identifier === title)
          ?.link(value) || ''
        : value,
    target: '_blank',
    rel: 'noopener noreferrer',
    style: {
      color: 'black',
      fontSize: '10px',
      fontWeight: 800,
      maxWidth: '100%',
      width: 'fit-content',
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
      lineHeight: '100%',
      margin: '0px'
    },
  };

  return (
    <Badge style={{ padding: '5px' }} value={value}>
      <Flex direction="row" justify="flex-start" gap="5px" align="center">
        {(variant === 'address' ||
          variant === 'social' ||
          variant === 'contentHash') &&
          React.cloneElement(icon as React.ReactElement, {
            style: {
              width: '15px',
              height: '15px',
              minWidth: '15px',
              minHeight: '15px',
              textAlign: 'center',
            },
          })}
        <Flex
          direction="column"
          justify="center"
          gap="5px"
          align="flex-start"
          style={{
            maxWidth:
              variant === 'other'
                ? 'calc(100%-24px-5px)'
                : 'calc(100%-2*24px-2*5px)',
          }}
        >
          {(variant === 'address' || variant === 'other') && (
            <P style={textStyle}>
              {variant === 'address' && value
                ? formatText(value, variant === 'address' ? 10 : 20)
                : title}
            </P>
          )}

          {variant === 'social' && (
            <A {...linkProps}>
              <P style={textStyle}>{formatText(value)}</P>
            </A>
          )}

          {variant === 'other' && value && (
            <P style={textStyle}>{formatText(value)}</P>
          )}

          {variant === 'contentHash' && (
            <A {...linkProps}>
              <P style={textStyle}>{formatText(value)}</P>
            </A>
          )}
        </Flex>
      </Flex>
    </Badge>
  );
};

LinkCard.displayName = 'LinkCard';

export default LinkCard;
