import { ChainId, JustaNameConfig } from '@justaname.id/sdk';

const chainId = parseInt(process.env.JUSTANAME_CHAIN_ID as string) as ChainId;
const apiKey = process.env.JUSTANAME_API_KEY as string;
const providerUrl = process.env.JUSTANAME_PROVIDER_URL as string;
const sepoliaProviderUrl = process.env.JUSTANAME_SEPOLIA_PROVIDER_URL as string;
const ensDomain = process.env.JUSTANAME_ENS_DOMAIN as string;
const dev = process.env.JUSTANAME_DEV === 'true';
export const config: JustaNameConfig = {
  networks: [
    {
      chainId: 1,
      providerUrl,
    },
    {
      chainId: 11155111,
      providerUrl: sepoliaProviderUrl,
    },
  ],
  defaultChainId: chainId,
  ensDomains: [
    {
      chainId,
      ensDomain,
      apiKey,
    },
  ],
  dev,
};
