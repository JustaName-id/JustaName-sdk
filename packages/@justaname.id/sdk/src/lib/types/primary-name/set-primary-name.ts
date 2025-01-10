import { ChainId, IRequest, IRoute } from '../common';
import { SIWEHeaders } from '../headers';
import { PrimaryNameGetByAddressResponse } from './get-primary-name-by-address';

export interface SetPrimaryNameRequest extends IRequest {
  name: string;

  address: string;

  chainId: ChainId;

  signature?: string;
}

export interface SetPrimaryNameRoute
  extends IRoute<
    SetPrimaryNameRequest,
    PrimaryNameGetByAddressResponse,
    SIWEHeaders,
    'chainId'
  > {}
