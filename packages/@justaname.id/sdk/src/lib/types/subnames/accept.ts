import { ApiKeyHeaders, SIWEHeaders } from '../headers';
import { IRequest, IResponse, IRoute } from '../common';

/**
 * Represents an Ethereum address and its corresponding coin type.
 *
 * @interface Address
 * @public
 * @property {string} address - The cryptocurrency address.
 * @property {number} coinType - The coin type number, typically following the BIP-0044 standard.
 */
export interface Address {
  address: string;

  coinType: number;
}

/**
 * Represents a key-value pair for text records associated with a subname.
 *
 * @interface TextRecord
 * @public
 * @property {string} key - The key of the text record.
 * @property {string} value - The value of the text record.
 */
export interface TextRecord {
  key: string;

  value: string;
}

/**
 * Represents metadata associated with a claimed subname, including content hash,
 * associated addresses, text records, and the parent domain identifier.
 *
 * @interface Metadata
 * @public
 * @property {string} id - The unique identifier of the subname metadata.
 * @property {string} contentHash - A hash of the content associated with the subname.
 * @property {Address[]} addresses - An array of addresses associated with the subname.
 * @property {TextRecord[]} textRecords - An array of text records associated with the subname.
 * @property {string} subdomainId - The identifier of the parent domain.
 */
export interface Metadata {
  id: string;

  contentHash: string;

  addresses: Address[];

  textRecords: TextRecord[];

  subdomainId: string;
}

/**
 * Defines the request structure for accept a subname invitation.
 *
 * @interface SubnameAcceptRequest
 * @extends IRequest
 * @public
 * @property {string} username - The desired subname to claim.
 * @property {string} ensDomain - The parent ENS domain under which the subname is claimed.
 * @property {number} chainId - The blockchain network identifier for the claim.
 * @property {Address[]} [addresses] - Optional. Addresses to associate with the subname.
 * @property {TextRecord[]} [text] - Optional. Text records to associate with the subname.
 * @property {string} [contentHash] - Optional. A content hash to associate with the subname.
 */
export interface SubnameAcceptRequest extends IRequest {
  username: string;

  ensDomain: string;

  chainId: number;

  addresses?: Address[];

  text?: TextRecord[];

  contentHash?: string;
}

/**
 * Outlines the response received upon successfully accepting a subname invitation.
 *
 * @interface SubnameAcceptResponse
 * @extends IResponse
 * @public
 * @property {string} id - The unique identifier of the claimed subname.
 * @property {Metadata} data - The metadata associated with the claimed subname.
 */
export interface SubnameAcceptResponse extends IResponse {
  id: string;

  data: Metadata;
}


/**
 * Configures the route for accepting a subname invitation.
 *
 * @interface SubnameAcceptRoute
 * @extends IRoute
 * @public
 * @property {SubnameAcceptRequest} request - The data structure for the claim request.
 * @property {SubnameAcceptResponse} response - The expected structure for the claim response.
 * @property {ApiKeyHeaders & SIWEHeaders} headers - Combined API key and SIWE authentication headers required for the request.
 */
export interface SubnameAcceptRoute extends IRoute {
  request: SubnameAcceptRequest;
  response: SubnameAcceptResponse;
  headers: ApiKeyHeaders & SIWEHeaders;
}
