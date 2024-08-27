import { ChainId, JustaNameConfig } from '@justaname.id/sdk';

const chainId = parseInt(process.env.JUSTANAME_CHAIN_ID as string) as ChainId;
const domain = process.env.JUSTANAME_DOMAIN as string;
const origin = process.env.JUSTANAME_ORIGIN as string;
const apiKey = process.env.JUSTANAME_API_KEY as string;
const providerUrl = process.env.JUSTANAME_PROVIDER_URL as string;

export const config: JustaNameConfig = {
  apiKey,
  providerUrl: providerUrl,
  config:{
    siwe: {
      chainId,
      domain,
      origin,
      ttl: 30 * 60 * 1000
    }
  }
}