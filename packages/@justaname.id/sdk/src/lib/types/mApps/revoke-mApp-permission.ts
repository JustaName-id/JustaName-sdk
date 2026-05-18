import { IRequest, IRoute, SubnameResponse } from '../common';

/**
 * @deprecated mApps is deprecated and will be removed in the next major version.
 */
export interface RevokeMAppPermissionRequest extends IRequest {
  address: string;
  signature?: string;
  message: string;
}

/**
 * @deprecated mApps is deprecated and will be removed in the next major version.
 */
export interface RevokeMAppPermissionRoute
  extends IRoute<RevokeMAppPermissionRequest, SubnameResponse> {}
