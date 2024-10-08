export class InvalidTimeException extends Error {
  constructor(message: string) {
    super(message);
  }

  static timeExceedsMaxSafeInteger(): InvalidTimeException {
    const message = 'InvalidTimeException: Time exceeds max safe integer';
    return new InvalidTimeException(message);
  }

  static timeValueLessThanZero(): InvalidTimeException {
    const message = 'InvalidTimeException: Time value less than zero';
    return new InvalidTimeException(message);
  }

  static requiredTTL(): InvalidTimeException {
    const message = 'InvalidTimeException: TTL is required';
    return new InvalidTimeException(message)
  }
}