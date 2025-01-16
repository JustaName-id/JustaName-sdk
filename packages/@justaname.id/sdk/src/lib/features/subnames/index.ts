import { assertRestCall } from '../../api/rest';
import {
  ChainId,
  EnsDomainByChainId,
  IsSubnameAvailableRoute,
  NetworksWithProvider,
  SubnameAcceptRoute,
  SubnameAddRoute,
  SubnameGetAllByAddressRoute,
  SubnameGetAllByDomainChainIdRoute,
  SubnameGetAllByEnsDomainWithCountRoute,
  SubnameGetBySubnameRoute,
  SubnameGetInvitationsByAddressRoute,
  SubnameRecordsRoute,
  SubnameRejectRoute,
  SubnameReserveRoute,
  SubnameRevokeRoute,
  SubnameSearchRoute,
  SubnameUpdateRoute,
  PrimaryNameGetByAddressRoute,
  SetPrimaryNameRoute,
} from '../../types';
import { sanitizeAddresses, sanitizeTexts } from '../../utils';
import { InvalidConfigurationException } from '../../errors';

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

  dev: boolean;
}

export class Subnames {
  private readonly networks: NetworksWithProvider;

  private readonly ensDomains?: EnsDomainByChainId[];

  private readonly chainId: ChainId;

  private readonly dev: boolean;

  constructor(params: SubnamesConfig) {
    this.networks = params.networks;
    this.ensDomains = params.ensDomains;
    this.chainId = params.chainId;
    this.dev = params.dev;
  }

  async acceptSubname(
    params: SubnameAcceptRoute['params'],
    headers: SubnameAcceptRoute['headers']
  ): Promise<SubnameAcceptRoute['response']> {
    const {
      text,
      addresses,
      ensDomain,
      chainId,
      signature: paramSignature,
      ...rest
    } = params;

    const { signature, xSignature } = this.checkSignature(
      paramSignature,
      headers.xSignature
    );

    const sanitizedAddresses = sanitizeAddresses(params.addresses);
    const hasAddress60 = sanitizedAddresses?.some(
      (address) => address.coinType === 60
    );

    const _chainId = chainId || this.chainId;
    const _ensDomain =
      ensDomain ||
      this.ensDomains?.find((ensDomain) => ensDomain.chainId === _chainId)
        ?.ensDomain;

    return assertRestCall(
      'ACCEPT_SUBNAME_ROUTE',
      'POST',
      {
        chainId: _chainId,
        ensDomain: _ensDomain,
        text: sanitizeTexts(params.text),
        addresses: hasAddress60
          ? sanitizedAddresses
          : [
              {
                coinType: 60,
                address: headers.xAddress as string,
              },
              ...(sanitizedAddresses === undefined ? [] : sanitizedAddresses),
            ],
        ...rest,
        signature,
      },
      {
        ...headers,
        xSignature,
      },
      this.dev
    )(['username', 'ensDomain', 'chainId'], ['xMessage', 'xAddress']);
  }

  async reserveSubname(
    params: SubnameReserveRoute['params']
  ): Promise<SubnameReserveRoute['response']> {
    const { ensDomain, chainId, apiKey, ...rest } = params;

    const _apiKey =
      this.ensDomains?.find((ensDomain) => ensDomain.chainId === chainId)
        ?.apiKey || apiKey;
    const _chainId = chainId || this.chainId;
    const _ensDomain =
      ensDomain ||
      this.ensDomains?.find((ensDomain) => ensDomain.chainId === _chainId)
        ?.ensDomain;

    return assertRestCall(
      'RESERVE_SUBNAME_ROUTE',
      'POST',
      {
        chainId: _chainId,
        ensDomain: _ensDomain,
        ...rest,
      },
      {
        xApiKey: _apiKey,
      },
      this.dev
    )(['ensDomain', 'chainId', 'ethAddress', 'username'], ['xApiKey']);
  }

  async addSubname(
    params: SubnameAddRoute['params'],
    headers: SubnameAddRoute['headers']
  ): Promise<SubnameAddRoute['response']> {
    const {
      text,
      addresses,
      ensDomain,
      chainId,
      apiKey,
      signature: paramSignature,
      ...rest
    } = params;

    const { signature, xSignature } = this.checkSignature(
      paramSignature,
      headers.xSignature
    );

    const sanitizedAddresses = sanitizeAddresses(params.addresses);
    const hasAddress60 = sanitizedAddresses?.some(
      (address) => address.coinType === 60
    );

    const _chainId = chainId || this.chainId;
    const _ensDomain =
      ensDomain ||
      this.ensDomains?.find((ensDomain) => ensDomain.chainId === _chainId)
        ?.ensDomain;

    const _apiKey =
      headers.xApiKey ||
      this.ensDomains?.find((ensDomain) => ensDomain.chainId === _chainId)
        ?.apiKey ||
      apiKey;

    return assertRestCall(
      'ADD_SUBNAME_ROUTE',
      'POST',
      {
        chainId: _chainId,
        ensDomain: _ensDomain,
        text: sanitizeTexts(params.text),
        addresses: hasAddress60
          ? sanitizedAddresses
          : [
              {
                coinType: 60,
                address: headers.xAddress as string,
              },
              ...(sanitizedAddresses === undefined ? [] : sanitizedAddresses),
            ],
        ...rest,
        signature,
      },
      {
        ...headers,
        xSignature,
        xApiKey: _apiKey,
      },
      this.dev
    )(
      ['username', 'ensDomain', 'chainId'],
      ['xApiKey', 'xAddress', 'xMessage']
    );
  }

