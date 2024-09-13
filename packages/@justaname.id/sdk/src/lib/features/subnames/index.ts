import { restCall } from '../../api/rest';
import {
  IsSubnameAvailableRequest,
  IsSubnameAvailableResponse,
  SIWEHeaders,
  SubnameAcceptResponse,
  SubnameAddResponse,
  SubnameGetAllByAddressRequest,
  SubnameGetAllByAddressResponse,
  SubnameGetAllByDomainChainIdRequest,
  SubnameGetAllByDomainChainIdResponse,
  SubnameGetByDomainNameChainIdRequest,
  SubnameGetByDomainNameChainIdResponse,
  SubnameGetBySubnameRequest,
  SubnameGetBySubnameResponse,
  SubnameReserveResponse,
  SubnameRevokeResponse,
  SubnameSearchRequest,
  SubnameSearchResponse,
  SubnameUpdateResponse,
  SubnameRecordsResponse,
  SubnameRejectResponse,
  SubnameGetAllCommunitiesChainIdRequest,
  SubnameGetAllCommunitiesChainIdResponse,
  SubnameAcceptParams,
  SubnameReserveParams,
  SubnameAddParams,
  SubnameUpdateParams,
  SubnameRevokeParams,
  SubnameRejectParams,
  SubnameRecordsParams,
  ChainId, TextRecord, Address
} from '../../types';
import { ApiKeyRequiredException } from '../../errors/ApiKeyRequired.exception';

/**
 * Represents the Subnames class for interacting with the Subnames API.
 * @public
 * @class
 * @classdesc Represents the Subnames class for interacting with the Subnames API.
 * @example
 * ```typescript
 * import { JustaName } from '@justaname.id/sdk';
 *
 * const configuration = {
 *  apiKey: 'your-api-key'
 *  };
 *
 *  const justaName = JustaName.init(configuration);
 *
 *  const addedUser = await justaName.subnames.addSubname({
 *  username: 'test',
 *  ensDomain: 'test.eth',
 *  chainId: 1,
 *  },
 *  {
 *    xAddress: '0x59c44836630760F97b74b569B379ca94c37B93ca',
 *    xMessage: '...',
 *    xSignature: '...',
 * });
 *
 *  ```
 */
export class Subnames {
  private readonly apiKey: string | undefined;

  private readonly providerUrl: string;

  private readonly ensDomain: string;

  private readonly chainId: ChainId;

  /**
   * Constructs a new instance of the Subnames class, optionally with an API key for write operations.
   * @param providerUrl
   * @param ensDomain
   * @param chainId
   * @param {string} [apiKey] - Your API key, required for operations that modify data.
   */
  constructor(providerUrl: string, ensDomain: string, chainId: ChainId, apiKey?: string) {
    this.apiKey = apiKey;
    this.providerUrl = providerUrl;
    this.ensDomain = ensDomain;
    this.chainId = chainId;
  }

  /**
   * Accept a subname invite under a specific domain, associating it with an Ethereum address.
   * @param {SubnameAcceptParams} params - Parameters for claiming a subname.
   * @param {SIWEHeaders} headers - Additional headers for signing and authentication.
   * @returns {Promise<SubnameAcceptResponse>} The result of the claim operation.
   */
  async acceptSubname(
    params: SubnameAcceptParams,
    headers: SIWEHeaders
  ): Promise<SubnameAcceptResponse> {
    return restCall('ACCEPT_SUBNAME_ROUTE', 'POST', {
      chainId: this.chainId,
      ensDomain: this.ensDomain,
      ...params,
      ...this.transformTextAndAddressRecord(params.text, params.addresses),
    },
      {
        ...headers,
      })

  }

  /**
   * Reserves a subname for later claiming. This can be useful for securing a subname
   * before it is officially registered or claimed. Requires an API key.
   * @param {SubnameReserveParams} params - The parameters for the reservation.
   * @returns {Promise<SubnameReserveResponse>} The result of the reservation operation.
   */
  async reserveSubname(
    params: SubnameReserveParams,
  ): Promise<SubnameReserveResponse> {

    return this.isNotReadOnlyMode(
      () => restCall('RESERVE_SUBNAME_ROUTE', 'POST', {
        chainId: this.chainId,
        ensDomain: this.ensDomain,
        ...params
      }, {
        xApiKey: this.apiKey as string,
      })
    );
  }

