import {
  ENS_SELECTION_CHANGED,
  EnsSelectionChangedPayload,
} from './ens-selection-changed';

export const SIGN_SECTION_EVENTS = {
  ENS_SELECTION_CHANGED,
} as const;

export interface SignSectionEventPayload {
  [ENS_SELECTION_CHANGED]: EnsSelectionChangedPayload;
}
