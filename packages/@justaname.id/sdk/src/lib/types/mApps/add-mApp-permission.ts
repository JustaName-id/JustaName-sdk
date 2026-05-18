import { IRequest, IRoute, SubnameResponse } from '../common';

/**
 * @deprecated mApps is deprecated and will be removed in the next major version.
 */
export interface AddMAppPermissionRequest extends IRequest {
  address: string;
  signature?: string;
  message: string;
}

/**
 * @deprecated mApps is deprecated and will be removed in the next major version.
 */
export interface AddMAppPermissionRoute
  extends IRoute<AddMAppPermissionRequest, SubnameResponse> {}
