export const ENS_BY_API_KEY_CALLED = 'ENS_BY_API_KEY_CALLED';

export interface EnsByApiKeyCalledPayload {
  /** Where in the UI the lookup was triggered (e.g. 'claim_section'). */
  location: string;
  /** Number of domains returned for the supplied API key. */
  domainCount: number;
}