  /**
   * Adds a new subname under a domain, directly associating it with an address and optional content.
   * Requires an API key.
   * @param {SubnameAddParams} params - The parameters for adding the subname.
   * @param {SIWEHeaders} headers - Additional headers for signing and authentication.
   * @returns {Promise<SubnameAddResponse>} The result of the add operation.
   */
  async addSubname(
    params: SubnameAddParams,
    headers: SIWEHeaders
  ): Promise<SubnameAddResponse> {
    return this.isNotReadOnlyMode(
       () =>restCall(
          'ADD_SUBNAME_ROUTE',
          'POST',
          {
            contentHash: '',
            chainId: this.chainId,
            ensDomain: this.ensDomain,
            ...params,
            ...this.transformTextAndAddressRecord(params.text, {
              ...params.addresses,
              '60': headers.xAddress
            })
          },
          {
            xApiKey: this.apiKey as string,
            ...headers
          }
        )
      );
  }

  /**
   * Updates the details of an existing subname. This operation can be used to change the associated
   * address or the content of a subname. Requires an API key.
   * @param {SubnameUpdateParams} params - The parameters for updating the subname.
   * @param {SIWEHeaders} headers - Additional headers for signing and authentication.
   * @returns {Promise<SubnameUpdateResponse>} The result of the update operation.
   */
  async updateSubname(
    params: SubnameUpdateParams,
    headers: SIWEHeaders
  ): Promise<SubnameUpdateResponse> {

    return restCall('UPDATE_SUBNAME_ROUTE', 'POST', {
      chainId: this.chainId,
      ensDomain: this.ensDomain,
      ...params,
      ...this.transformTextAndAddressRecord(params.text, params.addresses),
    }, {
        ...headers,
      })

  }

  /**
   * Revokes a subname, removing its association and optionally freeing it for re-registration.
   * Requires an API key.
   * @param {SubnameRevokeParams} params - The parameters for revoking the subname.
   * @param {SIWEHeaders} headers - Additional headers for signing and authentication.
   * @returns {Promise<SubnameRevokeResponse>} The result of the revoke operation.
   */
  async revokeSubname(
    params: SubnameRevokeParams,
    headers: SIWEHeaders
  ): Promise<SubnameRevokeResponse> {
    return this.isNotReadOnlyMode(
      () => restCall('REVOKE_SUBNAME_ROUTE', 'POST', {
        chainId: this.chainId,
        ensDomain: this.ensDomain,
        ...params
      }, {
        xApiKey: this.apiKey as string,
        ...headers,
      })
    );
  }

  /**
   * Rejects a subname, removing its association and optionally freeing it for re-registration.
   * @param {SubnameRejectParams} params - The parameters for rejecting the subname.
   * @param {SIWEHeaders} headers - Additional headers for signing and authentication.
   * @returns {Promise<SubnameRejectResponse>} The result of the revoke operation.
   */
  async rejectSubname(
    params: SubnameRejectParams,
    headers: SIWEHeaders
  ): Promise<SubnameRejectResponse> {
    return restCall('REJECT_SUBNAME_ROUTE', 'POST', {
        chainId: this.chainId,
        ensDomain: this.ensDomain,
        ...params
    }, {
        ...headers,
      });
  }

  /**
   * Retrieves all communities with the count of subnames in each community.
   * @param {SubnameGetAllCommunitiesChainIdRequest} params - The parameters for the lookup.
   * @returns {Promise<SubnameGetAllCommunitiesChainIdResponse>} The details of the subname, if found.
   */

  async getAllCommunities(
    params: SubnameGetAllCommunitiesChainIdRequest
  ): Promise<SubnameGetAllCommunitiesChainIdResponse> {
    return restCall('GET_ALL_COMMUNITIES_WITH_COUNT_ROUTE', 'GET', params);
  }

  /**
   * Retrieves details of a subname by its domain name and chain ID. This is a read-only
   * operation and does not require an API key.
   * @param {SubnameGetByDomainNameChainIdRequest} params - The parameters for the lookup.
   * @returns {Promise<SubnameGetByDomainNameChainIdResponse>} The details of the subname, if found.
   */
  async getByDomainNameChainId(
    params: SubnameGetByDomainNameChainIdRequest
  ): Promise<SubnameGetByDomainNameChainIdResponse> {
    return restCall('GET_SUBNAME_BY_DOMAIN_NAME_CHAIN_ID_ROUTE', 'GET', params);
  }

