export const ENS_SELECTION_CHANGED = 'ENS_SELECTION_CHANGED';

export type EnsSelectionMode = 'any' | 'claimable' | 'specific';

export interface EnsSelectionChangedPayload {
  /** Which sign-in allow-list mode the user picked. */
  mode: EnsSelectionMode;
  /** The specific ENS entered, only present when mode === 'specific'. */
  ens?: string;
}
