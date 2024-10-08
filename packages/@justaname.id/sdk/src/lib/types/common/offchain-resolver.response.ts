import { IResponse } from './iroute';

export interface OffchainResolverResponse extends IResponse {
  id: string;

  resolverAddress: string;

  ensRegistryAddress: string;

  nodeProvider: string;

  chainId: number;

  chainName: string;

  environment: string;
}