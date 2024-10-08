import { ChainId, JustaName } from '../../../src';
import dotenv from 'dotenv';
dotenv.config();

const PROVIDER_URL = process.env['SDK_PROVIDER_URL'] as string;
const DOMAIN = 'justaname.id';
const URI = 'https://' + DOMAIN;
const ENS_DOMAIN = process.env['SDK_ENS_DOMAIN'] as string;
const CHAIN_ID = parseInt(process.env['SDK_CHAIN_ID'] as string) as ChainId
const VALID_TTL = 60 * 60 * 24 * 1000; // 1 day

/**
 * Initializes the JustaName service with the provided API key.
 * @param {string} apiKey - The API key for authenticating with the JustaName service.
 * @returns {JustaName} An instance of the JustaName service.
 */
export const initializeJustaName =  (apiKey: string) => {
  return JustaName.init({
    config:{
      domain: DOMAIN,
      origin: URI,
      subnameChallengeTtl: VALID_TTL,
      signInTtl: VALID_TTL
    },
    ensDomains: [
      {
        ensDomain: ENS_DOMAIN,
        chainId: CHAIN_ID
      }
    ],
    apiKey: apiKey,
    networks: [
      {
        chainId: CHAIN_ID,
        providerUrl: PROVIDER_URL
      }
    ]
  });
}