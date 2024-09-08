import { ChainId } from '../common';
import { SigninConfig } from '../signin';
import { SiweConfig } from '../siwe/siwe-config';

/**
 * Represents the configuration options available for initializing the application.
 *
 * This interface is designed to be flexible, allowing for future expansion with additional
 * configuration options as needed.
 *
 * @interface JustaNameConfig
 * @property {object} config - The configuration object.
 * @property {ChainId} config.chainId - Represents the chainId of the blockchain to be used.
 * @property {string} config.origin - Represents the origin of the request (e.g. the domain of the website).
 * @property {string} config.domain - Represents the ENS domain.
 * @property {SiweConfig} [config.subnameChallenge] - The subname challenge configuration.
 * @property {SigninConfig} [config.signIn] - The sign-in configuration.
 * @property {string} ensDomain - The ENS domain.
 * @property {string} providerUrl - The provider URL.
 * @property {string} [apiKey] - The API key.
 **/

export interface JustaNameConfig {
  config: {
    chainId: ChainId;
    origin: string;
    domain: string;
    subnameChallenge?:Omit<SiweConfig,'origin' | 'domain' | 'chainId'>;
    signIn?:SigninConfig
  };
  ensDomain: string;
  providerUrl: string;
  apiKey?: string;
}