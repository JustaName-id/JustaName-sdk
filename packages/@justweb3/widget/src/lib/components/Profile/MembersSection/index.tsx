import { useEnsSubnames } from '@justaname.id/react';
import { ChainId } from '@justaname.id/sdk';
import { LoadingSpinner } from '@justweb3/ui';
import React, { useEffect, useRef } from 'react';
import JustEnsCard from '../../JustEnsCard';
import styles from './MembersSection.module.css';
;

export interface MembersSectionProps {
  fullSubname: string;
  chainId: 1 | 11155111 | undefined;
}

const MembersSection: React.FC<MembersSectionProps> = ({
  fullSubname,
  chainId = 1,
}) => {

  const scrollContainerRef = useRef<HTMLDivElement>(null); // Add a ref for the scrollable container

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useEnsSubnames({
    ensDomain: decodeURIComponent(fullSubname),
    chainId: chainId as ChainId,
    isClaimed: true,
    limit: 12,
  });


  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 200
      ) {
        if (!isFetching && hasNextPage) {
          fetchNextPage();
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isFetching, hasNextPage]);

  return (
    <div className={styles.container}>
      <div className={styles.grid} ref={scrollContainerRef}>
        {data?.pages
          .flatMap((subnameData) => subnameData.data).flatMap((sub) => sub.ens)
          .map((subname) => (
            <div key={`display-record-members-${subname}`}>
              <JustEnsCard
                addressOrEns={subname}
                expanded
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          ))}
      </div>
      {isFetching && <div className={styles.loadingContainer}>
        <LoadingSpinner color={'var(--justweb3-primary-color)'} />
      </div>
      }
    </div>
  );
};

export default MembersSection;
