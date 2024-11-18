import { Flex, LoadingSpinner, P } from '@justweb3/ui';
import { FC, useEffect, useRef, useState } from 'react';
import { POAP, usePoaps } from '../../hooks';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
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
  const poapsRef = useRef<HTMLDivElement>(null);
  const [groupedPoaps, setGroupedPoaps] = useState<GroupedPoaps>({});
  const [displayedMonths, setDisplayedMonths] = useState<string[]>([]);

  const { poaps, isPoapsLoading } = usePoaps({
    address,
    apiKey,
    backendUrl
  });

  console.log("poaps", poaps);

  useEffect(() => {
    if (poaps) {
      const sortedPoaps = [...poaps].sort((a, b) =>
        new Date(b.created).getTime() - new Date(a.created).getTime()
      );

      const grouped = groupPoapsByMonth(sortedPoaps);
      setGroupedPoaps(grouped);

      const allMonths = Object.keys(grouped).sort((a, b) =>
        new Date(b).getTime() - new Date(a).getTime()
      );
      setDisplayedMonths(allMonths.slice(0, 3));
    }
  }, [poaps]);

  const fetchMorePoaps = () => {
    console.log("groupedPoaps", groupedPoaps);
    if (!groupedPoaps) return;

    const allMonths = Object.keys(groupedPoaps).sort((a, b) =>
      new Date(b).getTime() - new Date(a).getTime()
    );
    console.log(displayedMonths, allMonths);
    if (displayedMonths.length >= allMonths.length) return;

    setTimeout(() => {
      setDisplayedMonths(prev => [
        ...prev,
        ...allMonths.slice(prev.length, prev.length + 1)
      ]);
    }, 500);
  };

  useInfiniteScroll(
    poapsRef,
    fetchMorePoaps,
    !isPoapsLoading,
    50
  );

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
        ref={poapsRef}
      >
        {displayedMonths.map((monthYear) => (
          <Flex
            key={monthYear}
            direction={'column'}
            padding='10px'
            gap={'10px'}
            style={{
              borderRadius: '10px',
              border: '1px solid #F2F2F2',
            }}
          >
            <P style={{
              fontFamily: 'var(--justweb3-font-family)',
              color: 'var(--justweb3-foreground-color-2)',
              fontSize: '12px',
              fontWeight: 300,
            }}>{monthYear}</P>
            <Flex
              direction={'row'}
              gap={'20px'}
              wrap='wrap'
              padding='0px 10px 10px 5px'
              justify='flex-start'
            >
              {groupedPoaps[monthYear]?.map((poap) => (
                <POAPCard key={poap.tokenId} poap={poap} />
              ))}
            </Flex>
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
