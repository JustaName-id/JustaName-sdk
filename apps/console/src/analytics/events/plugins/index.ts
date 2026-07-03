import { PLUGIN_TOGGLED, PluginToggledPayload } from './plugin-toggled';
import {
  VERIFICATION_TOGGLED,
  VerificationToggledPayload,
} from './verification-toggled';

export const PLUGINS_EVENTS = {
  PLUGIN_TOGGLED,
  VERIFICATION_TOGGLED,
} as const;

export interface PluginsEventPayload {
  [PLUGIN_TOGGLED]: PluginToggledPayload;
  [VERIFICATION_TOGGLED]: VerificationToggledPayload;
}
