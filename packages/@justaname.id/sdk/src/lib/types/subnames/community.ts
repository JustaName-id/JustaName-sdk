import { ChainId, IRequest, IResponse, IRoute } from '../common';


/**
 * Describes the response structure for an individual address associated with a subname,
 * including the coin type and unique identifiers.
 *
 * @interface AddressResponse
 * @public
 * @property {string} id - Unique identifier for the address.
 * @property {number} coinType - Identifier for the cryptocurrency type associated with the address.
 * @property {string} address - The actual cryptocurrency address.
 * @property {string} dataId - Identifier linking the address to its corresponding subname metadata.
 */
interface AddressResponse {
  id: string;

  coinType: number;

  address: string;

  dataId: string;
}

/**
 * Represents a text record associated with a subname, identified by a key-value pair and unique identifiers.
 *
 * @interface TextRecordResponse
 * @public
 * @property {string} id - Unique identifier for the text record.
 * @property {string} key - The key of the text record, representing the type of data stored.
 * @property {string} value - The value of the text record, containing the actual data.
 * @property {string} dataId - Identifier linking the text record to its corresponding subname metadata.
 */
interface TextRecordResponse {
  id: string;

  key: string;

  value: string;

  dataId: string;
}

/**
 * Outlines the metadata associated with a subname, including content hash, subdomain ID,
 * addresses, and text records.
 *
 * @interface MetadataResponse
 * @public
 * @property {string} id - Unique identifier for the subname's metadata.
 * @property {string} contentHash - A hash of the content associated with the subname.
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
 * Details the structure of a response for a subname, including its unique identifier, username,
 * parent domain ID, subname, claim status, claim timestamp, and metadata.
 *
 * @interface SubnameResponse
 * @public
 * @property {string} id - Unique identifier of the subname.
 * @property {string} username - Username part of the subname.
 * @property {string} ensId - Identifier of the parent ENS domain.
 * @property {string} subname - The complete subname.
 * @property {boolean} isClaimed - Indicates whether the subname has been claimed.
 * @property {Date | null} claimedAt - Optional timestamp of when the subname was claimed.
 * @property {MetadataResponse} data - Metadata associated with the subname.
 */
interface SubnameResponse {
  id: string;

  username: string;

  ensId: string;

  subname: string;

  isClaimed: boolean;

  claimedAt?: Date | null;

  data: MetadataResponse;
}

export interface SubnameAllCommunitiesWithCountApiResponse {
  ensDomain: string;

  subnameCount: number;

  ensSubname: SubnameResponse
}
/**
 * Defines the response structure for pagination information, including total counts, page numbers,
 * limits, and navigation flags.
 *
 * @interface PaginationResponse
 * @public
 * @property {number} totalCount - The total number of subnames available.
 * @property {number} page - The current page number.
 * @property {number} limit - The number of items per page.
 * @property {number} totalPages - The total number of pages available.
 * @property {number | null} nextPage - The number of the next page, if available.
 * @property {number | null} prevPage - The number of the previous page, if available.
 * @property {boolean} hasNextPage - Indicates if a next page is available.
 * @property {boolean} hasPrevPage - Indicates if a previous page is available.
 */
interface PaginationResponse {

  totalCount: number;

  page: number;

  limit: number;

  totalPages: number;

  nextPage: number | null;

  prevPage: number | null;

  hasNextPage: boolean;

  hasPrevPage: boolean;
}

/**
 * Specifies the request parameters for retrieving all subnames under a specific domain and chain ID,
 * with optional filters for address, coin type, pagination, and claim status.
 *
 * @interface SubnameGetAllCommunitiesChainIdRequest
 * @extends IRequest
 * @public
 * @property {string} ensDomain - The ENS domain to search under.
 * @property {ChainId} chainId - The blockchain network identifier.
 * @property {string} [address] - Optional address to filter the subnames by.
 * @property {number} [coinType] - Optional coin type to filter the subnames by.
 * @property {number} [page] - Optional page number for pagination.
 * @property {number} [limit] - Optional limit on the number of items per page.
 * @property {boolean} [isClaimed] - Optional flag to filter by claimed status.
 */
export interface SubnameGetAllCommunitiesChainIdRequest extends IRequest {

  chainId: ChainId;


  page?: number;

  limit?: number;

  orderBy?: 'subnameCount' | 'createdAt'

  orderDirection?: 'asc' | 'desc'
}

/**
 * Defines the expected response structure when retrieving all subnames under a specific domain and chain ID,
 * including an array of subname details and pagination information.
 *
 * @interface SubnameGetAllCommunitiesChainIdResponse
 * @extends IResponse
 * @public
 * @property {SubnameResponse[]} subnames - An array of subname details.
 * @property {PaginationResponse} pagination - Pagination information for navigating through the subnames.
 */
export interface SubnameGetAllCommunitiesChainIdResponse extends IResponse {

  ens: SubnameAllCommunitiesWithCountApiResponse[];

  pagination: PaginationResponse
}

/**
 * Configures the route for retrieving all communities associated chain ID paginated.
 *
 * @interface SubnameGetAllCommunitiesChainIdRoute
 * @extends IRoute
 * @public
 * @property {SubnameGetAllCommunitiesChainIdRequest} request - The request data structure.
 * @property {SubnameGetAllCommunitiesChainIdResponse} response - The expected response structure.
 * @property {NonNullable<unknown>} headers - The headers required for the request, left intentionally unspecified to accommodate various requirements.
 */
export interface SubnameGetAllCommunitiesChainIdRoute extends IRoute {
  request: SubnameGetAllCommunitiesChainIdRequest;
  response: SubnameGetAllCommunitiesChainIdResponse;
  headers: NonNullable<unknown>;
}