  /**
   * Retrieves details of a subname directly by its name. This is a read-only operation
   * and does not require an API key.
   * @param {SubnameGetBySubnameRequest} params - The parameters for the lookup.
   * @returns {Promise<SubnameGetBySubnameResponse>} The details of the subname, if found.
   */
  async getBySubname(
    params: SubnameGetBySubnameRequest
  ): Promise<SubnameGetBySubnameResponse> {
    return restCall('GET_SUBNAME_BY_SUBNAME_ROUTE', 'GET', params);
  }

  /**
   * Retrieves all subnames associated with a specific address. This can be useful for
   * users to see all subnames under their control. This is a read-only operation
   * and does not require an API key.
   * @param {SubnameGetAllByAddressRequest} params - The parameters for the lookup.
   * @returns {Promise<SubnameGetAllByAddressResponse[]>} A list of subnames associated with the address.
   */
  async getAllByAddress(
    params: SubnameGetAllByAddressRequest
  ): Promise<SubnameGetAllByAddressResponse[]> {
    return restCall('GET_ALL_SUBNAMES_BY_ADDRESS_ROUTE', 'GET', params);
  }

  async getCommunitySubnamesByDomain(
    params: SubnameGetAllByDomainChainIdRequest
  ): Promise<SubnameGetAllByDomainChainIdResponse> {
    return restCall('GET_ALL_SUBNAMES_BY_DOMAIN_ROUTE', 'GET', params);
  }

  async searchSubnames(
    params: SubnameSearchRequest
  ): Promise<SubnameSearchResponse> {
    return restCall('SEARCH_SUBNAMES_ROUTE', 'GET', params);
  }

  /**
   * Retrieves all subname invitations for a specific address. This allows users to see
   * any pending subname associations. This is a read-only operation and does not require an API key.
   * @param {SubnameGetAllByAddressRequest} params - The parameters for retrieving invitations.
   * @returns {Promise<SubnameGetAllByAddressResponse[]>} A list of subname invitations.
   */
  async getInvitations(
    params: SubnameGetAllByAddressRequest
  ): Promise<SubnameGetAllByAddressResponse[]> {
    return restCall('GET_ALL_SUBNAMES_BY_INVITATION_ROUTE', 'GET', params);
  }

  /**
   * Checks if a subname is available for registration.
   * This is a read-only operation and does not require an API key.
   * @param {IsSubnameAvailableRequest} params - Parameters for checking subname availability.
   * @returns {Promise<IsSubnameAvailableResponse>} Information about the subname's availability.
   */
  async checkSubnameAvailable(
    params: IsSubnameAvailableRequest
  ): Promise<IsSubnameAvailableResponse> {
    return restCall('CHECK_SUBNAME_AVAILABILITY_ROUTE', 'GET', params);
  }

  /**
   * Retrieves the records associated with a subname.
   * This is a read-only operation and does not require an API key.
   * @param {SubnameRecordsParams} params - Parameters for retrieving subname records.
   * @returns {Promise<SubnameRecordsResponse>} The records associated with the subname.
   */
  async getRecordsByFullName(
    params: SubnameRecordsParams
  ): Promise<SubnameRecordsResponse> {
    return restCall('RECORDS_BY_FULLNAME_ROUTE', 'GET', {
      providerUrl: this.providerUrl,
      chainId: this.chainId,
      ...params,
    });
  }

  transformTextAndAddressRecord(text: Record<string, string> | undefined, addresses: Record<string, string> | undefined): {
    text: TextRecord[];
    addresses: Address[];
  } {
    return {
      text: text ? this.jsonToArrayOfKeyValue(text, 'key', 'value') : [],
      addresses: addresses ?this.jsonToArrayOfKeyValue(addresses, 'coinType', 'address').map(
        (address) => ({
          coinType: parseInt(address.coinType),
          address: address.address,
        })
      ) : [],
    }
  }

  jsonToArrayOfKeyValue<T extends string, K extends string>(
    json: Record<string, string>,
    keyName: T,
    valueName: K
  ): Record<T | K, string>[] {
    return Object.entries(json).map(([key, value]) => ({
      [keyName]: key,
      [valueName]: value
    } as Record<T | K, string>));
  }

  /**
   * Ensures that the method is not called in read-only mode, throwing an error if an API key is not provided.
   * @private
   * @param {T} callback - The operation to be performed.
   * @returns {T} The result of the callback operation if an API key is present.
   * @throws {Error} If called in read-only mode without an API key.
   */
  private isNotReadOnlyMode<T>(callback: () => T): T {
    const check = this.apiKey === undefined;
    if (check) {
      throw ApiKeyRequiredException.apiKeyRequired()
    }
    return callback()
  }
}
