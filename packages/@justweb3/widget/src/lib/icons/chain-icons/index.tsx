import { chains } from '@justweb3/ui';

export const getChainIcon = (chain: string, size?: number): JSX.Element => {
  const Icon = chains[chain.toLowerCase() as keyof typeof chains];

  if (Icon) {
    return <Icon width={size ?? 24} height={size ?? 24} />;
  }

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderColor: 'black',
        display: 'flex',
        height: `${size ?? 24}px`,
        width: `${size ?? 24}px`,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: '50%',
      }}
    >
      ?
    </div>
  );
};
