export class InvalidDomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidConfigurationException';
  }

  static providerUrlRequired() {
    const message = 'InvalidConfigurationException: Provider URL is required';
    return new InvalidDomainException(message);
  }

  static configRequired() {
    const message = 'InvalidConfigurationException: Configuration is required';
    return new InvalidDomainException(message);
  }

  static chainIdRequired() {
    const message = 'InvalidConfigurationException: Chain ID is required';
    return new InvalidDomainException(message);
  }

  static domainRequired() {
    const message = 'InvalidConfigurationException: Domain is required';
    return new InvalidDomainException(message);
  }

  static originRequired() {
    const message = 'InvalidConfigurationException: Origin is required';
    return new InvalidDomainException(message);
  }

  static ensDomainRequired() {
    const message = 'InvalidConfigurationException: ENS domain is required';
    return new InvalidDomainException(message);
  }
}