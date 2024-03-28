import { Configuration } from '../types';
import { Siwe, Subnames } from '../features';
import { restCall } from '../api/rest';

/**
 * The main class for the JustaName SDK.
 * @public
 * @class
 * @classdesc The main class for the JustaName SDK.
 * @example
 * ```typescript
 * import { JustaName } from 'justaname-sdk';
 *
 * const configuration = {
 *  apiKey: 'your-api-key'
 *  };
 *
 *  const justaName = await JustaName.init(configuration);
 *
 *  const requestChallengeResponse = await justaName.siwe.requestChallenge({
 *  chainId: 1,
 *  origin: 'http://localhost:3333',
 *  address: '0x59c44836630760F97b74b569B379ca94c37B93ca',
 *  domain: 'justaname.id',
 *  ttl?: 120000,
 *  });
 *
 *  ```
 */
export class JustaName {
  siwe: Siwe;

  /**
   * The subnames feature.
   * @public
   * @type {Subnames}
   * @memberof JustaName
   **/
  subnames: Subnames;

  constructor(
    siwe: Siwe,
    subnames: Subnames
  ) {
    this.siwe = siwe;
    this.subnames = subnames;
  }

  /**
   * Initializes the JustaName SDK.
   * @param {Configuration} configuration - The configuration object.
   * @returns {Promise<JustaName>} - A promise that resolves with the JustaName SDK.
   * @throws {Error} - If the API key is not present or if the API key is invalid.
   * @public
   * @static
   */
  static async init(configuration: Configuration): Promise<JustaName> {
    if (configuration.apiKey){
      this.checkApiKey(configuration.apiKey);
      await this.healthCheck(configuration.apiKey);
    }

    const subnames = !configuration.apiKey ? new Subnames() : new Subnames(configuration.apiKey);
    return new JustaName(new Siwe(), subnames);
  }


  /**
   * Checks if the API key is present.
   * @throws {Error} - If the API key is not present.
   * @private
   * @static
   */
  private static checkApiKey(apiKey: string) {
    if (!apiKey) {
      throw new Error('API key is required');
    }
  }

  /**
   * Checks the health of the API.
   * @returns {Promise<void>} - A promise that resolves if the API is healthy.
   * @throws {Error} - If the API key is invalid.
   * @private
   * @static
   * @async
   */
  private static async healthCheck(apiKey: string): Promise<void> {
    await restCall('HEALTH_CHECK_ROUTE', 'GET', { }, {
      xApiKey: apiKey
    })
  }
}