import { restCall } from '../../api/rest';
import { ApiKeyHeaders, IsSubnameAvailableRequest, IsSubnameAvailableResponse, SIWEHeaders, SubnameAddRequest, SubnameAddResponse, SubnameClaimRequest, SubnameClaimResponse, SubnameGetAllByAddressRequest, SubnameGetAllByAddressResponse, SubnameGetByDomainNameChainIdRequest, SubnameGetByDomainNameChainIdResponse, SubnameGetBySubnameRequest, SubnameGetBySubnameResponse, SubnameReserveRequest, SubnameReserveResponse, SubnameRevokeRequest, SubnameRevokeResponse, SubnameUpdateRequest, SubnameUpdateResponse } from '../../types';

export class Subnames {
  private readonly apiKey: string | undefined;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  async claimSubname(
    subname: SubnameClaimRequest,
    headers: SIWEHeaders,
    ):  Promise<SubnameClaimResponse> {
    return this.isNotReadOnlyMode(restCall(
      'ACCEPT_SUBNAME_ROUTE','POST',
      subname,
      {
        xApiKey: this.apiKey as string,
        ...headers
      }
    ))
  }

  async reserveSubname(
    subname: SubnameReserveRequest,
  ): Promise<SubnameReserveResponse> {
    return this.isNotReadOnlyMode(restCall(
      'RESERVE_SUBNAME_ROUTE','POST',
      subname,
      {
        xApiKey: this.apiKey as string
      }
    ))
  }

  async addSubname(
    subname: SubnameAddRequest,
    headers: SIWEHeaders,
  ): Promise<SubnameAddResponse> {
    return this.isNotReadOnlyMode(restCall(
      'ADD_SUBNAME_ROUTE','POST',
      subname,
      {
        xApiKey: this.apiKey as string,
        ...headers
      }
    ))
  }

  async updateSubname(
    subname: SubnameUpdateRequest,
    headers: SIWEHeaders,
  ): Promise<SubnameUpdateResponse> {
    return this.isNotReadOnlyMode(restCall(
      'UPDATE_SUBNAME_ROUTE','POST',
      subname,
      {
        xApiKey: this.apiKey as string,
        ...headers
      }
    ))
  }

  async revokeSubname(
    subname: SubnameRevokeRequest,
    headers: SIWEHeaders,
  ): Promise<SubnameRevokeResponse> {
    return this.isNotReadOnlyMode(restCall(
      'REVOKE_SUBNAME_ROUTE','POST',
      subname,
      {
        xApiKey: this.apiKey as string,
        ...headers
      }
    ))
  }

  async getByDomainNameChainId(
    subname: SubnameGetByDomainNameChainIdRequest,
  ): Promise<SubnameGetByDomainNameChainIdResponse> {
    return restCall(
      'GET_SUBNAME_BY_DOMAIN_NAME_CHAIN_ID_ROUTE','GET',
      subname,
    )
  }

  async getBySubname(
    subname: SubnameGetBySubnameRequest,
  ): Promise<SubnameGetBySubnameResponse> {
    return restCall(
      'GET_SUBNAME_BY_SUBNAME_ROUTE','GET',
      subname,
    )
  }

  async getAllByAddress(
    subname: SubnameGetAllByAddressRequest,
  ): Promise<SubnameGetAllByAddressResponse> {
    return restCall(
      'GET_ALL_SUBNAMES_BY_ADDRESS_ROUTE','GET',
      subname,
    )
  }

  async getInvitations(
    subname: SubnameGetAllByAddressRequest,
  ): Promise<SubnameGetAllByAddressResponse> {
    return restCall(
      'GET_ALL_SUBNAMES_BY_INVITATION_ROUTE','GET',
      subname,
    )
  }

  async checkSubnameAvailable(
    subname: IsSubnameAvailableRequest,
  ): Promise<IsSubnameAvailableResponse> {
    return restCall(
      'CHECK_SUBNAME_AVAILABILITY_ROUTE','GET',
      subname,
    )
  }


  private isNotReadOnlyMode<T>(callback: T): T {
    const check =  this.apiKey === undefined;
    if(check){
      throw new Error('This method is not available in read-only mode');
    }
    return callback;
  }
}