export class ChallengeRequestException extends Error {
  constructor(message: string) {
    super(message);
  }

  static invalidTimeValue(): ChallengeRequestException {
    const message = 'ChallengeRequestException: Invalid time value';
    return new ChallengeRequestException(message);
  }

  static invalidOrigin(origin: string): ChallengeRequestException {
    const message = `ChallengeRequestException: Invalid origin: ${origin}`;
    return new ChallengeRequestException(message);
  }

  static domainRequired(): ChallengeRequestException {
    const message = 'ChallengeRequestException: Domain is required';
    return new ChallengeRequestException(message);
  }

  static invalidChainId(chainId: number): ChallengeRequestException {
    const message = `ChallengeRequestException: Invalid chainId: ${chainId}, only 1 and 11155111 are supported`;
    return new ChallengeRequestException(message);
  }

  static originRequired(): ChallengeRequestException {
    const message = 'ChallengeRequestException: Origin is required';
    return new ChallengeRequestException(message);
  }

  static invalidAddress(address: string): ChallengeRequestException {
    const message = `ChallengeRequestException: Invalid address: ${address}`;
    return new ChallengeRequestException(message);
  }

  static generatingChallengeFailed(): ChallengeRequestException {
    const message = 'ChallengeRequestException: Generating challenge failed';
    return new ChallengeRequestException(message);
  }
}
