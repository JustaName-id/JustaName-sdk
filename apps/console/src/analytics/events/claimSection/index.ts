import {
  ENS_BY_API_KEY_CALLED,
  EnsByApiKeyCalledPayload,
} from './ens-by-api-key-called';

export const CLAIM_SECTION_EVENTS = {
  ENS_BY_API_KEY_CALLED,
} as const;

export interface ClaimSectionEventPayload {
  [ENS_BY_API_KEY_CALLED]: EnsByApiKeyCalledPayload;
}
