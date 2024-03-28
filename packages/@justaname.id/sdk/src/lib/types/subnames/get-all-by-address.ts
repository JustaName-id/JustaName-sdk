import { ChainId, IRequest, IResponse, IRoute } from '../common';

/**
 * Describes an individual address associated with a subname, including its coin type and related identifiers.
 *
 * @interface AddressResponse
 * @public
 * @property {string} id - Unique identifier for the address record.
 * @property {number} coinType - Coin type number indicating the cryptocurrency associated with the address.
 * @property {string} address - The cryptocurrency address.
 * @property {string} dataId - Identifier linking the address to its subname metadata.
 */
interface AddressResponse {
  id: string;

  coinType: number;

  address: string;

  dataId: string;
}

/**
 * Represents a key-value text record associated with a subname, providing additional information or identifiers.
 *
 * @interface TextRecordResponse
 * @public
 * @property {string} id - Unique identifier for the text record.
 * @property {string} key - The key of the text record.
 * @property {string} value - The value of the text record.
 * @property {string} dataId - Identifier linking the text record to its subname metadata.
 */
interface TextRecordResponse {
  id: string;

  key: string;

  value: string;

  dataId: string;
}

/**
 * Contains metadata for a subname, including content hash, addresses, and text records.
 *
 * @interface MetadataResponse
 * @public
 * @property {string} id - Unique identifier for the subname's metadata.
 * @property {string} contentHash - Hash of the content associated with the subname.
 * @property {string} subdomainId - Identifier of the parent domain.
 * @property {AddressResponse[]} addresses - Cryptocurrency addresses associated with the subname.
 * @property {TextRecordResponse[]} textRecords - Text records associated with the subname.
 */
interface MetadataResponse {
  id: string;

  contentHash: string;

  subdomainId: string;

  addresses: AddressResponse[];

  textRecords: TextRecordResponse[];
}

/**
 * Defines the request parameters for retrieving all subnames associated with a given address.
 *
 * @interface SubnameGetAllByAddressRequest
 * @extends IRequest
 * @public
 * @property {string} address - The cryptocurrency address to search for associated subnames.
 * @property {ChainId} chainId - The blockchain network identifier.
 * @property {number} coinType - Coin type number for the cryptocurrency of the address.
 * @property {boolean} isClaimed - Flag indicating whether to retrieve only claimed subnames.
 */
export interface SubnameGetAllByAddressRequest extends IRequest {
  address: string;

  chainId: ChainId;

  coinType: number;

  isClaimed: boolean;
}

/**
 * Outlines the structure of the response containing details about subnames associated with a specific address.
 *
 * @interface SubnameGetAllByAddressResponse
 * @extends IResponse
 * @public
 * @property {string} id - Unique identifier of the subname.
 * @property {string} username - The username part of the subname.
 * @property {string} ensId - Identifier of the parent ENS domain.
 * @property {string} subname - The full subname.
 * @property {boolean} isClaimed - Indicates if the subname has been claimed.
 * @property {Date | null} [claimedAt] - The timestamp when the subname was claimed, if applicable.
 * @property {MetadataResponse} data - Metadata associated with the subname.
 */
export interface SubnameGetAllByAddressResponse extends IResponse {
  id: string;

  username: string;

  ensId: string;

  subname: string;

  isClaimed: boolean;

  claimedAt?: Date | null;

  data: MetadataResponse;
}

/**
 * Configures the route for retrieving all subnames associated with a given address.
 *
 * @interface SubnameGetAllByAddressRoute
 * @extends IRoute
 * @public
 * @property {SubnameGetAllByAddressRequest} request - The request data structure.
 * @property {SubnameGetAllByAddressResponse[]} response - An array of responses, each containing details of a subname associated with the address.
 * @property {NonNullable<unknown>} headers - The headers required for the request. The type is intentionally kept generic to accommodate various header requirements.
 */
export interface SubnameGetAllByAddressRoute extends IRoute {
    request: SubnameGetAllByAddressRequest;
    response: SubnameGetAllByAddressResponse[];
    headers: NonNullable<unknown>;
}