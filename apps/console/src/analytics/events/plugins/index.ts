import {
  JUST_VERIFIED_ENABLED,
  JustVerifiedEnabledPayload,
} from './just-verified-enabled';
import { EFP_ENABLED, EfpEnabledPayload } from './efp-enabled';
import { POAP_ENABLED, PoapEnabledPayload } from './poap-enabled';
import {
  JUST_VERIFIED_EVENTS,
  JustVerifiedEventsPayload,
} from './justVerified';

export const PLUGINS_EVENTS = {
  JUST_VERIFIED_ENABLED,
  EFP_ENABLED,
  POAP_ENABLED,
  ...JUST_VERIFIED_EVENTS,
} as const;

export interface PluginsEventPayload extends JustVerifiedEventsPayload {
  [JUST_VERIFIED_ENABLED]: JustVerifiedEnabledPayload;
  [EFP_ENABLED]: EfpEnabledPayload;
  [POAP_ENABLED]: PoapEnabledPayload;
}
