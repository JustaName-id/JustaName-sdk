import { assertRestCall } from '../../api/rest';
import {
  IsSubnameAvailableResponse,
  SIWEHeaders,
  SubnameAcceptResponse,
  SubnameAddResponse,
  SubnameGetAllByAddressResponse,
  SubnameGetAllByDomainChainIdResponse,
  SubnameGetByDomainNameChainIdResponse,
  SubnameGetBySubnameResponse,
  SubnameReserveResponse,
  SubnameRevokeResponse,
  SubnameSearchResponse,
  SubnameUpdateResponse,
  SubnameRecordsResponse,
  SubnameRejectResponse,
  SubnameGetAllCommunitiesChainIdResponse,
  SubnameAcceptParams,
  SubnameReserveParams,
  SubnameAddParams,
  SubnameUpdateParams,
  SubnameRevokeParams,
  SubnameRejectParams,
  SubnameRecordsParams,
  ChainId,
  NetworksWithProvider,
  EnsDomainByChainId,
  SubnameGetAllByAddressParams,
  SubnameGetBySubnameParams,
  SubnameGetByDomainNameChainIdParams,
  SubnameGetAllCommunitiesChainIdParams,
  SubnameGetAllByDomainChainIdParams,
  SubnameSearchParams, IsSubnameAvailableParams
} from '../../types';
import { sanitizeTexts, sanitizeAddresses } from '../../utils';
import {
  SubnameGetInvitationsByAddressParams,
  SubnameGetInvitationsByAddressResponse
} from '../../types/subnames/get-invitations-by-address';
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

export interface SubnamesConfig {
  /**
   * Represents the API key.
   * @type {string}
   */
  apiKey?: string;
  /**
   * Represents the provider URL.
   * @type {string}
   */
  networks: NetworksWithProvider;
  /**
   * Represents the ENS ensDomain.
   * @type {string}
   */
  ensDomains?: EnsDomainByChainId[];
  /**
   * Represents the chainId of the blockchain to be used.
   * @type {1 | 11155111}
   */
  chainId: ChainId;
}

export class Subnames {
  private readonly apiKey?: string;

  private readonly networks: NetworksWithProvider;

  private readonly ensDomains?: EnsDomainByChainId[];

  private readonly chainId: ChainId;

  constructor(params: SubnamesConfig) {
    this.apiKey = params.apiKey;
    this.networks = params.networks;
    this.ensDomains = params.ensDomains;
    this.chainId = params.chainId;
  }

  async acceptSubname(
    params: SubnameAcceptParams,
    headers: SIWEHeaders
  ): Promise<SubnameAcceptResponse> {
    const { text, addresses, ensDomain, chainId,...rest } = params;

    const _chainId = chainId || this.chainId;
    const _ensDomain =
      ensDomain ||
      this.ensDomains?.find((ensDomain) => ensDomain.chainId === _chainId)?.ensDomain;

    return assertRestCall('ACCEPT_SUBNAME_ROUTE', 'POST', {
      chainId: _chainId,
      ensDomain: _ensDomain,
      text: sanitizeTexts(params.text),
      addresses: sanitizeAddresses(params.addresses),
      ...rest,
    }, headers)(['username','ensDomain','chainId'], ['xSignature','xMessage','xAddress'])
  }

  async reserveSubname(
    params: SubnameReserveParams,
  ): Promise<SubnameReserveResponse> {
    const { ensDomain, chainId, ...rest } = params;

    const _chainId = chainId || this.chainId;
    const _ensDomain =
      ensDomain ||
      this.ensDomains?.find((ensDomain) => ensDomain.chainId === _chainId)?.ensDomain

    return assertRestCall('RESERVE_SUBNAME_ROUTE', 'POST', {
        chainId: _chainId,
        ensDomain: _ensDomain,
        ...rest
      }, {
        xApiKey: this.apiKey,
      })(['ensDomain','chainId','ethAddress','username'], ['xApiKey'])
  }

