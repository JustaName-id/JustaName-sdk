import React from 'react';
import styles from './NotificationBadge.module.css';
import { SPAN } from '../Text';

interface NotificationBadgeProps {
  count: number;
  icon?: React.ReactNode;
  maxCount?: number;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  icon,
  maxCount = 99,
}) => {
  return (
    <div className={styles.notificationIcon}>
      {/*<div className={styles.icon}>{icon}</div>*/}
      {icon}
      {/*{count > 0 && <SPAN className={styles.badge}>{count}</SPAN>}*/}
      {count > 0 && (
        <SPAN className={styles.badge}>
          {count > maxCount ? `${maxCount}+` : count}
        </SPAN>
      )}
    </div>
  );
};

export default NotificationBadge;
