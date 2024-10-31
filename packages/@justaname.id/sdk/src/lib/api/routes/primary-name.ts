import { GLOBAL_PREFIX } from './prefix';

/**
 * Prefix for all primary name routes
 **/

export const PRIMARY_NAME_BASE_ROUTE = GLOBAL_PREFIX + '/ens/v1/primary-name';

export const GET_PRIMARY_NAME_BY_ADDRESS_ROUTE =
  PRIMARY_NAME_BASE_ROUTE + '/address';
