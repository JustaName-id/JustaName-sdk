import {
  AddMAppPermissionParams,
  AddMAppPermissionResponse,
  AppendMAppFieldParams,
  AppendMAppFieldResponse,
  ChainId,
  MApp, NetworksWithProvider,
  RequestAddMAppPermissionChallengeParams,
  RequestAddMAppPermissionChallengeResponse,
  RequestAppendMAppFieldChallengeParams,
  RequestAppendMAppFieldChallengeResponse,
  RequestRevokeMAppPermissionChallengeParams,
  RequestRevokeMAppPermissionChallengeResponse,
  RevokeMAppPermissionParams,
  RevokeMAppPermissionResponse,
  SiweConfig,
  SIWEHeaders
} from '../../types';
import { assertRestCall, restCall } from '../../api/rest';
import { Subnames } from '../subnames';

export interface MAppsParams {
  siweConfig?: Omit<SiweConfig, 'chainId'>;
  chainId: ChainId;
  networks: NetworksWithProvider
  subnames: Subnames;
}

export class MApps {
  siweConfig?: Omit<SiweConfig, 'chainId' | 'ttl'>;
  chainId: ChainId;
  subnames: Subnames;
  networks: NetworksWithProvider;

  constructor({ siweConfig, chainId, subnames, networks }: MAppsParams) {
    this.siweConfig = siweConfig;
    this.chainId = chainId;
    this.subnames = subnames;
    this.networks = networks;
  }

  async checkIfMAppIsEnabled(params: {
    mApp: string;
    ens: string;
    chainId?: ChainId;
  }): Promise<boolean> {
    const chainId = params.chainId || this.chainId;
    const network = this.networks.find((network) => network.chainId === chainId);
    if (!network) {
      throw new Error('Network not found');
    }


    const mApp = params.mApp;
    const ens = params.ens;
    const records = await this.subnames.getRecordsByFullName({
      fullName: ens,
      chainId,
      providerUrl: network.providerUrl
    });

    if (!records) {
      return false;
    }

    if (!records.isJAN) {
      return false;
    }

    const mAppField = records.texts.find((text) => text.key === 'mApps');

    if (!mAppField) {
      return false;
    }

    const mAppFieldValue = JSON.parse(mAppField.value) as MApp;

    if (!mAppFieldValue) {
      return false;
    }

    return mAppFieldValue.mApps.includes(mApp);
  }

  async canEnableMApps(params: {
    ens: string;
    chainId?: ChainId;
  }): Promise<boolean> {
    const chainId = params.chainId || this.chainId;
    const ens = params.ens;
    const records = await this.subnames.getRecordsByFullName({
      fullName: ens,
      chainId
    });

    return records.isJAN;
  }

  requestAddMAppPermissionChallenge(params: RequestAddMAppPermissionChallengeParams): Promise<RequestAddMAppPermissionChallengeResponse> {
    const { chainId, ttl, origin, domain,...rest } = params;

    const _chainId = chainId || this.chainId;
    const _ttl = ttl || 120000;
    const _origin = origin || this.siweConfig?.origin;
    const _domain = domain || this.siweConfig?.domain;
    return assertRestCall('SIWE_MAPP_ADD_PERMISSION_ROUTE', 'POST', {
      ttl: _ttl,
      chainId: _chainId,
      origin: _origin,
      domain: _domain,
      ...rest
    })(['ttl','chainId','origin','domain'])
  }

  requestAppendMAppFieldChallenge(params: RequestAppendMAppFieldChallengeParams): Promise<RequestAppendMAppFieldChallengeResponse> {
    const { chainId, ttl, origin, domain,...rest } = params;
    const _chainId = chainId || this.chainId;
    const _ttl = ttl || 120000;
    const _origin = origin || this.siweConfig?.origin;
    const _domain = domain || this.siweConfig?.domain;

    return assertRestCall('SIWE_MAPP_APPEND_FIELD_ROUTE', 'POST', {
      ttl: _ttl,
      chainId: _chainId,
      origin: _origin,
      domain: _domain,
      ...rest
    })(['ttl','chainId','origin','domain'])
  }

  requestRevokeMAppPermissionChallenge(params: RequestRevokeMAppPermissionChallengeParams): Promise<RequestRevokeMAppPermissionChallengeResponse> {
    const { chainId, ttl, origin, domain,...rest } = params;
    const _chainId = chainId || this.chainId;
    const _ttl = ttl || 120000;
    const _origin = origin || this.siweConfig?.origin;
    const _domain = domain || this.siweConfig?.domain;

    return assertRestCall('SIWE_MAPP_REVOKE_PERMISSION_ROUTE', 'POST', {
      ttl: _ttl,
      chainId: _chainId,
      origin: _origin,
      domain: _domain,
      ...rest
    })(['ttl','chainId','origin','domain'])
  }

  addMAppPermission(params: AddMAppPermissionParams): Promise<AddMAppPermissionResponse> {
    return assertRestCall('MAPP_ADD_PERMISSION_ROUTE', 'POST', {
      ...params
    })(['message','address','signature'])
  }

  appendMAppField(
    params: AppendMAppFieldParams,
    headers: SIWEHeaders
  ): Promise<AppendMAppFieldResponse> {
    return restCall('MAPP_APPEND_FIELD_ROUTE', 'POST', {
      ...params
    }, {
      ...headers
    });
  }

  revokeMAppPermission(params: RevokeMAppPermissionParams): Promise<RevokeMAppPermissionResponse> {
    return restCall('MAPP_REVOKE_PERMISSION_ROUTE', 'POST', {
      ...params
    });
  }
}
