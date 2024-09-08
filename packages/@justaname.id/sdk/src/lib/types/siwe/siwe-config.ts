import { ChainId } from '@justaname.id/sdk';

export interface SiweConfig {
  /**
   *  Represents the ENS domain
   *  @type {string}
   */
  domain: string;
  /**
   * Represents the origin of the request (e.g. the domain of the website).
   * @type {string}
   */
  origin: string;
  /**
   * Represents the chainId of the blockchain to be used.
   * @type {1 | 11155111}
   */
  chainId: ChainId;
  /**
   * Specifies the time-to-live (TTL) for a variable.
   * default: 120000 ms, 2 minutes ( 2 * 60 * 1000 )
   * @type {number}
   * @default 120000
   * @optional
   */
  ttl?: number;
}