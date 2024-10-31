import React from 'react';
import styles from './Divider.module.css'; // Import the CSS module

export const Divider: React.FC = () => {
  return <hr className={styles.divider} />;
};

export default Divider;
