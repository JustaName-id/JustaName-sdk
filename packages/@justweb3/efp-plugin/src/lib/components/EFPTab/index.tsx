import { useFollowing } from '../../hooks/useFollowing';
import { useFollowers, useStats } from '../../hooks';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Flex, LoadingSpinner, P } from '@justweb3/ui';
import { JustEnsCard, useInfiniteScroll } from '@justweb3/widget';

export interface EFPTabProps {
  ens: string;
}

export const EFPTab: FC<EFPTabProps> = ({ ens }) => {
  const [tab, setTab] = useState<'following' | 'followers'>('following');
  const followingContainerRef = useRef<HTMLDivElement>(null);
  const followersContainerRef = useRef<HTMLDivElement>(null);

  const {
    following,
    fetchMoreFollowing,
    isFollowingLoading,
    isFollowingFetching,
    hasMoreFollowing,
  } = useFollowing({
    addressOrEns: ens,
  });

  const followingFlat = useMemo(() => {
    return following?.pages.flatMap((follow) => follow.following);
  }, [following]);

  const {
    followers,
    fetchMoreFollowers,
    isFollowersLoading,
    isFollowersFetching,
    hasMoreFollowers,
  } = useFollowers({
    addressOrEns: ens,
  });

  const followersFlat = useMemo(() => {
    return followers?.pages.flatMap((follow) => follow.followers);
  }, [followers]);

  useInfiniteScroll(
    followersContainerRef,
    fetchMoreFollowers,
    tab === 'followers' && !isFollowersLoading && hasMoreFollowers,
    50
  );

  useInfiniteScroll(
    followingContainerRef,
    fetchMoreFollowing,
    tab === 'following' && !isFollowingLoading && hasMoreFollowing,
    50
  );

  const { stats, isStatsLoading } = useStats({
    addressOrEns: ens,
  });

  const [nbOfCardsPerFollowingRow, setNbOfCardsPerFollowingRow] = useState(0);
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
  }, [followingContainerRef, isStatsLoading, tab]);

  const [nbOfCardsPerFollowersRow, setNbOfCardsPerFollowersRow] = useState(0);
  useEffect(() => {
    const element = followersContainerRef.current;

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
      resizeObserver.unobserve(element);
    };
  }, [followersContainerRef, isStatsLoading, tab]);

  if (isStatsLoading) {
    return (
      <Flex
        style={{
          maxHeight: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <LoadingSpinner color={'var(--justweb3-primary-color)'} />
      </Flex>
    );
  }

  return (
    <Flex
      gap={'10px'}
      direction={'column'}
      style={{
        maxHeight: '100%',
        height: '100%',
      }}
    >
      <Flex gap={'10px'}>
        <button
          style={{
            position: 'relative',
            borderRadius: '100px',
            padding: '5px 7px',
            display: 'flex',
            gap: '10px',
            cursor: 'pointer',
            border: 'none',
          }}
          onClick={() => setTab('following')}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                tab === 'following'
                  ? 'var(--justweb3-primary-color)'
                  : 'var(--justweb3-foreground-color-4)',
              borderRadius: '100px',
              opacity: 0.25,
            }}
          />
          <P
            style={{
              color: 'var(--justweb3-primary-color)',
              fontWeight: '700',
            }}
          >
            Following
          </P>

          <P
            style={{
              color: 'var(--justweb3-foreground-color-2)',
              fontWeight: '700',
            }}
          >
            {stats?.following_count}
          </P>
        </button>

        <button
          style={{
            position: 'relative',
            borderRadius: '100px',
            padding: '5px 7px',
            display: 'flex',
            gap: '10px',
            cursor: 'pointer',
            border: 'none',
          }}
          onClick={() => setTab('followers')}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                tab === 'followers'
                  ? 'var(--justweb3-primary-color)'
                  : 'var(--justweb3-foreground-color-4)',
              borderRadius: '100px',
              opacity: 0.25,
            }}
          />
          <P
            style={{
              color: 'var(--justweb3-primary-color)',
              fontWeight: '700',
            }}
          >
            Followers
          </P>

          <P
            style={{
              color: 'var(--justweb3-foreground-color-2)',
              fontWeight: '700',
            }}
          >
            {stats?.followers_count}
          </P>
        </button>
      </Flex>

      {tab === 'following' && (
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
              key={`display-following-members-${ens}-${follow.data}`}
              style={{
                minWidth: '335px',
                flex: 1,
                width: '100%',
              }}
            >
              <JustEnsCard
                addressOrEns={follow.data}
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
                  key={`display-following-members-${ens}-${i}`}
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
      )}

      {tab === 'followers' && (
        <Flex
          gap={'10px'}
          style={{
            overflow: 'auto',
            overflowX: 'hidden',
            maxHeight: 'calc(100% - 37px)',
          }}
          wrap={'wrap'}
          ref={followersContainerRef}
        >
          {followersFlat?.map((follow) => (
            <div
              key={`display-followers-members-${ens}-${follow.address}`}
              style={{
                minWidth: '335px',
                flex: 1,
                width: '100%',
              }}
            >
              <JustEnsCard
                addressOrEns={follow.address}
                style={{ width: '100%' }}
              />
            </div>
          ))}

          {followersFlat &&
            followersFlat?.length > 0 &&
            Array.from(
              {
                length:
                  nbOfCardsPerFollowersRow -
                    (followersFlat?.length % nbOfCardsPerFollowersRow) ===
                  nbOfCardsPerFollowersRow
                    ? 0
                    : nbOfCardsPerFollowersRow -
                      (followersFlat?.length % nbOfCardsPerFollowersRow),
              },
              (_, i) => (
                <div
                  key={`display-followers-members-${ens}-${i}`}
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
          {isFollowersFetching && hasMoreFollowers && (
            <Flex
              style={{
                height: '50px',
                minHeight: '50px',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                width: '100%',
              }}
            >
              <LoadingSpinner color={'var(--justweb3-primary-color)'} />
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  );
};
