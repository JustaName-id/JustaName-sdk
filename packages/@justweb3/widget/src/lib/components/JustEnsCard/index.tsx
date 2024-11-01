'use client';
import React, { FC } from 'react';
import { ChainId } from '@justaname.id/sdk';
import { useJustWeb3 } from '../../providers';
import { useEnsAvatar, usePrimaryName, useRecords } from '@justaname.id/react';
import { Avatar, ClickableItem, Flex, formatText, P } from '@justweb3/ui';
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

  if (expanded) {
    return (
      <div className={styles.expandableCard}>
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
