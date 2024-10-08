import { ChainId, EmptyHeaders, IRequest, IRoute, SubnameResponse } from '../common';

export interface SubnameGetBySubnameRequest extends IRequest {
  subname: string;
  chainId: ChainId;
}

export interface SubnameGetBySubnameRoute extends IRoute<SubnameGetBySubnameRequest, SubnameResponse, EmptyHeaders, 'chainId'> {}