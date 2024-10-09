import { assertRestCall } from '../../api/rest';
import {
  SubnameGetAllByAddressRoute,
  SubnameGetAllByDomainChainIdRoute,
  SubnameGetBySubnameRoute,
  SubnameGetAllByEnsDomainWithCountRoute,
  NetworksWithProvider,
  EnsDomainByChainId,
  ChainId,
  SubnameSearchRoute,
  IsSubnameAvailableRoute,
  SubnameRecordsRoute,
  SubnameAddRoute,
  SubnameAcceptRoute,
  SubnameReserveRoute,
  SubnameUpdateRoute,
  SubnameRevokeRoute,
  SubnameRejectRoute,
  SubnameGetInvitationsByAddressRoute,
} from '../../types';
import { sanitizeTexts, sanitizeAddresses } from '../../utils';

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
    params: SubnameAcceptRoute['params'],
    headers: SubnameAcceptRoute['headers']
  ): Promise<SubnameAcceptRoute['response']> {
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
    params: SubnameReserveRoute['params'],
  ): Promise<SubnameReserveRoute['response']> {
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
    params: SubnameAddRoute['params'],
    headers: SubnameAddRoute['headers']
  ): Promise<SubnameAddRoute['response']> {
    const { text, addresses, ensDomain, chainId, ...rest } = params;
    const sanitizedAddresses = sanitizeAddresses(params.addresses);
    const hasAddress60 = sanitizedAddresses?.some((address) => address.coinType === 60);

    const _chainId = chainId || this.chainId;
    const _ensDomain =
      ensDomain ||
      this.ensDomains?.find((ensDomain) => ensDomain.chainId === _chainId)?.ensDomain;

    const _xApiKey = headers.xApiKey || this.ensDomains?.find((ensDomain) => ensDomain.chainId === _chainId)?.apiKey || this.apiKey;

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
        xApiKey: _xApiKey,
      })(['username','ensDomain','chainId'], ['xApiKey','xAddress','xMessage','xSignature'])

  }

  async updateSubname(
    params: SubnameUpdateRoute['params'],
    headers: SubnameUpdateRoute['headers']
  ): Promise<SubnameUpdateRoute['response']> {
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
    params: SubnameRevokeRoute['params'],
    headers: SubnameRevokeRoute['headers']
  ): Promise<SubnameRevokeRoute['response']> {
    const { ensDomain, chainId, ...rest } = params;
    const _chainId = chainId || this.chainId;
    const _ensDomain =
      ensDomain ||
      this.ensDomains?.find((ensDomain) => ensDomain.chainId === _chainId)?.ensDomain;
    const _xApiKey = headers.xApiKey || this.ensDomains?.find((ensDomain) => ensDomain.chainId === _chainId)?.apiKey || this.apiKey;

    return assertRestCall('REVOKE_SUBNAME_ROUTE', 'POST', {
        chainId: _chainId,
        ensDomain: _ensDomain,
        ...rest
      }, {
        ...headers,
        xApiKey: _xApiKey,
      })(['username','ensDomain','chainId'], ['xApiKey','xAddress','xMessage','xSignature'])
  }

  async rejectSubname(
    params: SubnameRejectRoute['params'],
    headers: SubnameRejectRoute['headers']
  ): Promise<SubnameRejectRoute['response']> {
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

  async getSubnamesByEnsDomainWithCount(
    params: SubnameGetAllByEnsDomainWithCountRoute['params']
  ): Promise<SubnameGetAllByEnsDomainWithCountRoute['response']> {
    const { chainId, ...rest } = params;

    const _chainId = chainId || this.chainId;

    return assertRestCall('GET_ALL_ENS_WITH_COUNT_ROUTE', 'GET', {
      chainId: _chainId,
      ...rest,
    })(['chainId']);
  }

  async getSubname(
    params: SubnameGetBySubnameRoute['params']
  ): Promise<SubnameGetBySubnameRoute['response']> {
    const { chainId, ...rest } = params;
    const _chainId = chainId || this.chainId;

    return assertRestCall('GET_SUBNAME_BY_SUBNAME_ROUTE', 'GET', {
      chainId: _chainId,
      ...rest,
    })(['chainId']);
  }

  async getSubnamesByAddress(
    params: SubnameGetAllByAddressRoute['params']
  ): Promise<SubnameGetAllByAddressRoute['response']> {
    const { chainId, isClaimed, coinType, ...rest } = params;
    const _chainId = chainId || this.chainId;

    return assertRestCall('GET_ALL_SUBNAMES_BY_ADDRESS_ROUTE', 'GET', {
      chainId: _chainId,
      isClaimed: isClaimed,
      coinType: coinType || 60,
      ...rest,
    })(['chainId']);
  }

  async getInvitationsByAddress(
    params: SubnameGetInvitationsByAddressRoute['params']
  ): Promise<SubnameGetInvitationsByAddressRoute['response']> {
    const { chainId, coinType, ...rest } = params;
    const _chainId = chainId || this.chainId;

    return assertRestCall('GET_ALL_SUBNAMES_BY_INVITATION_ROUTE', 'GET', {
      chainId: _chainId,
      coinType: coinType || 60,
      isClaimed: false,
      ...rest,
    })(['chainId']);
  }


  async getSubnamesByEnsDomain(
    params: SubnameGetAllByDomainChainIdRoute['params']
  ): Promise<SubnameGetAllByDomainChainIdRoute['response']> {
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
    params: SubnameSearchRoute['params']
  ): Promise<SubnameSearchRoute['response']> {
    const { chainId, ...rest } = params;
    const _chainId = chainId || this.chainId;

    return assertRestCall('SEARCH_SUBNAMES_ROUTE', 'GET', {
      chainId: _chainId,
      ...rest,
    })(['chainId']);
  }

  async isSubnameAvailable(
    params: IsSubnameAvailableRoute['params']
  ): Promise<IsSubnameAvailableRoute['response']> {
    const { chainId, ...rest } = params;
    const _chainId = chainId || this.chainId;

    return assertRestCall('CHECK_SUBNAME_AVAILABILITY_ROUTE', 'GET', {
      chainId: _chainId,
      ...rest,
    })(['chainId']);
  }

  async getRecords(
    params: SubnameRecordsRoute['params']
  ): Promise<SubnameRecordsRoute['response']> {
    const { chainId, ...rest } = params;
    const _chainId = chainId || this.chainId;
    const providerUrl = this.networks.find(network => network.chainId === _chainId)?.providerUrl;
    return assertRestCall('RECORDS_BY_FULLNAME_ROUTE', 'GET', {
      providerUrl,
      ...rest,
    })(['providerUrl']);
  }
}
