import { AUTH_EVENTS, AuthEventPayload } from './auth';
import { CODE_EVENTS, CodeEventPayload } from './code';
import { NAVIGATION_EVENTS, NavigationEventPayload } from './navigation';
import { PLUGINS_EVENTS, PluginsEventPayload } from './plugins';

export const EVENTS = {
  ...AUTH_EVENTS,
  ...CODE_EVENTS,
  ...NAVIGATION_EVENTS,
  ...PLUGINS_EVENTS,
} as const;

export interface EventPayload
  extends CodeEventPayload,
    NavigationEventPayload,
    PluginsEventPayload,
    AuthEventPayload {}
