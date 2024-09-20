import { JustaName } from '../../../src';
import dotenv from 'dotenv';
dotenv.config();

const PROVIDER_URL = process.env['SDK_PROVIDER_URL'] as string;
const DOMAIN = 'justaname.id';
const URI = 'https://' + DOMAIN;
const ENS_DOMAIN = process.env['SDK_ENS_DOMAIN'] as string;
const CHAIN_ID = 11155111;
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
      chainId: CHAIN_ID,
      subnameChallenge:{
        ttl: VALID_TTL,
      },
      signIn:{
        ttl: VALID_TTL
      }
    },
    ensDomain: ENS_DOMAIN,
    apiKey: apiKey,
    providerUrl: PROVIDER_URL
  });
}