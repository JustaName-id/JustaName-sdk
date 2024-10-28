import { FC, ReactNode } from 'react';
import { P } from '@justweb3/ui';
import styles from './ProfileSection.module.css';

interface ProfileSectionProps {
  title: string;
  items: ReactNode[];
}

export const ProfileSection: FC<ProfileSectionProps> = ({
  title,
  items,
}) => {
  return (
    <div className={styles.sectionCard}>
      <P>{title}</P>
      <div className={`${styles.sectionItemList} justweb3scrollbar`}>
        {items.map((item, index) => (
          <div key={index} className={styles.sectionItem}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}