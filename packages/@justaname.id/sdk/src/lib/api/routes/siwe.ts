import { GLOBAL_PREFIX } from './prefix';

/**
 * Prefix for all SIWE routes
 */
const SIWE_BASE_ROUTE = GLOBAL_PREFIX + '/ens/v1/siwe';

/**
 * Routes for SIWE Request Challenge
 */
export const SIWE_REQUEST_CHALLENGE_ROUTE = SIWE_BASE_ROUTE + '/request-challenge';

/**
 * Routes for SIWE Verify Message
 */
export const SIWE_VERIFY_MESSAGE_ROUTE = SIWE_BASE_ROUTE + '/verify-message';

/**
 * Routes for SIWE Request Challenge to Add MAPP Permission
 */
export const SIWE_MAPP_ADD_PERMISSION_ROUTE = SIWE_BASE_ROUTE + '/mapp/add-permission';

/**
 * Routes for SIWE Request Challenge to Append Field
 */
export const SIWE_MAPP_APPEND_FIELD_ROUTE = SIWE_BASE_ROUTE + '/mapp/append-field';

/**
 * Routes for SIWE Request Challenge to Revoke Permission
 */
export const SIWE_MAPP_REVOKE_PERMISSION_ROUTE = SIWE_BASE_ROUTE + '/mapp/revoke-permission';