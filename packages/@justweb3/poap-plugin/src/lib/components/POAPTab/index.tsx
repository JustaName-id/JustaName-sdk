import { Flex, LoadingSpinner, P } from '@justweb3/ui';
import { FC, Fragment, useEffect, useState } from 'react';
import { usePoaps } from '../../hooks';
import { POAP } from '../../types';
import POAPCard from '../PoapCard';

type GroupedPoaps = {
  [key: string]: POAP[];
};

const formatMonthYear = (date: string) => {
  const d = new Date(date);
  return d.toLocaleString('default', { month: 'long', year: 'numeric' });
};

const groupPoapsByMonth = (poaps: POAP[]): GroupedPoaps => {
  return poaps.reduce((acc: GroupedPoaps, poap) => {
    const monthYear = formatMonthYear(poap.created.toString());
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(poap);
    return acc;
  }, {});
};

export interface POAPTabProps {
  address: string;
  apiKey?: string;
  backendUrl?: string;
}

export const POAPTab: FC<POAPTabProps> = ({ address, apiKey, backendUrl }) => {
  const [groupedPoaps, setGroupedPoaps] = useState<GroupedPoaps>({});
  const [displayedMonths, setDisplayedMonths] = useState<string[]>([]);

  const { poaps, isPoapsLoading } = usePoaps({
    address,
    apiKey,
    backendUrl,
  });

  useEffect(() => {
    if (poaps) {
      const sortedPoaps = [...poaps].sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
      );

      const grouped = groupPoapsByMonth(sortedPoaps);
      setGroupedPoaps(grouped);

      const allMonths = Object.keys(grouped).sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime()
      );
      setDisplayedMonths(allMonths);
    }
  }, [poaps]);

  if (isPoapsLoading) {
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
      <Flex
        direction={'column'}
        gap={'10px'}
        style={{
          overflow: 'auto',
          maxHeight: '100%',
          paddingRight: '5px',
        }}
      >
        {displayedMonths.map((monthYear) => (
          <Flex
            key={monthYear}
            direction={'column'}
            padding="10px"
            gap={'10px'}
            style={{
              borderRadius: '10px',
              border: '1px solid var(--justweb3-foreground-color-4)',
            }}
          >
            <P
              style={{
                fontFamily: 'var(--justweb3-font-family)',
                color: 'var(--justweb3-foreground-color-2)',
                fontSize: '12px',
                fontWeight: 300,
              }}
            >
              {monthYear}
            </P>
            <div
              style={{
                display: 'grid',
                gridTemplateRows: 'auto',
                gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))',
                gap: '20px',
              }}
            >
              {groupedPoaps[monthYear]?.map((poap) => (
                <Fragment key={poap.tokenId + address}>
                  <POAPCard poap={poap} />
                </Fragment>
              ))}
            </div>
          </Flex>
        ))}
        {isPoapsLoading && (
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
    </Flex>
  );
};
