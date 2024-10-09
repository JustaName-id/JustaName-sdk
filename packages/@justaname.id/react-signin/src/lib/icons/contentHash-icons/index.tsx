import { contentHash } from '@justaname.id/react-ui';

const contentHashToProtocols = {
  ipfs: ['ipfs', 'ipns'],
  swarm: ['bzz'],
  onion: ['onion', 'onion3'],
  skynet: ['sia'],
  arweave: ['arweave', 'ar'],
}

export const getContentHashIcon = (contentHashProtocol: string): JSX.Element => {

  const protocol = Object.keys(contentHashToProtocols).find(key =>
    contentHashToProtocols[key as keyof typeof contentHashToProtocols].includes(contentHashProtocol as any)
  )

  if (protocol) {
    const Icon = contentHash[protocol as keyof typeof contentHash]

    if (Icon) {
      return <Icon width={24} height={24} style={{minWidth:"24px"}} />;
    }
  }

  return <div style={{
    backgroundColor: 'white',
    borderColor: 'black',
    display: 'flex',
    height: '24px',
    width: '24px',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    border: '1px solid'
  }}>?</div>
}
