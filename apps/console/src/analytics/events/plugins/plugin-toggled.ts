export const PLUGIN_TOGGLED = 'PLUGIN_TOGGLED';

export type PluginName =
  | 'efp'
  | 'poap'
  | 'xmtp'
  | 'dentity'
  | 'just_verified';

export interface PluginToggledPayload {
  plugin: PluginName;
  enabled: boolean;
}
