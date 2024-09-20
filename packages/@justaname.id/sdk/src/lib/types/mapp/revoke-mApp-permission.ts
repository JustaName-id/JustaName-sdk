import { IRequest, IResponse, IRoute } from '../common';

/**
 * Represents a cryptocurrency address associated with a subname.
 *
 * @interface Address
 * @public
 * @property {string} address - The cryptocurrency address.
 * @property {number} coinType - The coin type number, following standards like BIP-44 for identifying cryptocurrencies.
 */
interface Address {

  address: string;

  coinType: number;
}

/**
 * Describes a key-value pair for storing arbitrary data associated with a subname.
 *
 * @interface TextRecord
 * @public
 * @property {string} key - The key or name of the text record.
 * @property {string} value - The value or data of the text record.
 */
interface TextRecord {

  key: string;


  value: string;
}

/**
 * Contains metadata associated with a subname, including a content hash, lists of addresses and text records,
 * and the identifier of the parent subdomain.
 *
 * @interface Metadata
 * @public
 * @property {string} id - The unique identifier of the subname's metadata.
 * @property {string} contentHash - A hash of the content associated with the subname.
 * @property {Address[]} addresses - An array of cryptocurrency addresses linked to the subname.
 * @property {TextRecord[]} textRecords - An array of text records providing additional information about the subname.
 * @property {string} subdomainId - The identifier of the parent domain.
 */
interface Metadata {
  id: string;

  contentHash: string;

  addresses: Address[];

  textRecords: TextRecord[];

  subdomainId: string;
}

/**
 * Outlines the response received after successfully updating a subname.
 *
 * @interface SubnameUpdateResponse
 * @extends IResponse
 * @public
 * @property {string} id - The unique identifier of the update operation.
 * @property {Metadata} data - The updated metadata associated with the subname.
 */
export interface RevokeMAppPermissionResponse extends IResponse{

  id: string;

  data: Metadata;
}

export interface RevokeMAppPermissionRequest extends IRequest {
  /**
   * Represents the ethereum address to be verified.
   * @type {string}
   */
  address: string;

  /**
   * Represents the signature of the challenge.
   * @type {string}
   */
  signature: string;

  /**
   * Represents the challenge signed by the address.
   *
   * @type {string}
   */
  message: string;
}

export interface RevokeMAppPermissionRoute extends IRoute {
  request: RevokeMAppPermissionRequest;
  response: RevokeMAppPermissionResponse;
  headers: NonNullable<unknown>;
}

export interface RevokeMAppPermissionParams extends RevokeMAppPermissionRequest {}