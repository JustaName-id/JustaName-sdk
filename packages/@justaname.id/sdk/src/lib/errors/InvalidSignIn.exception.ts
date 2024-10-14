export class InvalidSignInException extends Error {
  constructor(message: string) {
    super(message);
  }

  static domainMismatch(domain: string, signedDomain: string): InvalidSignInException {
    const message = `InvalidSignInException: domain mismatch. Expected ${domain} but got ${signedDomain}`;
    return new InvalidSignInException(message);
  }

  static chainIdMismatch(chainId: string, signedChainId: string): InvalidSignInException {
    const message = `InvalidSignInException: chainId mismatch. Expected ${chainId} but got ${signedChainId}`;
    return new InvalidSignInException(message);
  }

  static nonceMismatch(nonce: string, signedNonce: string): InvalidSignInException {
    const message = `InvalidSignInException: nonce mismatch. Expected ${nonce} but got ${signedNonce}`;
    return new InvalidSignInException(message);
  }

  static chainIdNotSupported(chainId: string): InvalidSignInException {
    const message = `InvalidSignInException: chainId ${chainId} not supported`;
    return new InvalidSignInException(message);
  }
}