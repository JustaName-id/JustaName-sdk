export class InvalidStatementException extends Error {
  constructor(message: string) {
    super(message);
  }

  static invalidStatement(): InvalidStatementException {
    const message = 'InvalidStatementException: Invalid statement';
    return new InvalidStatementException(message);
  }
}