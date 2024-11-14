import { Flex, LoadingSpinner } from '@justweb3/ui';
import { FC, useEffect, useRef, useState } from 'react';
import { POAP, usePoaps } from '../../hooks';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import POAPCard from '../PoapCard';
import styles from './POAPTab.module.css';

export interface POAPTabProps {
  address: string;
}

const ITEMS_PER_PAGE = 20;


export const POAPTab: FC<POAPTabProps> = ({ address }) => {
  const poapsRef = useRef<HTMLDivElement>(null);
  const [poapList, setPoapList] = useState<POAP[]>([]);

  const {
    poaps,
    isPoapsLoading,
  } = usePoaps({
    address: address
  });



  const fetchMorePoaps = () => {
    if (!poaps) return;
    if (poapList.length >= poaps.length) {
      return;
    }

    setTimeout(() => {
      setPoapList((prev) => [
        ...prev,
        ...poaps.slice(prev.length, prev.length + ITEMS_PER_PAGE)
      ]);
    }, 500);
  }

  useInfiniteScroll(
    poapsRef,
    fetchMorePoaps,
    !isPoapsLoading,
    50
  );


  useEffect(() => {
    if (poaps) {
      setPoapList(poaps?.slice(0, ITEMS_PER_PAGE));
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
        }}
        ref={poapsRef}
      >
        <Flex
          direction={'row'}
          gap={'20px'}
          wrap='wrap'
          padding='10px 0px 10px 0px'
          className={styles.poapListCard}
        >
          {poapList.length > 0 &&
            poapList.map((poap) => (
              <POAPCard key={poap.tokenId} poap={poap} />
            ))}
        </Flex>
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
