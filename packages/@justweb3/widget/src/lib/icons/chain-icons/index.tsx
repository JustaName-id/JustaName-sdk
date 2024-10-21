import { chains } from '@justweb3/ui';

export const getChainIcon = (chain: string): JSX.Element => {
  const Icon = chains[chain.toLowerCase() as keyof typeof chains];

  if (Icon) {
    return <Icon width={24} height={24} />;
  }

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderColor: 'black',
        display: 'flex',
        height: '24px',
        width: '24px',
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
