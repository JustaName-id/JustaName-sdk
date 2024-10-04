import { SiweConfig } from '../../types/siwe/siwe-config';
import { ChainId, NetworksWithProvider } from '../../types';
import { SIWENS, SiwensResponse } from '@justaname.id/siwens';
import { InvalidConfigurationException, InvalidENSException } from '../../errors';
import { OffchainResolvers } from '../offchain-resolvers';
import { RequestSignInParams } from '../../types/signin';

export interface SignInResponse extends SiwensResponse {
  isJustaName: boolean
  chainId: ChainId
}

export interface SignInParams {
  siweConfig?: Omit<SiweConfig, 'chainId' | 'ttl'>;
  signInTtl?: number;
  networks: NetworksWithProvider;
  offchainResolvers: OffchainResolvers;
  chainId: ChainId;
}

export class SignIn {
  readonly siweConfig?: Omit<SiweConfig, 'chainId' | 'ttl'>;
  readonly signInTtl?: number;
  readonly networks: NetworksWithProvider;
  readonly chainId: ChainId;
  readonly offchainResolvers: OffchainResolvers;
  constructor(params: SignInParams) {
    this.siweConfig = params.siweConfig;
    this.networks = params.networks;
    this.chainId = params.chainId;
    this.offchainResolvers = params.offchainResolvers;
    this.signInTtl = params.signInTtl;
  }

  requestSignIn(params: RequestSignInParams): string {
    const chainId = params.chainId || this.chainId;
    const network = this.networks.find(network => network.chainId === chainId);
    if (!network) {
      throw new Error(`ChainId ${chainId} not supported`);
    }

    const uri = params.origin || this.siweConfig?.origin;
    const domain = params.domain || this.siweConfig?.domain;
    const ttl = params.ttl || this.signInTtl

    const missingParams = [];
    if (!uri) {
      missingParams.push('origin');
    }
    if (!domain) {
      missingParams.push('domain');
    }

    if (missingParams.length > 0) {
      throw InvalidConfigurationException.missingParameters(missingParams);
    }

    console.log(missingParams, uri, domain, chainId, ttl);
    const siwens = new SIWENS({
      params: {
        ...params,
        uri,
        domain,
        chainId: chainId,
        ttl: ttl
      },
      providerUrl: network.providerUrl
    })
    return siwens.prepareMessage();
  }

  async signIn(message: string, signature: string): Promise<SignInResponse>{
    const chainIdMatch = message.match(/Chain ID: (\d+)/);
    const extractChainId = chainIdMatch ? chainIdMatch[1] : null;
    if (!extractChainId) {
      throw new Error('Chain ID not found in message');
    }

    const extractedChainId = parseInt(extractChainId);

    if(isNaN(extractedChainId)){
      throw new Error('Chain ID is not a number');
    }

    if(extractedChainId !== 1 && extractedChainId !== 11155111){
      throw new Error('Chain ID not supported');
    }
    const chainId = extractedChainId as ChainId;

    const network = this.networks.find(network => network.chainId === chainId);

    if (!network) {
      throw new Error(`ChainId ${chainId} not supported`);
    }


    const siwens = new SIWENS({
      params: message,
      providerUrl: network.providerUrl
    })


    const siwensResponse = await siwens.verify({
      signature
    })

    const isJustaName = await this.checkIfJustaNameResolver(siwensResponse.ens, chainId);

    return {
      ...siwensResponse,
      isJustaName,
      chainId: siwensResponse.data.chainId as ChainId
    }
  }

  private async checkIfJustaNameResolver(ens:string, chainId: ChainId){
    const network = this.networks.find(network => network.chainId === chainId);
    if (!network) {
      throw new Error(`ChainId ${chainId} not supported`);
    }


    const [resolverAddress,resolvers] = await Promise.all([network.provider.getResolver(ens),this.offchainResolvers.getAllOffchainResolvers()]);

    const currentOffchainResolver = resolvers.find(resolver => resolver.chainId === chainId)

    if(!currentOffchainResolver){
      throw InvalidENSException.chainNotSupported(
        chainId.toString()
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
    console.log(SIWENS.generateNonce());
    return SIWENS.generateNonce();
  }
}

export default SignIn;