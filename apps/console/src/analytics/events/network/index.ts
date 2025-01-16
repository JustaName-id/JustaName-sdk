import { NETWORK_CHANGED, NetworkChangedPayload } from './network-changed';

export const NETWORK_EVENTS = {
  NETWORK_CHANGED,
} as const;

export interface NetworkEventPayload {
  [NETWORK_CHANGED]: NetworkChangedPayload;
}
