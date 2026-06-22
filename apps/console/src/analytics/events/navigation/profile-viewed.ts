export const PROFILE_VIEWED = 'PROFILE_VIEWED';

export interface ProfileViewedPayload {
  ens: string;
  /** Where the profile was opened from (e.g. 'demo_card'). */
  location: string;
  chainId?: number;
}
