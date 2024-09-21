import {
  AddMAppPermissionParams,
  AddMAppPermissionResponse,
  AppendMAppFieldParams,
  AppendMAppFieldResponse,
  ChainId,
  MApp,
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
import { restCall } from '../../api/rest';
import { Subnames } from '../subnames';

export class MApps {
  siweConfig: SiweConfig;
  subnames: Subnames;

  constructor(
    config: SiweConfig,
    subnames: Subnames
  ) {
    this.siweConfig = config;
    this.subnames = subnames;
  }

  async checkIfMAppIsEnabled({
                               mApp,
                               ens,
                               chainId
                             }: {
    mApp: string;
    ens: string;
    chainId?: ChainId;
  }): Promise<boolean> {
    const records = await this.subnames.getRecordsByFullName({
      fullName: ens,
      chainId
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

  async canEnableMApps({
                         ens,
                         chainId
                       }: {
    ens: string;
    chainId?: ChainId;
  }): Promise<boolean> {
    const records = await this.subnames.getRecordsByFullName({
      fullName: ens,
      chainId
    });

    return records.isJAN;
  }

  requestAddMAppPermissionChallenge(params: RequestAddMAppPermissionChallengeParams): Promise<RequestAddMAppPermissionChallengeResponse> {
    return restCall('SIWE_MAPP_ADD_PERMISSION_ROUTE', 'POST', {
      ...this.siweConfig,
      ttl: 120000,

      ...params
    });
  }

  requestAppendMAppFieldChallenge(params: RequestAppendMAppFieldChallengeParams): Promise<RequestAppendMAppFieldChallengeResponse> {
    return restCall('SIWE_MAPP_APPEND_FIELD_ROUTE', 'POST', {
      ...this.siweConfig,
      ttl: 120000,
      ...params
    });
  }

  requestRevokeMAppPermissionChallenge(params: RequestRevokeMAppPermissionChallengeParams): Promise<RequestRevokeMAppPermissionChallengeResponse> {
    return restCall('SIWE_MAPP_REVOKE_PERMISSION_ROUTE', 'POST', {
      ...this.siweConfig,
      ttl: 120000,
      ...params
    });
  }

  addMAppPermission(params: AddMAppPermissionParams): Promise<AddMAppPermissionResponse> {
    return restCall('MAPP_ADD_PERMISSION_ROUTE', 'POST', {
      ...params
    });
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