  async updateSubname(
    params: SubnameUpdateRoute['params'],
    headers: SubnameUpdateRoute['headers']
  ): Promise<SubnameUpdateRoute['response']> {
    const {
      text,
      addresses,
      ensDomain,
      chainId,
      signature: paramSignature,
      ...rest
    } = params;

    const { signature, xSignature } = this.checkSignature(
      paramSignature,
      headers.xSignature
    );

    const _chainId = chainId || this.chainId;
    const _ensDomain =
      ensDomain ||
      this.ensDomains?.find((ensDomain) => ensDomain.chainId === _chainId)
        ?.ensDomain;

    return assertRestCall(
      'UPDATE_SUBNAME_ROUTE',
      'POST',
      {
        chainId: _chainId,
        ensDomain: _ensDomain,
        text: sanitizeTexts(params.text),
        addresses: sanitizeAddresses(params.addresses),
        ...rest,
        signature,
      },
      {
        ...headers,
        xSignature,
      },
      this.dev
    )(['username', 'ensDomain', 'chainId'], ['xMessage', 'xAddress']);
  }

  async revokeSubname(
    params: SubnameRevokeRoute['params'],
    headers: SubnameRevokeRoute['headers']
  ): Promise<SubnameRevokeRoute['response']> {
    const {
      ensDomain,
      chainId,
      apiKey,
      signature: paramSignature,
      ...rest
    } = params;

    const { signature, xSignature } = this.checkSignature(
      paramSignature,
      headers.xSignature
    );

    const _chainId = chainId || this.chainId;

    const _ensDomain =
      ensDomain ||
      this.ensDomains?.find((ensDomain) => ensDomain.chainId === _chainId)
        ?.ensDomain;
    const _apiKey =
      headers.xApiKey ||
      this.ensDomains?.find((ensDomain) => ensDomain.chainId === _chainId)
        ?.apiKey ||
      apiKey;

    return assertRestCall(
      'REVOKE_SUBNAME_ROUTE',
      'POST',
      {
        chainId: _chainId,
        ensDomain: _ensDomain,
        ...rest,
        signature,
      },
      {
        ...headers,
        xApiKey: _apiKey,
        xSignature,
      },
      this.dev
    )(
      ['username', 'ensDomain', 'chainId'],
      ['xApiKey', 'xAddress', 'xMessage']
    );
  }

  async rejectSubname(
    params: SubnameRejectRoute['params'],
    headers: SubnameRejectRoute['headers']
  ): Promise<SubnameRejectRoute['response']> {
    const { ensDomain, chainId, username, signature: paramSignature } = params;

    const { signature, xSignature } = this.checkSignature(
      paramSignature,
      headers.xSignature
    );

    const _chainId = chainId || this.chainId;
    const _ensDomain =
      ensDomain ||
      this.ensDomains?.find((ensDomain) => ensDomain.chainId === _chainId)
        ?.ensDomain;

    return assertRestCall(
      'REJECT_SUBNAME_ROUTE',
      'POST',
      {
        chainId: _chainId,
        ensDomain: _ensDomain,
        username,
        signature,
      },
      {
        ...headers,
        xSignature,
      },
      this.dev
    )(['username', 'ensDomain', 'chainId'], ['xMessage', 'xAddress']);
  }

  async getSubnamesByEnsDomainWithCount(
    params: SubnameGetAllByEnsDomainWithCountRoute['params']
  ): Promise<SubnameGetAllByEnsDomainWithCountRoute['response']> {
    const { chainId, ...rest } = params;

    const _chainId = chainId || this.chainId;

    return assertRestCall(
      'GET_ALL_ENS_WITH_COUNT_ROUTE',
      'GET',
      {
        chainId: _chainId,
        ...rest,
      },
      undefined,
      this.dev
    )(['chainId']);
  }

  async getSubname(
    params: SubnameGetBySubnameRoute['params']
  ): Promise<SubnameGetBySubnameRoute['response']> {
    const { chainId, ...rest } = params;
    const _chainId = chainId || this.chainId;

    return assertRestCall(
      'GET_SUBNAME_BY_SUBNAME_ROUTE',
      'GET',
      {
        chainId: _chainId,
        ...rest,
      },
      undefined,
      this.dev
    )(['chainId']);
  }

