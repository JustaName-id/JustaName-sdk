import { useFollowing } from '../../hooks/useFollowing';
import { useFollowers, useStats } from '../../hooks';
import { FC, Fragment, useRef, useState } from 'react';
import { Flex, LoadingSpinner, P } from '@justweb3/ui';
import { JustEnsCard } from '@justweb3/widget';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

export interface EFPTabProps {
  ens: string;
}

export const EFPTab: FC<EFPTabProps> = ({ ens }) => {
  const [tab, setTab] = useState<'following' | 'followers'>('following');
  const followingRef = useRef<HTMLDivElement>(null);
  const followersRef = useRef<HTMLDivElement>(null);

  const {
    following,
    fetchMoreFollowing,
    isFollowingLoading,
    isFollowingFetching,
    hasMoreFollowing,
  } = useFollowing({
    addressOrEns: ens,
  });

  const {
    followers,
    fetchMoreFollowers,
    isFollowersLoading,
    isFollowersFetching,
    hasMoreFollowers,
  } = useFollowers({
    addressOrEns: ens,
  });

  useInfiniteScroll(
    followersRef,
    fetchMoreFollowers,
    tab === 'followers' && !isFollowersLoading && hasMoreFollowers,
    50
  );

  useInfiniteScroll(
    followingRef,
    fetchMoreFollowing,
    tab === 'following' && !isFollowingLoading && hasMoreFollowing,
    50
  );

  const { stats, isStatsLoading } = useStats({
    addressOrEns: ens,
  });

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
          direction={'column'}
          gap={'10px'}
          style={{
            overflow: 'auto',
            maxHeight: 'calc(100% - 37px)',
          }}
          ref={followingRef}
        >
          {following?.pages
            .flatMap((follow) => follow.following)
            .map((follow) => (
              <Fragment key={ens + follow.data}>
                <JustEnsCard
                  addressOrEns={follow.data}
                  chainId={1}
                  style={{
                    width: '100%',
                  }}
                />
              </Fragment>
            ))}

          {isFollowingFetching && hasMoreFollowing && (
            <Flex
              style={{
                height: '50px',
                minHeight: '50px',
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
          direction={'column'}
          gap={'10px'}
          style={{
            overflow: 'auto',
            maxHeight: 'calc(100% - 37px)',
          }}
          ref={followersRef}
        >
          {followers?.pages
            .flatMap((follow) => follow.followers)
            .map((follow) => (
              <Fragment key={ens + follow.address}>
                <JustEnsCard
                  addressOrEns={follow.address}
                  chainId={1}
                  style={{
                    width: '100%',
                  }}
                />
              </Fragment>
            ))}

          {isFollowersFetching && hasMoreFollowers && (
            <Flex
              style={{
                height: '50px',
                minHeight: '50px',
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
    </Flex>
  );
};
