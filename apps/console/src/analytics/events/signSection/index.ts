import { ANY_ENS_SELECTED, AnyEnsSelectedPayload } from './any-ens-selected';
import {
  CLAIMABLE_ENS_SELECTED,
  ClaimableEnsSelectedPayload,
} from './claimable-ens-selected';
import {
  SPECIFIC_ENS_SELECTED,
  SpecificEnsSelectedPayload,
} from './specific-ens-selected';

export const SIGN_SECTION_EVENTS = {
  ANY_ENS_SELECTED,
  SPECIFIC_ENS_SELECTED,
  CLAIMABLE_ENS_SELECTED,
} as const;

export interface SignSectionEventPayload {
  [ANY_ENS_SELECTED]: AnyEnsSelectedPayload;
  [SPECIFIC_ENS_SELECTED]: SpecificEnsSelectedPayload;
  [CLAIMABLE_ENS_SELECTED]: ClaimableEnsSelectedPayload;
}
