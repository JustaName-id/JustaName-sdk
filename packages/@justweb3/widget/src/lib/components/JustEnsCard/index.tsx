'use client';
import React, { FC } from 'react';
import { ChainId } from '@justaname.id/sdk';
import { useJustWeb3 } from '../../providers';
import { useEnsAvatar, usePrimaryName, useRecords } from '@justaname.id/react';
import { Avatar, ClickableItem, CopiedIcon, CopyIcon, Flex, formatText, P } from '@justweb3/ui';
import { getTextRecordIcon } from '../../icons/records-icons';
import styles from './JustEnsCard.module.css'; // Import CSS module

export interface JustEnsCardProps {
  addressOrEns: string;
  chainId?: ChainId;
  expanded?: boolean;
  style?: React.CSSProperties;
}

export const JustEnsCard: FC<JustEnsCardProps> = ({
  addressOrEns,
  chainId = 1,
  expanded = false,
  style,
}) => {
  const { openEnsProfile } = useJustWeb3();
  const [isCopied, setIsCopied] = React.useState<boolean>(false)
  const isEns = addressOrEns?.includes('.');
  const { primaryName } = usePrimaryName({
    address: isEns ? undefined : (addressOrEns as `0x${string}`),
    chainId,
  });

  const ens =
    (isEns ? addressOrEns : primaryName) || formatText(addressOrEns, 4);
  const { records } = useRecords({
    ens: isEns ? addressOrEns : primaryName,
    chainId,
  });
  const { sanitizeEnsImage } = useEnsAvatar();

  const handleEnsClick = () => {
    if (!isEns && !primaryName) {
      return;
    }
    openEnsProfile(ens, chainId);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(ens)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  if (expanded) {
    return (
      <div style={style} className={styles.expandableCard} onClick={() => handleEnsClick()}
      >
        <Flex>
          <img
            src={
              sanitizeEnsImage({
                name: ens,
                chainId,
                image:
                  records?.sanitizedRecords?.header ||
                  records?.sanitizedRecords?.banner,
              }) ||
              'https://justaname-bucket.s3.eu-central-1.amazonaws.com/default-banner.png'
            }
            alt="banner"
            className={styles.bannerImage}
          />
        </Flex>
        <Flex className={styles.avatarContainer}>
          <Avatar
            src={sanitizeEnsImage({
              name: ens,
              chainId,
              image: records?.sanitizedRecords?.avatar,
            })}
            size={75}
            borderSize="4px"
          />
        </Flex>
        <Flex direction='row' justify='space-between' align='center' className={styles.expandableCardContent}>
          <Flex direction='column' justify='flex-start' gap='5px'>
            <Flex direction='row' justify='flex-start' align='center' gap='5px'>
              <P className={styles.expandabletitleText}>{ens}</P>
              {isCopied ? (
                <CopiedIcon width={15} height={15} />
              ) : (
                <CopyIcon
                  width={15}
                  height={15}
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard()
                  }}
                />
              )}
            </Flex>
            {records && records?.sanitizedRecords?.socials?.length > 0 && (
              <Flex className={styles.socialIconsContainer}>
                {records.sanitizedRecords.socials.map((social, index) =>
                  React.cloneElement(getTextRecordIcon(social.key), {
                    key: `${ens}-${index}-${social.key}`,
                    width: 15,
                    height: 15,
                  })
                )}
              </Flex>
            )}
          </Flex>
          {records?.sanitizedRecords.description &&
            <P className={styles.descriptionText}>{records?.sanitizedRecords.description}</P>
          }
        </Flex>
      </div>
    );
  }

  return (
    <ClickableItem
      style={style}
      title={<P className={styles.titleText}>{ens}</P>}
      subtitle={
        records &&
        records?.sanitizedRecords?.socials?.length > 0 && (
          <Flex className={styles.socialIconsContainer}>
            {records.sanitizedRecords.socials.map((social, index) =>
              React.cloneElement(getTextRecordIcon(social.key), {
                key: `${ens}-${index}-${social.key}`,
                width: 12,
                height: 12,
              })
            )}
          </Flex>
        )
      }
      className={styles.clickableItem}
      left={
        <Avatar
          src={sanitizeEnsImage({
            name: ens,
            chainId,
            image: records?.sanitizedRecords?.avatar,
          })}
        />
      }
      disabled={!isEns && !primaryName}
      onClick={() => handleEnsClick()}
    />
  );
};

JustEnsCard.displayName = 'JustEnsCard';

export default JustEnsCard;
