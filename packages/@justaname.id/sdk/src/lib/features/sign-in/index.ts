import { SiweConfig } from '../../types/siwe/siwe-config';
import { ChainId } from '../../types';
import Siwj, { SiwjParams, SiwjResponse } from '../siwj';



export class SignIn {
  config: SiweConfig;
  providerUrl: string;

  constructor(signInConfig: SiweConfig,providerUrl:string){
    this.config = signInConfig;
    this.providerUrl = providerUrl;
  }

  requestSignIn(params: Omit<SiwjParams, 'domain' | 'origin' | 'chainId'> &{
    origin?: string,
    domain?: string,
    chainId?: ChainId
    ttl?: number
  }): string {
    const siwj = new Siwj({
      params: {
        uri: params.origin || this.config.origin,
        ...this.config,
        ...params,
        ttl: params?.ttl || 120000,
      },
      providerUrl: this.providerUrl
    })
    return siwj.prepareMessage();
  }

  async signIn(message: string, signature: string): Promise<SiwjResponse>{
    const siwj = new Siwj({
      params: message,
      providerUrl: this.providerUrl
    })

    return await siwj.verify({
      signature
    })
  }

  generateNonce(): string {
    return Siwj.generateNonce();
  }
}

export default SignIn;