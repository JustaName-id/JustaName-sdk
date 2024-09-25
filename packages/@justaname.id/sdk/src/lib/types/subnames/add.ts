import { ApiKeyHeaders, SIWEHeaders } from '../headers';
import { AddressWithTypedCoins, ChainId, IRequest, IResponse, IRoute, PartialAddressJson } from '../common';

/**
 * Represents an Ethereum address and its associated coin type.
 *
 * @interface Address
 * @property {string} address - The Ethereum address.
 * @property {number} coinType - The coin type, adhering to the SLIP-0044 standard.
 */
interface Address {

  address: string;

  coinType: number;
}

/**
 * Represents a text record, a key-value pair often used for storing arbitrary
 * data within blockchain-related services, such as ENS.
 *
 * @interface TextRecord
 * @property {string} key - The key of the text record.
 * @property {string} value - The value of the text record.
 */
interface TextRecord {

  key: string;

  value: string;
}

/**
 * Defines the request structure for adding a subname under an ENS domain,
 * including specifications for blockchain interaction.
 *
 * @interface SubnameAddRequest
 * @extends IRequest
 * @property {string} username - The subname to be added.
 * @property {string} ensDomain - The ENS domain under which the subname is added.
 * @property {number} chainId - The chain ID of the Ethereum blockchain where the operation takes place.
 * @property {Address[]} [addresses] - Optional. Ethereum addresses associated with the subname.
 * @property {TextRecord[]} [text] - Optional. Text records for additional data associated with the subname.
 * @property {string} [contentHash] - Optional. A content hash representing associated data.
 */
export interface SubnameAddRequest extends IRequest{

  username: string;

  ensDomain: string;

  chainId: number;

  addresses?: Address[];

  text?: TextRecord[];

  contentHash?: string;
}

/**
 * Describes the response returned upon successfully adding a subname.
 *
 * @interface SubnameAddResponse
 * @extends IResponse
 * @property {string} id - The unique identifier of the added subname.
 */
export interface SubnameAddResponse extends IResponse{
  id: string;
}

/**
 * Configures the route for the subname addition operation, including the
 * request structure, the expected response, and the required headers.
 * This route combines `ApiKeyHeaders` for API key authentication and
 * `SIWEHeaders` for Sign-In with Ethereum verification.
 *
 * @interface SubnameAddRoute
 * @extends IRoute
 * @property {SubnameAddRequest} request - The required structure for the subname addition request.
 * @property {SubnameAddResponse} response - The expected response upon successful operation.
 * @property {ApiKeyHeaders & SIWEHeaders} headers - The combined set of headers required for authentication and verification.
 */
export interface SubnameAddRoute extends IRoute {
  request: SubnameAddRequest;
  response: SubnameAddResponse;
  headers: ApiKeyHeaders & SIWEHeaders;
}

export interface SubnameAddParams extends Omit<SubnameAddRequest, 'ensDomain' | 'chainId'| 'addresses'|'text'> {
  ensDomain?: string;
  chainId?: ChainId;
  addresses?:  PartialAddressJson  | AddressWithTypedCoins[];
  text?: Record<string, string> | TextRecord[];
}