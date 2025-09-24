import { JustEnsCard, useInfiniteScroll } from '@justweb3/widget';
import { Flex, LoadingSpinner } from '@justweb3/ui';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFollowers } from '../../hooks';
import {
  usePrimaryNameBatch,
  useStandardRecordsBatch,
} from '@justaname.id/react';

export interface FollowersTabProps {
  ens: string;
  address: string;
}

export const FollowersTab: React.FC<FollowersTabProps> = ({ ens, address }) => {
  const [nbOfCardsPerFollowersRow, setNbOfCardsPerFollowersRow] = useState(0);
  const followingContainerRef = useRef<HTMLDivElement>(null);
  const {
    followers,
    fetchMoreFollowers,
    isFollowersLoading,
    isFollowersFetching,
    hasMoreFollowers,
  } = useFollowers({
    addressOrEns: address,
  });

  const followingFlat = useMemo(() => {
    return followers?.pages.flatMap((follow) => follow.followers);
  }, [followers]);

  const followingFlatLastPage = useMemo(() => {
    return followers?.pages[followers?.pages.length - 1].followers;
  }, [followers]);

  const {
    allPrimaryNames: allFollowersPrimaryNames,
    primaryNames: followingPrimaryNames,
  } = usePrimaryNameBatch({
    addresses: followingFlatLastPage?.map(
      (following) => following.address
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
    fetchMoreFollowers,
    !isFollowersLoading && hasMoreFollowers,
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
          setNbOfCardsPerFollowersRow(nbOfCardsPerRowTemp);
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
          key={`display-following-members-${ens}-${address}-${follow.address}`}
          style={{
            minWidth: '335px',
            flex: 1,
            width: '100%',
          }}
        >
          <JustEnsCard
            containerRef={followingContainerRef}
            addressOrEns={
              allFollowersPrimaryNames?.[follow.address] || follow.address
            }
            prefetchedRecords={
              followingRecordsBatch?.[
                allFollowersPrimaryNames?.[follow.address] || follow.address
              ]
            }
            loading={
              Boolean(allFollowersPrimaryNames?.[follow.address]) &&
              followingRecordsBatch?.[
                allFollowersPrimaryNames?.[follow.address] || follow.address
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
              nbOfCardsPerFollowersRow -
                (followingFlat?.length % nbOfCardsPerFollowersRow) ===
              nbOfCardsPerFollowersRow
                ? 0
                : nbOfCardsPerFollowersRow -
                  (followingFlat?.length % nbOfCardsPerFollowersRow),
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
      {!followers ||
        (isFollowersFetching && hasMoreFollowers && (
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
        ))}
    </Flex>
  );
};
