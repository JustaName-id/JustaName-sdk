import { EmptyHeaders, IResponse, IRoute } from '../common';
import { OffchainResolverResponse } from '../common/offchain-resolver.response';

export interface OffchainResolverGetAllRequest {}

export interface OffchainResolverGetAllResponse extends IResponse {
  offchainResolvers: OffchainResolverResponse[];
}

export interface OffchainResolversGetAllRoute extends IRoute<OffchainResolverGetAllRequest, OffchainResolverGetAllResponse, EmptyHeaders> {}