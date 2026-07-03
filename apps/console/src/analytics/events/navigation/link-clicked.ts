export const LINK_CLICKED = 'LINK_CLICKED';

export type LinkTarget = 'docs' | 'dashboard';

export interface LinkClickedPayload {
  /** Which external destination the user navigated to. */
  target: LinkTarget;
  /** Where in the UI the link lives (e.g. 'navbar', 'claim_section'). */
  location: string;
}
