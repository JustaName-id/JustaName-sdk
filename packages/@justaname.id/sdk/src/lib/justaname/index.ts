import {
  ChainId,
  JustaNameConfig,
  JustaNameConfigDefaults,
  Networks,
  NetworksWithProvider,
  NetworkWithProvider,
} from '../types';
import {
  OffchainResolvers,
  SignIn,
  SubnameChallenge,
  Subnames,
} from '../features';
import { InvalidConfigurationException } from '../errors/InvalidConfiguration.exception';
// import { providerUrlChainIdLoadingMap, providerUrlChainIdMap } from '../memory';
import { createPublicClient, http, PublicClient } from 'viem';
import { mainnet, sepolia } from 'viem/chains';

const buildPublicClient = (providerUrl: string, chainId: 1 | 11155111): PublicClient => {
  const chain = chainId === 1 ? mainnet : sepolia;
  return createPublicClient({ chain, transport: http(providerUrl) });
};

/**
 * The main class for the JustaName SDK.
 * @public
 * @class
 * @classdesc The main class for the JustaName SDK.
 * @example
 * ```typescript
 * import { JustaName } from '@justaname.id/sdk';
 *
 * const configuration = {
 *  apiKey: 'your-api-key',
 *  networks: [
 *  {
 *  chainId: 1,
 *  providerUrl: 'https://mainnet.infura.io/v3/your-infura-key'
 *  },
 *  ],
 *  ensDomains: ['justan.id']
 *  };
 *
 *  const justaName = JustaName.init(configuration);
 *
 *  ```
 */
export class JustaName {
  siwe: SubnameChallenge;

  /**
   * The subnames feature.
   * @public
   * @type {Subnames}
   * @memberof JustaName
   **/
  subnames: Subnames;

  /**
   * The offchainResolvers feature.
   * @public
   * @type {OffchainResolvers}
   * @memberof JustaName
   **/
  offchainResolvers: OffchainResolvers;

  /**
   * The signIn feature.
   * @public
   * @type {SignIn}
   * @memberof JustaName
   **/
  signIn: SignIn;

  constructor(
    siwe: SubnameChallenge,
    subnames: Subnames,
    offchainResolvers: OffchainResolvers,
    signIn: SignIn
  ) {
    this.siwe = siwe;
    this.subnames = subnames;
    this.offchainResolvers = offchainResolvers;
    this.signIn = signIn;
  }

  static init(configuration: JustaNameConfig = {}): JustaName {

    const dev = configuration.dev || false;
    const defaultChainId =
      configuration.defaultChainId ||
      (configuration &&
        configuration?.networks &&
        configuration.networks[0]?.chainId) ||
      (1 as ChainId);

    const networks = JustaName.createNetworks(configuration.networks);
    const ensDomains = configuration.ensDomains || [];
    const sanitizedConfiguration: JustaNameConfigDefaults = {
      ...configuration,
      defaultChainId,
      networks,
      ensDomains,
    };

    this.checkConfig(sanitizedConfiguration);

    const siweConfig =
      configuration.config &&
      configuration.config.domain &&
      configuration.config.origin
        ? {
            domain: configuration.config.domain,
            origin: configuration.config.origin,
          }
        : undefined;

    const subnameChallenge = new SubnameChallenge({
      siweConfig,
      chainId: defaultChainId,
      subnameChallengeTtl: configuration.config?.subnameChallengeTtl,
      dev,
    });

    const subnames = new Subnames({
      networks,
      chainId: defaultChainId,
      ensDomains,
      dev,
    });

    const offchainResolvers = new OffchainResolvers({
      dev,
    });

    const signIn = new SignIn({
      siweConfig,
      networks,
      chainId: defaultChainId,
      offchainResolvers,
    });

    return new JustaName(
      subnameChallenge,
      subnames,
      offchainResolvers,
      signIn
    );
  }

  static createNetworks(networks: Networks = []): NetworksWithProvider {
    const defaultMainnetProviderUrl = 'https://cloudflare-eth.com';
    const defaultTestnetProviderUrl = 'https://rpc.sepolia.org';

    const defaultMainnetProvider = buildPublicClient(
      defaultMainnetProviderUrl,
      1
    );
    const defaultTestnetProvider = buildPublicClient(
      defaultTestnetProviderUrl,
      11155111
    );

    const baseNetworks = [
      {
        chainId: 1 as ChainId,
        provider: defaultMainnetProvider,
        providerUrl: defaultMainnetProviderUrl,
      },
      {
        chainId: 11155111 as ChainId,
        provider: defaultTestnetProvider,
        providerUrl: defaultTestnetProviderUrl,
      },
    ] as NetworksWithProvider;

    const baseNetworksConfig = baseNetworks.map((_network) => {
      const network = networks.find((n) => n.chainId === _network.chainId);
      if (network && network?.providerUrl) {
        return {
          chainId: network.chainId,
          provider: buildPublicClient(
            network.providerUrl,
            network.chainId as 1 | 11155111
          ),
          providerUrl: network.providerUrl,
        };
      } else {
        return _network;
      }
    });

    const mainnetNetwork = baseNetworksConfig.find(
      (n) => n.chainId === 1
    ) as NetworkWithProvider<1>;
    const testnetNetwork = baseNetworksConfig.find(
      (n) => n.chainId === 11155111
    ) as NetworkWithProvider<11155111>;
    if (!mainnetNetwork) {
      throw new InvalidConfigurationException('The mainnet network is missing');
    }

    if (!testnetNetwork) {
      throw new InvalidConfigurationException('The testnet network is missing');
    }

    return [mainnetNetwork, testnetNetwork];
  }

  private static checkConfig(configuration: JustaNameConfigDefaults): void {
    // To be optimized for serverless and re added later
    // this.checkNetworks(configuration.networks);
  }
}
