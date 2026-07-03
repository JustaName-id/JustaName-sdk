/**
 * Local, ethers-free replacements for the SIWE types that used to be imported
 * from the `siwe` package. Keeping the same shapes (and the same `SiweError`
 * `type` strings) preserves the public API and the error contract that the
 * SDK's sign-in flow and downstream consumers depend on.
 */

/** EIP-4361 message fields, mirroring the public surface of `siwe`'s SiweMessage. */
export interface SiweMessageFields {
  scheme?: string;
  domain: string;
  address: string;
  statement?: string;
  uri: string;
  version: string;
  chainId: number;
  nonce: string;
  issuedAt?: string;
  expirationTime?: string;
  notBefore?: string;
  requestId?: string;
  resources?: string[];
}

/** Result returned (or thrown) by a verification. */
export interface SiweResponse {
  success: boolean;
  data: SiweMessageFields;
  error?: SiweError;
}

/** Parameters accepted by `SIWENS.verify`. */
export interface VerifyParams {
  signature: string;
  scheme?: string;
  domain?: string;
  nonce?: string;
  time?: string;
}

/** Options accepted by `SIWENS.verify`. */
export interface VerifyOpts {
  suppressExceptions?: boolean;
}

/**
 * Mirrors `siwe`'s SiweError so thrown/returned error shapes are unchanged.
 */
export class SiweError {
  constructor(
    public type: SiweErrorType,
    public expected?: string,
    public received?: string
  ) {}
}

/**
 * Possible message error types. Values are copied verbatim from `siwe` so any
 * consumer matching on the message string keeps working.
 */
export enum SiweErrorType {
  /** `expirationTime` is present and in the past. */
  EXPIRED_MESSAGE = 'Expired message.',
  /** `domain` is not a valid authority or is empty. */
  INVALID_DOMAIN = 'Invalid domain.',
  /** `scheme` don't match the scheme provided for verification. */
  SCHEME_MISMATCH = 'Scheme does not match provided scheme for verification.',
  /** `domain` don't match the domain provided for verification. */
  DOMAIN_MISMATCH = 'Domain does not match provided domain for verification.',
  /** `nonce` don't match the nonce provided for verification. */
  NONCE_MISMATCH = 'Nonce does not match provided nonce for verification.',
  /** `address` does not conform to EIP-55 or is not a valid address. */
  INVALID_ADDRESS = 'Invalid address.',
  /** `uri` does not conform to RFC 3986. */
  INVALID_URI = 'URI does not conform to RFC 3986.',
  /** `nonce` is smaller then 8 characters or is not alphanumeric */
  INVALID_NONCE = 'Nonce size smaller then 8 characters or is not alphanumeric.',
  /** `notBefore` is present and in the future. */
  NOT_YET_VALID_MESSAGE = 'Message is not valid yet.',
  /** Signature doesn't match the address of the message. */
  INVALID_SIGNATURE = 'Signature does not match address of the message.',
  /** `expirationTime`, `notBefore` or `issuedAt` not complient to ISO-8601. */
  INVALID_TIME_FORMAT = 'Invalid time format.',
  /** `version` is not 1. */
  INVALID_MESSAGE_VERSION = 'Invalid message version.',
  /** Thrown when some required field is missing. */
  UNABLE_TO_PARSE = 'Unable to parse the message.',
}
