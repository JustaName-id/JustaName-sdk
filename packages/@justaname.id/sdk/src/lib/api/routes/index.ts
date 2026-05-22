import {
  IsSubnameAvailableRoute,
  OffchainResolversGetAllRoute,
  RequestChallengeRoute,
  SubnameAcceptRoute,
  SubnameAddRoute,
  SubnameGetAllByAddressRoute,
  SubnameGetAllByDomainChainIdRoute,
  SubnameGetAllByEnsDomainWithCountRoute,
  SubnameGetBySubnameRoute,
  SubnameGetInvitationsByAddressRoute,
  SubnameRecordsRoute,
  SubnameRejectRoute,
  SubnameReserveRoute,
  SubnameRevokeRoute,
  SubnameSearchRoute,
  SubnameUpdateRoute,
  VerifyMessageRoute,
} from '../../types';
import {
  ACCEPT_SUBNAME_ROUTE,
  ADD_SUBNAME_ROUTE,
  CHECK_SUBNAME_AVAILABILITY_ROUTE,
  GET_ALL_ENS_WITH_COUNT_ROUTE,
  GET_ALL_SUBNAMES_BY_ADDRESS_ROUTE,
  GET_ALL_SUBNAMES_BY_DOMAIN_ROUTE,
  GET_SUBNAME_BY_SUBNAME_ROUTE,
  RECORDS_BY_FULLNAME_ROUTE,
  REJECT_SUBNAME_ROUTE,
  RESERVE_SUBNAME_ROUTE,
  REVOKE_SUBNAME_ROUTE,
  SEARCH_SUBNAMES_ROUTE,
  UPDATE_SUBNAME_ROUTE,
} from './subnames';
import {
  SIWE_REQUEST_CHALLENGE_ROUTE,
  SIWE_VERIFY_MESSAGE_ROUTE,
} from './siwe';
import { GET_ALL_OFFCHAIN_RESOLVERS_ROUTE } from './offchain-resolver';
import {
  GET_PRIMARY_NAME_BY_ADDRESS_ROUTE,
  SET_PRIMARY_NAME_ROUTE,
} from './primary-name';
import {
  PrimaryNameGetByAddressRoute,
  SetPrimaryNameRoute,
} from '../../types/primary-name';

export interface ROUTES {
  SIWE_VERIFY_MESSAGE_ROUTE: VerifyMessageRoute;
  SIWE_REQUEST_CHALLENGE_ROUTE: RequestChallengeRoute;
  ACCEPT_SUBNAME_ROUTE: SubnameAcceptRoute;
  RESERVE_SUBNAME_ROUTE: SubnameReserveRoute;
  ADD_SUBNAME_ROUTE: SubnameAddRoute;
  UPDATE_SUBNAME_ROUTE: SubnameUpdateRoute;
  REJECT_SUBNAME_ROUTE: SubnameRejectRoute;
  REVOKE_SUBNAME_ROUTE: SubnameRevokeRoute;
  GET_SUBNAME_BY_SUBNAME_ROUTE: SubnameGetBySubnameRoute;
  GET_ALL_SUBNAMES_BY_DOMAIN_ROUTE: SubnameGetAllByDomainChainIdRoute;
  GET_ALL_SUBNAMES_BY_ADDRESS_ROUTE: SubnameGetAllByAddressRoute;
  GET_ALL_SUBNAMES_BY_INVITATION_ROUTE: SubnameGetInvitationsByAddressRoute;
  CHECK_SUBNAME_AVAILABILITY_ROUTE: IsSubnameAvailableRoute;
  SEARCH_SUBNAMES_ROUTE: SubnameSearchRoute;
  RECORDS_BY_FULLNAME_ROUTE: SubnameRecordsRoute;
  GET_ALL_ENS_WITH_COUNT_ROUTE: SubnameGetAllByEnsDomainWithCountRoute;
  GET_ALL_OFFCHAIN_RESOLVERS_ROUTE: OffchainResolversGetAllRoute;
  GET_PRIMARY_NAME_BY_ADDRESS_ROUTE: PrimaryNameGetByAddressRoute;
  SET_PRIMARY_NAME_ROUTE: SetPrimaryNameRoute;
}

export const Routes: Record<keyof ROUTES, string> = {
  SIWE_VERIFY_MESSAGE_ROUTE,
  SIWE_REQUEST_CHALLENGE_ROUTE,
  ACCEPT_SUBNAME_ROUTE,
  RESERVE_SUBNAME_ROUTE,
  ADD_SUBNAME_ROUTE,
  UPDATE_SUBNAME_ROUTE,
  REJECT_SUBNAME_ROUTE,
  REVOKE_SUBNAME_ROUTE,
  GET_SUBNAME_BY_SUBNAME_ROUTE,
  GET_ALL_SUBNAMES_BY_DOMAIN_ROUTE,
  GET_ALL_SUBNAMES_BY_ADDRESS_ROUTE,
  GET_ALL_SUBNAMES_BY_INVITATION_ROUTE: GET_ALL_SUBNAMES_BY_ADDRESS_ROUTE,
  CHECK_SUBNAME_AVAILABILITY_ROUTE,
  SEARCH_SUBNAMES_ROUTE,
  RECORDS_BY_FULLNAME_ROUTE,
  GET_ALL_ENS_WITH_COUNT_ROUTE,
  GET_ALL_OFFCHAIN_RESOLVERS_ROUTE,
  GET_PRIMARY_NAME_BY_ADDRESS_ROUTE,
  SET_PRIMARY_NAME_ROUTE,
};
