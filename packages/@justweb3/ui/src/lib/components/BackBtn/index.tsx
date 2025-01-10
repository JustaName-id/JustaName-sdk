import { FC } from 'react';
import { ArrowIcon } from '../../icons';
import styles from './BackBtn.module.css';

interface BackBtnProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
}

export const BackBtn: FC<BackBtnProps> = ({ onClick, style }) => {
  return (
    <div className={styles.btnCard} onClick={onClick} style={style}>
      <ArrowIcon
        width={16}
        color={'var(--justweb3-foreground-color-2)'}
        style={{

          transform: 'rotate(180deg)',
        }}
      />
    </div>
  );
};

export default BackBtn;
