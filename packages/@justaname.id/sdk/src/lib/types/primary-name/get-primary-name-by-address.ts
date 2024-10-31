import { ChainId, EmptyHeaders, IRequest, IResponse, IRoute } from '../common';

export interface PrimaryNameGetByAddressRequest extends IRequest {
  address: string;

  chainId: ChainId;
}

export interface PrimaryNameGetByAddressResponse extends IResponse {
  id: string;
  name: string;
  address: string;
  nameHash: string;
  chainId: ChainId;
}

export interface PrimaryNameGetByAddressRoute
  extends IRoute<
    PrimaryNameGetByAddressRequest,
    PrimaryNameGetByAddressResponse,
    EmptyHeaders,
    'chainId'
  > {}
