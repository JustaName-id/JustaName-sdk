import { ChainId, EmptyHeaders, IRequest, IRoute, SubnameResponse } from '../common';

export interface SubnameGetInvitationsByAddressRequest extends IRequest {
  address: string;

  chainId: ChainId;

  coinType: number;

  isClaimed: boolean;

}

export interface SubnameGetInvitationsByAddressResponse  {
  subnames: SubnameResponse[]
}

export interface SubnameGetInvitationsByAddressRoute extends IRoute<SubnameGetInvitationsByAddressRequest, SubnameGetInvitationsByAddressResponse, EmptyHeaders, 'chainId' | 'coinType', 'isClaimed' > {}