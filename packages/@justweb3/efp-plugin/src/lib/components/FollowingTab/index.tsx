import { JustEnsCard, useInfiniteScroll } from '@justweb3/widget';
import { Flex, LoadingSpinner } from '@justweb3/ui';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFollowing } from '../../hooks';
import {
  usePrimaryNameBatch,
  useStandardRecordsBatch,
} from '@justaname.id/react';

export interface FollowingTabProps {
  ens: string;
  address: string;
}
export const FollowingTab: React.FC<FollowingTabProps> = ({ ens, address }) => {
  const [nbOfCardsPerFollowingRow, setNbOfCardsPerFollowingRow] = useState(0);
  const followingContainerRef = useRef<HTMLDivElement>(null);
  const {
    following,
    fetchMoreFollowing,
    isFollowingLoading,
    isFollowingFetching,
    hasMoreFollowing,
  } = useFollowing({
    addressOrEns: address,
  });

  const followingFlat = useMemo(() => {
    return following?.pages.flatMap((follow) => follow.following);
  }, [following]);

  const followingFlatLastPage = useMemo(() => {
    return following?.pages[following?.pages.length - 1].following;
  }, [following]);

  const {
    allPrimaryNames: allFollowingPrimaryNames,
    primaryNames: followingPrimaryNames,
  } = usePrimaryNameBatch({
    addresses: followingFlatLastPage?.map(
      (following) => following.data
    ) as `0x${string}`[],
    chainId: 1,
  });

  const { allRecordsBatch: followingRecordsBatch } = useStandardRecordsBatch({
    enses: followingPrimaryNames
      ? (Object.values(followingPrimaryNames).filter(
          (name) => name !== null
        ) as string[])
      : [],
    chainId: 1,
  });

  useInfiniteScroll(
    followingContainerRef,
    fetchMoreFollowing,
    !isFollowingLoading && hasMoreFollowing,
    50
  );

  useEffect(() => {
    const element = followingContainerRef.current;

    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          const width = entry.contentRect.width;
          let nbOfCardsPerRowTemp = Math.floor(width / 335);
          if (nbOfCardsPerRowTemp < 1) {
            nbOfCardsPerRowTemp = 1;
          }
          setNbOfCardsPerFollowingRow(nbOfCardsPerRowTemp);
        }
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.unobserve(element); // Cleanup observer on unmount
    };
  }, [followingContainerRef]);

  return (
    <Flex
      gap={'10px'}
      style={{
        overflow: 'auto',
        maxHeight: 'calc(100% - 37px)',
        overflowX: 'hidden',
      }}
      wrap={'wrap'}
      ref={followingContainerRef}
    >
      {followingFlat?.map((follow) => (
        <div
          key={`display-following-members-${ens}-${address}-${follow.data}`}
          style={{
            minWidth: '335px',
            flex: 1,
            width: '100%',
          }}
        >
          <JustEnsCard
            containerRef={followingContainerRef}
            addressOrEns={
              allFollowingPrimaryNames?.[follow.data] || follow.data
            }
            prefetchedRecords={
              followingRecordsBatch?.[
                allFollowingPrimaryNames?.[follow.data] || follow.data
              ]
            }
            loading={
              Boolean(allFollowingPrimaryNames?.[follow.data]) &&
              followingRecordsBatch?.[
                allFollowingPrimaryNames?.[follow.data] || follow.data
              ] === undefined
            }
            skipFetch
            style={{ width: '100%' }}
          />
        </div>
      ))}

      {followingFlat &&
        followingFlat?.length > 0 &&
        Array.from(
          {
            length:
              nbOfCardsPerFollowingRow -
                (followingFlat?.length % nbOfCardsPerFollowingRow) ===
              nbOfCardsPerFollowingRow
                ? 0
                : nbOfCardsPerFollowingRow -
                  (followingFlat?.length % nbOfCardsPerFollowingRow),
          },
          (_, i) => (
            <div
              key={`display-following-members-${ens}-${address}-${i}`}
              style={{
                minWidth: '335px',
                flex: 1,
                width: '100%',
              }}
            >
              <div style={{ width: '100%', height: '100%' }} />
            </div>
          )
        )}
      {isFollowingFetching && hasMoreFollowing && (
        <Flex
          style={{
            height: '50px',
            minHeight: '50px',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <LoadingSpinner color={'var(--justweb3-primary-color)'} />
        </Flex>
      )}
    </Flex>
  );
};
