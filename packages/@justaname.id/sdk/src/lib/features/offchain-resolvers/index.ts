import { restCall } from '../../api/rest';
import { OffchainResolversGetAllRoute } from '../../types';

export interface OffchainResolversParams {
  dev?: boolean;
}

export class OffchainResolvers {

  private readonly dev: boolean;

  constructor(params: OffchainResolversParams) {
    this.dev = params.dev || false;
  }


  async getAllOffchainResolvers(): Promise<OffchainResolversGetAllRoute['response']> {
    return restCall('GET_ALL_OFFCHAIN_RESOLVERS_ROUTE', 'GET', {}, {}, this.dev);
  }
}
