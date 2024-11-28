import {
  Avatar,
  P,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@justweb3/ui';
import React from 'react';
import { POAP } from '../../types';

interface POAPCardProps {
  poap: POAP;
}

const POAPCard: React.FC<POAPCardProps> = ({ poap }) => {
  return (
    <a
      href={`https://collectors.poap.xyz/token/${poap.tokenId}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        width: '64px',
        height: '64px',
      }}
    >
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Avatar
                src={poap.event.image_url + '?size=xsmall'}
                alt={poap.event.name}
                size={64}
                borderSize={'4px'}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent style={{ zIndex: 9999 }}>
            <P
              style={{
                fontSize: '9px',
                fontWeight: 900,
                lineHeight: '150%',
                color: 'inherit',
              }}
            >
              #{poap.event.id}
            </P>
            <P
              style={{
                fontSize: '10px',
                fontWeight: 400,
                lineHeight: '150%',
                color: 'inherit',
              }}
            >
              {poap.event.name}
            </P>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </a>
  );
};

export default POAPCard;
