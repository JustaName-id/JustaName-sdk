import { ChainId, EmptyHeaders, IRequest, IRoute, SubnameResponse } from '../common';

export interface SubnameRecordsRequest extends IRequest {
  ens: string;
  providerUrl: string;
}

export interface SubnameRecordsRoute extends IRoute<SubnameRecordsRequest, SubnameResponse, EmptyHeaders, 'providerUrl', never, { chainId?: ChainId}> {}