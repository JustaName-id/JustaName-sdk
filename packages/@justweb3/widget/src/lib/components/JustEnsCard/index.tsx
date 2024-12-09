'use client';
import React, { FC } from 'react';
import { ChainId } from '@justaname.id/sdk';
import { useJustWeb3 } from '../../providers';
import {
  Records,
  useEnsAvatar,
  usePrimaryName,
  useRecords,
} from '@justaname.id/react';
import {
  Avatar,
  ClickableItem,
  CopiedIcon,
  CopyIcon,
  Flex,
  formatText,
  LoadingSpinner,
  P,
} from '@justweb3/ui';
import { getTextRecordIcon } from '../../icons/records-icons';
import styles from './JustEnsCard.module.css';
import useInView from '../../hooks/useInView';
import { Address } from 'viem'; // Import CSS module

export interface JustEnsCardProps {
  addressOrEns: string;
  chainId?: ChainId;
  expanded?: boolean;
  style?: React.CSSProperties;
  containerRef?: React.RefObject<HTMLDivElement>;
  // skipQueue?: boolean;
  prefetchedRecords?: Records;
  skipInViewFetch?: boolean;
  skipFetch?: boolean;
  loading?: boolean;
}

export const JustEnsCard: FC<JustEnsCardProps> = ({
  addressOrEns,
  chainId = 1,
  expanded = false,
  style,
  containerRef,
  // skipQueue,
  prefetchedRecords,
  skipFetch,
  skipInViewFetch = false,
  loading,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, containerRef);
  const { openEnsProfile } = useJustWeb3();
  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  const isEns = addressOrEns?.includes('.');
  const { primaryName, isPrimaryNameFetching } = usePrimaryName({
    address: isEns ? undefined : (addressOrEns as Address),
    chainId,
    enabled: skipFetch ? false : skipInViewFetch ? false : inView,
  });

  const ens =
    (isEns ? addressOrEns : primaryName) || formatText(addressOrEns, 4);

  const { records: ensRecords, isRecordsFetching } = useRecords({
    ens: isEns ? addressOrEns : primaryName,
    chainId,
    // standard: true,
    enabled: skipFetch
      ? false
      : prefetchedRecords
      ? false
      : skipInViewFetch
      ? false
      : inView,
  });

  const records = prefetchedRecords || ensRecords;

  // const { records: allRecords } = useRecords({
  //   ens: isEns ? addressOrEns : primaryName,
  //   chainId,
  //   enabled: skipInViewFetch || inView,
  //   skipQueue: skipInViewFetch,
  // });

  // const records = standardRecords || allRecords;

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
      <div
        style={style}
        ref={ref}
        className={styles.expandableCard}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleEnsClick();
        }}
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
            src={
              loading || isPrimaryNameFetching || isRecordsFetching ? (
                <LoadingSpinner
                  color={'var(--justweb3-primary-color)'}
                  size={35}
                />
              ) : (
                sanitizeEnsImage({
                  name: ens,
                  chainId,
                  image: records?.sanitizedRecords?.avatar,
                })
              )
            }
            size={75}
            borderSize="4px"
          />
        </Flex>
        <Flex
          direction="row"
          justify="space-between"
          align="center"
          className={styles.expandableCardContent}
        >
          <Flex direction="column" justify="flex-start" gap="5px">
            <Flex direction="row" justify="flex-start" align="center" gap="5px">
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
                    copyToClipboard();
                  }}
                />
              )}
            </Flex>
            {records && records?.sanitizedRecords?.socials?.length > 0 ? (
              <Flex className={styles.socialIconsContainer}>
                {records.sanitizedRecords.socials.map((social, index) =>
                  React.cloneElement(getTextRecordIcon(social.key), {
                    key: `${ens}-${index}-${social.key}`,
                    width: 15,
                    height: 15,
                  })
                )}
              </Flex>
            ) : (
              <div style={{ height: 15, width: '100%' }} />
            )}
          </Flex>
          {records?.sanitizedRecords.description && (
            <P className={styles.descriptionText}>
              {records?.sanitizedRecords.description}
            </P>
          )}
        </Flex>
      </div>
    );
  }

  return (
    <ClickableItem
      ref={ref}
      style={style}
      title={<P className={styles.titleText}>{ens}</P>}
      subtitle={
        records &&
        records?.sanitizedRecords?.socials?.length > 0 && (
          <Flex className={styles.socialIconsContainer}>
            {records.sanitizedRecords.socials.map((social, index) =>
              React.cloneElement(getTextRecordIcon(social.key), {
                key: `${ens}-${index}-${social.key}`,
                className: styles.socialIcon,
              })
            )}
          </Flex>
        )
      }
      className={styles.clickableItem}
      left={
        loading || isPrimaryNameFetching || isRecordsFetching ? (
          <div
            style={{
              height: '32px',
              width: '32px',
              position: 'relative',
            }}
          >
            <LoadingSpinner color={'var(--justweb3-primary-color)'} />
          </div>
        ) : (
          <Avatar
            src={sanitizeEnsImage({
              name: ens,
              chainId,
              image: records?.sanitizedRecords?.avatar,
            })}
          />
        )
      }
      disabled={!isEns && !primaryName}
      onClick={(event) => {
        handleEnsClick();
        event.stopPropagation();
        event.preventDefault();
      }}
    />
  );
};

JustEnsCard.displayName = 'JustEnsCard';

export default JustEnsCard;
