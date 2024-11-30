export const PROFILE_VIEWED = 'PROFILE_VIEWED';

export interface ProfileViewedPayload {
  ens: string;
  chainId?: number;
}
