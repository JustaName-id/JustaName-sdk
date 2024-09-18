import { SiweConfig } from '../../types/siwe/siwe-config';
import { ChainId } from '../../types';
import { SIWENS, SiwensParams, SiwensResponse } from '@justaname.id/siwens';
import { InvalidENSException } from '../../errors';
import { OffchainResolvers } from '../offchain-resolvers';
import { JsonRpcProvider } from 'ethers';

export interface SignInResponse extends SiwensResponse {
  isJustaName: boolean
  chainId: ChainId
}

export class SignIn {
  readonly config: SiweConfig;
  readonly providerUrl: string;
  readonly offchainResolver: OffchainResolvers;
  readonly provider: JsonRpcProvider;
  constructor(signInConfig: SiweConfig,providerUrl:string, offchainResolver: OffchainResolvers){
    this.config = signInConfig;
    this.providerUrl = providerUrl;
    this.offchainResolver = offchainResolver;
    this.provider = new JsonRpcProvider(providerUrl);
  }

  requestSignIn(params: Omit<SiwensParams, 'domain' | 'origin' | 'chainId'> &{
    origin?: string,
    domain?: string,
    chainId?: ChainId
    ttl?: number
  }): string {
    const siwens = new SIWENS({
      params: {
        ...params,
        uri: params.origin || this.config.origin,
        domain: params.domain || this.config.domain,
        chainId: params.chainId || this.config.chainId,
        ttl: params?.ttl || this.config.ttl || 1000 * 60 * 60 * 24
      },
      providerUrl: this.providerUrl
    })
    return siwens.prepareMessage();
  }

  async signIn(message: string, signature: string): Promise<SignInResponse>{
    const siwens = new SIWENS({
      params: message,
      providerUrl: this.providerUrl
    })


    const siwensResponse = await siwens.verify({
      signature
    })

    const isJustaName = await this.checkIfJustaNameResolver(siwensResponse.ens);

    return {
      ...siwensResponse,
      isJustaName,
      chainId: siwensResponse.data.chainId as ChainId
    }
  }

  private async checkIfJustaNameResolver(ens:string){
    const [resolverAddress,resolvers] = await Promise.all([this.provider.getResolver(ens),this.offchainResolver.getAllOffchainResolvers()]);

    const currentOffchainResolver = resolvers.find(resolver => resolver.chainId === this.config.chainId)

    if(!currentOffchainResolver){
      throw InvalidENSException.chainNotSupported(
        this.config.chainId.toString()
      )
    }

    if(!resolverAddress?.address){
      throw InvalidENSException.notRegisteredENS(
        ens
      )
    }

    return currentOffchainResolver.resolverAddress === resolverAddress?.address;
  }

  generateNonce(): string {
    return SIWENS.generateNonce();
  }
}

export default SignIn;