import {
  ApiKeyRoute, IRoute,
  IsSubnameAvailableRoute,
  SIWERequestChallengeRoute,
  SIWEVerifyMessageRoute,
  SubnameClaimRoute
} from '../../types';
import { ADD_SUBNAME_ROUTE, CHECK_SUBNAME_AVAILABILITY_ROUTE } from './subnames';
import { HEALTH_CHECK_ROUTE } from './api-key';
import { SIWE_REQUEST_CHALLENGE_ROUTE, SIWE_VERIFY_MESSAGE_ROUTE } from './siwe';

export const Routes = {
  HEALTH_CHECK_ROUTE,
  SIWE_VERIFY_MESSAGE_ROUTE,
  SIWE_REQUEST_CHALLENGE_ROUTE,
  ADD_SUBNAME_ROUTE,
  CHECK_SUBNAME_AVAILABILITY_ROUTE,
} as const;

export type RoutesType = keyof typeof Routes;

export type IROUTES = {
  [key in RoutesType]: IRoute;
};
export interface ROUTES extends IROUTES {
  HEALTH_CHECK_ROUTE: ApiKeyRoute
  SIWE_VERIFY_MESSAGE_ROUTE: SIWEVerifyMessageRoute
  SIWE_REQUEST_CHALLENGE_ROUTE: SIWERequestChallengeRoute
  ADD_SUBNAME_ROUTE: SubnameClaimRoute
  CHECK_SUBNAME_AVAILABILITY_ROUTE: IsSubnameAvailableRoute
}
