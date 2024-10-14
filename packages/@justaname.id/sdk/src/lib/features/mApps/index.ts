import {
  AddMAppPermissionRoute,
  AppendMAppFieldRoute,
  ChainId,
  MApp,
  NetworksWithProvider,
  RequestAddMAppPermissionChallengeRoute,
  RequestAppendMAppFieldChallengeRoute,
  RequestRevokeMAppPermissionChallengeRoute,
  RevokeMAppPermissionRoute,
  SiweConfig
} from '../../types';
import { assertRestCall } from '../../api/rest';
import { Subnames } from '../subnames';

export interface MAppsParams {
  siweConfig?: Omit<SiweConfig, 'chainId'>;
  chainId: ChainId;
  networks: NetworksWithProvider
  subnames: Subnames;
  dev: boolean;
}

export class MApps {
  private readonly siweConfig?: Omit<SiweConfig, 'chainId' | 'ttl'>;
  private readonly chainId: ChainId;
  private readonly subnames: Subnames;
  private readonly networks: NetworksWithProvider;
  private readonly dev: boolean;

  constructor(params: MAppsParams) {
    this.siweConfig = params.siweConfig;
    this.chainId = params.chainId;
    this.subnames = params.subnames;
    this.networks = params.networks;
    this.dev = params.dev;
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
    const records = await this.subnames.getRecords({
      ens,
      chainId,
      providerUrl: network.providerUrl
    });

    if (!records) {
      return false;
    }

    if (!records.isJAN) {
      return false;
    }

    const mAppField = records.records.texts.find((text) => text.key === 'mApps');

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
    const records = await this.subnames.getRecords({
      ens,
      chainId
    });

    return records.isJAN;
  }

  requestAddMAppPermissionChallenge(params: RequestAddMAppPermissionChallengeRoute['params']): Promise<RequestAddMAppPermissionChallengeRoute['response']> {
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
    }, undefined, this.dev)(['ttl','chainId','origin','domain'])
  }

  requestAppendMAppFieldChallenge(params: RequestAppendMAppFieldChallengeRoute['params']): Promise<RequestAppendMAppFieldChallengeRoute['response']> {
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
    }, undefined, this.dev)(['ttl','chainId','origin','domain'])
  }

  requestRevokeMAppPermissionChallenge(params: RequestRevokeMAppPermissionChallengeRoute['params']): Promise<RequestRevokeMAppPermissionChallengeRoute['response']> {
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
    }, undefined, this.dev)(['ttl','chainId','origin','domain'])
  }

  addMAppPermission(
    params: AddMAppPermissionRoute['params'],
  ): Promise<AddMAppPermissionRoute['response']> {
    return assertRestCall('MAPP_ADD_PERMISSION_ROUTE', 'POST', {
      ...params
    }, undefined, this.dev)(['message','address','signature'])
  }

  appendMAppField(
    params: AppendMAppFieldRoute['params'],
    headers: AppendMAppFieldRoute['headers']
  ): Promise<AppendMAppFieldRoute['response']> {
    return assertRestCall('MAPP_APPEND_FIELD_ROUTE', 'POST', {
      ...params
    }, {
      ...headers
    }, this.dev)(['subname','fields'],['xAddress','xMessage','xSignature'])
  }

  revokeMAppPermission(
    params: RevokeMAppPermissionRoute['params']
  ): Promise<RevokeMAppPermissionRoute['response']> {
    return assertRestCall('MAPP_REVOKE_PERMISSION_ROUTE', 'POST', {
      ...params
    }, undefined, this.dev)(['message','address','signature'])
  }
}
