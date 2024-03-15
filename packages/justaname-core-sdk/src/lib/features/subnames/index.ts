import { restCall } from '../../api/rest';
import { IsSubnameAvailableRequest, SIWEHeaders, SubnameClaimRequest, SubnameClaimResponse } from '../../types';

export class Subnames {
  private readonly apiKey: string | undefined;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  async addSubname(
    subname: SubnameClaimRequest,
    headers: SIWEHeaders,
    ):  Promise<SubnameClaimResponse> {
    return this.isNotReadOnlyMode(restCall(
      'ADD_SUBNAME_ROUTE','POST',
      subname,
      {
        xApiKey: this.apiKey as string,
        ...headers
      }
    ))
  }

  async checkSubnameAvailable(
    subname: IsSubnameAvailableRequest,
  ): Promise<boolean> {
    return restCall(
      'CHECK_SUBNAME_AVAILABILITY_ROUTE','GET',
      subname,
    )
  }

  private isNotReadOnlyMode<T>(callback: T): T {
    const check =  this.apiKey === undefined;
    if(check){
      throw new Error('This method is not available in read-only mode');
    }
    return callback;
  }
}