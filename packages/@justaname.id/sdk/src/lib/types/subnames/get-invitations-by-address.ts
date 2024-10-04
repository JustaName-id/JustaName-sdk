import { ChainId, IRequest, IRoute, IResponse } from '../common';

/**
 * Describes an individual address associated with a subname, including its coin type and related identifiers.
 *
 * @interface AddressInvitationResponse
 * @public
 * @property {string} id - Unique identifier for the address record.
 * @property {number} coinType - Coin type number indicating the cryptocurrency associated with the address.
 * @property {string} address - The cryptocurrency address.
 * @property {string} dataId - Identifier linking the address to its subname metadata.
 */
interface AddressInvitationResponse {
  id: string;

  coinType: number;

  address: string;

  dataId: string;
}

/**
 * Represents a key-value text record associated with a subname, providing additional information or identifiers.
 *
 * @interface TextRecordInvitationResponse
 * @public
 * @property {string} id - Unique identifier for the text record.
 * @property {string} key - The key of the text record.
 * @property {string} value - The value of the text record.
 * @property {string} dataId - Identifier linking the text record to its subname metadata.
 */
interface TextRecordInvitationResponse {
  id: string;

  key: string;

  value: string;

  dataId: string;
}

/**
 * Contains metadata for a subname, including content hash, addresses, and text records.
 *
 * @interface MetadataInvitationResponse
 * @public
 * @property {string} id - Unique identifier for the subname's metadata.
 * @property {string} contentHash - Hash of the content associated with the subname.
 * @property {string} subdomainId - Identifier of the parent domain.
 * @property {AddressInvitationResponse[]} addresses - Cryptocurrency addresses associated with the subname.
 * @property {TextRecordInvitationResponse[]} textRecords - Text records associated with the subname.
 */
interface MetadataInvitationResponse {
  id: string;

  contentHash: string;

  subdomainId: string;

  addresses: AddressInvitationResponse[];

  textRecords: TextRecordInvitationResponse[];
}

/**
 * Defines the request parameters for retrieving all subnames associated with a given address.
 *
 * @interface SubnameGetInvitationsByAddressRequest
 * @extends IRequest
 * @public
 * @property {string} address - The cryptocurrency address to search for associated subnames.
 * @property {ChainId} chainId - The blockchain network identifier.
 * @property {number} coinType - Coin type number for the cryptocurrency of the address.
 * @property {boolean} isClaimed - Flag indicating whether to retrieve only claimed subnames.
 */
export interface SubnameGetInvitationsByAddressRequest extends IRequest {
  address: string;

  chainId: ChainId;

  coinType: number;

}

/**
 * Outlines the structure of the response containing details about subnames associated with a specific address.
 *
 * @interface SubnameGetInvitationsByAddressInvitationResponse
 * @extends IInvitationResponse
 * @public
 * @property {string} id - Unique identifier of the subname.
 * @property {string} username - The username part of the subname.
 * @property {string} ensId - Identifier of the parent ENS domain.
 * @property {string} subname - The full subname.
 * @property {boolean} isClaimed - Indicates if the subname has been claimed.
 * @property {Date | null} [claimedAt] - The timestamp when the subname was claimed, if applicable.
 * @property {MetadataInvitationResponse} data - Metadata associated with the subname.
 */
export interface SubnameInvitationResponse {
  id: string;

  username: string;

  ensId: string;

  subname: string;

  isClaimed: boolean;

  claimedAt?: Date | null;

  data: MetadataInvitationResponse;
}

export interface SubnameGetInvitationsByAddressResponse extends IResponse {
  subnames: SubnameInvitationResponse[];
}

  /**
   * Configures the route for retrieving all subnames associated with a given
   } address.
 *
 * @interface SubnameGetInvitationsByAddressRoute
 * @extends IRoute
 * @public
 * @property {SubnameGetInvitationsByAddressRequest} request - The request data structure.
 * @property {SubnameGetInvitationsByAddressInvitationResponse} response - An array of responses, each containing details of a subname associated with the address.
 * @property {NonNullable<unknown>} headers - The headers required for the request. The type is intentionally kept generic to accommodate various header requirements.
 */

export interface SubnameGetInvitationsByAddressRoute extends IRoute {
    request: SubnameGetInvitationsByAddressRequest;
    response: SubnameGetInvitationsByAddressResponse;
    headers: NonNullable<unknown>;
}

export interface SubnameGetInvitationsByAddressParams extends Omit<SubnameGetInvitationsByAddressRequest, 'chainId' | 'coinType'> {
  chainId?: ChainId;
  coinType?: number;
}