  async addSubname(
    params: SubnameAddParams,
    headers: SIWEHeaders & { xApiKey?: string }
  ): Promise<SubnameAddResponse> {
    const { text, addresses, ensDomain, chainId, ...rest } = params;
    const sanitizedAddresses = sanitizeAddresses(params.addresses);
    const hasAddress60 = sanitizedAddresses?.some((address) => address.coinType === 60);

    const _chainId = chainId || this.chainId;
    const _ensDomain =
      ensDomain ||
      this.ensDomains?.find((ensDomain) => ensDomain.chainId === _chainId)?.ensDomain;

    return assertRestCall('ADD_SUBNAME_ROUTE', 'POST', {
      chainId: _chainId,
      ensDomain: _ensDomain,
      text: sanitizeTexts(params.text),
      addresses: hasAddress60 ? sanitizedAddresses : [
        {
          coinType: 60,
          address: headers.xAddress as string,
        },...(sanitizedAddresses === undefined ? [] : sanitizedAddresses)
        ],
      ...rest
    }, {
        ...headers,
        xApiKey: this.apiKey,
      })(['username','ensDomain','chainId'], ['xApiKey','xAddress','xMessage','xSignature'])

  }

  async updateSubname(
    params: SubnameUpdateParams,
    headers: SIWEHeaders
  ): Promise<SubnameUpdateResponse> {
    const { text, addresses, ensDomain, chainId, ...rest } = params;
    const _chainId = chainId || this.chainId;
    const _ensDomain =
      ensDomain ||
      this.ensDomains?.find((ensDomain) => ensDomain.chainId === _chainId)?.ensDomain;


    return assertRestCall('UPDATE_SUBNAME_ROUTE', 'POST', {
      chainId: _chainId,
      ensDomain: _ensDomain,
      text: sanitizeTexts(params.text),
      addresses: sanitizeAddresses(params.addresses),
      ...rest,
    }, {
        ...headers,
      })(['username','ensDomain','chainId'], ['xSignature','xMessage','xAddress'])
  }

  async revokeSubname(
    params: SubnameRevokeParams,
    headers: SIWEHeaders & { xApiKey?: string }
  ): Promise<SubnameRevokeResponse> {
    const { ensDomain, chainId, ...rest } = params;
    const _chainId = chainId || this.chainId;
    const _ensDomain =
      ensDomain ||
      this.ensDomains?.find((ensDomain) => ensDomain.chainId === _chainId)?.ensDomain;

    return assertRestCall('REVOKE_SUBNAME_ROUTE', 'POST', {
        chainId: _chainId,
        ensDomain: _ensDomain,
        ...rest
      }, {
        xApiKey: this.apiKey,
        ...headers,
      })(['username','ensDomain','chainId'], ['xApiKey','xAddress','xMessage','xSignature'])
  }

  async rejectSubname(
    params: SubnameRejectParams,
    headers: SIWEHeaders
  ): Promise<SubnameRejectResponse> {
    const { ensDomain, chainId, ...rest } = params;
    const _chainId = chainId || this.chainId;
    const _ensDomain = ensDomain || this.ensDomains?.find((ensDomain) => ensDomain.chainId === _chainId)?.ensDomain;

    return assertRestCall('REJECT_SUBNAME_ROUTE', 'POST', {
        chain: _chainId,
        ensDomain: _ensDomain,
        ...rest
      }, {
        ...headers,
      })(['username','ensDomain','chainId'], ['xSignature','xMessage','xAddress'])
  }

  async getAllCommunities(
    params: SubnameGetAllCommunitiesChainIdParams
  ): Promise<SubnameGetAllCommunitiesChainIdResponse> {
    const { chainId, ...rest } = params;

    const _chainId = chainId || this.chainId;

    return assertRestCall('GET_ALL_COMMUNITIES_WITH_COUNT_ROUTE', 'GET', {
      chainId: _chainId,
      ...rest,
    })(['chainId']);
  }

