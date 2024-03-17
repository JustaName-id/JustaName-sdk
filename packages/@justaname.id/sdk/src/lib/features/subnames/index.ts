import { restCall } from '../../api/rest';
import { IsSubnameAvailableRequest, IsSubnameAvailableResponse, SIWEHeaders, SubnameAddRequest, SubnameAddResponse, SubnameClaimRequest, SubnameClaimResponse, SubnameGetAllByAddressRequest, SubnameGetAllByAddressResponse, SubnameGetByDomainNameChainIdRequest, SubnameGetByDomainNameChainIdResponse, SubnameGetBySubnameRequest, SubnameGetBySubnameResponse, SubnameReserveRequest, SubnameReserveResponse, SubnameRevokeRequest, SubnameRevokeResponse, SubnameUpdateRequest, SubnameUpdateResponse } from '../../types';

export class Subnames {
  private readonly apiKey: string | undefined;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  async claimSubname(
    params: SubnameClaimRequest,
    headers: SIWEHeaders,
    ):  Promise<SubnameClaimResponse> {
    return this.isNotReadOnlyMode(restCall(
      'ACCEPT_SUBNAME_ROUTE','POST',
      params,
      {
        xApiKey: this.apiKey as string,
        ...headers
      }
    ))
  }

  async reserveSubname(
    params: SubnameReserveRequest,
  ): Promise<SubnameReserveResponse> {
    return this.isNotReadOnlyMode(restCall(
      'RESERVE_SUBNAME_ROUTE','POST',
      params,
      {
        xApiKey: this.apiKey as string
      }
    ))
  }

  async addSubname(
    params: SubnameAddRequest,
    headers: SIWEHeaders,
  ): Promise<SubnameAddResponse> {
    return this.isNotReadOnlyMode(restCall(
      'ADD_SUBNAME_ROUTE','POST',
      {
        text: [],
        addresses: [{
          coinType: 60,
          address: headers.xAddress
        }],
        contentHash: '',
        ...params
      },
      {
        xApiKey: this.apiKey as string,
        ...headers
      }
    ))
  }

  async updateSubname(
    params: SubnameUpdateRequest,
    headers: SIWEHeaders,
  ): Promise<SubnameUpdateResponse> {
    return this.isNotReadOnlyMode(restCall(
      'UPDATE_SUBNAME_ROUTE','POST',
      params,
      {
        xApiKey: this.apiKey as string,
        ...headers
      }
    ))
  }

  async revokeSubname(
    params: SubnameRevokeRequest,
    headers: SIWEHeaders,
  ): Promise<SubnameRevokeResponse> {
    return this.isNotReadOnlyMode(restCall(
      'REVOKE_SUBNAME_ROUTE','POST',
      params,
      {
        xApiKey: this.apiKey as string,
        ...headers
      }
    ))
  }

  async getByDomainNameChainId(
    params: SubnameGetByDomainNameChainIdRequest,
  ): Promise<SubnameGetByDomainNameChainIdResponse> {
    return restCall(
      'GET_SUBNAME_BY_DOMAIN_NAME_CHAIN_ID_ROUTE','GET',
      params,
    )
  }

  async getBySubname(
    params: SubnameGetBySubnameRequest,
  ): Promise<SubnameGetBySubnameResponse> {
    return restCall(
      'GET_SUBNAME_BY_SUBNAME_ROUTE','GET',
      params,
    )
  }

  async getAllByAddress(
    params: SubnameGetAllByAddressRequest,
  ): Promise<SubnameGetAllByAddressResponse[]> {
    return restCall(
      'GET_ALL_SUBNAMES_BY_ADDRESS_ROUTE','GET',
      params,
    )
  }

  async getInvitations(
    params: SubnameGetAllByAddressRequest,
  ): Promise<SubnameGetAllByAddressResponse[]> {
    return restCall(
      'GET_ALL_SUBNAMES_BY_INVITATION_ROUTE','GET',
      params,
    )
  }

  async checkSubnameAvailable(
    params: IsSubnameAvailableRequest,
  ): Promise<IsSubnameAvailableResponse> {
    return restCall(
      'CHECK_SUBNAME_AVAILABILITY_ROUTE','GET',
      params,
    )
  }


  private isNotReadOnlyMode<T>(callback: T): T {
    console.log(this.apiKey);
    const check =  this.apiKey === undefined;
    if(check){
      throw new Error('This method is not available in read-only mode');
    }
    return callback;
  }
}