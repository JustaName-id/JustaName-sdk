export class InvalidConfigurationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidConfigurationException';
  }

  static providerUrlRequired() {
    const message = 'InvalidConfigurationException: Provider URL is required';
    return new InvalidConfigurationException(message);
  }

  static domainRequired() {
    const message = 'InvalidConfigurationException: Domain is required';
    return new InvalidConfigurationException(message);
  }
}