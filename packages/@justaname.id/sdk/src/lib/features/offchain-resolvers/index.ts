import { restCall } from '../../api/rest';
import { OffchainResolversGetAllRoute } from '../../types';


export class OffchainResolvers {

  async getAllOffchainResolvers(): Promise<OffchainResolversGetAllRoute['response']> {
    return restCall('GET_ALL_OFFCHAIN_RESOLVERS_ROUTE', 'GET', {});
  }
}
