export class ApiKeyRequiredException extends Error {
  constructor(message: string) {
    super(message);
  }

  static apiKeyRequired(): ApiKeyRequiredException {
    const message = 'ApiKeyRequiredException: this operation requires an API key';
    return new ApiKeyRequiredException(message);
  }
}