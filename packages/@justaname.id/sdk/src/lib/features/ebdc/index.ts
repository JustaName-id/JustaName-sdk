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
  SIWEHeaders, AppendEbdcFieldResponse, AddEbdcPermissionResponse, RevokeEbdcPermissionResponse, ChainId, Ebdc
} from '../../types';
import { restCall } from '../../api/rest';
import { Subnames } from '../subnames';

export class EBDC {
  siweConfig: SiweConfig;
  ensDomain: string;
  subnames: Subnames;

  constructor(
    ensDomain: string,
    config: SiweConfig,
    subnames: Subnames
    ) {
    this.siweConfig = config;
    this.ensDomain = ensDomain;
    this.subnames = subnames;
  }

  async checkIfEbdcIsEnabled({
    ebdc,
    subname,
    chainId,
                       }: {
    ebdc: string;
    subname: string;
    chainId?: ChainId;
  }): Promise<boolean> {
    const records = await this.subnames.getRecordsByFullName({
      fullName: subname,
      chainId
    })

    if (!records) {
      return false;
    }

    const ebdcField = records.texts.find((text) => text.key === 'ebdc')

    if (!ebdcField) {
      return false;
    }

    const ebdcFieldValue = JSON.parse(ebdcField.value) as Ebdc

    if (!ebdcFieldValue) {
      return false;
    }

    return ebdcFieldValue.ebdcs.includes(ebdc)
  }

  requestAddEbdcPermissionChallenge  (params: RequestAddEbdcPermissionChallengeParams): Promise<RequestAddEbdcPermissionChallengeResponse> {
    return restCall('SIWE_EBDC_ADD_PERMISSION_ROUTE','POST', {
      ...this.siweConfig,
      ttl: 120000,
      ...params
    })
  }

  requestAppendEbdcFieldChallenge  (params: RequestAppendEbdcFieldChallengeParams): Promise<RequestAppendEbdcFieldChallengeResponse> {
    return restCall('SIWE_EBDC_APPEND_FIELD_ROUTE','POST', {
      ...this.siweConfig,
      ttl: 120000,
      ...params
    })
  }

  requestRevokeEbdcFieldChallenge  (params: RequestRevokeEbdcFieldChallengeParams): Promise<RequestRevokeEbdcFieldChallengeResponse> {
    return restCall('SIWE_EBDC_REVOKE_PERMISSION_ROUTE','POST', {
      ...this.siweConfig,
      ttl: 120000,
      ...params
    })
  }

  addEbdcPermission(params: AddEbdcPermissionParams): Promise<AddEbdcPermissionResponse> {
     return restCall('EBDC_ADD_PERMISSION_ROUTE','POST', {
      ...params
    })
  }

  appendEbdcField(
    params: AppendEbdcFieldParams,
    headers: SIWEHeaders
  ): Promise<AppendEbdcFieldResponse> {
     return restCall('EBDC_APPEND_FIELD_ROUTE','POST', {
      ...params
    }, {
       ...headers
     })
  }

  revokeEbdcPermission(params: RevokeEbdcPermissionParams): Promise<RevokeEbdcPermissionResponse> {
     return restCall('EBDC_REVOKE_PERMISSION_ROUTE','POST', {
      ...params
    })
  }
}
