import { Divider, SPAN } from '../../ui';
import { FC } from 'react';

export const OrLine: FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <Divider />
      <SPAN
        style={{
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 900,
        }}
      >
        Or
      </SPAN>
      <Divider />
    </div>
  );
}