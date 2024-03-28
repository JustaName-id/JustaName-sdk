import { ChainId, IRequest, IResponse, IRoute } from '../common';

/**
 * Describes a single address associated with a subname, including its cryptocurrency coin type
 * and a unique identifier for its metadata.
 *
 * @interface AddressResponse
 * @public
 * @property {string} id - The unique identifier of the address record.
 * @property {number} coinType - The cryptocurrency coin type number, typically following a standard like BIP-44.
 * @property {string} address - The actual cryptocurrency address.
 * @property {string} dataId - A reference to the metadata associated with this address.
 */
export interface AddressResponse {
  id: string;

  coinType: number;

  address: string;

  dataId: string;
}

/**
 * Represents a text record associated with a subname, providing a simple key-value pair
 * for storing arbitrary data related to the subname.
 *
 * @interface TextRecordResponse
 * @public
 * @property {string} id - Unique identifier for the text record.
 * @property {string} key - The key or label of the text record.
 * @property {string} value - The text content or value of the record.
 * @property {string} dataId - A reference to the metadata this text record is associated with.
 */
export interface TextRecordResponse {
  id: string;

  key: string;

  value: string;

  dataId: string;
}

/**
 * Contains detailed metadata for a subname, including content hash, associated addresses,
 * and text records.
 *
 * @interface MetadataResponse
 * @public
 * @property {string} id - The unique identifier of the subname's metadata.
 * @property {string} contentHash - A content hash associated with the subname, representing stored or linked content.
 * @property {string} subdomainId - The identifier of the subdomain to which this metadata belongs.
 * @property {AddressResponse[]} addresses - A list of cryptocurrency addresses associated with the subname.
 * @property {TextRecordResponse[]} textRecords - A list of text records providing additional information about the subname.
 */
export interface MetadataResponse {
  id: string;

  contentHash: string;

  subdomainId: string;

  addresses: AddressResponse[];

  textRecords: TextRecordResponse[];
}

/**
 * Specifies the request parameters for retrieving detailed information about a subname based on its domain name, username, and blockchain chain ID.
 *
 * @interface SubnameGetByDomainNameChainIdRequest
 * @extends IRequest
 * @public
 * @property {string} ensDomain - The ENS domain within which the subname is registered.
 * @property {string} username - The specific username associated with the subname.
 * @property {ChainId} chainId - The blockchain network identifier where the domain and subname exist.
 */
export interface SubnameGetByDomainNameChainIdRequest extends IRequest {
  ensDomain: string;

  username: string;

  chainId: ChainId;
}

/**
 * Defines the structure of the response received when querying for a subname by its domain name, username, and chain ID.
 * It includes the subname's unique identifier, metadata, claim status, and related details.
 *
 * @interface SubnameGetByDomainNameChainIdResponse
 * @extends IResponse
 * @public
 * @property {string} id - The unique identifier of the subname.
 * @property {string} username - The username associated with the subname.
 * @property {string} ensId - The identifier of the ENS domain.
 * @property {string} subname - The full subname, including the username and domain.
 * @property {boolean} isClaimed - Indicates whether the subname has been claimed.
 * @property {Date | null} claimedAt - The timestamp when the subname was claimed, if applicable.
 * @property {MetadataResponse} data - Detailed metadata associated with the subname.
 */
export interface SubnameGetByDomainNameChainIdResponse extends IResponse {
  id: string;

  username: string;

  ensId: string;

  subname: string;

  isClaimed: boolean;

  claimedAt?: Date | null;

  data: MetadataResponse;
}

/**
 * Outlines the API route configuration for retrieving a subname by domain name, username, and chain ID.
 *
 * @interface SubnameGetByDomainNameChainIdRoute
 * @extends IRoute
 * @public
 * @property {SubnameGetByDomainNameChainIdRequest} request - The expected format of the request data.
 * @property {SubnameGetByDomainNameChainIdResponse} response - The structure of the response data.
 * @property {NonNullable<unknown>} headers - Specifies any headers required for the request, left unspecified to accommodate various potential requirements.
 */
export interface SubnameGetByDomainNameChainIdRoute extends IRoute {
    request: SubnameGetByDomainNameChainIdRequest;
    response: SubnameGetByDomainNameChainIdResponse;
    headers: NonNullable<unknown>;
}