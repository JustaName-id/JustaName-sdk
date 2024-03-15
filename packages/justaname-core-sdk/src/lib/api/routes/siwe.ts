import { GLOBAL_PREFIX } from './prefix';

/**
 * Prefix for all SIWE routes
 */
export const SIWE_BASE_ROUTE = GLOBAL_PREFIX + '/siwe';

/**
 * Routes for SIWE Request Challenge
 */
export const SIWE_REQUEST_CHALLENGE_ROUTE = SIWE_BASE_ROUTE + '/request-challenge';

/**
 * Routes for SIWE Verify Message
 */
export const SIWE_VERIFY_MESSAGE_ROUTE = SIWE_BASE_ROUTE + '/verify-message';
