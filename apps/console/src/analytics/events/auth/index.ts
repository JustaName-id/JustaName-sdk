import {
  SUBNAME_CONNECTED,
  SubnameConnectedPayload,
} from './subname-connected';

export const AUTH_EVENTS = {
  SUBNAME_CONNECTED,
} as const;

export interface AuthEventPayload {
  [SUBNAME_CONNECTED]: SubnameConnectedPayload;
}
