import { GLOBAL_PREFIX } from './prefix';

/**
 * Prefix for all Subname routes
 */
// TODO: should be
// export const SUBNAME_BASE_ROUTE = GLOBAL_PREFIX + '/subname';

export const SUBNAME_BASE_ROUTE = GLOBAL_PREFIX + '/ens/v1/subname';
/**
 *
 * Routes to accept subname invitation
 */
export const ACCEPT_SUBNAME_ROUTE = SUBNAME_BASE_ROUTE + '/accept';

/**
 * Routes to reserve subname
 */
export const RESERVE_SUBNAME_ROUTE = SUBNAME_BASE_ROUTE + '/reserve';

/**
 * Routes to add subname
 */
export const ADD_SUBNAME_ROUTE = SUBNAME_BASE_ROUTE + '/add';

/**
 * Routes to update subname
 */
export const UPDATE_SUBNAME_ROUTE = SUBNAME_BASE_ROUTE + '/update';

/**
 * Routes to revoke subname
 */
export const REVOKE_SUBNAME_ROUTE = SUBNAME_BASE_ROUTE + '/revoke';

/**
 * Routes to reject subname
 */
export const REJECT_SUBNAME_ROUTE = SUBNAME_BASE_ROUTE + '/reject';

/**
 * Routes to get subname by full subname
 */
export const GET_SUBNAME_BY_SUBNAME_ROUTE = SUBNAME_BASE_ROUTE + '/subname';

/**
 * Routes to get all subnames by domain
 */
export const GET_ALL_SUBNAMES_BY_DOMAIN_ROUTE = SUBNAME_BASE_ROUTE + '/ens';

/**
 * Routes to get all subnames by address
 */
export const GET_ALL_SUBNAMES_BY_ADDRESS_ROUTE =
  SUBNAME_BASE_ROUTE + '/address';

/**
 * Routes to check subname availability
 */
export const CHECK_SUBNAME_AVAILABILITY_ROUTE =
  SUBNAME_BASE_ROUTE + '/available';

/**
 * Route to search for subnames
 */
export const SEARCH_SUBNAMES_ROUTE = SUBNAME_BASE_ROUTE + '/search';

/**
 * Route to get all subnames
 */
export const RECORDS_BY_FULLNAME_ROUTE = SUBNAME_BASE_ROUTE + '/records';

export const GET_ALL_ENS_WITH_COUNT_ROUTE = SUBNAME_BASE_ROUTE + '/ens-list';
