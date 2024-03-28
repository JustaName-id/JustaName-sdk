import {
  ApiKeyRoute, IRoute,
  IsSubnameAvailableRoute,
  SIWERequestChallengeRoute,
  SIWEVerifyMessageRoute,
  SubnameAddRoute,
  SubnameApproveRoute,
  SubnameGetAllByAddressRoute,
  SubnameGetAllByDomainChainIdRoute,
  SubnameGetByDomainNameChainIdRoute,
  SubnameGetBySubnameRoute,
  SubnameReserveRoute,
  SubnameRevokeRoute,
  SubnameUpdateRoute
} from '../../types';
import { ACCEPT_SUBNAME_ROUTE, ADD_SUBNAME_ROUTE, CHECK_SUBNAME_AVAILABILITY_ROUTE, GET_ALL_SUBNAMES_BY_ADDRESS_ROUTE, GET_ALL_SUBNAMES_BY_DOMAIN_ROUTE, GET_ALL_SUBNAMES_BY_INVITATION_ROUTE, GET_SUBNAME_BY_DOMAIN_NAME_CHAIN_ID_ROUTE, GET_SUBNAME_BY_SUBNAME_ROUTE, RESERVE_SUBNAME_ROUTE, REVOKE_SUBNAME_ROUTE, UPDATE_SUBNAME_ROUTE } from './subnames';
import { HEALTH_CHECK_ROUTE } from './api-key';
import { SIWE_REQUEST_CHALLENGE_ROUTE, SIWE_VERIFY_MESSAGE_ROUTE } from './siwe';

export const Routes = {
  HEALTH_CHECK_ROUTE,
  SIWE_VERIFY_MESSAGE_ROUTE,
  SIWE_REQUEST_CHALLENGE_ROUTE,
  ACCEPT_SUBNAME_ROUTE,
  RESERVE_SUBNAME_ROUTE,
  ADD_SUBNAME_ROUTE,
  UPDATE_SUBNAME_ROUTE,
  REVOKE_SUBNAME_ROUTE,
  GET_SUBNAME_BY_DOMAIN_NAME_CHAIN_ID_ROUTE,
  GET_SUBNAME_BY_SUBNAME_ROUTE,
  GET_ALL_SUBNAMES_BY_DOMAIN_ROUTE,
  GET_ALL_SUBNAMES_BY_ADDRESS_ROUTE,
  GET_ALL_SUBNAMES_BY_INVITATION_ROUTE,
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
  APPROVE_SUBNAME_ROUTE: SubnameApproveRoute
  RESERVE_SUBNAME_ROUTE: SubnameReserveRoute
  ADD_SUBNAME_ROUTE: SubnameAddRoute
  UPDATE_SUBNAME_ROUTE: SubnameUpdateRoute
  REVOKE_SUBNAME_ROUTE: SubnameRevokeRoute
  GET_SUBNAME_BY_DOMAIN_NAME_CHAIN_ID_ROUTE: SubnameGetByDomainNameChainIdRoute
  GET_SUBNAME_BY_SUBNAME_ROUTE: SubnameGetBySubnameRoute
  GET_ALL_SUBNAMES_BY_DOMAIN_ROUTE: SubnameGetAllByDomainChainIdRoute
  GET_ALL_SUBNAMES_BY_ADDRESS_ROUTE: SubnameGetAllByAddressRoute
  GET_ALL_SUBNAMES_BY_INVITATION_ROUTE: SubnameGetAllByAddressRoute
  CHECK_SUBNAME_AVAILABILITY_ROUTE: IsSubnameAvailableRoute
}
