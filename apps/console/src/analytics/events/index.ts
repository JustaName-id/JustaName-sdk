import { AUTH_EVENTS, AuthEventPayload } from './auth';
import { CLAIM_SECTION_EVENTS, ClaimSectionEventPayload } from './claimSection';
import { CODE_EVENTS, CodeEventPayload } from './code';
import { NAVIGATION_EVENTS, NavigationEventPayload } from './navigation';
import { NETWORK_EVENTS, NetworkEventPayload } from './network';
import { PLUGINS_EVENTS, PluginsEventPayload } from './plugins';
import { SIGN_SECTION_EVENTS, SignSectionEventPayload } from './signSection';

export const EVENTS = {
  ...AUTH_EVENTS,
  ...CLAIM_SECTION_EVENTS,
  ...CODE_EVENTS,
  ...NAVIGATION_EVENTS,
  ...NETWORK_EVENTS,
  ...PLUGINS_EVENTS,
  ...SIGN_SECTION_EVENTS,
} as const;

export interface EventPayload
  extends CodeEventPayload,
    NavigationEventPayload,
    PluginsEventPayload,
    AuthEventPayload,
    NetworkEventPayload,
    ClaimSectionEventPayload,
    SignSectionEventPayload {}
