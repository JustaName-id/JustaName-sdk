export class InvalidENSException extends Error {
  constructor(message: string) {
    super(message);
  }

  static notRegisteredENS(ENS: string): InvalidENSException {
    const message = `InvalidENSException: ENS ${ENS} is not registered`;
    return new InvalidENSException(message)
  }

  static chainNotSupported(chainId: string): InvalidENSException {
    const message = `InvalidENSException: Chain ${chainId} is not supported`;
    return new InvalidENSException(message);
  }

}