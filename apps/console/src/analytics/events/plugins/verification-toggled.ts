export const VERIFICATION_TOGGLED = 'VERIFICATION_TOGGLED';

export type VerificationProvider =
  | 'twitter'
  | 'telegram'
  | 'github'
  | 'discord'
  | 'email';

export interface VerificationToggledPayload {
  provider: VerificationProvider;
  enabled: boolean;
}
