export class InvalidConfigurationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidConfigurationException';
  }

  static missingParameters(parameters: string[]) {
    return new InvalidConfigurationException(`Missing parameters: ${parameters.join(', ')}, please provide them in the configuration or in the function parameters`);
  }

  static missingHeaders(headers: string[]) {
    return new InvalidConfigurationException(`Missing headers: ${headers.join(', ')}, please provide them in the configuration or in the function parameters`);
  }
}