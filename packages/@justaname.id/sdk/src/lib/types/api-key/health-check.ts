import { ApiKeyHeaders } from '../headers';
import { IResponse, IRoute } from '../common';

/**
 * Defines the structure for API key responses.
 * This interface extends `IResponse`, including additional fields specific to API keys.
 * 
 * @interface ApiKeyResponse
 * @extends IResponse
 * @property {string} id - The unique identifier of the API key.
 * @property {string} name - The name given to the API key, typically used for easy identification.
 * @property {string} key - The actual API key string used for authentication and authorization.
 * @property {string} workspaceId - The identifier of the workspace to which this API key belongs.
 * @property {string} creatorId - The identifier of the user who created this API key.
 */
export interface ApiKeyResponse extends  IResponse {
  id: string;

  name: string;

  key: string;

  workspaceId: string;

  creatorId: string;
}

/**
 * Represents a route configuration for operations involving API keys.
 * This interface extends `IRoute`, providing a structure for requests and responses related to API keys,
 * as well as specifying the headers required for these operations.
 * 
 * @interface ApiKeyRoute
 * @extends IRoute
 * @property {NonNullable<unknown>} request - The type of the request data. It is intentionally broad
 *                                            to accommodate various operations related to API keys.
 * @property {ApiKeyResponse} response - The expected response structure for the API key operations,
 *                                       adhering to the `ApiKeyResponse` interface.
 * @property {ApiKeyHeaders} headers - The required headers for API key operations, specified by the
 *                                     `ApiKeyHeaders` interface.
 */
export interface ApiKeyRoute extends IRoute {
  request: NonNullable<unknown>;
  response: ApiKeyResponse;
  headers: ApiKeyHeaders
}