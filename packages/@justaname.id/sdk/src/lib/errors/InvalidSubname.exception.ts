export class InvalidSubnameException extends Error {
  constructor(message: string) {
    super(message);
  }

  static invalidSubnameFormat(): InvalidSubnameException {
    const message = 'InvalidSubnameException: Invalid subname format';
    return new InvalidSubnameException(message);
  }

  static notRegisteredSubname(subname: string): InvalidSubnameException {
    const message = `InvalidSubnameException: Subname ${subname} is not registered`;
    return new InvalidSubnameException(message)
  }

  static invalidSubnameOwner(
    subname: string,
    address: string
  ): InvalidSubnameException {
    const message = `InvalidSubnameException: subname ${subname} is not owned by address ${address}`;
    return new InvalidSubnameException(message);
  }
}