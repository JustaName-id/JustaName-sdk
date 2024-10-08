export class InvalidENSException extends Error {
  constructor(message: string) {
    super(message);
  }

  static invalidENSFormat(): InvalidENSException {
    const message = 'InvalidENSException: Invalid ENS format';
    return new InvalidENSException(message);
  }

  static notRegisteredENS(ENS: string): InvalidENSException {
    const message = `InvalidENSException: ENS ${ENS} is not registered`;
    return new InvalidENSException(message)
  }

  static invalidENSOwner(
    ENS: string,
    address: string
  ): InvalidENSException {
    const message = `InvalidENSException: ENS ${ENS} is not owned by address ${address}`;
    return new InvalidENSException(message);
  }

  static chainNotSupported(chainId: string): InvalidENSException {
    const message = `InvalidENSException: Chain ${chainId} is not supported`;
    return new InvalidENSException(message);
  }

}