import { ChainId, EmptyHeaders, IRequest, IResponse, IRoute, SubnameResponse } from '../common';

export interface SubnameGetAllByAddressRequest extends IRequest {
  address: string;

  chainId: ChainId;

  coinType: number;

  isClaimed?: boolean;
}

export interface SubnameGetAllByAddressResponse extends IResponse {
  subnames: SubnameResponse[]
}

export interface SubnameGetAllByAddressRoute extends IRoute<SubnameGetAllByAddressRequest, SubnameGetAllByAddressResponse, EmptyHeaders, 'chainId' | 'coinType' | 'isClaimed'> {}