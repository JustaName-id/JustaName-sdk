/**
 * Specifies the headers required for Sign-In with Ethereum (SIWE) requests.
 * These headers are essential for authenticating requests using Ethereum-based signatures,
 * ensuring the caller controls a specific Ethereum address.
 * 
 * @interface SIWEHeaders
 * @property {string} xMessage - The original message that was signed by the user. This message typically
 *                               contains a challenge or nonce to prevent replay attacks.
 * @property {string} xSignature - The digital signature produced by signing `xMessage` with the user's
 *                                 private key. This signature is used to verify the authenticity of the message.
 * @property {string} xAddress - The Ethereum address of the user. This address is expected to match the
 *                               public key derived from `xSignature` to successfully authenticate the request.
 */
export interface SIWEHeaders {
  xMessage: string;
  xSignature: string;
  xAddress: string;
}

/**
 * Defines the headers for API requests that require an API key for authentication.
 * The `xApiKey` header is used to pass the API key associated with the client making the request.
 * This is a common method for controlling access to restricted API endpoints.
 * 
 * @interface ApiKeyHeaders
 * @property {string} xApiKey - The API key provided to the client. This key should be included in API
 *                              requests to authenticate and authorize the client's access to the API.
 */
export interface ApiKeyHeaders {
  xApiKey: string;
}