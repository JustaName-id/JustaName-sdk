import { restCall } from '../../api/rest';
import {
  IsSubnameAvailableRequest,
  IsSubnameAvailableResponse,
  SIWEHeaders,
  SubnameAcceptRequest,
  SubnameAcceptResponse,
  SubnameAddRequest,
  SubnameAddResponse,
  SubnameGetAllByAddressRequest,
  SubnameGetAllByAddressResponse,
  SubnameGetAllByDomainChainIdRequest,
  SubnameGetAllByDomainChainIdResponse,
  SubnameGetByDomainNameChainIdRequest,
  SubnameGetByDomainNameChainIdResponse,
  SubnameGetBySubnameRequest,
  SubnameGetBySubnameResponse,
  SubnameReserveRequest,
  SubnameReserveResponse,
  SubnameRevokeRequest,
  SubnameRevokeResponse,
  SubnameSearchRequest,
  SubnameSearchResponse,
  SubnameUpdateRequest,
  SubnameUpdateResponse,
  SubnameRecordsRequest,
  SubnameRecordsResponse,
  SubnameRejectRequest,
  SubnameRejectResponse,
} from '../../types';

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

  /**
   * Constructs a new instance of the Subnames class, optionally with an API key for write operations.
   * @param {string} [apiKey] - Your API key, required for operations that modify data.
   */
  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  /**
   * Accept a subname invite under a specific domain, associating it with an Ethereum address.
   * @param {SubnameAcceptRequest} params - Parameters for claiming a subname.
   * @param {SIWEHeaders} headers - Additional headers for signing and authentication.
   * @returns {Promise<SubnameAcceptResponse>} The result of the claim operation.
   */
  async acceptSubname(
    params: SubnameAcceptRequest,
    headers: SIWEHeaders
  ): Promise<SubnameAcceptResponse> {
    return restCall('ACCEPT_SUBNAME_ROUTE', 'POST', params, {
        ...headers,
      })

  }

  /**
   * Reserves a subname for later claiming. This can be useful for securing a subname
   * before it is officially registered or claimed. Requires an API key.
   * @param {SubnameReserveRequest} params - The parameters for the reservation.
   * @returns {Promise<SubnameReserveResponse>} The result of the reservation operation.
   */
  async reserveSubname(
    params: SubnameReserveRequest
  ): Promise<SubnameReserveResponse> {
    return this.isNotReadOnlyMode(
      restCall('RESERVE_SUBNAME_ROUTE', 'POST', params, {
        xApiKey: this.apiKey as string,
      })
    );
  }

  /**
   * Adds a new subname under a domain, directly associating it with an address and optional content.
   * Requires an API key.
   * @param {SubnameAddRequest} params - The parameters for adding the subname.
   * @param {SIWEHeaders} headers - Additional headers for signing and authentication.
   * @returns {Promise<SubnameAddResponse>} The result of the add operation.
   */
  async addSubname(
    params: SubnameAddRequest,
    headers: SIWEHeaders
  ): Promise<SubnameAddResponse> {
    return this.isNotReadOnlyMode(
      restCall(
        'ADD_SUBNAME_ROUTE',
        'POST',
        {
          text: [],
          addresses: [
            {
              coinType: 60,
              address: headers.xAddress,
            },
          ],
          contentHash: '',
          ...params,
        },
        {
          xApiKey: this.apiKey as string,
          ...headers,
        }
      )
    );
  }

  /**
   * Updates the details of an existing subname. This operation can be used to change the associated
   * address or the content of a subname. Requires an API key.
   * @param {SubnameUpdateRequest} params - The parameters for updating the subname.
   * @param {SIWEHeaders} headers - Additional headers for signing and authentication.
   * @returns {Promise<SubnameUpdateResponse>} The result of the update operation.
   */
  async updateSubname(
    params: SubnameUpdateRequest,
    headers: SIWEHeaders
  ): Promise<SubnameUpdateResponse> {
    return restCall('UPDATE_SUBNAME_ROUTE', 'POST', params, {
        ...headers,
      })

  }

  /**
   * Revokes a subname, removing its association and optionally freeing it for re-registration.
   * Requires an API key.
   * @param {SubnameRevokeRequest} params - The parameters for revoking the subname.
   * @param {SIWEHeaders} headers - Additional headers for signing and authentication.
   * @returns {Promise<SubnameRevokeResponse>} The result of the revoke operation.
   */
  async revokeSubname(
    params: SubnameRevokeRequest,
    headers: SIWEHeaders
  ): Promise<SubnameRevokeResponse> {
    return this.isNotReadOnlyMode(
      restCall('REVOKE_SUBNAME_ROUTE', 'POST', params, {
        xApiKey: this.apiKey as string,
        ...headers,
      })
    );
  }

  /**
   * Rejects a subname, removing its association and optionally freeing it for re-registration.
   * @param {SubnameRejectRequest} params - The parameters for rejecting the subname.
   * @param {SIWEHeaders} headers - Additional headers for signing and authentication.
   * @returns {Promise<SubnameRejectResponse>} The result of the revoke operation.
   */
  async rejectSubname(
    params: SubnameRejectRequest,
    headers: SIWEHeaders
  ): Promise<SubnameRejectResponse> {
    return restCall('REJECT_SUBNAME_ROUTE', 'POST', params, {
        ...headers,
      });
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
   * @param {SubnameRecordsRequest} params - Parameters for retrieving subname records.
   * @returns {Promise<SubnameRecordsResponse>} The records associated with the subname.
   */
  async getRecordsByFullName(
    params: SubnameRecordsRequest
  ): Promise<SubnameRecordsResponse> {
    return restCall('RECORDS_BY_FULLNAME_ROUTE', 'GET', params);
  }

  /**
   * Ensures that the method is not called in read-only mode, throwing an error if an API key is not provided.
   * @private
   * @param {T} callback - The operation to be performed.
   * @returns {T} The result of the callback operation if an API key is present.
   * @throws {Error} If called in read-only mode without an API key.
   */
  private isNotReadOnlyMode<T>(callback: T): T {
    const check = this.apiKey === undefined;
    if (check) {
      throw new Error('This method is not available in read-only mode');
    }
    return callback;
  }
}
