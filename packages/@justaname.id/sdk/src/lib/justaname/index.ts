import {
  JustaNameConfig,
  Networks,
  NetworksWithProvider,
  ChainId,
  JustaNameConfigDefaults,
  NetworkWithProvider
} from '../types';
import { OffchainResolvers, SignIn, SubnameChallenge, Subnames, MApps } from '../features';
import { InvalidConfigurationException } from '../errors/InvalidConfiguration.exception';
import { ethers } from 'ethers';

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
 *  apiKey: 'your-api-key'
 *  };
 *
 *  const justaName = JustaName.init(configuration);
 *
 *  const requestChallengeResponse = await justaName.siwe.requestChallenge({
 *  chainId: 1,
 *  origin: 'http://localhost:3333',
 *  address: '0x59c44836630760F97b74b569B379ca94c37B93ca',
 *  domain: 'localhost',
 *  ttl?: 120000,
 *  });
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

  /**
   * The MApps feature.
   * @public
   * @type {MApps}
   * @memberof JustaName
   */
  mApps: MApps;

  constructor(
    siwe: SubnameChallenge,
    subnames: Subnames,
    offchainResolvers: OffchainResolvers,
    signIn: SignIn,
    mApps: MApps
  ) {
    this.siwe = siwe;
    this.subnames = subnames;
    this.offchainResolvers = offchainResolvers;
    this.signIn = signIn;
    this.mApps = mApps;
  }

  static init(configuration: JustaNameConfig = {}): JustaName {
    const defaultChainId = configuration.defaultChainId ||
      (configuration && configuration?.networks && configuration.networks[0]?.chainId ) ||
      1 as ChainId;

    const networks = JustaName.createNetworks(configuration.networks)
    const ensDomains = configuration.ensDomains || [];
    const sanitizedConfiguration:JustaNameConfigDefaults = {
      ...configuration,
      defaultChainId,
      networks,
      ensDomains
    }

    this.checkConfig(sanitizedConfiguration);

    const siweConfig = configuration.config ? { domain: configuration.config.domain, origin: configuration.config.origin } : undefined;

    const subnameChallenge = new SubnameChallenge({
      siweConfig,
      chainId: defaultChainId,
    });

    const subnames = new Subnames({
      apiKey: configuration.apiKey,
      networks,
      chainId: defaultChainId,
      ensDomains
    });

    const offchainResolvers = new OffchainResolvers();

    const signIn = new SignIn({
      siweConfig,
      networks,
      chainId: defaultChainId,
      offchainResolvers
      }
    );

    const mApps = new MApps({
      siweConfig,
      chainId: defaultChainId,
      networks,
      subnames,
    });

    return new JustaName(
      subnameChallenge,
      subnames,
      offchainResolvers,
      signIn,
      mApps
    );
  }

  static createNetworks(networks: Networks = []): NetworksWithProvider {
    const defaultMainnetProviderUrl = 'https://cloudflare-eth.com';
    const defaultTestnetProviderUrl = 'https://rpc.sepolia.org';

    const defaultMainnetProvider = new ethers.JsonRpcProvider(defaultMainnetProviderUrl, 1)
    const defaultTestnetProvider = new ethers.JsonRpcProvider(defaultTestnetProviderUrl, 11155111)

    const baseNetworks = [
      {
        chainId: 1 as ChainId,
        provider: defaultMainnetProvider,
        providerUrl: defaultMainnetProviderUrl
      },
      {
        chainId: 11155111 as ChainId,
        provider: defaultTestnetProvider,
        providerUrl: defaultTestnetProviderUrl
      },
      {
        chainId: 31337 as ChainId,
        provider: new ethers.JsonRpcProvider('http://localhost:8545'),
        providerUrl: 'http://localhost:8545',
      }
    ] as NetworksWithProvider

    const baseNetworksConfig = baseNetworks.map(_network => {
      const network = networks.find(n => n.chainId === _network.chainId)
      if (network) {
        return {
          chainId: network.chainId,
          provider: new ethers.JsonRpcProvider(network.providerUrl),
          providerUrl: network.providerUrl
        }
      } else {
        return _network
      }
    })

    const mainnetNetwork = baseNetworksConfig.find(n => n.chainId === 1) as NetworkWithProvider<1>
    const testnetNetwork = baseNetworksConfig.find(n => n.chainId === 11155111) as NetworkWithProvider<11155111>
    const localNetwork = baseNetworksConfig.find(n => n.chainId === 31337) as NetworkWithProvider<31337>
    if (!mainnetNetwork) {
      throw new InvalidConfigurationException('The mainnet network is missing');
    }

    if (!testnetNetwork) {
      throw new InvalidConfigurationException('The testnet network is missing');
    }

    return [
      mainnetNetwork,
      testnetNetwork,
      localNetwork
    ]
  }

  private static checkConfig(configuration: JustaNameConfigDefaults): void {
    this.checkNetworks(configuration.networks);
  }

  private static checkNetworks(networks: Networks): void {
    if (networks && networks.length > 0) {
      networks.reduce((acc, network) => {
        if (acc.includes(network.chainId)) {
          throw new InvalidConfigurationException('The chainId is duplicated');
        }
        return [...acc, network.chainId]
      }, [] as ChainId[])

      networks.forEach(network => {
        if(network.chainId === 31337){
          return
        }
        const provider = new ethers.JsonRpcProvider(network.providerUrl)
        provider.getNetwork().then(_network => {
          if (network.chainId.toString() !== _network.chainId.toString() ) {
            throw new InvalidConfigurationException('The chainId does not match the chainId of the providerUrl');
          }
        })
      })
    }
  }
}