  async getSubnamesByAddress(
    params: SubnameGetAllByAddressRoute['params']
  ): Promise<SubnameGetAllByAddressRoute['response']> {
    const { chainId, isClaimed, coinType, ...rest } = params;
    const _chainId = chainId || this.chainId;

    return assertRestCall(
      'GET_ALL_SUBNAMES_BY_ADDRESS_ROUTE',
      'GET',
      {
        chainId: _chainId,
        isClaimed: isClaimed,
        coinType: coinType,
        ...rest,
      },
      undefined,
      this.dev
    )(['chainId']);
  }

  async getInvitationsByAddress(
    params: SubnameGetInvitationsByAddressRoute['params']
  ): Promise<SubnameGetInvitationsByAddressRoute['response']> {
    const { chainId, coinType, ...rest } = params;
    const _chainId = chainId || this.chainId;

    return assertRestCall(
      'GET_ALL_SUBNAMES_BY_INVITATION_ROUTE',
      'GET',
      {
        chainId: _chainId,
        coinType: coinType || 60,
        isClaimed: false,
        ...rest,
      },
      undefined,
      this.dev
    )(['chainId']);
  }

  async getSubnamesByEnsDomain(
    params: SubnameGetAllByDomainChainIdRoute['params']
  ): Promise<SubnameGetAllByDomainChainIdRoute['response']> {
    const { chainId, ensDomain, ...rest } = params;
    const _chainId = chainId || this.chainId;
    const _ensDomain =
      ensDomain ||
      this.ensDomains?.find((ensDomain) => ensDomain.chainId === _chainId)
        ?.ensDomain;

    return assertRestCall(
      'GET_ALL_SUBNAMES_BY_DOMAIN_ROUTE',
      'GET',
      {
        chainId: _chainId,
        ensDomain: _ensDomain,
        ...rest,
      },
      undefined,
      this.dev
    )(['ensDomain', 'chainId']);
  }

  async searchSubnames(
    params: SubnameSearchRoute['params']
  ): Promise<SubnameSearchRoute['response']> {
    const { chainId, ...rest } = params;
    const _chainId = chainId || this.chainId;

    return assertRestCall(
      'SEARCH_SUBNAMES_ROUTE',
      'GET',
      {
        chainId: _chainId,
        ...rest,
      },
      undefined,
      this.dev
    )(['chainId']);
  }

  async isSubnameAvailable(
    params: IsSubnameAvailableRoute['params']
  ): Promise<IsSubnameAvailableRoute['response']> {
    const { chainId, ...rest } = params;
    const _chainId = chainId || this.chainId;

    return assertRestCall(
      'CHECK_SUBNAME_AVAILABILITY_ROUTE',
      'GET',
      {
        chainId: _chainId,
        ...rest,
      },
      undefined,
      this.dev
    )(['chainId']);
  }

  async getRecords(
    params: SubnameRecordsRoute['params']
  ): Promise<SubnameRecordsRoute['response']> {
    const { chainId, ...rest } = params;
    const _chainId = chainId || this.chainId;
    const providerUrl = this.networks.find(
      (network) => network.chainId === _chainId
    )?.providerUrl;
    return assertRestCall(
      'RECORDS_BY_FULLNAME_ROUTE',
      'GET',
      {
        providerUrl,
        ...rest,
      },
      undefined,
      this.dev
    )(['providerUrl']);
  }

  async setPrimaryName(
    params: SetPrimaryNameRoute['params'],
    headers: SetPrimaryNameRoute['headers']
  ): Promise<SetPrimaryNameRoute['response']> {
    const { chainId, signature: paramSignature, ...rest } = params;
    const _chainId = chainId || this.chainId;

    const { signature, xSignature } = this.checkSignature(
      paramSignature,
      headers.xSignature
    );

    return assertRestCall(
      'SET_PRIMARY_NAME_ROUTE',
      'POST',
      {
        chainId: _chainId,
        signature,
        ...rest,
      },
      { ...headers, xSignature },
      this.dev
    )(['chainId'], ['xMessage', 'xAddress']);
  }

  async getPrimaryNameByAddress(
    params: PrimaryNameGetByAddressRoute['params']
  ): Promise<PrimaryNameGetByAddressRoute['response']> {
    const { chainId, address } = params;
    const _chainId = chainId || this.chainId;
    return assertRestCall(
      'GET_PRIMARY_NAME_BY_ADDRESS_ROUTE',
      'GET',
      {
        address,
        chainId: _chainId,
      },
      undefined,
      this.dev
    )(['chainId']);
  }

  private checkSignature(
    params: string | undefined,
    headers: string | undefined
  ): {
    signature: string | undefined;
    xSignature: string | undefined;
  } {
    const signature = params || headers;

    if (!signature) {
      throw InvalidConfigurationException.missingParameterOrHeader('signature');
    }

    if (signature.length > 15000) {
      return {
        signature,
        xSignature: undefined,
      };
    }

    return {
      signature: undefined,
      xSignature: signature,
    };
  }
}
