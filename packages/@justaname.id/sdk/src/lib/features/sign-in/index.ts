import { SiweConfig } from '../../types/siwe/siwe-config';
import { ChainId, NetworksWithProvider } from '../../types';
import { SIWENS, SiwensResponse } from '@justaname.id/siwens';
import {
  InvalidConfigurationException,
  InvalidENSException,
  InvalidSignInException,
} from '../../errors';
import { OffchainResolvers } from '../offchain-resolvers';
import { RequestSignInParams, SignInFunctionParams } from '../../types/signin';

export interface SignInResponse extends SiwensResponse {
  isJustaName: boolean;
}

export interface SignInParams {
  siweConfig?: Omit<SiweConfig, 'chainId' | 'ttl'>;
  signInTtl?: number;
  networks: NetworksWithProvider;
  offchainResolvers: OffchainResolvers;
  chainId: ChainId;
}

export class SignIn {
  private readonly siweConfig?: Omit<SiweConfig, 'chainId' | 'ttl'>;
  private readonly signInTtl?: number;
  private readonly networks: NetworksWithProvider;
  private readonly chainId: ChainId;
  private readonly offchainResolvers: OffchainResolvers;
  constructor(params: SignInParams) {
    this.siweConfig = params.siweConfig;
    this.networks = params.networks;
    this.chainId = params.chainId;
    this.offchainResolvers = params.offchainResolvers;
    this.signInTtl = params.signInTtl;
  }

  requestSignIn(params: RequestSignInParams): string {
    const chainId = params.chainId || this.chainId;
    const network = this.networks.find(
      (network) => network.chainId === chainId
    );
    if (!network) {
      throw new Error(`ChainId ${chainId} not supported`);
    }

    const uri = params.origin || this.siweConfig?.origin;
    const domain = params.domain || this.siweConfig?.domain;
    const ttl = params.ttl || this.signInTtl || 60000;

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

    const siwens = new SIWENS({
      params: {
        ...params,
        uri,
        domain,
        chainId: chainId,
        ttl: ttl,
      },
      providerUrl: network.providerUrl,
    });
    return siwens.prepareMessage();
  }

  async signIn(params: SignInFunctionParams): Promise<SignInResponse> {
    const chainIdMatch = params.message.match(/Chain ID: (\d+)/);
    const extractChainId = chainIdMatch ? chainIdMatch[1] : null;
    if (!extractChainId) {
      throw new Error('Chain ID not found in message');
    }

    const extractedChainId = parseInt(extractChainId);

    if (isNaN(extractedChainId)) {
      throw new Error('Chain ID is not a number');
    }

    if (extractedChainId !== 1 && extractedChainId !== 11155111) {
      throw InvalidSignInException.chainIdNotSupported(
        extractedChainId.toString()
      );
    }

    const chainId = extractedChainId as ChainId;

    const network = this.networks.find(
      (network) => network.chainId === chainId
    );

    if (!network) {
      throw InvalidSignInException.chainIdNotSupported(chainId.toString());
    }

    const siwens = new SIWENS({
      params: params.message,
      providerUrl: network.providerUrl,
    });

    const siwensResponse = await siwens.verify({
      signature: params.signature,
      nonce: params.nonce,
      domain: params.domain,
    });

    if (siwensResponse.data.chainId !== chainId) {
      throw InvalidSignInException.chainIdMismatch(
        chainId.toString(),
        siwensResponse.data.chainId.toString()
      );
    }

    if (params.domain) {
      if (siwensResponse.data.domain !== params.domain) {
        throw InvalidSignInException.domainMismatch(
          params?.domain,
          siwensResponse.data.domain
        );
      }
    }

    if (params.nonce) {
      if (siwensResponse.data.nonce !== params.nonce) {
        throw InvalidSignInException.nonceMismatch(
          params?.nonce,
          siwensResponse.data.nonce
        );
      }
    }

    const isJustaName = await this.checkIfJustaNameResolver(
      siwensResponse.ens,
      chainId
    );

    return {
      ...siwensResponse,
      isJustaName,
    };
  }

  generateNonce(): string {
    return SIWENS.generateNonce();
  }

  private async checkIfJustaNameResolver(ens: string, chainId: ChainId) {
    const network = this.networks.find(
      (network) => network.chainId === chainId
    );
    if (!network) {
      throw new Error(`ChainId ${chainId} not supported`);
    }

    const [resolverAddress, resolvers] = await Promise.all([
      network.provider.getResolver(ens),
      this.offchainResolvers.getAllOffchainResolvers(),
    ]);

    const currentOffchainResolver = resolvers.offchainResolvers.find(
      (resolver) => resolver.chainId === chainId
    );

    if (!currentOffchainResolver) {
      throw InvalidENSException.chainNotSupported(chainId.toString());
    }

    if (!resolverAddress?.address) {
      throw InvalidENSException.notRegisteredENS(ens);
    }

    return currentOffchainResolver.resolverAddress === resolverAddress?.address;
  }
}

export default SignIn;
