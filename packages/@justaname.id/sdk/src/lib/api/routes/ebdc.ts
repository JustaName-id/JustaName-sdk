import { GLOBAL_PREFIX} from './prefix';

/**
 * Prefix for all EBDC routes
 */
const EBDC_ROUTE = GLOBAL_PREFIX + '/ens/v1/ebdc';

/**
 * Routes for EBDC Add Permission
 */
export const EBDC_ADD_PERMISSION_ROUTE = EBDC_ROUTE + '/permission/add';

/**
 * Routes for EBDC Append Field
 */
export const EBDC_APPEND_FIELD_ROUTE = EBDC_ROUTE + '/field/append';


/**
 * Routes for EBDC Revoke Permission
 */
export const EBDC_REVOKE_PERMISSION_ROUTE = EBDC_ROUTE + '/permission/revoke';