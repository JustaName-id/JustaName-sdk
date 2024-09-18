/**
 * Defines the default routes for interacting with the JustaName API.
 *
 */
export const defaultRoutes = {
  addSubnameRoute: '/api/subnames/add',
  revokeSubnameRoute: '/api/subnames/revoke',
  signinRoute: '/api/signin',
  signinNonceRoute: '/api/signin/nonce',
  signoutRoute: '/api/signout',
  currentEnsRoute: '/api/current',
} as const;
