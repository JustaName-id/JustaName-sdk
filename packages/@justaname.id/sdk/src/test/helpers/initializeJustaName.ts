import { JustaName } from '../../../src';
import dotenv from 'dotenv';
dotenv.config();

const PROVIDER_URL = process.env['PROVIDER_URL'] as string;
const DOMAIN = 'justaname.id';
const URI = 'https://' + DOMAIN;
const CHAIN_ID = 1;
const VALID_TTL = 60 * 60 * 24 * 1000; // 1 day

/**
 * Initializes the JustaName service with the provided API key.
 * @param {string} apiKey - The API key for authenticating with the JustaName service.
 * @returns {JustaName} An instance of the JustaName service.
 */
export const initializeJustaName =  (apiKey: string) => {
  return JustaName.init({
    config:{
      siwe:{
        domain: DOMAIN,
        origin: URI,
        chainId: CHAIN_ID,
        ttl: VALID_TTL,
      }
    },
    apiKey: apiKey,
    providerUrl: PROVIDER_URL
  });
}