import { chains } from '@justaname.id/react-ui';

export const getChainIcon = (chain: string): JSX.Element => {
  const Icon = chains[chain.toLowerCase() as keyof typeof chains];

  if (Icon) {
    return <Icon width={24} height={24} />;
  }

  return (<div style={{
    backgroundColor: 'white',
    borderColor: 'black',
    display: 'flex',
    height: '24px',
    width: '24px',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    border: '1px solid'
  }}>?</div>)
}