  async getByDomainNameChainId(
    params: SubnameGetByDomainNameChainIdParams
  ): Promise<SubnameGetByDomainNameChainIdResponse> {
    const { ensDomain, chainId, ...rest } = params;

    const _chainId = chainId || this.chainId;
    const _ensDomain = ensDomain || this.ensDomains?.find((ensDomain) => ensDomain.chainId === _chainId)?.ensDomain;

    return assertRestCall('GET_SUBNAME_BY_DOMAIN_NAME_CHAIN_ID_ROUTE', 'GET', {
      chainId: _chainId,
      ensDomain: _ensDomain,
      ...rest,
    })(['ensDomain','chainId']);
  }

  /**
   * Retrieves details of a subname directly by its name. This is a read-only operation
   * and does not require an API key.
   * @param {SubnameGetBySubnameParams} params - The parameters for the lookup.
   * @returns {Promise<SubnameGetBySubnameResponse>} The details of the subname, if found.
   */
  async getBySubname(
    params: SubnameGetBySubnameParams
  ): Promise<SubnameGetBySubnameResponse> {
    const { chainId, ...rest } = params;
    const _chainId = chainId || this.chainId;

    return assertRestCall('GET_SUBNAME_BY_SUBNAME_ROUTE', 'GET', {
      chainId: _chainId,
      ...rest,
    })(['subname','chainId']);
  }

  async getAllByAddress(
    params: SubnameGetAllByAddressParams
  ): Promise<SubnameGetAllByAddressResponse> {
    const { chainId, isClaimed, coinType, ...rest } = params;
    const _chainId = chainId || this.chainId;

    return assertRestCall('GET_ALL_SUBNAMES_BY_ADDRESS_ROUTE', 'GET', {
      chainId: _chainId,
      isClaimed: isClaimed || false,
      coinType: coinType || 60,
      ...rest,
    })(['chainId']);
  }

  async getCommunitySubnamesByDomain(
    params: SubnameGetAllByDomainChainIdParams
  ): Promise<SubnameGetAllByDomainChainIdResponse> {
    const { chainId, ensDomain, ...rest } = params;
    const _chainId = chainId || this.chainId;
    const _ensDomain = ensDomain || this.ensDomains?.find((ensDomain) => ensDomain.chainId === _chainId)?.ensDomain;

    return assertRestCall('GET_ALL_SUBNAMES_BY_DOMAIN_ROUTE', 'GET', {
      chainId: _chainId,
      ensDomain: _ensDomain,
      ...rest,
    })(['ensDomain','chainId']);
  }

  async searchSubnames(
    params: SubnameSearchParams
  ): Promise<SubnameSearchResponse> {
    const { chainId, ...rest } = params;
    const _chainId = chainId || this.chainId;

    return assertRestCall('SEARCH_SUBNAMES_ROUTE', 'GET', {
      chainId: _chainId,
      ...rest,
    })(['chainId']);
  }

  async getInvitations(
    params: SubnameGetInvitationsByAddressParams
  ): Promise<SubnameGetInvitationsByAddressResponse> {
    const { chainId, coinType, ...rest } = params;
    const _chainId = chainId || this.chainId;

    return assertRestCall('GET_ALL_SUBNAMES_BY_INVITATION_ROUTE', 'GET', {
      chainId: _chainId,
      coinType: coinType || 60,
      ...rest,
    })(['chainId']);
  }

  async checkSubnameAvailable(
    params: IsSubnameAvailableParams
  ): Promise<IsSubnameAvailableResponse> {
    const { chainId, ...rest } = params;
    const _chainId = chainId || this.chainId;

    return assertRestCall('CHECK_SUBNAME_AVAILABILITY_ROUTE', 'GET', {
      chainId: _chainId,
      ...rest,
    })(['chainId']);
  }

  async getRecordsByFullName(
    params: SubnameRecordsParams
  ): Promise<SubnameRecordsResponse> {
    const chainId = params.chainId || this.chainId;
    const providerUrl = this.networks.find(network => network.chainId === chainId)?.providerUrl;
    return assertRestCall('RECORDS_BY_FULLNAME_ROUTE', 'GET', {
      providerUrl,
      chainId: this.chainId,
      ...params,
    })(['chainId', 'providerUrl']);
  }
}
