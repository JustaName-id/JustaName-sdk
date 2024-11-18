import { P, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@justweb3/ui';
import React from 'react';
import { POAP } from '../../hooks';

interface POAPCardProps {
  poap: POAP;
}

const POAPCard: React.FC<POAPCardProps> = ({ poap }) => {
  return (
    <a href={`https://collectors.poap.xyz/token/${poap.event.id}`} target="_blank" rel="noopener noreferrer">
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
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
          </TooltipTrigger>
          <TooltipContent style={{ zIndex: 9999 }}>
            <P style={{
              fontSize: '9px',
              fontWeight: 900,
              lineHeight: '150%',
              color: 'inherit'
            }}>#{poap.event.id}</P>
            <P style={{
              fontSize: '10px',
              fontWeight: 400,
              lineHeight: '150%',
              color: 'inherit'
            }}>{poap.event.name}</P>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </a>

  );
};

export default POAPCard;
