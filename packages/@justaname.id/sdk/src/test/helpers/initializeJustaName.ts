import { ChainId, JustaName } from '../../../src';
import dotenv from 'dotenv';

dotenv.config();

const SEPOLIA_PROVIDER_URL = process.env['SDK_SEPOLIA_PROVIDER_URL'] as string;
const MAINNET_PROVIDER_URL = process.env['SDK_MAINNET_PROVIDER_URL'] as string;
const DOMAIN = 'justaname.id';
const URI = 'https://' + DOMAIN;
const ENS_DOMAIN = process.env['SDK_ENS_DOMAIN'] as string;
const CHAIN_ID = parseInt(process.env['SDK_CHAIN_ID'] as string) as ChainId;
const VALID_TTL = 60 * 60 * 24 * 1000; // 1 day
const JUSTANAME_ENV = process.env['SDK_JUSTANAME_DEV'] === 'true';
/**
 * Initializes the JustaName service with the provided API key.
 * @param {string} apiKey - The API key for authenticating with the JustaName service.
 * @returns {JustaName} An instance of the JustaName service.
 */
export const initializeJustaName = (apiKey: string) => {
  return JustaName.init({
    dev: JUSTANAME_ENV,
    config: {
      domain: DOMAIN,
      origin: URI,
      subnameChallengeTtl: VALID_TTL,
      signInTtl: VALID_TTL,
    },
    defaultChainId: CHAIN_ID,
    ensDomains: [
      {
        ensDomain: ENS_DOMAIN,
        chainId: CHAIN_ID,
        apiKey: apiKey,
      },
    ],
    networks: [
      {
        chainId: 1,
        providerUrl: MAINNET_PROVIDER_URL,
      },
      {
        chainId: 11155111,
        providerUrl: SEPOLIA_PROVIDER_URL,
      },
    ],
  });
};
