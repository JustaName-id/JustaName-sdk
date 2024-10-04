import { ChainId, IRequest, IResponse, IRoute } from '../common';

/**
 * Represents a single cryptocurrency address associated with a subname, including its coin type and unique metadata identifiers.
 *
 * @interface AddressResponse
 * @public
 * @property {string} id - Unique identifier for the address record.
 * @property {number} coinType - The coin type number, indicating the cryptocurrency type associated with the address.
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
 * Describes a key-value text record associated with a subname, used for storing arbitrary data such as contact information.
 *
 * @interface TextRecordResponse
 * @public
 * @property {string} id - Unique identifier for the text record.
 * @property {string} key - The record key or name.
 * @property {string} value - The text value of the record.
 * @property {string} dataId - Identifier linking the text record to its subname metadata.
 */
interface TextRecordResponse {
  id: string;

  key: string;

  value: string;

  dataId: string;
}

/**
 * Contains all metadata associated with a subname, including content hash, a list of addresses, and text records.
 *
 * @interface MetadataResponse
 * @public
 * @property {string} id - The unique identifier of the metadata record.
 * @property {string} contentHash - A hash of the content associated with the subname.
 * @property {string} subdomainId - Identifier of the parent domain for this subname.
 * @property {AddressResponse[]} addresses - Cryptocurrency addresses linked to the subname.
 * @property {TextRecordResponse[]} textRecords - Text records providing additional information about the subname.
 */
interface MetadataResponse {
  id: string;

  contentHash: string;

  subdomainId: string;

  addresses: AddressResponse[];

  textRecords: TextRecordResponse[];
}

/**
 * Specifies the request format for retrieving a subname's details, including the subname and blockchain chain ID.
 *
 * @interface SubnameGetBySubnameRequest
 * @extends IRequest
 * @public
 * @property {string} subname - The full subname to lookup.
 * @property {ChainId} chainId - The blockchain network identifier.
 */
export interface SubnameGetBySubnameRequest extends IRequest {

  subname: string;

  chainId: ChainId;
}

/**
 * Defines the expected response structure when querying details of a subname, including its metadata and claim status.
 *
 * @interface SubnameGetBySubnameResponse
 * @extends IResponse
 * @public
 * @property {string} id - The unique identifier of the subname.
 * @property {string} username - The username portion of the subname.
 * @property {string} ensId - The identifier of the ENS domain to which the subname belongs.
 * @property {string} subname - The full subname, including both the username and domain parts.
 * @property {boolean} isClaimed - Indicates whether the subname has been claimed.
 * @property {Date | null} claimedAt - The date and time when the subname was claimed, if applicable.
 * @property {MetadataResponse} data - Detailed metadata about the subname.
 */
export interface SubnameGetBySubnameResponse extends IResponse {
  id: string;

  username: string;

  ensId: string;

  subname: string;

  isClaimed: boolean;

  claimedAt?: Date | null;

  data: MetadataResponse;
}

/**
 * Outlines the API route configuration for retrieving details about a specific subname based on its name and chain ID.
 * This includes the request structure, the expected response format, and any necessary headers for the operation.
 *
 * @interface SubnameGetBySubnameRoute
 * @extends IRoute
 * @public
 * @property {SubnameGetBySubnameRequest} request - The structure of the request for retrieving a subname.
 * @property {SubnameGetBySubnameResponse} response - The format of the response containing the subname details.
 * @property {NonNullable<unknown>} headers - Specifies any headers required for the request. The type is intentionally kept generic to allow for flexibility.
 */
export interface SubnameGetBySubnameRoute extends IRoute {
    request: SubnameGetBySubnameRequest;
    response: SubnameGetBySubnameResponse;
    headers: NonNullable<unknown>;
}

export interface SubnameGetBySubnameParams extends Omit<SubnameGetBySubnameRequest, 'chainId'> {
  chainId?: ChainId
}