import { GLOBAL_PREFIX} from './prefix';

/**
 * Prefix for all MAPP routes
 */
const MAPP_ROUTE = GLOBAL_PREFIX + '/ens/v1/mapp';

/**
 * Routes for MAPP Add Permission
 */
export const MAPP_ADD_PERMISSION_ROUTE = MAPP_ROUTE + '/permission/add';

/**
 * Routes for MAPP Append Field
 */
export const MAPP_APPEND_FIELD_ROUTE = MAPP_ROUTE + '/field/append';


/**
 * Routes for MAPP Revoke Permission
 */
export const MAPP_REVOKE_PERMISSION_ROUTE = MAPP_ROUTE + '/permission/revoke';