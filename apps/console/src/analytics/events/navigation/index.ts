import { LINK_CLICKED, LinkClickedPayload } from './link-clicked';
import { PROFILE_VIEWED, ProfileViewedPayload } from './profile-viewed';

export const NAVIGATION_EVENTS = {
  LINK_CLICKED,
  PROFILE_VIEWED,
} as const;

export interface NavigationEventPayload {
  [LINK_CLICKED]: LinkClickedPayload;
  [PROFILE_VIEWED]: ProfileViewedPayload;
}
