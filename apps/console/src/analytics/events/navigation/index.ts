import { DOCS_LINK_CLICKED, DocsLinkClickedPayload } from './docs-link-clicked';
import { PROFILE_VIEWED, ProfileViewedPayload } from './profile-viewed';

export const NAVIGATION_EVENTS = {
  DOCS_LINK_CLICKED,
  PROFILE_VIEWED,
} as const;

export interface NavigationEventPayload {
  [DOCS_LINK_CLICKED]: DocsLinkClickedPayload;
  [PROFILE_VIEWED]: ProfileViewedPayload;
}
