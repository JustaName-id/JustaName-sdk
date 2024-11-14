import React from 'react';
import styles from './FlipCard.module.css';

interface FlipCardProps {
    frontContent: React.ReactNode;
    backContent: React.ReactNode;
    cardClassName?: string;
    frontCardStyle?: React.CSSProperties;
    backCardStyle?: React.CSSProperties;
}

const FlipCard: React.FC<FlipCardProps> = ({
    frontContent,
    backContent,
    cardClassName,
    frontCardStyle,
    backCardStyle
}) => {
    return (
        <div className={`${styles.flipCard} ${cardClassName || ''}`}>
            <div className={styles.flipCardInner}>
                <div className={styles.flipCardFront} style={frontCardStyle}>{frontContent}</div>
                <div className={styles.flipCardBack} style={backCardStyle}>{backContent}</div>
            </div>
        </div>
    );
};

export default FlipCard;
