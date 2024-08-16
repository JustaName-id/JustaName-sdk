import { restCall } from '../../api/rest';
import { OffchainResolverResponse } from '../../types';

/**
 * Represents the OffchainResolvers class for interacting with the Offchain Resolvers API.
 * @public
 * @class
 * @classdesc Represents the OffchainResolvers class for interacting with the Offchain Resolvers API.
 * @example
 * ```typescript
 * import { JustaName } from '@justaname.id/sdk';
 *
 *  const justaName = JustaName.init();
 *
 *  const addedUser = await justaName.offchainResolvers.getAllOffchainResolvers();
 *
 *  ```
 */
export class OffchainResolvers {
  /**
   * Fetches all offchain resolvers.
   * @returns {Promise<OffchainResolverResponse[]>} The result of the fetching operation.
   */
  async getAllOffchainResolvers(): Promise<OffchainResolverResponse[]> {
    return restCall('OFFCHAIN_RESOLVERS_ROUTE', 'GET', {});
  }
}
