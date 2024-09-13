import { Divider, SPAN } from '../../ui';

export const OrLine: React.FC = () => {
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