import React from 'react';
import styles from './POAPCard.module.css';
import FlipCard from '../FlipCard';
import { POAP } from '../../hooks';
import { CalendarClockIcon, CalendarMonthIcon, Flex, LocationOnIcon, P } from '@justweb3/ui';

interface POAPCardProps {
    poap: POAP;
}

const POAPCard: React.FC<POAPCardProps> = ({ poap }) => {
    return (
        // <FlipCard
        //     cardClassName={`${styles.card}`}
        //     frontCardStyle={{
        //         width: 190,
        //         height: 280
        //     }}
        //     backCardStyle={{
        //         width: 189,
        //         height: 280,
        //         maxWidth: 190,
        //     }}
        //     frontContent={
        //         <div className={styles.frontContainer}>
        //             <img
        //                 src={poap.event.image_url}
        //                 alt={poap.event.name}
        //                 className={styles.imageBackground}
        //             />
        //             <div className={styles.overlay}>
        //                 <div className={styles.imageContainer}>
        //                     <img
        //                         src={poap.event.image_url}
        //                         alt={poap.event.name}
        //                         width={126}
        //                         height={126}
        //                         className={styles.profileImage}
        //                     />
        //                 </div>
        //                 <div className={styles.textContainer}>
        //                     <div className={styles.innerTextContainer}>
        //                         <P className={styles.textPrimary}>{poap.event.id}</P>
        //                         <P className={styles.eventName}>{poap.event.name}</P>
        //                     </div>
        //                     <div className={styles.iconRow}>
        //                         <div className={styles.iconItem}>
        //                             <LocationOnIcon width={10} height={10} />
        //                             <P className={styles.iconText}>{poap.event.city}</P>
        //                         </div>
        //                         <div className={styles.iconItem}>
        //                             <CalendarMonthIcon width={10} height={10} />
        //                             <P className={styles.iconText}>{poap.event.start_date}</P>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div >
        //     }
        //     backContent={
        //         <Flex direction='column' className={styles.backContainer} >
        //             <div className={styles.backHeader}>
        //                 <P className={styles.yearText}>{poap.event.year}</P>
        //                 <div className={styles.nameRow}>
        //                     <P className={styles.eventNameBack}>{poap.event.name}</P>
        //                 </div>
        //                 <P className={styles.eventIdText}>#{poap.event.id}</P>
        //             </div>
        //             <P className={styles.description}>{poap.event.description}</P>
        //             <div className={styles.backInfo}>
        //                 <div className={styles.iconItem}>
        //                     <LocationOnIcon width={10} height={10} />
        //                     <P className={styles.iconText}>{`${poap.event.country}, ${poap.event.city}`}</P>
        //                 </div>
        //                 <div className={styles.iconItem}>
        //                     <CalendarMonthIcon width={10} height={10} />
        //                     <P className={styles.iconText}>{`${poap.event.start_date} - ${poap.event.end_date}`}</P>
        //                 </div>
        //                 <div className={styles.iconItem}>
        //                     <CalendarClockIcon width={10} height={10} />
        //                     <P className={styles.iconText}>{`Expires ${poap.event.expiry_date}`}</P>
        //                 </div>
        //             </div>
        //         </Flex >
        //     }
        // />
        <a href={`https://collectors.poap.xyz/token/${poap.event.id}`} >
            <img
                src={poap.event.image_url}
                alt={poap.event.name}
                width={60}
                height={60}
                style={{
                    background: `url(${poap.event.image_url})`
                }}
                className={styles.poapCard}
            />
        </a>

    );
};

export default POAPCard;
