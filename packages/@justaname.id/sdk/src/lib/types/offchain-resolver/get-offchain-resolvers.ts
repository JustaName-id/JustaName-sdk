import { IResponse, IRoute } from '../common';

/**
 * Represents the response received after successfully fetching all offchain resolvers.
 *
 * @interface OffchainResolverResponse
 * @extends IResponse
 * @public
 @property {string} id - Unique identifier of the offchain resolver.
 * @property {string} resolverAddress - The address of the resolver.
 * @property {string} ensRegistryAddress - The address of the ENS registry.
 * @property {string} nodeProvider - The node provider.
 * @property {number} chainId - The blockchain network identifier.
 * @property {string} chainName - The blockchain network name.
 * @property {string} environment - The network environment.
 */
export interface OffchainResolverResponse extends IResponse {
  id: string;

  resolverAddress: string;

  ensRegistryAddress: string;

  nodeProvider: string;

  chainId: number;

  chainName: string;

  environment: string;
}

/**
 * Configures the route for fetching offchain resolvers, detailing the required request format, the expected response,
 * and any necessary headers for authorization.
 *
 * @interface OffchainResolversRoute
 * @extends IRoute
 * @public
 * @property {OffchainResolverResponse[]} response - The expected format of the response upon successful fetching.
 * @property {NonNullable<unknown>} headers - The headers required for the request, left intentionally unspecified to accommodate various requirements.
 */
export interface OffchainResolversRoute extends IRoute {
  response: OffchainResolverResponse[];
}
