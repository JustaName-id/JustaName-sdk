import {
  SiweConfig,
  RequestAddEbdcPermissionChallengeParams,
  RequestAddEbdcPermissionChallengeResponse,
  RequestAppendEbdcFieldChallengeParams,
  RequestAppendEbdcFieldChallengeResponse,
  RequestRevokeEbdcFieldChallengeParams,
  RequestRevokeEbdcFieldChallengeResponse,
  AddEbdcPermissionParams,
  AppendEbdcFieldParams,
  RevokeEbdcPermissionParams,
  SIWEHeaders, AppendEbdcFieldResponse, AddEbdcPermissionResponse, RevokeEbdcPermissionResponse
} from '../../types';
import { restCall } from '../../api/rest';

export class EBDC {
  siweConfig: SiweConfig;
  ensDomain: string;

  constructor(
    ensDomain: string,
    config: SiweConfig) {
    this.siweConfig = config;
    this.ensDomain = ensDomain;
  }

  requestAddEbdcPermissionChallenge  (params: RequestAddEbdcPermissionChallengeParams): Promise<RequestAddEbdcPermissionChallengeResponse> {
    return restCall('SIWE_EBDC_ADD_PERMISSION_ROUTE','POST', {
      ...this.siweConfig,
      ensDomain: this.ensDomain,
      ...params
    })
  }

  requestAppendEbdcFieldChallenge  (params: RequestAppendEbdcFieldChallengeParams): Promise<RequestAppendEbdcFieldChallengeResponse> {
    return restCall('SIWE_EBDC_APPEND_FIELD_ROUTE','POST', {
      ...this.siweConfig,
      ensDomain: this.ensDomain,
      ...params
    })
  }

  requestRevokeEbdcFieldChallenge  (params: RequestRevokeEbdcFieldChallengeParams): Promise<RequestRevokeEbdcFieldChallengeResponse> {
    return restCall('SIWE_EBDC_REVOKE_PERMISSION_ROUTE','POST', {
      ...this.siweConfig,
      ensDomain: this.ensDomain,
      ...params
    })
  }

  async addEbdcPermission(params: AddEbdcPermissionParams): Promise<AddEbdcPermissionResponse> {
     return await restCall('EBDC_ADD_PERMISSION_ROUTE','POST', {
      ...params
    })
  }

  async appendEbdcField(
    params: AppendEbdcFieldParams,
    headers: SIWEHeaders
  ): Promise<AppendEbdcFieldResponse> {
     return await restCall('EBDC_APPEND_FIELD_ROUTE','POST', {
      ...params
    }, {
       ...headers
     })
  }

  async revokeEbdcPermission(params: RevokeEbdcPermissionParams): Promise<RevokeEbdcPermissionResponse> {
     return await restCall('EBDC_REVOKE_PERMISSION_ROUTE','POST', {
      ...params
    })
  }
}
