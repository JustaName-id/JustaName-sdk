import React from 'react';
import { POAP } from '../../hooks';

interface POAPCardProps {
    poap: POAP;
}

const POAPCard: React.FC<POAPCardProps> = ({ poap }) => {
    return (
        <a href={`https://collectors.poap.xyz/token/${poap.event.id}`} target="_blank" rel="noopener noreferrer">
            <img
                src={poap.event.image_url}
                alt={poap.event.name}
                width={60}
                height={60}
                style={{
                    background: `url(${poap.event.image_url})`,
                    outline: '4px solid var(--justweb3-foreground-color-4)',
                    borderRadius: '50%',
                    boxShadow: '0px 0px 10px 0px var(--justweb3-foreground-color-2)',
                    cursor: 'pointer'
                }}
            />
        </a>

    );
};

export default POAPCard;
