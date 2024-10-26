import { Divider, SPAN } from '../../ui';
import { FC } from 'react';
import styles from './OrLine.module.css'; // Import CSS module

export const OrLine: FC = () => {
  return (
    <div className={styles.orLineContainer}>
      <Divider />
      <SPAN className={styles.spanText}>Or</SPAN>
      <Divider />
    </div>
  );
};

export default OrLine;
