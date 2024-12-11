import { useEnsSubnames } from '@justaname.id/react';
import { ChainId } from '@justaname.id/sdk';
import { LoadingSpinner } from '@justweb3/ui';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import JustEnsCard from '../../JustEnsCard';
import styles from './MembersSection.module.css';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';

export interface MembersSectionProps {
  fullSubname: string;
  chainId: 1 | 11155111 | undefined;
}

const MembersSection: React.FC<MembersSectionProps> = ({
  fullSubname,
  chainId = 1,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data, hasNextPage, fetchNextPage, isPending, isFetching } =
    useEnsSubnames({
      ensDomain: decodeURIComponent(fullSubname),
      chainId: chainId as ChainId,
      isClaimed: true,
      limit: 30,
      enabled: fullSubname.split('.').length === 2,
    });

  const [nbOfCardsPerRow, setNbOfCardsPerRow] = useState(0);
  const subnames = useMemo(() => {
    return data?.pages
      .flatMap((subnameData) => subnameData.data)
      .flatMap((sub) => sub.ens);
  }, [data]);

  const subnameRecords = useMemo(() => {
    return data?.pages.flatMap((subnameData) => subnameData.data);
  }, [data]);

  useEffect(() => {
    const element = scrollContainerRef.current;

    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          const width = entry.contentRect.width;
          let nbOfCardsPerRowTemp = Math.floor(width / 335);
          if (nbOfCardsPerRowTemp < 1) {
            nbOfCardsPerRowTemp = 1;
          }
          setNbOfCardsPerRow(nbOfCardsPerRowTemp);
        }
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.unobserve(element); // Cleanup observer on unmount
    };
  }, []);

  useInfiniteScroll(
    scrollContainerRef,
    fetchNextPage,
    !(isPending || isFetching) && hasNextPage,
    50
  );

  // useStandardRecordsBatch({
  //   enses: subnames,
  //   chainId: chainId as ChainId,
  // });

  return (
    <div className={styles.container} ref={scrollContainerRef}>
      {subnames?.map((subname) => (
        <div
          key={`display-record-members-${fullSubname}-${subname}`}
          className={styles.memberCard}
        >
          <JustEnsCard
            containerRef={scrollContainerRef}
            addressOrEns={subname}
            style={{ width: '100%' }}
            chainId={chainId}
            prefetchedRecords={subnameRecords?.find(
              (record) => record.ens === subname
            )}
            // skipFetch
          />
        </div>
      ))}

      {subnames &&
        subnames?.length > 0 &&
        Array.from(
          {
            length:
              nbOfCardsPerRow - (subnames?.length % nbOfCardsPerRow) ===
              nbOfCardsPerRow
                ? 0
                : nbOfCardsPerRow - (subnames?.length % nbOfCardsPerRow),
          },
          (_, i) => (
            <div
              key={`display-record-members-${fullSubname}-${i}`}
              className={styles.memberCard}
            >
              <div style={{ width: '100%' }} />
            </div>
          )
        )}
      {(isPending || isFetching) && (
        <div className={styles.loadingContainer}>
          <LoadingSpinner color={'var(--justweb3-primary-color)'} />
        </div>
      )}
    </div>
  );
};

export default MembersSection;
