import { ChainId, IRequest, IResponse, IRoute } from '../common';


export interface Text {
  key: string;
  value: string;
}

export interface Coin {
  id: number;
  name: string;
  value: string;
}

export interface ContentHash {
  protocolType: string;
  decoded: string;
}

/**
  * Describes the response structure for retrieving the records associated with a subname.
  *
  * @interface SubnameRecordsResponse
  * @extends IResponse
  * @public
  * @property {string} resolverAddress - The address of the resolver.
  * @property {Text[]} texts - The text records associated with the subname.
  * @property {Coin[]} coins - The coin records associated with the subname.
  * @property {ContentHash | null} contentHash - The content hash associated with the subname.
  * @property {boolean} isJAN - A boolean indicating whether the subname is a Japanese name.
 */
export interface SubnameRecordsResponse extends IResponse {
  resolverAddress: string;

  texts: Text[];

  coins: Coin[];

  contentHash: ContentHash | null;

  isJAN: boolean;
}

/**
  * Describes the request structure for retrieving the records associated with a subname.
  *
  * @interface SubnameRecordsRequest
  * @extends IRequest
  * @public
  * @property {string} fullName - The full name of the subname.
  * @property {ChainId} chainId - The chain identifier.
  * @property {string} providerUrl - The URL of the provider.
 */
export interface SubnameRecordsRequest extends IRequest {
  fullName: string;
  chainId: ChainId;
  providerUrl: string;
}

/**
 * Configures the route for retrieving the records associated with a subname.
 *
 * @interface SubnameRecordsRoute
 * @extends IRoute
 * @public
 * @property {SubnameRecordsRequest} request - The request data structure.
 * @property {SubnameRecordsResponse} response - The response data structure.
 * @property {NonNullable<unknown>} headers - The headers required for the request. The type is intentionally kept generic to accommodate various header requirements.
 */
export interface SubnameRecordsRoute extends IRoute {
  request: SubnameRecordsRequest;
  response: SubnameRecordsResponse;
  headers: NonNullable<unknown>;
}