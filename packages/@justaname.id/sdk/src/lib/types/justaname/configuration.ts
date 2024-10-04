import { ChainId } from '../common';
import { JsonRpcProvider } from 'ethers';

export interface NetworkWithProvider<Chain extends ChainId = ChainId> extends Network<Chain> {
  provider: JsonRpcProvider;
}

export interface Network<Chain extends ChainId = ChainId> {
  chainId: Chain;
  providerUrl: string;
}

export type Networks = Network[];

export type NetworksWithProvider = [
  NetworkWithProvider<1>,
  NetworkWithProvider<11155111>,
];

export interface Configuration {
  domain: string;
  origin: string;
  subnameChallengeTtl?: number;
  signInTtl?: number;
}

export interface  EnsDomainByChainId {
  chainId: ChainId;
  ensDomain: string;
}

export type EnsDomains = string | EnsDomainByChainId[];

export interface JustaNameConfig<
  Config extends Configuration = Configuration,
  NetworksConfig extends Networks = Networks,
  EnsDomainConfig extends EnsDomains | undefined = EnsDomains | undefined,
  DefaultChainId extends ChainId | undefined = ChainId | undefined,
  ApiKey extends string | undefined = string | undefined
> {
  config?: Config;
  networks?: NetworksConfig;
  ensDomains?: EnsDomainConfig;
  defaultChainId?: DefaultChainId;
  apiKey?: ApiKey;
}

export interface JustaNameConfigDefaults<
  NetworksWithProviderConfig extends NetworksWithProvider = NetworksWithProvider,
> extends JustaNameConfig<
    Configuration,
    NetworksWithProviderConfig,
    EnsDomainByChainId[]
> {
  networks: NetworksWithProviderConfig;
  ensDomains: EnsDomainByChainId[];
}