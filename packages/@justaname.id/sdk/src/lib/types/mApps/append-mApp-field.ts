import { IRequest, IResponse, IRoute } from '../common';
import { SIWEHeaders } from '../headers';

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
 * @interface AppendMAppFieldResponse
 * @extends IResponse
 * @public
 * @property {string} id - The unique identifier of the update operation.
 * @property {Metadata} data - The updated metadata associated with the subname.
 */
export interface AppendMAppFieldResponse extends IResponse{

  id: string;

  data: Metadata;
}

export interface AppendMAppFieldsRequest {
  key: string;
  value: string;
}

export interface AppendMAppFieldRequest extends IRequest{
  subname: string;
  fields: AppendMAppFieldsRequest[];
}

export interface AppendMAppFieldRoute extends IRoute {
  request: AppendMAppFieldRequest;
  response: AppendMAppFieldResponse;
  headers: SIWEHeaders
}

export interface AppendMAppFieldParams extends AppendMAppFieldRequest {}