import { useStats } from '../../hooks';
import { FC, useEffect, useState } from 'react';
import { Flex, LoadingSpinner, P } from '@justweb3/ui';
import { FollowingTab } from '../FollowingTab';
import { FollowersTab } from '../FollowersTab';

export interface EFPTabProps {
  ens: string;
}

export const EFPTab: FC<EFPTabProps> = ({ ens }) => {
  const [tab, setTab] = useState<
    'following' | 'followers' | 'none' | 'loading'
  >('loading');

  const { stats, isStatsLoading } = useStats({
    addressOrEns: ens,
  });

  useEffect(() => {
    if (isStatsLoading) return;

    if (stats && parseInt(stats?.following_count) > 0) {
      setTab('following');
    } else if (stats && parseInt(stats?.followers_count) > 0) {
      setTab('followers');
    } else {
      setTab('none');
    }
  }, [stats, isStatsLoading]);

  // if (isStatsLoading) {
  //   return (
  //     <Flex
  //       style={{
  //         maxHeight: '100%',
  //         height: '100%',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         position: 'relative',
  //       }}
  //     >
  //       <LoadingSpinner color={'var(--justweb3-primary-color)'} />
  //     </Flex>
  //   );
  // }

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
            cursor:
              stats && parseInt(stats?.following_count) > 0
                ? 'pointer'
                : 'not-allowed',
            border: 'none',
            opacity: stats && parseInt(stats?.following_count) > 0 ? 1 : 0.5,
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
            cursor:
              stats && parseInt(stats?.followers_count) > 0
                ? 'pointer'
                : 'not-allowed',
            border: 'none',
            opacity: stats && parseInt(stats?.followers_count) > 0 ? 1 : 0.5,
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

      {tab === 'following' && <FollowingTab ens={ens} />}

      {tab === 'followers' && <FollowersTab ens={ens} />}

      {tab === 'none' && (
        <Flex
          style={{
            height: '100%',
            minHeight: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <P
            style={{
              fontFamily: 'var(--justweb3-font-family)',
              color: 'var(--justweb3-primary-color)',
              fontSize: '32px',
              fontWeight: 700,
            }}
          >
            No Followers or Following found
          </P>
        </Flex>
      )}

      {tab === 'loading' && (
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
