import {  SIWEHeaders } from '../headers';
import { AddressWithTypedCoins, IRequest, IResponse, IRoute, PartialAddressJson } from '../common';
import { ChainId } from '@justaname.id/sdk';

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

  contentHash: string | null | undefined;

  addresses: Address[];

  textRecords: TextRecord[];

  subdomainId: string;
}

/**
 * Defines the request parameters for updating a subname, including its associated addresses, text records,
 * and content hash.
 *
 * @interface SubnameUpdateRequest
 * @extends IRequest
 * @public
 * @property {string} username - The subname to be updated.
 * @property {string} ensDomain - The parent ENS domain under which the subname is registered.
 * @property {number} chainId - The blockchain network identifier.
 * @property {Address[]} addresses - The cryptocurrency addresses to associate with the subname.
 * @property {TextRecord[]} text - The text records to associate with the subname.
 * @property {string} contentHash - A hash of the content to be associated with the subname.
 */
export interface SubnameUpdateRequest extends IRequest{

  username: string;

  ensDomain: string;

  chainId: ChainId;

  addresses?: Address[]

  text?: TextRecord[];

  contentHash?: string;
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
export interface SubnameUpdateResponse extends IResponse{
  
  id: string;

  data: Metadata;
}

/**
 * Configures the route for updating subname details.
 *
 * @interface SubnameUpdateRoute
 * @extends IRoute
 * @public
 * @property {SubnameUpdateRequest} request - The structure required for a subname update request.
 * @property {SubnameUpdateResponse} response - The expected format of the response after successful update.
 * @property {SIWEHeaders} headers - Combined API key and SIWE authentication headers required for the operation.
 */
export interface SubnameUpdateRoute extends IRoute {
  request: SubnameUpdateRequest;
  response: SubnameUpdateResponse;
  headers: SIWEHeaders;
}

export interface SubnameUpdateParams extends Omit<SubnameUpdateRequest, 'ensDomain' | 'chainId' | 'text' | 'addresses'> {
  ensDomain?: string;
  chainId?: ChainId;
  addresses?:  PartialAddressJson  | AddressWithTypedCoins[];
  text?: Record<string, string> | TextRecord[];
}