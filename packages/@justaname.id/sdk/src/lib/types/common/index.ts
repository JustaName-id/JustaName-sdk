/**
 * Represents the blockchain network identifier, restricting to specific networks.
 * This type is used to specify and restrict operations to the following chain IDs:
 * - `1`: Ethereum Mainnet
 * - `11155111`: An example of a testnet or custom network ID
 * 
 * @type {ChainId}
 */
export type ChainId = 1 | 11155111;

/**
 * The base interface for all request structures. 
 * It serves as a common ancestor for more specific request interfaces, 
 * ensuring consistency and interoperability across different parts of the application.
 * This interface can be extended to include common request properties shared across various API calls.
 * 
 * @interface IRequest
 */
export interface IRequest {}

/**
 * The base interface for all response structures.
 * Similar to `IRequest`, it provides a foundational structure for API responses,
 * enabling consistent handling and processing of data returned from API calls.
 * Extend this interface to define specific properties for different responses.
 * 
 * @interface IResponse
 */
export interface IResponse {}

/**
 * Defines the structure for headers in API requests and responses.
 * This interface can be extended to include common headers such as authorization tokens,
 * content type, etc., providing a unified approach to handling HTTP headers.
 * 
 * @interface IHeaders
 */
export interface IHeaders {}

/**
 * Represents a generic API route configuration, encapsulating the types for request and response bodies,
 * as well as any required headers. This interface serves as a template for defining the contract for
 * a specific API endpoint, ensuring type safety and consistency in request/response handling.
 * 
 * - `request`: Specifies the expected structure of the request body, derived from `IRequest`.
 * - `response`: Specifies the expected structure of the response body, derived from `IResponse`.
 * - `headers`: Specifies the expected structure of the request/response headers, derived from `IHeaders`.
 * 
 * @interface IRoute
 * @property {IRequest} request - The type of the request data.
 * @property {IResponse} response - The type of the response data.
 * @property {IHeaders} headers - The type of the headers for the request/response.
 */
export interface IRoute {
  request: IRequest;
  response: IResponse;
  headers: IHeaders;
}