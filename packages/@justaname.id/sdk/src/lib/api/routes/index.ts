import {
  AddMAppPermissionRoute,
  AppendMAppFieldRoute,
  IsSubnameAvailableRoute,
  OffchainResolversGetAllRoute,
  RequestAddMAppPermissionChallengeRoute,
  RequestAppendMAppFieldChallengeRoute,
  RequestChallengeRoute,
  RequestRevokeMAppPermissionChallengeRoute,
  RevokeMAppPermissionRoute,
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
  SIWE_MAPP_ADD_PERMISSION_ROUTE,
  SIWE_MAPP_APPEND_FIELD_ROUTE,
  SIWE_MAPP_REVOKE_PERMISSION_ROUTE,
  SIWE_REQUEST_CHALLENGE_ROUTE,
  SIWE_VERIFY_MESSAGE_ROUTE,
} from './siwe';
import {
  MAPP_ADD_PERMISSION_ROUTE,
  MAPP_APPEND_FIELD_ROUTE,
  MAPP_REVOKE_PERMISSION_ROUTE,
} from './mapp';
import { GET_ALL_OFFCHAIN_RESOLVERS_ROUTE } from './offchain-resolver';
import { GET_PRIMARY_NAME_BY_ADDRESS_ROUTE } from './primary-name';
import { PrimaryNameGetByAddressRoute } from '../../types/primary-name';

export interface ROUTES {
  SIWE_VERIFY_MESSAGE_ROUTE: VerifyMessageRoute;
  SIWE_REQUEST_CHALLENGE_ROUTE: RequestChallengeRoute;
  SIWE_MAPP_ADD_PERMISSION_ROUTE: RequestAddMAppPermissionChallengeRoute;
  SIWE_MAPP_APPEND_FIELD_ROUTE: RequestAppendMAppFieldChallengeRoute;
  SIWE_MAPP_REVOKE_PERMISSION_ROUTE: RequestRevokeMAppPermissionChallengeRoute;
  MAPP_ADD_PERMISSION_ROUTE: AddMAppPermissionRoute;
  MAPP_APPEND_FIELD_ROUTE: AppendMAppFieldRoute;
  MAPP_REVOKE_PERMISSION_ROUTE: RevokeMAppPermissionRoute;
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
}

export const Routes: Record<keyof ROUTES, string> = {
  SIWE_VERIFY_MESSAGE_ROUTE,
  SIWE_REQUEST_CHALLENGE_ROUTE,
  SIWE_MAPP_ADD_PERMISSION_ROUTE,
  SIWE_MAPP_APPEND_FIELD_ROUTE,
  SIWE_MAPP_REVOKE_PERMISSION_ROUTE,
  MAPP_ADD_PERMISSION_ROUTE,
  MAPP_APPEND_FIELD_ROUTE,
  MAPP_REVOKE_PERMISSION_ROUTE,
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
};
